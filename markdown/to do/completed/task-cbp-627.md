# CBP-627 — Add `k` keyboard shortcut for keeping warnings in the warnings viewer

## Summary
rust-v0.159.0 added a `k` keyboard shortcut in the warnings viewer: when you press `k`, the current warning is kept for later review and is not dismissed when the viewer closes. Other warnings are dismissed when the viewer closes.

## Assessment
The Keyboard Shortcuts table is at `src/pages/codex.html` around line 957–975. The last row is the `f` shortcut (fork a conversation locked by another app, added rust-v0.157.0) at line 973. The `k` shortcut belongs after the `f` row.

## Plan
1. Read `src/pages/codex.html` around lines 972–975.
2. Add a new `<tr>` row after the `f` shortcut row:

```html
          <tr><td><kbd>k</kbd></td><td>Keep a warning for later review in the warnings viewer — prevents the warning from being dismissed when the viewer closes (rust-v0.159.0)</td></tr>
```

3. Mark CBP-627 complete in `todo.md`.

## Acceptance Criteria
- The `k` shortcut row appears after the `f` row and before `</tbody>`.
- The `<kbd>k</kbd>` tag matches the styling of other single-key shortcuts.
- No other content is changed.
