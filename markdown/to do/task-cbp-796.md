# CBP-796: [Codex] Add non-Vim composer undo/redo keyboard shortcut (rust-v0.171.0)

## Summary
Codex rust-v0.171.0 added undo and redo in the composer with configurable shortcuts for the non-Vim prompt composer, including restoring attachments and large pastes.

## Assessment
`src/pages/codex.html`'s keyboard shortcuts table already documents Vim-mode undo/redo (`u` / `Ctrl+R`, rust-v0.153.0) in the Vim Mode section, but the main shortcuts table (~line 980) has no row for the new non-Vim composer undo/redo.

## Plan
1. Open `src/pages/codex.html`.
2. In the main keyboard shortcuts table, add a new row after the "Image attach" row:
   ```
   <tr><td>Undo / Redo (composer)</td><td>Undo and redo changes in the non-Vim prompt composer, including restoring attachments and large pastes; shortcuts are configurable via <code>/keymap</code> (rust-v0.171.0)</td></tr>
   ```
3. No other files require changes for this task.

## Acceptance Criteria
- The keyboard shortcuts table includes a row for non-Vim composer undo/redo (rust-v0.171.0).
- HTML is valid (no unclosed tags).

## Status
Implemented.
