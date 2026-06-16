# Design QA

## Comparison Target

- Source visual truth: `design/reference/atlas-swiatla-mobile.png`
- Lesson implementation route:
  `http://127.0.0.1:5174/cloud-recognition/#/learn/lotnictwo`
- Field implementation route:
  `http://127.0.0.1:5174/cloud-recognition/#/atlas/observer`
- Mobile viewport: 390 x 844 CSS px at 2x device scale
- Desktop viewport: 1440 x 1000 CSS px
- States: full lesson progression, active recall, global recognition test,
  field evidence collection, ranked hypotheses, and differential comparison

## Evidence

- Full-view comparison:
  `design/qa/current/learning-mobile-comparison.png`
- Mobile lesson opening:
  `design/qa/current/lesson-mobile-top.png`
- Focused mobile chapter:
  `design/qa/current/lesson-mobile-chapter.png`
- Focused active-recall answer:
  `design/qa/current/lesson-mobile-recall.png`
- Longest expert chapter title:
  `design/qa/current/lesson-mobile-ekspert.png`
- Mobile final check:
  `design/qa/current/lesson-mobile-final-check.png`
- Mobile global test:
  `design/qa/current/lesson-mobile-global-test.png`
- Desktop opening:
  `design/qa/current/lesson-desktop-top.png`
- Desktop active recall:
  `design/qa/current/lesson-desktop-recall.png`
- Mobile field start:
  `design/qa/current/field-observer-mobile-start.png`
- Mobile field result:
  `design/qa/current/field-observer-mobile-result.png`
- Mobile leading hypothesis:
  `design/qa/current/field-observer-mobile-hypothesis.png`
- Desktop field start:
  `design/qa/current/field-observer-desktop-start.png`
- Desktop field result:
  `design/qa/current/field-observer-desktop-result.png`
- Mobile METAR practice:
  `design/qa/current/metar-mobile-practice.png`
- Mobile TAF before an answer:
  `design/qa/current/metar-mobile-taf-concealed.png`
- Mobile TAF committed answer:
  `design/qa/current/metar-mobile-taf-revealed.png`
- Mobile TAF debrief:
  `design/qa/current/metar-mobile-taf-debrief.png`
- Desktop METAR workshop:
  `design/qa/current/metar-desktop-workshop.png`
- Desktop wind laboratory:
  `design/qa/current/wind-desktop-lab.png`
- Mobile full-atlas name search after selecting a level:
  `design/qa/current/atlas-search-all-levels-mobile.png`

The source visual and lesson are different product states, so the full-view
comparison evaluates design language rather than identical composition.
All nine lesson routes were also swept at 390 px. Each reported a 390 px
document width, one visible chapter, 16 px body copy, six mobile navigation
actions, and no prematurely visible recap, final check, or practice.

## Findings And Patches

1. **P1 fixed — The mobile lesson was an eight-thousand-pixel document**
   - Before: all seven chapters appeared in one continuous page.
   - Patch: mobile now presents one chapter at a time, with previous/next
     navigation, progress, and a locally remembered resume position.
   - Evidence: one visible chapter and an active-stage height of about
     3205 CSS px instead of 8024 CSS px.

2. **P1 fixed — The chapter index consumed almost a full mobile viewport**
   - Before: seven full-width rows delayed the lesson content.
   - Patch: the index is a horizontal, snapping rail with the active chapter
     visible after selection and after a resumed session.

3. **P2 fixed — Mobile lesson prose fell below the 16 px product rule**
   - Before: chapter paragraphs rendered at about 14 px.
   - Patch: lesson body copy is 16 px at mobile and desktop widths.

4. **P2 fixed — The floating recognition action obscured lesson content**
   - Before: a fixed coral button covered paragraphs and final-check content.
   - Patch: mobile exposes `Test` as the sixth persistent bottom-navigation
     action. Desktop retains the labeled floating action.

5. **P2 fixed — Reading was still too passive**
   - Patch: every one of the 52 chapters now ends with a concealed
     active-recall answer. The lesson audit includes those prompts and answers
     in its duration calculation.

6. **P1 fixed — Mobile hypothesis cards expanded to about 972 px**
   - Before: an inherited minimum height combined with the mobile aspect ratio
     forced each result card far beyond the 390 px viewport.
   - Patch: the mobile hypothesis grid now uses a zero-minimum track, cards
     explicitly shrink to the container, and images reset the inherited
     minimum height.
   - Evidence: all three result cards render at 350 px inside a 390 px
     document with no horizontal overflow.

7. **P2 fixed — The field method delayed the first observation**
   - Before: the introductory panel occupied about 582 px before the question
     began.
   - Patch: mobile spacing and type were tightened without removing the three
     observation principles or source access. The panel is now about 454 px,
     and the first question appears in the opening viewport.

8. **P2 fixed — Keyboard progress lost its reading position**
   - Before: advancing removed the focused button and left focus on the page
     body.
   - Patch: each transition moves focus to the new question heading; the final
     transition moves focus to the result heading. Lettered choices remain
     native buttons with visible focus and pressed state.

9. **P2 fixed — Deep convection suggested a weaker alternative**
   - Before: a strongly developing, glaciating tower ranked Stratocumulus
     above Cumulus as the second hypothesis.
   - Patch: contradictory tower and glaciation evidence now penalizes
     Stratocumulus and Altocumulus. The result ranks Cumulonimbus, Cumulus,
     then Stratocumulus and exposes the dedicated discriminator.

