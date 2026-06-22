# CBP-249: Update fable model alias — 1M context included by default, [1m] suffix stripped

## Summary
Claude Code v2.1.173 fixed Fable 5 model names with a `[1m]` suffix not being normalized. Fable 5 includes 1M context by default, so the `[1m]` suffix is now stripped automatically. Users don't need (and shouldn't use) `fable[1m]` — `fable` alone gives 1M context.

## Assessment
The model aliases table (line 9617) has a `fable` row:
`<tr><td><code>fable</code></td><td>Claude Fable 5 (<code>claude-fable-5</code>) — Mythos-class frontier model (v2.1.170+)</td><td>Highest-stakes reasoning, frontier capability tasks</td></tr>`

The description should note that Fable 5 includes 1M context by default (no `[1m]` suffix needed).

The code block around line 9635 shows `opus[1m]` as an example variant. The existing text implies `[1m]` suffixes work for opus/sonnet, but for fable the suffix is redundant. A note should be added to the `fable` row.

**Location:** Line 9617 — the `fable` model alias row.

## Plan
1. Update the `fable` row description to append: "Includes 1M context by default — `fable[1m]` suffix is redundant and stripped automatically (v2.1.173)."

## Acceptance Criteria
- The `fable` model alias row notes that 1M context is included by default.
- Existing row format is preserved.
