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

## Implementation Plan

1. Add at least two coherent briefing sets with three reports and synthesis
   questions.
2. Add pure review scheduling, priority, due-state, and selection helpers.
3. Persist aviation review records locally with inspect and clear controls.
4. Add `Odprawa` and `Powtórki` modes to the existing workshop.
5. Verify disclosure, keyboard focus, mobile layout, and public Pages release.

## Acceptance Criteria

- [ ] A briefing combines at least three reports into one coherent exercise.
- [ ] Review priority increases after an error and decays after correct recall.
- [ ] The learner can inspect and clear all locally stored review data.
- [ ] Mobile and keyboard flows pass the same QA contract as task 0006.