10. **P1 fixed — TAF displayed the decoded timeline before the question**
    - Before: the three timeline cards gave away the period labels and weather
      groups before the learner committed an interpretation.
    - Patch: the learner now sees the raw TAF, an instruction, and the
      four-choice question. The full timeline is inserted into the feedback
      only after an answer.

11. **P2 fixed — Answering could return keyboard focus to the page body**
    - Patch: immediate feedback receives programmatic focus, `Tab` reaches the
      next-question action, and that action focuses the next question heading.
    - Verified for both METAR and TAF flows with keyboard input.

12. **P2 fixed — The countdown announced every second**
    - Before: `aria-live="polite"` could produce repetitive screen-reader
      announcements throughout the 30-second briefing.
    - Patch: the visual countdown uses `role="timer"` and an updated accessible
      label; timeout feedback remains announced.

13. **P1 fixed — Active decode explained tokens without teaching the report grammar**
    - Before: a beginner could reveal one selected group but had no persistent
      map of the full METAR order or the codes absent from that report.
    - Patch: active decode now opens with four reading phases, a ten-section
      glossary, multiple code variants, interpretation traps, and an always
      discoverable CAVOK explanation.
    - Evidence: `metar-anatomy-mobile-top.png`,
      `metar-anatomy-mobile-cavok.png`, and
      `metar-anatomy-desktop.png`. At 390 px the document width remains
      390 px, body copy is 16 px, mode controls are 50 px high, and all ten
      glossary sections remain reachable.

14. **P1 fixed — The atlas search was technically present but easy to miss**
    - Before: a thin underlined field appeared after the statistics and read
      like a minor filter.
    - Patch: the first atlas tool is now a dedicated editorial search surface
      explaining that names, WMO codes, morphology, and diagnostic evidence
      are searchable. Exact names and codes rank before descriptive matches;
      Polish diacritics are optional.
    - Evidence: `atlas-search-mobile.png` and
      `atlas-search-mobile-result.png`. The query `kowadlo` returns only
      Cumulonimbus, the field is 62 px high, and document width remains 390 px.

15. **P1 fixed — Aviation practice had no continuity between sessions**
    - Patch: two three-station briefings require cross-report synthesis, while
      every METAR, TAF, and briefing answer feeds a transparent local review
      schedule.
    - Evidence: `aviation-briefing-mobile.png`,
      `aviation-review-mobile.png`, `aviation-review-mobile-ledger.png`, and
      `aviation-review-desktop.png`. Mobile renders three reports and four
      choices without overflow. Feedback receives focus, the completed session
      heading receives focus after the final item, and the two-step reset
      removes the local storage record and returns the tracked count to zero.

16. **P1 fixed — Atlas search inherited a browse filter**
    - Before: selecting `średnie` and then searching for `nimb` hid valid
      results outside that level and displayed an empty state.
    - Patch: every non-empty query searches all ten genera, resets the visible
      level to `wszystkie`, and pauses the level controls until the query is
      cleared. Direct fragments of formal names take precedence over broad
      descriptive and taxonomy matches.
    - Evidence: `atlas-search-all-levels-mobile.png`. At 390 px the exact
      regression sequence returns only Nimbostratus and Cumulonimbus, reports
      two results in the full atlas, and keeps document width at 390 px.

## Required Fidelity Surfaces

- **Typography:** Newsreader and Manrope remain consistent with Atlas Światła.
  Display hierarchy is editorial; chapter and body copy wrap without clipping.
  Lesson prose is 16 px.
- **Spacing and layout:** warm-paper sections use dividers and whitespace
  instead of generic card stacks. Mobile rails, sticky progress, chapter
  navigation, recap, and checks have stable spacing at 390 px.
- **Colors and tokens:** ink, paper, coral, mist, moss, and white use the
  existing project tokens. Active, correct, wrong, and source states remain
  distinguishable.
- **Image quality:** the lesson itself does not need an identification image.
  The global test uses the existing licensed atlas photographs without
  placeholders or code-drawn substitutes.
- **Copy and content:** all copy is Polish, source-backed, and explicit about
  operational limits. Time labels now name reading plus recall, examples,
  practice, and assessment.
- **Interactions and accessibility:** chapter controls have 44 px targets,
  active state and progress are visible, resume state survives reload, recall
  answers expose `aria-expanded`, the global test opens from mobile
  navigation, dialogs retain focus trapping and Escape handling, and the field
  assistant preserves keyboard focus across all five evidence steps. METAR/TAF
  feedback and next-question transitions preserve the same keyboard context.
  The METAR glossary uses native buttons, pressed states, and a horizontally
  scrollable mobile index without introducing page-level overflow.
  Atlas search uses a native search input with a 44 px clear action and live
  result count. Aviation review retains native answer buttons, feedback focus,
  completion focus, disclosure semantics, and an explicit destructive-action
  confirmation.

## Residual Risk

- The six-item bottom navigation is intentionally compact at 390 px. It passes
  the target viewport; widths below the product target were not used as a
  release criterion.
- The comparison evaluates shared visual language because the source mock is a
  home screen, not a lesson screen.
- The field result summary is intentionally horizontally scrollable on mobile
  so all five answers remain revisable without shrinking them into illegible
  columns.
- TAF debrief cards are deliberately detailed and may extend beyond one mobile
  viewport after an answer; they no longer delay the question itself.

## Final Result

final result: passed
