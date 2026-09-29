# CBP-607 [Codex] Add `f` keyboard shortcut for forking conversations locked by another app (rust-v0.157.0)

## Summary

Codex rust-v0.157.0 adds an `f` shortcut in the TUI to fork a conversation that is currently locked/open in another app. This is distinct from `/fork` which clones a conversation to a new thread — the `f` shortcut specifically targets locked conversations and preserves drafts and queued prompts.

## Assessment

**Keyboard shortcuts table** (`src/pages/codex.html`, lines ~963–971):
The existing shortcuts are: Enter, Ctrl+C, Ctrl+L, Ctrl+G, Esc Esc, Tab/@, arrow keys, Alt+,, Alt+.. There is no `f` shortcut entry.

## Plan

1. Read `src/pages/codex.html` lines 963–980 to confirm the keyboard shortcuts table structure.
2. Add a new row to the keyboard shortcuts table (after the Alt+. row):
   ```html
   <tr><td><kbd>f</kbd></td><td>Fork a conversation that is locked by another app — preserves drafts and queued prompts (rust-v0.157.0)</td></tr>
   ```

## Acceptance Criteria

- Keyboard shortcuts table includes an `f` row with description of forking a locked conversation.
- No HTML is broken; the build succeeds.
