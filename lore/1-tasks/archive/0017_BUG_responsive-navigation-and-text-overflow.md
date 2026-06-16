---
id: "0017"
title: "Fix responsive navigation and text overflow"
type: BUG
status: completed
related_adr: []
related_tasks: ["0015", "0016"]
tags: ["priority-high", "responsive", "mobile", "typography", "visual-regression"]
links: []
history:
  - date: "2026-06-16"
    status: active
    who: codex
    note: >
      Created after the product owner reported a clipped phone menu and a long
      cloud name escaping the diagnostic gallery analysis panel.
  - date: "2026-06-16"
    status: completed
    who: codex
    note: >
      Restored the phone/tablet navigation handoff, bounded tablet menus,
      stacked atlas search on tablets, protected long scientific headings,
      and passed 61 tests, 9 lesson modules, 52 links, production build, and
      responsive checks at 393, 700, 1024, and 1440 px.
---

# Fix responsive navigation and text overflow

## Summary

Remove the collision between the header menu and bottom navigation on phones,
and make expert-panel display typography resilient to long cloud names.

## Acceptance Criteria

- [x] Phones expose one navigation system without clipped menu content.
- [x] Tablets retain a viewport-bounded header menu.
- [x] Diagnostic gallery questions stay inside their analysis panel.
- [x] Representative desktop, tablet, and phone widths have no page overflow.
- [x] Automated tests, lesson audit, links, and production build pass.
- [x] The fix is deployed to GitHub Pages from `main`.

## Implementation Notes

- Phones up to 640 px use only the persistent bottom navigation.
- Header menus are limited to the visible viewport and scroll internally.
- Atlas search switches to one column up to 900 px.
- Diagnostic questions and detail headings use bounded sizing and emergency
  wrapping for long formal names.
- A static regression test records these responsive contracts.

## Design Decisions

### From Plan

1. **One navigation pattern per breakpoint:** Phones retain the persistent
   bottom navigation; tablets use the header menu.
2. **Panel typography owns its bounds:** Long scientific names may break inside
   diagnostic questions instead of escaping the panel.

### Emerged

3. **Restore the original 640 px handoff:** The redesign stylesheet overrode
   the base phone rule because it loaded later. A final narrow breakpoint makes
   the intended navigation hierarchy explicit.

## Issues Encountered

- The later `max-width: 720px` redesign rule redisplayed the menu button after
  the base `max-width: 640px` rule had hidden it, so two mobile navigation
  systems appeared together.
- `Cumulonimbus` is a long unspaced token. Normal line breaking could not keep
  it inside a narrow Romie display-text column.
- The tablet audit exposed a third regression: the atlas search retained two
  minimum-width columns at 700 px and clipped its input despite page-level
  overflow being hidden.

## Broken/Modified Tests

None expected; these are scoped responsive CSS corrections.

## Future Work

None.
