---
id: "0006"
title: "Build an active METAR and TAF training workshop"
type: FEATURE
status: completed
related_adr: []
related_tasks: ["0005"]
tags: ["priority-high", "aviation", "metar", "taf", "assessment", "responsive-design"]
links:
  - "https://aviationweather.gov/help/data/"
  - "https://www.easa.europa.eu/en/document-library/general-publications/easy-access-rules-aircrew-regulation-eu-no-11782011"
history:
  - date: "2026-06-16"
    status: active
    who: codex
    note: >
      Created after the user asked to turn the static METAR example into an
      active exercise requiring interpretation, ceiling decisions, TAF
      timeline reasoning, and optional timed performance.
  - date: "2026-06-16"
    status: completed
    who: codex
    note: >
      Completed four workshop modes, six METAR and two TAF scenarios,
      post-answer timeline debrief, mobile and keyboard QA, 41 passing tests,
      and successful GitHub Pages deployment in run 27603769955.
---

# Build an active METAR and TAF training workshop

## Summary

Replace the static METAR reveal with an active Polish-language workshop. The
learner must interpret groups before seeing explanations, answer four-choice
questions, determine the reported ceiling, reason across TAF time windows, and
optionally work under a visible per-question time limit.

## Context

The existing aviation panel demonstrated one decoded report. It was attractive
and accurate, but it let the learner consume the answer without performing the
decoding work. The adjacent wind laboratory also had a desktop sizing conflict:
a 650 px minimum compass height combined with a square aspect ratio expanded
the first grid column and left the exercise vertically unbalanced.

## Implementation Plan

1. Add a curated, source-backed set of fictional METAR and TAF scenarios.
2. Add pure parsing and assessment helpers for sky groups and reported ceiling.
3. Build active decode, untimed practice, 30-second briefing, and TAF timeline modes.
4. Provide immediate evidence-led feedback and retain session accuracy and pace.
5. Correct the desktop wind-laboratory grid without regressing the phone layout.
6. Add content and logic tests, perform rendered QA, and publish to GitHub Pages.

## Acceptance Criteria

- [x] At least six varied METAR scenarios cover wind, visibility, weather,
      cloud amount, convective suffixes, temperature, QNH, and ceiling.
- [x] Every assessment question has four unique plausible answers.
- [x] The learner acts before the relevant code groups are highlighted.
- [x] A timed mode provides a visible 30-second countdown and records pace.
- [x] TAF practice asks the learner to reason across TEMPO, BECMG, and FM windows.
- [x] Feedback explains the rule instead of only marking right or wrong.
- [x] All reports are explicitly labeled as fictional educational material.
- [x] Automated tests protect question structure and ceiling interpretation.
- [x] The wind laboratory has balanced desktop columns and no forced compass overflow.
- [x] The wind and METAR workshops have no horizontal overflow at 390 px.
- [x] Tests, lesson audit, production build, GitHub push, and Pages deployment pass.

## Design Decisions

### From Plan

1. **Action before disclosure:** Explanations appear only after a token is
   selected or an answer is committed.
2. **Plausible distractors:** Wrong answers model common decoding errors, such
   as reversing wind direction, confusing metres with feet, or treating SCT as
   ceiling.
3. **Time is optional:** The default learning mode remains calm; the timed
   briefing is a separate mode for fluency and rapid information extraction.

### Emerged

4. **Curated reports over a permissive parser:** Scenarios are fictional and
   intentionally composed so feedback can be precise. A small pure parser is
   used only for the cloud-group and ceiling rules covered by tests.
5. **Shared session score, timed-only pace:** Accuracy spans the practice
   session, while average seconds uses only timed attempts.
6. **Wide caveat rail:** Expert wind caveats moved below the two-column
   exercise on desktop, preventing a narrow text column from setting the whole
   section height.
7. **TAF debrief after commitment:** The raw forecast and question come first.
   A decoded timeline appears inside feedback only after an answer, so the
   learning aid does not solve its own exercise.
8. **Feedback owns keyboard focus:** Answer feedback receives focus, the next
   `Tab` reaches the continuation action, and the new question heading receives
   focus after navigation.
9. **Quiet accessible timer:** The countdown exposes `role="timer"` and an
   accessible remaining-time label without announcing every second.

## Implementation Notes

- Added six METAR scenarios with 24 questions and two TAF scenarios with six
  timeline questions.
- Added active token decoding, immediate answer locking, focused evidence
  highlighting, session scoring, and a 30-second countdown.
- Added pure helpers for parsing FEW/SCT/BKN/OVC/VV groups, finding the lowest
  reported ceiling, evaluating answers, and rotating scenarios.
- Removed the conflicting 650 px compass minimum and constrained the desktop
  compass to a square no larger than 520 px.
- Rendered measurements at 1280 px show 620/560 px exercise columns and a
  483 px square compass. At 390 px, document width remains exactly 390 px.
- Moved the full TAF timeline into post-answer feedback and verified that no
  timeline is present before commitment.
- Added pressed-state semantics to the four mode controls and preserved focus
  across feedback and question transitions.
- Captured mobile METAR/TAF and desktop METAR/wind QA evidence under
  `design/qa/current/`.
- Published commits `62f1f26` and `a113425`; GitHub Pages run `27603769955`
  completed successfully.
- Verified the public 390 px flow against `index-AUHjiBX5.js`,
  `index-i578FUNy.css`, and service worker cache `cloud-recognition-v7`.

## Issues Encountered

- The first TAF render exposed decoded timeline cards before the question,
  weakening active recall. The timeline now appears only inside post-answer
  feedback.
- Disabling a selected answer button could move keyboard focus to the page
  body. Feedback now receives focus, followed by the continuation action and
  the next question heading.
- Keeping the service worker at cache `v6` would have left returning users on
  the pre-fix shell. The release boundary was bumped to `v7`.

## Broken/Modified Tests

- Extended `content.test.mjs` to require six METAR scenarios, four unique
  choices, substantive feedback, TAF timelines, and correct ceiling behavior.
- Extended `foundation.test.mjs` to protect post-answer TAF disclosure, mode
  pressed states, timer semantics, and feedback/question focus management.

## Future Work

See backlog task `0007` for operationally realistic multi-report briefing sets
and locally stored spaced review.
