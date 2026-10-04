# CBP-617 [Codex] Add `f` keyboard shortcut for forking conversations locked by another app (rust-v0.157.0)

## Summary

Codex rust-v0.157.0 adds an `f` shortcut in the TUI to fork a conversation that is currently locked/open in another app. This is distinct from `/fork` which clones a conversation to a new thread — the `f` shortcut specifically targets locked conversations and preserves drafts and queued prompts.

## Assessment

**Keyboard shortcuts table** — no `f` shortcut entry existed. Added a new row.

## Plan

1. Add a new row to the keyboard shortcuts table (after the Shift-click row): `<tr><td><kbd>f</kbd></td><td>Fork a conversation that is currently locked/open in another app — preserves drafts and queued prompts (rust-v0.157.0)</td></tr>`

## Acceptance Criteria

- Keyboard shortcuts table includes an `f` row with a description of forking a locked conversation.
- No HTML is broken; the build succeeds.
