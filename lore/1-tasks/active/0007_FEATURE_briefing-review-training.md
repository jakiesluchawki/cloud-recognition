---
id: "0007"
title: "Add multi-report briefings and spaced review"
type: FEATURE
status: active
related_adr: []
related_tasks: ["0006"]
tags: ["phase-future", "priority-medium", "aviation", "assessment", "local-data"]
links: []
history:
  - date: "2026-06-16"
    status: backlog
    who: codex
    note: "Spawned from 0006 future work."
  - date: "2026-06-16"
    status: active
    who: codex
    note: >
      Activated after a product audit identified continuity between sessions
      as the largest remaining educational gap.
  - date: "2026-06-16"
    status: active
    who: user
    note: >
      User feedback added a discoverability requirement: the atlas needs an
      unmistakable cloud search rather than a visually recessive text field.
---

# Add multi-report briefings and spaced review

## Summary

Extend the single-report METAR/TAF workshop into short briefing sets and
locally scheduled review without accounts, remote profiles, or operational
weather integration.

## Context

Task 0006 establishes active decoding and timeline reasoning. The next useful
step is practice across several reports and repeated retrieval of weak rules.

## Implementation

- Compose source-backed fictional briefing sets spanning multiple stations and
  times.
- Track weak code groups and timeline rules locally on the device.
- Schedule short review sessions with transparent due-state and reset controls.
- Keep all scenarios explicitly educational and non-operational.
- Make atlas retrieval explicit and evidence-aware while this learning
  continuity release is in progress.

## Implementation Plan

1. Add at least two coherent briefing sets with three reports and synthesis
   questions.
2. Add pure review scheduling, priority, due-state, and selection helpers.
3. Persist aviation review records locally with inspect and clear controls.
4. Add `Odprawa` and `Powtórki` modes to the existing workshop.
5. Verify disclosure, keyboard focus, mobile layout, and public Pages release.

## Acceptance Criteria

- [x] A briefing combines at least three reports into one coherent exercise.
- [x] Review priority increases after an error and decays after correct recall.
- [x] The learner can inspect and clear all locally stored review data.
- [x] Atlas search is prominent and resolves names, codes, observable evidence,
      and linked WMO terminology without requiring Polish diacritics.
- [x] Mobile and keyboard flows pass the same QA contract as task 0006.

## Design Decisions

### From Plan

1. **One memory across modes:** METAR, TAF, and multi-report answers all feed
   the same local review schedule.
2. **Errors stay urgent:** A wrong answer is due immediately and increases a
   bounded difficulty score. Correct recall reduces difficulty and extends
   the interval through 6 hours, 1 day, 3 days, 7 days, and 14 days.
3. **Review is inspectable:** The learner can open a ledger showing topic,
   source, correct answers, errors, streak, and due state, then clear all data
   through an explicit two-step action.

### Emerged

4. **A session does not loop the same error:** An urgent item remains due for
   the next session but is marked seen after feedback so the current session
   can progress.
5. **Search accepts evidence, not only labels:** The atlas search ranks exact
   names and WMO codes first, then searches observations, diagnostic traps,
   linked taxonomy, and monograph content using diacritic-insensitive tokens.
6. **Search moves before statistics:** User feedback showed that the previous
   underlined field could be missed. The new editorial search block is the
   first atlas tool and states what kinds of evidence can be entered.

## Broken/Modified Tests

- Added briefing structure and four-choice synthesis checks.
- Added deterministic review priority, interval, queue, and summary checks.
- Added evidence-aware atlas search tests, including `Ci`, `kowadlo`,
  `bez halo`, and `drobne fale`.
- Extended foundation tests for local storage, review controls, visible search,
  and service worker cache `v9`.

## Implementation Notes

- Added two briefing sets, each combining three existing fictional METAR
  reports and four synthesis questions with delayed evidence highlighting.
- Added a shared 38-item aviation question bank spanning METAR, TAF, and
  briefing questions.
- Added local records for attempts, errors, streak, difficulty, last result,
  update time, and due time. No account, analytics, or remote profile was
  introduced.
- Added due, next-due, and weakest-item summaries plus a complete expandable
  ledger and two-step reset.
- Added an evidence-aware atlas search surface before statistics and filters.
  Exact names and WMO codes are exclusive results; descriptive queries use
  all entered tokens across observations, traps, taxonomy, and monographs.
- Verified 390 × 844 and 1440 × 1000 layouts. Both keep document width equal
  to viewport width. Mobile search is 62 px high; briefing renders three
  reports and four choices; review exposes three summary states and native
  answer controls.
- Verified feedback focus, next-question focus, completed-session focus,
  urgent retry state, ledger disclosure, confirmation state, and complete
  local storage deletion.
- Passed 46 automated tests, the nine-module lesson audit, all 22 monitored
  external links, and the production build.
