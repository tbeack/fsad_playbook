# CBP-671 — [Codex] Update `/copy` to mention block navigation and `Ctrl+Insert` (rust-v0.162.0)

## Summary
Codex CLI rust-v0.162.0 added transcript block navigation via `/copy`, `Ctrl+Insert` to copy selections, and `tui.mouse_scroll_speed` to tune mouse-wheel scrolling.

## Assessment
The `/copy` row in codex.html (line 1020) already covers the picker introduced in rust-v0.150.0 and the formatting preservation from rust-v0.154.0. The rust-v0.162.0 additions (block navigation, `Ctrl+Insert`, scroll speed) need to be appended.

## Plan
1. Read `src/pages/codex.html` line 1020 to confirm exact text.
2. Append to the `<td>` content: "As of rust-v0.162.0, navigate transcript blocks within the picker and use <kbd>Ctrl+Insert</kbd> to copy selections. Tune mouse-wheel scroll speed with the <code>tui.mouse_scroll_speed</code> config option."

## Acceptance Criteria
- `Ctrl+Insert` appears in the `/copy` row.
- `tui.mouse_scroll_speed` is mentioned.
- The version attribution `rust-v0.162.0` is included.
