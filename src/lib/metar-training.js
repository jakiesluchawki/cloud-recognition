const SKY_GROUP_PATTERN = /^(FEW|SCT|BKN|OVC|VV)(\d{3})(CB|TCU)?$/;
const HOUR = 60 * 60 * 1000;
const REVIEW_INTERVALS = [6 * HOUR, 24 * HOUR, 3 * 24 * HOUR, 7 * 24 * HOUR, 14 * 24 * HOUR];

export function parseSkyGroup(token) {
  const match = token.match(SKY_GROUP_PATTERN);
  if (!match) return null;

  const [, amount, heightCode, cloudType = null] = match;
  const heightFt = Number(heightCode) * 100;

  return {
    token,
    amount,
    heightFt,
    cloudType,
    createsCeiling: amount === "BKN" || amount === "OVC" || amount === "VV",
  };
}

export function findReportedCeiling(report) {
  const skyGroups = report
    .split(/\s+/)
    .map(parseSkyGroup)
    .filter(Boolean)
    .filter((group) => group.createsCeiling);

  if (skyGroups.length === 0) return null;
  return skyGroups.reduce((lowest, group) => (group.heightFt < lowest.heightFt ? group : lowest));
}

export function evaluateTrainingAnswer(question, answerIndex) {
  const isCorrect = answerIndex === question.correct;
  return {
    isCorrect,
    selected: question.options[answerIndex] ?? null,
    correct: question.options[question.correct],
    explanation: question.explanation,
  };
}

export function chooseDifferentScenario(currentIndex, total, random = Math.random) {
  if (total <= 1) return 0;
  const offset = 1 + Math.floor(random() * (total - 1));
  return (currentIndex + offset) % total;
}

export function createAviationQuestionBank(
  metarScenarios,
  tafScenarios,
  briefingSets,
) {
  const metarItems = metarScenarios.flatMap((scenario) => scenario.questions.map((question) => ({
    key: `metar:${scenario.id}:${question.id}`,
    kind: "metar",
    sourceId: scenario.id,
    title: `${scenario.station} · ${scenario.title}`,
    topic: question.topic || question.stage,
    report: scenario.report,
    question,
  })));
  const tafItems = tafScenarios.flatMap((scenario) => scenario.questions.map((question) => ({
    key: `taf:${scenario.id}:${question.id}`,
    kind: "taf",
    sourceId: scenario.id,
    title: `${scenario.station} · ${scenario.title}`,
    topic: question.topic || question.stage,
    report: scenario.report,
    timeline: scenario.timeline,
    question,
  })));
  const briefingItems = briefingSets.flatMap((briefing) => briefing.questions.map((question) => ({
    key: `briefing:${briefing.id}:${question.id}`,
    kind: "briefing",
    sourceId: briefing.id,
    title: briefing.title,
    topic: question.topic || question.stage,
    reports: briefing.reports,
    question,
  })));

  return [...metarItems, ...tafItems, ...briefingItems];
}

export function aviationReviewPriority(record = {}, now = Date.now()) {
  const streak = record.streak || 0;
  const difficulty = record.difficulty
    ?? (Math.max(0, (record.wrong || 0) - (record.correct || 0)) * 3);
  const dueAt = record.dueAt || now;
  const overdueDays = Math.max(0, now - dueAt) / (24 * HOUR);
  return difficulty + Math.max(0, 4 - streak) + Math.min(8, overdueDays);
}

export function updateAviationReview(records, item, correct, now = Date.now()) {
  const previous = records[item.key] || {
    correct: 0,
    wrong: 0,
    streak: 0,
    difficulty: 0,
  };
  const streak = correct ? previous.streak + 1 : 0;
  const interval = REVIEW_INTERVALS[Math.min(Math.max(streak - 1, 0), REVIEW_INTERVALS.length - 1)];
  const previousDifficulty = previous.difficulty
    ?? (Math.max(0, previous.wrong - previous.correct) * 3);

  return {
    ...records,
    [item.key]: {
      key: item.key,
      kind: item.kind,
      sourceId: item.sourceId,
      title: item.title,
      topic: item.topic,
      correct: previous.correct + (correct ? 1 : 0),
      wrong: previous.wrong + (correct ? 0 : 1),
      streak,
      difficulty: correct
        ? Math.max(0, previousDifficulty - 2)
        : Math.min(12, previousDifficulty + 4),
      lastResult: correct ? "correct" : "wrong",
      updatedAt: now,
      dueAt: correct ? now + interval : now,
    },
  };
}

export function aviationReviewQueue(questionBank, records = {}, now = Date.now()) {
  const byKey = new Map(questionBank.map((item) => [item.key, item]));
  return Object.values(records)
    .filter((record) => byKey.has(record.key) && (record.dueAt || 0) <= now)
    .sort((first, second) => {
      const priorityGap = aviationReviewPriority(second, now) - aviationReviewPriority(first, now);
      if (priorityGap !== 0) return priorityGap;
      if ((first.dueAt || 0) !== (second.dueAt || 0)) return (first.dueAt || 0) - (second.dueAt || 0);
      return first.key.localeCompare(second.key);
    })
    .map((record) => ({ ...byKey.get(record.key), record }));
}

export function aviationReviewSummary(questionBank, records = {}, now = Date.now()) {
  const validKeys = new Set(questionBank.map((item) => item.key));
  const tracked = Object.values(records).filter((record) => validKeys.has(record.key));
  const due = tracked.filter((record) => (record.dueAt || 0) <= now);
  const nextDueAt = tracked
    .filter((record) => (record.dueAt || 0) > now)
    .reduce((earliest, record) => (
      earliest === null || record.dueAt < earliest ? record.dueAt : earliest
    ), null);
  const weakest = [...tracked]
    .sort((first, second) => aviationReviewPriority(second, now) - aviationReviewPriority(first, now))
    .slice(0, 3);

  return {
    tracked: tracked.length,
    due: due.length,
    nextDueAt,
    weakest,
  };
}
