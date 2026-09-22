# CBP-587: Add Claude Opus 5.5 to model table + update best/opus alias row (v2.1.280)

## Summary

v2.1.280 added Claude Opus 5.5 (`claude-opus-5-5`) as the new default Opus model. It has a 1M context window, $4/$20 per Mtok pricing (cheaper than Opus 5 at $10/$50), and $0.20/Mtok cache reads.

## Assessment

The model comparison table in `src/pages/practices.html` currently has columns: Fable 5.1, Opus 5, Opus 4.8, Opus 4.7, Sonnet 4.6, Haiku 4.5.

The `best`/`opus` alias row at line 1709 says:
"Claude Opus 5 (claude-opus-5) — now the default Opus model (v2.1.219). 1M context window; fast mode at $10/$50 per MTok."

Both must be updated to reflect Opus 5.5.

## Plan

1. In the `<thead>` of the model comparison table (around line 1680-1687), add a new `<th>` for Opus 5.5 immediately after the Fable 5.1 column and before Opus 5. Mark it with the "New" accent badge.

2. In each `<tbody>` row of the model table, add a corresponding `<td>` after the Fable 5.1 cell for Opus 5.5:
   - Positioning: "Next-gen Opus — 1M context; now default `opus` alias (v2.1.280)"
   - API ID: `claude-opus-5-5`
   - Input/Output: $4 / $20, $0.20/Mtok cache reads
   - Context window: 1M tokens
   - Max output: See docs
   - Adaptive thinking: Yes
   - Relative latency: See docs
   - Best for: Complex reasoning, architecture, gnarly bugs

3. Update Opus 5 column header: remove the "New" accent badge since Opus 5.5 is now the newer one.

4. Update Opus 5 Positioning row: "Previous default Opus — now superseded by Opus 5.5 (v2.1.280)"

5. Update the `best`/`opus` alias row (line 1709):
   Change: "Claude Opus 5 (claude-opus-5) — now the default Opus model (v2.1.219). 1M context window; fast mode at $10/$50 per MTok. Previously resolved to Opus 4.8."
   To: "Claude Opus 5.5 (claude-opus-5-5) — now the default Opus model (v2.1.280). 1M context window; $4/$20 per MTok, $0.20/Mtok cache reads. Previously resolved to Opus 5."

6. Add a timeline entry to the release timeline section for September 22, 2026:
   "September 22, 2026 — Claude Opus 5.5 released (claude-opus-5-5). Now the default opus alias target. 1M context; $4/$20 per MTok, $0.20/Mtok cache reads. Requires Claude Code v2.1.280+."

## Acceptance Criteria

- The model table has an Opus 5.5 column with accurate pricing and positioning.
- The `opus`/`best` alias row resolves to Opus 5.5.
- The timeline notes the Opus 5.5 release.
