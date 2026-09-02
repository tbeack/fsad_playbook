# CBP-506 — Document Claude Fable 5.1 in the Model & Effort section

## Summary
Claude Code v2.1.257 added Claude Fable 5.1 (`claude-fable-5-1`), which is now the default Fable model. It carries 1M context, $10/$50 per Mtok, and $0.25/Mtok cache reads. The Model & Effort section (`#model-effort`) currently documents only Fable 5 (`claude-fable-5`) as the Mythos-class frontier model, with no pricing shown ("See docs").

## Assessment
`src/pages/practices.html` `#model-effort` section (lines 1658-1804) has:
- A "Current model lineup" table (lines 1666-1690) with a "Fable 5" column header (line 1671) and rows for Positioning, API ID, Input/Output pricing ("See docs"), Context window ("See docs"), Max output ("See docs"), Adaptive thinking, Relative latency ("See docs"), Best for.
- A "Claude Code model aliases" table (lines 1693-1706) with a `fable` alias row (line 1698) pointing to `claude-fable-5`.
- A "Key Dates" callout (lines 1768-1778) listing model release announcements, including a June 9, 2026 Fable 5 entry (line 1772).

None of these mention Fable 5.1 or its concrete pricing. This is a direct "update existing" — the section already covers this exact model family, it's simply out of date on the specific version and missing pricing that is now known.

## Plan
1. In the "Current model lineup" table header (line 1671), update `Fable 5` to `Fable 5.1` (keep the "New" badge).
2. In the same table's rows (lines 1680-1687), update the Fable 5.1 column:
   - Input/Output (per MTok): replace "See docs" with `$10 / $50 (cache reads $0.25/Mtok)`.
   - Context window: replace "See docs" with `1M tokens`.
   - Keep Positioning/API ID/Best for language, updating API ID cell (line 1681) from `claude-fable-5` to `claude-fable-5-1`.
3. In the "Claude Code model aliases" table, update the `fable` alias row (line 1698) to reference Claude Fable 5.1 (`claude-fable-5-1`) as the default Fable model, noting it supersedes Fable 5, while keeping the existing 1M-context-by-default / `fable[1m]` note.
4. Add a new "Key Dates" callout entry (near line 1771-1772, in reverse-chronological order alongside the existing Opus 5 / Fable 5 / Opus 4.8 entries) for the Fable 5.1 release: `<strong>September 1, 2026</strong> — <strong>Claude Fable 5.1 released</strong> (<code>claude-fable-5-1</code>). Now the default Fable model. 1M context; $10/$50 per MTok, $0.25/Mtok cache reads. Requires Claude Code v2.1.257+.`
5. Leave the "Best-practice combinations by workload" table and other model references (Opus 5, Opus 4.8, etc.) untouched — they are orthogonal to this change.

## Acceptance Criteria
- [ ] "Current model lineup" table's Fable column header and API ID reflect Fable 5.1 (`claude-fable-5-1`).
- [ ] Fable pricing and context window cells show concrete figures ($10/$50 per Mtok, $0.25/Mtok cache reads, 1M context) instead of "See docs".
- [ ] `fable` alias row in the model-aliases table documents Fable 5.1 as the current default, with a version marker (v2.1.257).
- [ ] A new Key Dates callout entry documents the Fable 5.1 release date and requirements.
- [ ] `python3 scripts/build-source.py` runs clean after the edit.
