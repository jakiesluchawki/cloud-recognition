---
id: "0001"
title: "Build and publish Cloud Recognition v1"
type: FEATURE
status: completed
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
  - date: "2026-06-16"
    status: completed
    who: codex
    note: >
      Published Cloud Recognition v1 with 8 learning modules, 10 WMO genera,
      5 placement questions, aviation and vertical-atmosphere laboratories,
      offline PWA support, 10 passing tests, and verified GitHub Pages release.
---

# Build and publish Cloud Recognition v1

## Summary

Design, implement, verify, and publish a Polish educational application that
teaches cloud identification from a welcoming beginner entry through expert
classification and aviation weather interpretation.

## Status: Completed

**Current state:** Version 1 is public, tested, installable, and documented.

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

- [x] A beginner can complete the placement or start from zero.
- [x] Existing knowledge changes the recommended starting point.
- [x] All ten WMO genera and advanced classification layers are teachable.
- [x] Ambiguity and competing labels are explained rather than hidden.
- [x] Aviation weather scope is present and source-backed.
- [x] AGL, MSL, pressure levels, geopotential height, and Windy-style layers
      are explained interactively without embedding Windy.
- [x] Atlas, key, quizzes, difficult cases, journal, and learning path work.
- [x] Scientific claims expose understandable source information.
- [x] Identification evidence uses verified real-image licenses.
- [x] No voice or automatic image-classification feature exists.
- [x] Mobile, tablet, desktop, keyboard, reduced motion, and contrast pass QA.
- [x] Automated tests and production build pass.
- [x] Design QA against Atlas Swiatla reports `final result: passed`.
- [x] Public repository and GitHub Pages URL are live and verified.

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

6. **Static React PWA with hash navigation:** GitHub Pages is the publishing
   target, so the product uses client-side hash routes and requires no server
   rewrite configuration.
7. **Bundled fonts and icons:** Newsreader, Manrope, and Phosphor are installed
   locally so core presentation works offline and does not depend on font or
   icon CDNs.
8. **Separate decorative and evidentiary imagery:** ImageGen supplies the hero
   and app icon; identification cards use individually audited Wikimedia
   Commons photographs with visible author and license records.
9. **Model-independent pressure laboratory:** Standard-atmosphere values are
   used only as explicit approximations. The interface teaches why real pressure
   surfaces require geopotential data and does not imitate live model output.
10. **Release evidence from the public site:** The in-app browser verified DOM,
    interactions, assets, and console state. Its screenshot command timed out,
    so final visual evidence was captured from the public HTTPS deployment and
    stored under `design/qa/`.

## Implementation Notes

- React 19 and Vite 6 static application with no backend, account, analytics,
  advertising, microphone, camera, or audio features.
- Local storage holds placement profile, completed modules, and journal entries.
- Content modules live under `src/data/`; placement and storage rules live
  under `src/lib/`.
- Ten real genus photographs are stored under `public/assets/clouds/`.
- Source drawers distinguish normative classification, aviation guidance,
  interface explanation, and image provenance.
- `manifest.webmanifest` and `service-worker.js` provide installable and runtime
  offline behavior.
- GitHub Actions runs `npm ci`, all tests, the production build, and Pages
  deployment after every push to `main`.

## Issues Encountered

- **Non-portable npm cache:** The starter `.npmrc` used an absolute macOS path,
  which broke the first Linux Actions run. Replaced it with `.npm-cache` and
  added a regression test.
- **Screenshot API timeout:** Browser screenshot capture repeatedly timed out.
  Interaction and console QA still ran through the in-app browser; visual
  evidence was captured from the public site for the required comparison.
- **Contrast and touch targets:** Live QA found low-contrast accent tokens and
  40 px compact controls. Tokens now meet WCAG AA and all visible mobile
  controls meet the 44 px target.

## Broken/Modified Tests

- Expanded the original three foundation tests with Pages workflow, PWA base
  path, portable npm configuration, and color-contrast checks.
- Added content tests for the ten genera, per-record provenance, and placement
  routing. No existing behavioral expectation was weakened.

## Future Work

- Automatic camera and uploaded-photo recognition is deferred to task 0002.
