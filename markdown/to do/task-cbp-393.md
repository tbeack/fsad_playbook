# CBP-393 — `SendMessage` refuses oversized cross-session messages up front

## Source
Claude Code v2.1.235

## Summary
`SendMessage` now refuses messages too large for cross-session delivery up front instead of silently dropping them.

## Assessment
Update-existing. Power Usage → Agent Teams has a single `<li>` at line 11368 that tracks cross-session `SendMessage` version-by-version (v2.1.224, .225, .228, .232, .234). The v2.1.234 note already covers "fail loudly instead of silently" for `ListAgents`/`SendMessage` recipients, so this is the natural next sentence in the same bullet.

## Plan
1. Read line 11368 in full.
2. Append one sentence in the established `As of v2.1.235, …` form immediately before the trailing `Available on macOS and Linux.` sentence.

## Acceptance Criteria
- [ ] Line 11368 gains a v2.1.235 sentence about oversized messages being refused up front
- [ ] The sentence sits before `Available on macOS and Linux.`
- [ ] No other bullet duplicates the claim
