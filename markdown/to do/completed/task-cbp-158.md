# CBP-158: [Codex] Add `codex remote-control` to Cheat Sheet CLI flags table

## Source
Codex CLI v0.130.0 — `codex remote-control` added as a simpler entrypoint for starting a headless, remotely controllable app-server.

## Summary
Add a new row for `codex remote-control` to the CLI Flags table in the Codex Cheat Sheet section (`#codex-cheat-sheet`). The command was added in v0.130.0 as a simpler alternative to configuring the full app-server stack.

## Assessment
- The CLI flags table currently ends with `codex update` (line ~9101)
- `codex remote-control` is not present anywhere in the Codex sections
- New row needed

## Plan
1. Locate the `codex update` row in the CLI Flags table (`#codex-cheat-sheet`)
2. Add a new row immediately after it for `codex remote-control`

## Acceptance Criteria
- `codex remote-control` appears as a row in the Codex Cheat Sheet CLI Flags table
- Description explains it starts a headless remotely controllable app-server
