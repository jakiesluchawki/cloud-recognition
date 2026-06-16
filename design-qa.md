# Design QA

## Comparison Target

- Source visual truth: `design/reference/atlas-swiatla-mobile.png`
- Supporting production references:
  `design/qa/final-atlas-mobile.png` and `design/qa/final-home-desktop.png`
- Implementation target:
  `http://127.0.0.1:5174/cloud-recognition/#/atlas/compare`
- Implementation screenshot: unavailable
- Intended viewports: 390 x 844 CSS px and 1440 x 900 CSS px
- State: comparison laboratory, Cirrocumulus versus Altocumulus

## Full-View Comparison Evidence

Blocked. The Codex in-app browser has no available browser surface in this
session, so a current implementation screenshot cannot be captured and placed
beside the visual source.

## Focused Region Comparison Evidence

Blocked for the same reason. The critical regions are the preset rail, cloud
selector, selected-cloud header strip, and one comparison dimension at 390 px.

## Findings

- **P1 — Current comparison screen cannot receive screenshot-based visual QA**
  - Location: `#/atlas/compare`, mobile and desktop.
  - Evidence: source visual and prior atlas screenshots are available, but no
    current rendered screenshot can be captured from the required browser.
  - Impact: typography, horizontal-scroll affordance, crop quality, spacing,
    and real 390 px overflow remain unproven.
  - Fix: capture the comparison route in the Codex browser at both intended
    viewports, inspect the saved files, create normalized comparison images,
    and patch every P0/P1/P2 difference.

## Static Review

- Fonts and typography reuse the established Newsreader and Manrope system.
- Spacing and layout reuse the atlas dividers, paper surfaces, blue method
  panels, coral actions, and square editorial cards.
- Colors use existing project tokens only.
- Image quality uses the same licensed genus photographs as the atlas; no
  placeholder or code-drawn cloud imagery was introduced.
- Copy remains Polish, evidence-led, and explicit about uncertainty.
- Native buttons, global focus-visible treatment, `aria-pressed`, disabled
  selection limits, and horizontal scroll snapping are implemented.

## Patches Made Since Previous QA

1. Added responsive two-to-three-column comparison structures.
2. Added mobile horizontal rails with scroll snapping instead of compressing
   three expert columns below legibility.
3. Added direct comparison routes from monographs, observer results, and hard
   cases.
4. Removed the final dead responsive selector from the former binary key.

final result: blocked

## Learning Curriculum Target

- User evidence: live desktop screenshots of `#/learn` and the former
  `Chmury w METAR i TAF` module supplied on 16 June 2026.
- Implementation target:
  `http://127.0.0.1:5174/cloud-recognition/#/learn/lotnictwo`
- Intended viewports: 390 x 844 CSS px and 1440 x 900 CSS px.
- Current implementation screenshot: unavailable.

### Evidence-Led Finding

- **P0 — Lesson duration was materially misleading**
  - The former 26-minute aviation lesson displayed only three short definition
    rows and one generic 90-second observation exercise.
  - The visible content could be read in seconds and did not teach TAF time
    groups, vertical visibility, AGL/MSL conversion, worked decoding, or
    product limitations.
  - This was a product-content failure, not a cosmetic discrepancy.

### Patches

1. Replaced all nine summary modules with sourced, multi-chapter lessons.
2. Added explicit time allocation for reading and notes, examples, practice,
   and assessment.
3. Added a words-per-minute quality gate so reading time cannot be inflated.
4. Added a compact chapter index and stable direct lesson routes.
5. Added module-specific practices, completion conditions, and four-choice
   checks.
6. Added adaptive genus mastery and pair-specific recognition feedback.
7. Added focus trapping, Escape handling, and focus restoration for dialogs.

### Current Limit

The Codex in-app browser still has no available browser surface. A direct
Brave headless capture also failed to produce an image, so current 390 px and
desktop screenshots cannot honestly be claimed as verified. Static responsive
review, build output, content tests, and keyboard implementation are available;
rendered visual QA remains pending.
