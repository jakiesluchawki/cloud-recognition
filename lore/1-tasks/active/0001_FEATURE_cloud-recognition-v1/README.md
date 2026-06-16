---
id: "0001"
title: "Build and publish Cloud Recognition v1"
type: FEATURE
status: active
related_adr: []
related_tasks: ["0002"]
tags: ["priority-high", "effort-large", "release-v1"]
links:
  - "https://github.com/jakiesluchawki/cloud-recognition"
  - "https://jakiesluchawki.github.io/cloud-recognition/"
history:
  - date: "2026-06-16"
    status: active
    who: codex
    note: "Task created after product brief and Atlas Swiatla direction approval."
---

# Build and publish Cloud Recognition v1

## Summary

Design, implement, verify, and publish a Polish educational application that
teaches cloud identification from a welcoming beginner entry through expert
classification and aviation weather interpretation.

## Status: Active

**Current state:** Repository and product foundations are being initialized.

## Confirmed Scope

- Adaptive five-question placement and an explicit start-from-zero path.
- Beginner lessons that start with visual observation.
- WMO-based atlas, decision key, species, varieties, supplementary features,
  accessory clouds, mother clouds, special clouds, and ambiguous cases.
- Full aviation path covering METAR/TAF, ceiling, bases and tops, fronts,
  convection, stability, icing, turbulence, storms, CAPE, sounding concepts,
  and Skew-T orientation.
- Independent vertical-atmosphere laboratory explaining AGL, MSL, pressure
  levels, geopotential height, and the controls encountered in Windy.
- Quizzes, disputed cases, local progress, and an observation journal.
- Visible source citations and confidence/interpretation labels.
- Strong mobile experience, responsive desktop study mode, and offline PWA.
- Public repository and GitHub Pages deployment.
- No voice or automatic photograph recognition in version 1.

## Implementation Plan

1. Establish architecture, content schema, source registry, and release gates.
2. Recreate the approved Atlas Swiatla visual system responsively.
3. Implement adaptive placement, learning paths, atlas, decision key, and
   source surfaces.
4. Implement vertical-atmosphere and aviation-weather laboratories.
5. Implement quizzes, difficult cases, journal, progress, accessibility, and
   offline behavior.
6. Add licensed photographic evidence and provenance records.
7. Verify content, behavior, responsive layouts, and design fidelity.
8. Publish and verify GitHub Pages.

## Acceptance Criteria

- [ ] A beginner can complete the placement or start from zero.
- [ ] Existing knowledge changes the recommended starting point.
- [ ] All ten WMO genera and advanced classification layers are teachable.
- [ ] Ambiguity and competing labels are explained rather than hidden.
- [ ] Aviation weather scope is present and source-backed.
- [ ] AGL, MSL, pressure levels, geopotential height, and Windy-style layers
      are explained interactively without embedding Windy.
- [ ] Atlas, key, quizzes, difficult cases, journal, and learning path work.
- [ ] Scientific claims expose understandable source information.
- [ ] Identification evidence uses verified real-image licenses.
- [ ] No voice or automatic image-classification feature exists.
- [ ] Mobile, tablet, desktop, keyboard, reduced motion, and contrast pass QA.
- [ ] Automated tests and production build pass.
- [ ] Design QA against Atlas Swiatla reports `final result: passed`.
- [ ] Public repository and GitHub Pages URL are live and verified.

## Design Decisions

### From Plan

1. **WMO as the canonical taxonomy:** Alternative terminology is explained,
   but the International Cloud Atlas anchors the learning model.
2. **Atlas Swiatla visual direction:** Editorial field-atlas beauty sets the
   visual language while Pracownia Horyzontu contributes expert functionality.
3. **Source-backed teaching:** Consequential claims expose sources and their
   role directly in the learner experience.
4. **Local-first privacy:** Progress and journal data stay on the device.
5. **No paid map dependency:** The vertical-weather lab is independent.

### Emerged

None yet.

## Issues Encountered

None yet.

## Future Work

- Automatic camera and uploaded-photo recognition is deferred to task 0002.
