# Design QA

## Comparison Target

- Source visual truth: `design/reference/atlas-swiatla-mobile.png`
- Live implementation: <https://jakiesluchawki.github.io/cloud-recognition/>
- Primary implementation screenshot: `design/qa/final-home-mobile.png`
- Desktop screenshot: `design/qa/final-home-desktop.png`
- Viewport: 390 x 844 CSS px at 2x capture density; desktop 1440 x 900
- State: fresh visitor, Polish, light theme, home route

## Evidence

- Full-view normalized comparison: `design/qa/comparison-mobile.png`
- Focused hero comparison: `design/qa/comparison-hero.png`
- Atlas mobile: `design/qa/final-atlas-mobile.png`
- Vertical-atmosphere lab mobile: `design/qa/final-layers-mobile.png`

The source is a tall concept board rather than a single 390 x 844 viewport.
The normalized comparison therefore evaluates the same opening composition,
typography, atmosphere, scale annotation, calls to action, and transition into
the paper learning surface. The focused comparison isolates the hero where
fidelity depends most strongly on crop, type, scale, and contrast.

## Findings

No actionable P0, P1, or P2 findings remain.

### Required Fidelity Surfaces

- **Fonts and typography:** Newsreader supplies the editorial display voice and
  Manrope supplies Polish-capable interface text. Heading scale, tight leading,
  small uppercase annotations, and readable 16 px mobile body text match the
  intended field-atlas hierarchy.
- **Spacing and layout rhythm:** The mobile hero, vertical scale, paired calls
  to action, paper sections, dividers, and fixed field navigation remain
  coherent at 390 px. Desktop expands into a wide study surface without
  stretching mobile cards.
- **Colors and visual tokens:** Ink, paper, blue, coral, and moss reproduce the
  approved direction. Coral and moss were darkened slightly to pass WCAG AA for
  small text; automated contrast tests protect those values.
- **Image quality and asset fidelity:** The hero is a dedicated generated
  decorative asset with the approved atmospheric composition. Identification
  surfaces use real licensed photographs, never placeholders or code-drawn
  substitutes. All production images load at their natural dimensions.
- **Copy and content:** The opening promise, placement actions, atlas, layers,
  and journal preserve the selected concept while making uncertainty, sources,
  and expert depth explicit.

## Patches Made

1. Moved the decorative-image credit above the fixed mobile navigation.
2. Shifted the mobile hero crop to keep white display text over darker sky.
3. Darkened coral and moss tokens to meet WCAG AA contrast.
4. Raised compact links, filters, and source controls to a 44 px touch target.
5. Added lazy decoding for atlas photographs.
6. Added responsive asset paths for the GitHub Pages base URL.

## Follow-up Polish

- P3: The implementation uses white hero typography over deep sky instead of
  the concept's ink typography over a bright cloud. This is an intentional
  adaptation to the generated hero composition and improves outdoor legibility.
- P3: The fixed five-item field navigation is not present in the source board.
  It is retained because the application has several working tools rather than
  a single promotional page.

## Verification

- 390 px page width equals scroll width; no accidental horizontal overflow.
- All visible mobile interactive targets are at least 44 x 44 px.
- Reduced-motion rules are present.
- Public browser console has no warnings or errors.
- Ten automated tests and the production build pass locally and in GitHub
  Actions.

final result: passed
