---
id: "0006"
title: "Build an active METAR and TAF training workshop"
type: FEATURE
status: active
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
- [ ] Tests, lesson audit, production build, GitHub push, and Pages deployment pass.

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

## Broken/Modified Tests

- Extended `content.test.mjs` to require six METAR scenarios, four unique
  choices, substantive feedback, TAF timelines, and correct ceiling behavior.

## Future Work

Add operationally realistic multi-report briefing sets and spaced review after
the current static, free, no-account workshop has established a stable base.
