# CBP-628 — Add `instant_interrupt` opt-in setting to Notable config.toml Keys

## Summary
rust-v0.159.0 added an opt-in `instant_interrupt` setting. When enabled, new user input immediately steers Codex during model responses or long-running code-mode calls, without waiting for the current turn to finish.

## Assessment
The Notable config.toml Keys table is at `src/pages/codex.html` around lines 1061–1082. The last row before the closing `</tbody>` is `[otel]` (line 1079). The `instant_interrupt` setting should be inserted before `[otel]` or after `tui.auto_recap`, alongside other TUI-related settings.

## Plan
1. Read `src/pages/codex.html` around lines 1075–1083.
2. Insert a new `<tr>` after the `tui.auto_recap` row (line 1078) and before the `[otel]` row:

```html
          <tr><td><code>instant_interrupt</code></td><td>Opt-in: new user input immediately steers Codex during model responses or long-running code-mode calls instead of waiting for the current turn to complete (rust-v0.159.0)</td><td><code>false</code></td></tr>
```

3. Mark CBP-628 complete in `todo.md`.

## Acceptance Criteria
- The `instant_interrupt` row appears after `tui.auto_recap` and before `[otel]`.
- The row has three cells matching the table format: Key / Purpose / Default.
- No other rows are changed.
