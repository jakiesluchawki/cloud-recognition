---
id: "0009"
title: "Unify search across the complete cloud atlas"
type: FEATURE
status: active
related_adr: []
related_tasks: ["0003", "0007"]
tags: ["priority-high", "atlas", "search", "taxonomy", "mobile"]
links:
  - "https://cloudatlas.wmo.int/"
history:
  - date: "2026-06-16"
    status: active
    who: codex
    note: >
      Created after a product audit found that the primary atlas search
      promised the full classification but returned only the ten genera.
---

# Unify search across the complete cloud atlas

## Summary

Turn the primary atlas search into one entry point for both the ten cloud
genera and all 49 structured WMO taxonomy terms. Teach the classification
level in the results instead of requiring learners to discover and search a
separate index.

## Context

The encyclopedia corpus is complete enough for this change: every taxonomy
term already has a definition, diagnostic guidance, compatible genera, and
source IDs. The current primary search only converts term matches into genus
cards, while the separate index has its own less capable search. Search
results also appear below overview statistics and browse filters, delaying the
answer on mobile.

## Implementation Plan

1. Add a ranked, diacritic-insensitive taxonomy search helper.
2. Use the same helper in the primary atlas and the 49-term index.
3. Present genus and WMO-term results as separate, clearly explained groups.
4. Move active results directly below the search field and hide browse-only
   statistics and level filters while a query is active.
5. Preserve direct term-to-genus and genus-to-term navigation.
6. Add regression tests for formal names, Polish aliases, diagnostic phrases,
   category filters, and the existing full-level search behavior.
7. Verify keyboard behavior, 390 px layout, desktop hierarchy, production
   assets, and the public Pages release.

## Acceptance Criteria

- [x] The primary search returns matching genera and matching WMO terms.
- [x] Results explicitly distinguish a genus from a species, variety,
      supplementary feature, accessory cloud, origin suffix, special cloud,
      or upper-atmosphere class.
- [x] `kowadło` returns Cumulonimbus and the `incus` term.
- [x] `soczewka` returns `lenticularis` and its compatible genera.
- [x] `nimb` still returns only Nimbostratus and Cumulonimbus as genera.
- [x] Active search results appear before overview statistics and browse
      filters on mobile and desktop.
- [x] Clearing a query restores the complete browse interface.
- [x] The 49-term index uses the same normalized ranking behavior.
- [ ] Automated tests, lesson audit, link audit, production build, and public
      mobile verification pass.

## Design Decisions

### From Plan

1. **One search, two result types:** Genus monographs and formal taxonomy
   entries remain distinct records and are presented in separate groups.
2. **Classification level is instructional content:** Each term result names
   its WMO category and explains that the entry qualifies a cloud rather than
   silently presenting every result as another cloud genus.
3. **Search mode replaces browse scaffolding:** Statistics and level filters
   are useful before a query; once a query exists, immediate results take
   priority.

### Emerged

4. **Direct taxonomy matches outrank prose mentions:** Formal names, Polish
   names, and natural aliases rank before definitions and diagnostics. A term
   search therefore stays useful without reducing the corpus to exact labels.
5. **Genus queries do not flood the primary results:** `Cumulonimbus` and
   `Cb` lead to the genus monograph only. The specialist index retains an
   explicit compatibility mode that returns all terms allowed for that genus.
6. **Short ambiguous fragments do not search all prose:** Explanatory-text
   matching requires a phrase or at least six characters. This prevents
   fragments such as `nimb` from matching every definition that happens to
   mention Nimbostratus or Cumulonimbus.
7. **Empty compatibility has category-specific copy:** Special-cloud and
   upper-atmosphere terms explain their place in classification rather than
   incorrectly sharing one generic "outside the genera" message.
8. **Search mode hides browse scaffolding:** The statistics and height chips
   disappear while a query is active. Clearing the field restores both and
   leaves the browse level at `wszystkie`.

## Broken/Modified Tests

- Added pure taxonomy-search coverage for formal labels, diacritic-insensitive
  aliases, diagnostic phrases, category filters, special clouds, upper
  atmosphere abbreviations, and compatibility mode.
- Extended the existing `nimb` regression to remain authoritative for genus
  results.
- Updated foundation checks for the two result groups, shared search helper,
  and service worker cache `v11`.
- Total automated tests increased from 46 to 47; no existing assertion was
  weakened.

## Implementation Notes

- Added `searchTaxonomyTerms` beside the existing genus search, sharing the
  same normalization and token rules.
- Included taxonomy `searchTerms` in genus evidence so natural clues such as
  `soczewka` resolve both the formal term and compatible genera.
- Added singular Polish category labels for individual result cards and
  dialogs.
- Replaced the active-search browse layout with an editorial results reader:
  WMO terms first, genus monographs second, and a classification explanation
  before both groups.
- Added natural aliases for fire-generated clouds, PSC, and NLC.
- The separate 49-term index now uses the same ranked engine while preserving
  its ability to find all terms compatible with a genus code.
- Verified a query matrix at 390 px: `kowadło`, `soczewka`, `nimb`, `Cb`,
  `Cumulonimbus`, `pożar`, `NLC`, and a no-result string. Every state remained
  exactly 390 px wide and produced no runtime errors.
- Verified the term dialog focus trap, Escape close, and focus restoration to
  the invoking result card.

## Issues Encountered

- **Lazy images in full-page screenshots:** Below-fold genus photographs were
  initially blank because native lazy loading had not intersected them. The QA
  pass scrolled through the document before capture; runtime behavior itself
  was correct.
- **Primary and specialist intent differ:** Reusing one unqualified term
  search would either hide useful index relationships or flood the primary
  search. The helper therefore exposes compatibility mode explicitly.
- **Special classes have no compatible genus array:** Their result footer now
  explains source-based or upper-atmosphere classification instead of treating
  missing genera as missing data.

## Future Work

No follow-up is required within this scope. Automatic photograph recognition
remains separately parked in task 0002.
