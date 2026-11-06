# CBP-746 — Update `Ctrl+L` keyboard shortcut row (rust-v0.167.0)

## Summary
In Codex rust-v0.167.0, `Ctrl+L` behavior changed. It now clears the terminal display while keeping earlier messages accessible through `Ctrl+T`. The old description ("Clear screen") is incomplete and no longer accurate.

## Assessment
The existing row is at `src/pages/codex.html` line 967:
```html
<tr><td><kbd>Ctrl+L</kbd></td><td>Clear screen</td></tr>
```
This needs to be updated to reflect the new behavior and document the companion `Ctrl+T` shortcut.

There is no existing `Ctrl+T` row in the keyboard shortcuts table — it should be added after `Ctrl+L`.

## Plan
1. Open `src/pages/codex.html`.
2. Replace the `Ctrl+L` row (line 967) with updated text and add a new `Ctrl+T` row immediately after it.

New content:
```html
<tr><td><kbd>Ctrl+L</kbd></td><td>Clear terminal display (earlier messages stay accessible via <kbd>Ctrl+T</kbd>) (rust-v0.167.0)</td></tr>
<tr><td><kbd>Ctrl+T</kbd></td><td>Restore messages cleared by <kbd>Ctrl+L</kbd> (rust-v0.167.0)</td></tr>
```

## Acceptance Criteria
- The `Ctrl+L` row describes clearing terminal display, not just "Clear screen".
- A new `Ctrl+T` row appears below it.
- Both rows reference rust-v0.167.0.
- No other rows are affected.
