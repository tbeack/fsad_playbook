# CBP-515 — Update `/diff` Cheat Sheet Row with Fullscreen Live Diff Panel

## Source
Claude Code v2.1.260

## Summary
v2.1.260 adds a diff panel that opens beside the conversation in fullscreen mode and shows uncommitted changes live as Claude edits. It is toggled with `/diff`.

## Assessment
`src/pages/practices.html` line 1876 has a `/diff` row describing the interactive diff viewer (v2.1.149). It does not mention the fullscreen side panel. Update existing.

## Plan
1. Read `src/pages/practices.html` line 1876.
2. Append to the `/diff` description: "As of v2.1.260, in fullscreen mode `/diff` toggles a diff panel beside the conversation that shows your uncommitted changes live as Claude edits."

## Acceptance Criteria
- `/diff` row mentions the fullscreen side panel and live updates
- Version attribution v2.1.260 included
- HTML is valid
