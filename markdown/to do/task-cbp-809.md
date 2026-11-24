# CBP-809: [Codex] Add Tab-complete for slash command arguments (rust-v0.172.0)

## Summary
Codex rust-v0.172.0 added slash command completion: press Tab to complete arguments for supported slash commands, e.g. `/mcp lo` → `/mcp login`.

## Assessment
`src/pages/codex.html`'s Keyboard Shortcuts table (~line 967-981) already has a `Tab` / `@` row for the unified context picker, but nothing about Tab completing slash-command arguments — a separate, newly added behavior.

## Plan
1. Open `src/pages/codex.html`.
2. Add a new row to the Keyboard Shortcuts table body, after the "Undo / Redo (composer)" row:
   ```html
   <tr><td><kbd>Tab</kbd></td><td>Complete arguments for supported slash commands, e.g. <code>/mcp lo</code> → <code>/mcp login</code> (rust-v0.172.0)</td></tr>
   ```
3. No other files require changes for this task.

## Acceptance Criteria
- The Keyboard Shortcuts table documents Tab-completion for slash command arguments.
- HTML is valid (no unclosed tags).

## Status
Implemented.
