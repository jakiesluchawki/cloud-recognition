---
id: "0015"
title: "Build the Zgrywa-inspired design language"
type: FEATURE
status: completed
related_adr: []
related_tasks: ["0003", "0005", "0006", "0014"]
tags: ["priority-high", "design-system", "typography", "responsive", "prototype"]
links:
  - "https://zgrywa.ortografika.dev/"
history:
  - date: "2026-06-16"
    status: active
    who: codex
    note: >
      Created after the product owner requested a complete visual-language
      prototype inspired by the new Zgrywa website, using licensed Romie and
      Roobert fonts while preserving all Cloud Recognition content and behavior.
  - date: "2026-06-16"
    status: completed
    who: codex
    note: >
      Completed the editorial prototype, renamed the product CHMURNIK, added a
      selected geometric wordmark direction, verified local font usage, and
      passed automated, link, responsive, and visual QA without deployment.
---

# Build the Zgrywa-inspired design language

## Summary

Prepare a fully interactive visual redesign of Cloud Recognition on a separate
branch. Keep the encyclopedia, exercises, progress, tests, and data intact while
reframing the application as an editorial field journal rather than a card-led
educational dashboard.

## Reference Findings

- Zgrywa uses Roobert for interface and explanatory copy, and Romie sparingly
  for high-emotion editorial statements.
- Large empty fields and abrupt scale changes create rhythm before content.
- Sections change atmosphere through flat color pairs instead of shadows.
- Hairline rules, small uppercase labels, image crops, and compact buttons carry
  hierarchy.
- Rounded imagery is expressive; most informational surfaces stay nearly square.
- Motion is short and physical: scale, crop, underline, and color transitions.

## Implementation Plan

1. Isolate the redesign on `design/zgrywa-language` without deploying it.
2. Add the licensed Romie and Roobert font files as local application assets.
3. Replace global typography, color, spacing, radius, and interaction tokens.
4. Recompose the header, home hero, editorial introductions, cards, exercises,
   dialogs, and mobile navigation through the shared stylesheet.
5. Preserve all routes, data, semantics, keyboard behavior, and assessment logic.
6. Verify representative home, atlas, METAR, and sounding views on desktop and
   390 px mobile.
7. Run automated tests, lesson audit, build, and visual comparison QA.

## Acceptance Criteria

- [x] The prototype uses local Romie and Roobert files.
- [x] The home page clearly communicates the new editorial design language.
- [x] Atlas and learning cards no longer read as generic dashboard tiles.
- [x] Dense expert tools remain legible and operational.
- [x] All existing application routes and interactions remain available.
- [x] Desktop and 390 px mobile layouts have no page-level overflow.
- [x] Automated tests, lesson audit, build, and design QA pass.
- [x] The branch is prepared for review but is not deployed.

## Design Decisions

### From Plan

1. **Content and behavior remain authoritative:** This is a design-language
   prototype, not a feature rewrite.
2. **Romie is editorial, Roobert is functional:** Display serif is reserved for
   narrative hierarchy; controls and dense data remain sans serif.
3. **Reference, not replica:** Reuse composition principles from Zgrywa without
   copying its identity, logo, content, photography, or audio-specific motifs.

### Emerged

4. **CHMURNIK replaces the working English name:** The Polish name adds a
   romantic folklore layer while `atlas chmur i atmosfery` keeps the product
   category explicit.
5. **The wordmark is a direction, not final vector production:** A generated
   transparent asset is used as a CSS mask for color flexibility and accessible
   text remains in the DOM.
6. **Typography is a two-family contract:** Computed-style QA must resolve
   functional text to Roobert and editorial statements to Romie.

## Issues Encountered

1. Generated PNG dimensions overrode the intended card aspect ratio until
   `height: auto` was declared.
2. Browser screenshot capture timed out on the long app; headless Brave was
   used for deterministic visual evidence while in-app Browser handled DOM,
   responsive, interaction, and computed-style verification.
3. The first logo raster contained excessive transparent padding and required
   alpha-bound cropping before header use.

## Broken/Modified Tests

None. All 60 tests pass. The lesson audit, production build, and 52-link
monitor also pass.
