---
id: "0011"
title: "Build a multi-image cloud recognition bank"
type: FEATURE
status: active
related_adr: []
related_tasks: ["0003", "0005", "0009"]
tags: ["priority-high", "recognition", "photography", "methodology", "licensing", "mobile"]
links:
  - "https://commons.wikimedia.org/wiki/Category:Clouds_by_type"
  - "https://cloudatlas.wmo.int/en/identifying-clouds.html"
history:
  - date: "2026-06-16"
    status: active
    who: codex
    note: >
      Created after a quality audit found that the adaptive recognition test
      reused one photograph per genus, allowing image memorization to masquerade
      as transferable cloud recognition.
  - date: "2026-06-16"
    status: active
    who: codex
    note: >
      Implemented the local feature: 30 licensed photographs, 51 passing tests,
      nine passing lesson audits, 46 verified external links, production build,
      and Brave QA at desktop and mobile widths. Public Pages verification
      remains before completion.
---

# Build a multi-image cloud recognition bank

## Summary

Replace the one-photograph-per-genus recognition test with a curated,
multi-frame bank. Every genus must appear in materially different light,
framing, scale, or developmental state while retaining complete source,
author, and license metadata.

## Context

The current test has good distractor groups and adaptive genus weighting, but
the visual stimulus is deterministic. After repeated practice, a learner can
associate one familiar JPEG with a label without learning the defining
structure. The atlas and monographs may keep one editorial lead image, while
assessment must sample a broader image bank.

## Implementation Plan

1. Curate at least three verified photographs for each of the ten genera.
2. Store each image as a separate record with author, license, source page,
   note, and diagnostic emphasis.
3. Keep one designated lead image for atlas cards and monographs.
4. Make recognition questions select an image independently from the genus
   choice and avoid the immediately previous frame.
5. Reveal image provenance and diagnostic emphasis only after an answer.
6. Expand link monitoring to every image source page.
7. Validate corpus coverage, deterministic selection boundaries, mobile
   layout, keyboard behavior, offline assets, and public Pages deployment.

## Acceptance Criteria

- [x] Every genus has at least three curated photographs.
- [x] Every photograph has an author, license, source page, note, and
      diagnostic emphasis.
- [x] Recognition questions identify both a genus and one specific image.
- [x] Repeated questions can vary the image without weakening adaptive genus
      weighting or plausible distractors.
- [x] The photograph's source and license remain concealed before answering
      and visible afterward.
- [x] Atlas cards and monographs retain a stable lead photograph.
- [x] Link monitoring checks every photograph page, not only one per genus.
- [x] Synthetic images are not used as identification evidence.
- [ ] Automated tests, image audit, link audit, production build, mobile QA,
      desktop QA, and public Pages verification pass.

## Design Decisions

### From Plan

1. **Real photographs are assessment evidence:** Generative images may support
   visual identity, but they are excluded from recognition training because
   model artifacts can become unintended cues.
2. **Genus and frame are separate sampling decisions:** Existing adaptive
   weighting remains genus-based; the image selector adds visual variation.
3. **Provenance appears after commitment:** Hiding metadata before an answer
   prevents filenames, authors, or notes from leaking the correct class.
4. **The lead image remains stable:** Editorial atlas layout should not change
   unpredictably between visits.

### Emerged

5. **Remember the last frame per genus:** Avoidance is stored separately for
   every genus, so returning to Cirrus after other questions still selects a
   different photograph.
6. **Precache the complete recognition bank:** Thirty optimized local files
   total about 9 MB, small enough to make the visual assessment genuinely
   available offline instead of caching only images already visited.
7. **Keep mixed-cloud frames with explicit caveats:** Real skies often contain
   more than one genus. Selected mixed frames remain in the bank when the
   dominant target is clear, and their notes explicitly identify the secondary
   cloud rather than pretending the image is taxonomically pure.

## Broken/Modified Tests

- Replaced single-image assertions with multi-image corpus validation,
  globally unique IDs, complete metadata, and local-file existence checks.
- Added image-selection tests for variation, deterministic random boundaries,
  and immediate-repeat avoidance.
- Updated the scheduled-link-monitor assertion from `cloud.image.page` to all
  `cloud.images[].page` records.
- Extended foundation checks for post-answer provenance and offline cache
  version 13.

## Implementation Notes

- Expanded `src/data/clouds.js` from one image to three images per genus while
  preserving the first item as the atlas and monograph lead.
- Added 20 new Wikimedia Commons photographs, producing 30 local JPEGs with
  dimensions between 1066 and 1600 pixels on the long edge.
- Added independent image selection to recognition questions without changing
  adaptive genus weighting or the existing confusion-based distractors.
- Added a post-answer evidence card with a frame-specific diagnostic cue,
  contextual caveat, author, license, and direct Commons page.
- Extended the external monitor from 26 to 46 destinations and precached all
  recognition photographs in `cloud-recognition-v13`.

## Issues Encountered

- **Wikimedia rate limiting:** A burst of original-file downloads returned HTTP
  429. Switched to Wikimedia's prepared 960 px derivatives, kept source-page
  attribution, and downloaded at a slower rate before local JPEG optimization.
- **Single-image monitor assertion:** One foundation test intentionally encoded
  the previous `cloud.image.page` schema. Updated it to require traversal of
  every image page.
- **In-app browser unavailable:** Visual QA used a clean automated Brave
  session, matching the user's browser, at 1440 x 1000 and 390 x 844.

## Verification

- 51 automated tests pass.
- All nine learning modules pass the quality audit.
- All 46 source and photograph pages return valid content.
- Production build succeeds; JavaScript is `index-9U_4INtE.js` and CSS is
  `index-ifpXQZ81.css`.
- Brave desktop and mobile QA show no runtime errors or horizontal overflow.
- Provenance is absent before commitment, visible after an answer, and its
  source link resolves to the matching Commons page.
- Mobile feedback, provenance, sources, and next-question action remain
  reachable inside the scrolling dialog.

## Future Work

No follow-up is required within this scope. Automatic recognition from an
uploaded photograph remains separately parked in backlog task 0002.
