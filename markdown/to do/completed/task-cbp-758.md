# CBP-758: [Claude] Add Claude Fable 5.2 to the model catalog (v2.1.321)

## Summary
Claude Code v2.1.321 added Claude Fable 5.2 (`claude-fable-5-2`), now the default Fable model — 1M context, $8/$40 per MTok with $0.20/Mtok cache reads, superseding Fable 5.1. Sessions with a saved Fable 5.1 pick move to `fable` automatically (on Pro and Max plans at once, on Team and Enterprise plans once the organization allows it); `/model claude-fable-5-1` switches back.

## Assessment
`src/pages/practices.html` has a "Current model lineup" table (~line 1596-1614) and a "Claude Code model aliases" table (~line 1619-1633) that both carry a Fable 5.1 column/row, a Key Dates callout (~line 1706-1720) listing model release dates, and an `ultrathink` code comment (~line 1664) naming Fable 5.1.

## Plan
1. Open `src/pages/practices.html`.
2. In the model lineup table header, rename the Fable column `Fable 5.1` → `Fable 5.2` (keep the "New" badge).
3. Update the Fable column's Positioning, API ID, and Input/Output cells to Fable 5.2 (`claude-fable-5-2`, $8/$40, $0.20/Mtok cache reads), noting it supersedes Fable 5.1 (v2.1.321).
4. Update the Opus 5.5 column's "Best for" cell reference from "Fable 5.1" to "Fable 5.2".
5. Update the `fable` alias row to describe Fable 5.2 as the default, note the v2.1.321 auto-move of saved Fable 5.1 picks, and the `/model claude-fable-5-1` opt-out.
6. Update the `ultrathink` comment line naming "Fable 5.1" → "Fable 5.2".
7. Add a new Key Dates bullet: "November 10, 2026 — Claude Fable 5.2 released... Requires Claude Code v2.1.321+", placed before the October 30, 2026 entry (most-recent-first order).

## Acceptance Criteria
- The model lineup and alias tables describe Fable 5.2 as the current default Fable model, with correct pricing.
- The Key Dates callout lists the Fable 5.2 release.
- HTML is valid (no unclosed tags).
