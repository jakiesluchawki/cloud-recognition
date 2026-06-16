---
id: "0003"
title: "Expand the cloud atlas into a professional encyclopedia"
type: FEATURE
status: completed
related_adr: []
related_tasks: ["0001", "0002"]
tags: ["priority-high", "effort-large", "content", "taxonomy", "release-v2"]
links:
  - "https://cloudatlas.wmo.int/"
history:
  - date: "2026-06-16"
    status: active
    who: codex
    note: >
      Created after release review found that the ten-genus atlas was accurate
      but too small and shallow to serve as a professional reference.
  - date: "2026-06-16"
    status: completed
    who: codex
    note: >
      Published a 49-term classification index, ten professional genus
      profiles, a ninth learning module, cloud-motion wind laboratory, global
      adaptive recognition practice, 22 passing tests, and monitoring for 21
      external sources and photograph provenance pages.
---

# Expand the cloud atlas into a professional encyclopedia

## Summary

Transform the version-one genus overview into a source-backed Polish cloud
encyclopedia. Preserve the low entry threshold while providing the taxonomic,
physical, observational, and aviation depth expected by serious learners.

## Context

Version one correctly represents the ten WMO cloud genera, but its primary
navigation exposes only ten records and compresses advanced classification
into short arrays. The revised atlas must treat genera as only the first layer
of a much larger knowledge system.

## Implementation Plan

1. Verify the complete WMO classification and supporting official references.
2. Introduce structured records for all classification term categories.
3. Expand every genus with formation, composition, weather, aviation,
   evolution, optical phenomena, look-alikes, and observation procedure.
4. Redesign atlas browsing around encyclopedia sections and cross-links.
5. Add full-text search and category/genus relationship filters.
6. Add cloud-motion wind interpretation and an adaptive recognition test.
7. Extend automated completeness and source-integrity tests.
8. Verify responsive behavior and publish the revised Pages release.
9. Monitor authoritative source and image-provenance links for dead pages.

## Acceptance Criteria

- [x] The atlas exposes all ten WMO genera and all official species.
- [x] Varieties, supplementary features, accessory clouds, mother-cloud
      notation, and special clouds are separately explained.
- [x] Every genus has a substantial professional reference profile.
- [x] Every classification term has a definition and compatible genera.
- [x] Search covers genera and the complete classification vocabulary.
- [x] Similar and disputed forms have explicit comparison guidance.
- [x] Each genus explains composition, formation mechanisms, and evolution.
- [x] A wind module teaches layer-specific cloud motion and its limitations.
- [x] A global image test always offers four plausible answers and adapts to
      the learner's errors.
- [x] Aviation significance is present without presenting the atlas as
      operational flight-planning advice.
- [x] Scientific and taxonomic claims expose primary or authoritative sources.
- [x] Mobile and desktop navigation remain practical with the larger corpus.
- [x] Automated tests, production build, and public Pages deployment pass.
- [x] A scheduled link monitor checks sources and photograph provenance pages.

## Design Decisions

### From Plan

1. **WMO remains canonical:** The International Cloud Atlas defines the
   taxonomy; other sources provide physical and operational explanation.
2. **Progressive disclosure:** Beginners can still browse visually, while
   expert material is available without changing to a separate product.
3. **Structured knowledge over long prose:** Relationships and compatibility
   rules must be queryable rather than embedded only in paragraphs.

### Emerged

4. **A 49-term index supplements the ten genus articles:** The formal corpus
   contains 15 species, 9 varieties, 11 supplementary features, 4 accessory
   clouds, 2 mother-cloud suffixes, 5 special-cloud classes, and 3 upper
   atmospheric cloud classes.
5. **Recognition practice is globally available:** A floating control opens
   the same adaptive exercise from every route instead of isolating testing at
   the end of the learning path.
6. **Distractors come from confusion sets:** Each question uses three visually
   plausible alternatives rather than arbitrary genera. Incorrect answers
   increase the future sampling weight of that genus.
7. **Wind inference is explicitly conditional:** The tool reverses simple
   cloud drift by 180 degrees, while teaching why lenticular clouds, virga,
   perspective, and convective propagation violate a naive reading.
8. **Search includes natural-language aliases:** Polish terms such as
   "soczewka", "wał", "turbulencja", and "chmura ścienna" lead to formal WMO
   entries without requiring prior Latin vocabulary.
9. **Source availability is tested:** A visible citation is not reliable when
   its destination is dead. Scheduled CI inspects status codes and common
   soft-404 page markers without coupling external availability to deployment.
10. **Source identity is verified as well as availability:** Each registered
    reference declares an expected content marker. This catches a successful
    redirect to an unrelated page, not only HTTP errors.

## Implementation Notes

- Added `src/data/encyclopedia.js` as the structured reference corpus.
- Added substantial physical, observational, weather, aviation, optical,
  evolution, differential-diagnosis, and field-protocol profiles for all ten
  genera.
- Added a browsable cross-linked term index and detailed term reader.
- Added a ninth learning module and interactive wind laboratory.
- Added global adaptive recognition practice backed by local-only statistics.
- Expanded automated coverage from 10 to 22 tests.
- Added a daily GitHub Actions link audit for 11 registered references and ten
  photograph provenance pages.

## Issues Encountered

- The initial upper-atmosphere source URL returned HTTP 404. Replaced it with
  the verified WMO `upper-atmospheric-clouds.html` page.
- Browser QA found that the natural query "soczewka" did not match the formal
  adjective "soczewkowaty". Added natural-language search aliases.
- Browser screenshot capture timed out; DOM, interaction, console, dimensions,
  and public-deployment visual checks remain the release evidence path.
- The FAA moved handbook pages from underscored path segments to compact
  `regulationspolicies/handbooksmanuals` paths. The previous citation rendered
  an official soft-404 page and was replaced with the verified 28B landing page.
- The former NOAA AWC help URL returned HTTP 404 and the former Windy discussion
  redirected to an unrelated premium-login topic. Replaced both references and
  added expected-content checks to detect semantically wrong redirects.

## Broken/Modified Tests

- Expanded content tests to enforce exact category counts and all 15 WMO
  species.
- Added reverse-link, source-integrity, profile-depth, recognition-method, and
  wind-direction tests. Existing expectations were not weakened.
- Added a daily external-link workflow covering the source registry and every
  photograph provenance page.

## Future Work

Automatic photograph recognition remains task 0002 and is outside this task.
