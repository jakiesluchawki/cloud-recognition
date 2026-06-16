---
id: "0014"
title: "Build an interactive sounding and Skew-T laboratory"
type: FEATURE
status: active
related_adr: []
related_tasks: ["0005", "0010"]
tags: ["priority-high", "aviation", "sounding", "skew-t", "active-learning", "mobile"]
links:
  - "https://www.weather.gov/source/zhu/ZHU_Training_Page/convective_parameters/skewt/skewtinfo.html"
  - "https://www.weather.gov/upperair/factsheet"
  - "https://www.weather.gov/media/aviation/afp/Using%20Skew-Ts%20to%20Assess%20Icing%20_and%20Wind%20Shear.pptx"
  - "https://www.faa.gov/sites/faa.gov/files/FAA-H-8083-28A_FAA_Web.pdf"
history:
  - date: "2026-06-16"
    status: active
    who: codex
    note: >
      Created after a product-depth audit found that the Sounding and Skew-T
      tab promises expert vertical analysis but currently contains only a
      two-state paragraph switch with no profile, method, examples, or check.
---

# Build an interactive sounding and Skew-T laboratory

## Summary

Replace the shallow sounding explainer with a source-backed laboratory that
teaches how to read temperature, dew point, pressure, parcel path, cloud
layers, key thermodynamic levels, and vertical wind through several
contrasting atmospheric profiles.

## Context

Cloud Recognition already teaches pressure levels, Windy layers, hazards, and
the role of CAPE. The current Sounding tab does not let a learner connect those
ideas in a real vertical profile. This is a serious gap for aviation students:
the application names Skew-T, LFC, inversion, and parcel buoyancy without
showing where any of them appears or how an analyst reads the diagram.

## Implementation Plan

1. Add a compact corpus of four idealized but internally consistent training
   soundings.
2. Implement pure logarithmic pressure and skew-temperature projection
   helpers.
3. Render a responsive thermodynamic diagram with isobars, skewed isotherms,
   temperature, dew point, parcel path, key levels, moist layers, and wind.
4. Add a fixed reading protocol and scenario-specific evidence interpretation.
5. Explain LCL, LFC, EL, freezing level, inversion, dew-point spread, and
   elevated parcels without pretending to provide operational calculations.
6. Add a four-choice interpretation check for every profile.
7. Clearly distinguish observed radiosonde soundings, model forecast profiles,
   and the idealized educational examples in the app.
8. Validate content, projection helpers, accessibility, narrow screens, and
   public deployment.

## Acceptance Criteria

- [x] Four materially different profiles teach low stratus under an inversion,
      capped surface convection, deep surface-based convection, and elevated
      convection.
- [x] The diagram uses a logarithmic pressure axis and visibly skewed isotherms.
- [x] Temperature never plots left of dew point at the same pressure.
- [x] Every profile exposes temperature, dew point, parcel path, wind, moist
      layers, and relevant LCL/LFC/EL/freezing annotations.
- [x] Learners can hide and reveal profile layers without losing context.
- [x] Every profile includes a concise evidence reading, aviation relevance,
      uncertainty statement, and four-choice check.
- [x] The interface explains that balloon soundings drift and take time, while
      forecast soundings are model output.
- [x] The examples are explicitly labeled as idealized and non-operational.
- [x] The laboratory has no horizontal overflow at 390 px and remains legible
      at desktop width.
- [x] Existing Layers tools remain intact.
- [ ] Automated tests, lesson audit, link audit, production build, browser QA,
      and public GitHub Pages verification pass. Local quality gates and browser
      QA pass; public verification remains pending deployment.

## Design Decisions

### From Plan

1. **Teach a reading sequence rather than an index list:** The learner should
   repeatedly inspect axes, T/Td, stability, parcel path, then wind and
   limitations.
2. **Use qualitative energy interpretation:** The app will show where a parcel
   is warmer or cooler than the environment and label key levels, but it will
   not publish synthetic CAPE/CIN numbers as if they came from an operational
   calculation.
3. **Keep all profiles idealized and local:** This avoids licensing,
   availability, and stale-data problems while preserving deterministic
   teaching and offline use.
4. **Make limitations visible beside the diagram:** The distinction between a
   radiosonde observation, a model forecast profile, and a teaching schematic
   is part of the lesson, not a footnote.

### Emerged

5. **Put qualitative structure ahead of synthetic energy values:** The
   idealized profiles show whether a parcel is warmer or colder than the
   environment but do not publish invented CAPE or CIN values. This keeps the
   lesson rigorous without implying operational calculation precision.

6. **Use geometric pressure midpoints for layer labels:** Label placement
   follows the logarithmic pressure axis rather than an arithmetic pressure
   average.

7. **Move the detailed argument below the diagram:** Browser QA showed that a
   long analysis beside a shorter plot created a large dark empty area. The
   compact diagnosis remains beside the plot, while four evidence readings
   span the full width below it.

## Implementation Notes

- Added `src/data/soundings.js` with four deterministic profile corpora,
  thermodynamic levels, cloud layers, wind, aviation interpretation,
  uncertainty, and assessment content.
- Added `src/lib/sounding.js` with logarithmic pressure projection, skewed
  temperature projection, SVG path construction, freezing-level interpolation,
  and summary helpers.
- Replaced the old two-state paragraph switch with a responsive SVG laboratory,
  layer toggles, a five-pass reading protocol, source provenance, four-choice
  checks, and a concise glossary.
- Added three monitored NWS source records and advanced the offline cache to
  `cloud-recognition-v16`.
- Added 5 automated assertions groups across the new content and UI contract;
  the suite now contains 60 passing tests.

## Issues Encountered

- **Mismatched JSX closing tag:** The first component draft closed the glossary
  section with a `div`. The production build caught it before browser QA; the
  hierarchy was corrected.
- **Unbalanced desktop composition:** The first wide layout stretched the dark
  chart column to match a much longer analysis. The detailed evidence grid was
  moved below both columns, eliminating the accidental empty region.
- **In-app browser unavailable:** The configured in-app browser was not
  available in this session. Responsive and interaction QA therefore used the
  installed Brave browser through local Playwright as a fallback.

## Broken/Modified Tests

- `tests/content.test.mjs` now validates profile integrity, thermodynamic-level
  ordering, freezing annotations, log-pressure projection, skew, and SVG paths.
- `tests/foundation.test.mjs` now protects the sounding laboratory's source
  distinctions, controls, limitations, assessment, and visual classes.
- The service-worker assertion changed from `v15` to `v16` intentionally so
  existing installations receive the new application shell.

## Future Work

No follow-up task was required to complete this scope. Operational ingestion,
live model selection, and automated profile calculation remain outside the
free, deterministic teaching application defined for this version.
