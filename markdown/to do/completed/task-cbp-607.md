# CBP-607: Add Claude Sonnet 5.5 to model comparison table + update `sonnet` alias row (v2.1.284)

## Summary

v2.1.284 added Claude Sonnet 5.5 (`claude-sonnet-5-5`), now the default Sonnet model on the Anthropic API — 1M context, $2/$10 per Mtok, $0.20/Mtok cache reads.

## Assessment

- `src/pages/practices.html`'s "Current model lineup" table (~line 1680) has a column per model tier, including a `Sonnet 4.6` column. The same table gained an Opus 5.5 column in CBP-587 following the same "new model supersedes previous default" pattern — add a `Sonnet 5.5` column the same way, placed before `Sonnet 4.6`, and mark the `Sonnet 4.6` column as superseded (mirroring how the `Opus 5` column's Positioning/Best for cells were updated when Opus 5.5 was added).
- The `sonnet` alias row in the "Claude Code model aliases" table (~line 1715) currently reads "Claude Sonnet 5 — now the default Claude Code model (v2.1.197)..." — update it to name Sonnet 5.5 as the new default Sonnet model on the Anthropic API, mirroring the `best`/`opus` alias row's phrasing (~line 1714).

## Plan

1. In `src/pages/practices.html`, in the "Current model lineup" table header row (~line 1683-1692), insert a new `<th>Sonnet 5.5 <span ...>New</span></th>` column between the `Opus 4.7` and `Sonnet 4.6` columns (same "New" badge markup used for the Fable 5.1 / Opus 5.5 headers).
2. Add a matching `<td>` cell to every row in the table body (~line 1695-1702: Positioning, API ID, Input/Output, Context window, Max output, Adaptive thinking, Relative latency, Best for), in the same column position:
   - Positioning: "New default Sonnet model on the Anthropic API — 1M context (v2.1.284)"
   - API ID: `<code>claude-sonnet-5-5</code>`
   - Input/Output: "$2 / $10, $0.20/Mtok cache reads"
   - Context window: "1M tokens"
   - Max output: "See docs"
   - Adaptive thinking: "Yes"
   - Relative latency: "See docs"
   - Best for: "80%+ of day-to-day coding, tests, tool use"
3. Update the existing `Sonnet 4.6` column's Positioning cell from "Balanced daily driver" to "Previous default Sonnet on the API — superseded by Sonnet 5.5 (v2.1.284)", and its Best for cell to "80%+ of day-to-day coding, tests, tool use — when Sonnet 5.5 is unavailable" (mirroring the `Opus 5` column's CBP-587 update).
4. Update the `sonnet` alias row (~line 1715) from:
   `Claude Sonnet 5 — now the default Claude Code model (v2.1.197). Native 1M-token context window; promotional pricing $2/$10 per MTok through August 31, 2026. (4.5 on Bedrock / Vertex / Foundry)`
   to:
   `Claude Sonnet 5.5 (`<code>claude-sonnet-5-5</code>`) — now the default Sonnet model on the Anthropic API (v2.1.284). 1M context window; $2/$10 per MTok, $0.20/Mtok cache reads. Previously resolved to Sonnet 5. (4.5 on Bedrock / Vertex / Foundry)`

## Acceptance Criteria

- The Current model lineup table has a `Sonnet 5.5` "New" column with the pricing/context data above, positioned before `Sonnet 4.6`.
- The `Sonnet 4.6` column's Positioning/Best for cells note it is superseded by Sonnet 5.5 on the API.
- The `sonnet` alias row names Sonnet 5.5 as the new default, version-tagged v2.1.284, and keeps the Bedrock/Vertex/Foundry note.
