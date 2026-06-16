const SKY_GROUP_PATTERN = /^(FEW|SCT|BKN|OVC|VV)(\d{3})(CB|TCU)?$/;

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
