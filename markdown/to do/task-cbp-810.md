# CBP-810: [Codex] Command center task-group navigation (rust-v0.172.0)

## Summary
Codex rust-v0.172.0 added Shift+Up / Shift+Down shortcuts in the agent command center to jump between task groups.

## Assessment
`src/pages/codex.html`'s Interactive dashboard paragraph (Multi-Agent section, ~line 1167) already tracks the command center's evolution (rust-v0.149.0 base, rust-v0.155.0 hide/archive/delete, rust-v0.167.0 `--no-daemon` + unread markers, rust-v0.169.0 search) but not this navigation shortcut.

## Plan
1. Open `src/pages/codex.html`.
2. Append to the Interactive dashboard paragraph, after the rust-v0.169.0 sentence:
   ```
   As of rust-v0.172.0, press Shift+Up / Shift+Down to jump between task groups in the command center.
   ```
3. No other files require changes for this task.

## Acceptance Criteria
- The Interactive dashboard paragraph documents the Shift+Up/Down task-group navigation.
- HTML is valid (no unclosed tags).

## Status
Implemented.
