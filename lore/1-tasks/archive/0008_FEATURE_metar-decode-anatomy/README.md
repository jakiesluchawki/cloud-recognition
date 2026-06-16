---
id: "0008"
title: "Explain the complete METAR anatomy"
type: FEATURE
status: completed
related_adr: []
related_tasks: ["0006", "0007"]
tags: ["priority-high", "aviation", "metar", "onboarding", "reference"]
links:
  - "https://aviationweather.gov/help/data/"
  - "https://www.easa.europa.eu/en/document-library/general-publications/easy-access-rules-aircrew-regulation-eu-no-11782011"
history:
  - date: "2026-06-16"
    status: active
    who: codex
    note: >
      Created after user review showed that the active decoder explained the
      selected token but not the whole report grammar or the alternative codes
      that can occupy each section.
  - date: "2026-06-16"
    status: completed
    who: codex
    note: >
      Published the complete METAR anatomy, ten-section glossary, CAVOK
      reference, responsive QA evidence, and passing automated checks in
      commit 32e9324 and GitHub Pages run 27604274379.
---

# Explain the complete METAR anatomy

## Summary

Extend active decode into a structured reference for beginners without
weakening assessment. Explain how a METAR is read as a whole, show several
possible codes for every section, and make CAVOK understandable and available
even when it is absent from the currently selected report.

## Implementation Plan

1. Define the four reading phases and ten detailed METAR sections.
2. Add multiple realistic examples and interpretation traps for each section.
3. Add a permanent CAVOK explanation with criteria and limits.
4. Connect every token label in all six training reports to the right guide.
5. Keep practice, timed briefing, and TAF questions free of pre-answer hints.
6. Verify content contracts, responsive layout, build, sources, and Pages.

## Acceptance Criteria

- [x] Active decode explains the report from product type through supplements.
- [x] The whole-report overview is visible before a token is selected.
- [x] Every section includes purpose, syntax, at least three examples, and a warning.
- [x] CAVOK expands the acronym, lists its criteria, and states what it does not mean.
- [x] RVR, AUTO, COR, SPECI, variable wind, weather codes, cloud codes,
      negative temperatures, inHg pressure, trends, and remarks are represented.
- [x] Every group in every current METAR scenario resolves to a section guide.
- [x] The enhanced reference is comfortable at 390 px and desktop widths.
- [x] Tests, lesson audit, link audit, build, push, and Pages deployment pass.

## Design Decisions

### From Plan

1. **Reference stays in active decode:** Assessment modes remain recall-first
   and do not expose the new glossary before commitment.
2. **Whole before parts:** Four reading phases establish the grammar before
   the learner studies individual code groups.
3. **Missing sections remain teachable:** A section index exposes codes that
   are absent from the currently selected report.

### Emerged

4. **CAVOK is always discoverable:** A dedicated callout links directly to the
   visibility section instead of waiting for the random CAVOK scenario.
5. **Regional differences are explicit:** The guide distinguishes the ICAO
   core from additions such as RMK and the American altimeter format.

## Broken/Modified Tests

- Extended content tests to require all ten section guides, multiple examples,
  complete CAVOK criteria, warnings, and group-to-section coverage.
- Extended foundation tests to protect the whole-report anatomy and glossary UI.

## Release

- Source commit: `32e9324`
- GitHub Pages run: `27604274379`
- Public verification: the deployed bundle contains the whole-report heading,
  section examples, and `Ceiling And Visibility OK`.
