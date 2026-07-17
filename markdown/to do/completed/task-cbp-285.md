# CBP-285 — Add `CLAUDE_CODE_DISABLE_MOUSE_CLICKS` to hardening env vars table

## Summary
Claude Code v2.1.195 added the `CLAUDE_CODE_DISABLE_MOUSE_CLICKS` environment variable. When set, it disables mouse click, drag, and hover events in fullscreen mode while preserving mouse-wheel scroll. This is useful for users who want scroll-only mouse interaction — e.g., in terminals where accidental clicks disrupt the interface — without giving up the wheel.

## Assessment
The env var is not yet mentioned in the playbook. The hardening env vars table is in the Subprocess Sandboxing collapsible section (`#power-usage--sandbox`), which ends at line 10728 (the last `<tr>` before the closing `</tbody>`). The immediately preceding row (CBP-284) added `CLAUDE_CODE_DISABLE_BG_SHELL_PRESSURE_REAP=1` at line 10727.

**Action:** New row — add after line 10727 in the hardening env vars tbody.

## Plan
1. Read `fsad-playbook.html` lines 10725–10730 to confirm current last row.
2. Insert a new `<tr>` after line 10727:
   ```html
   <tr><td><code>CLAUDE_CODE_DISABLE_MOUSE_CLICKS=1</code></td><td>Disables mouse click, drag, and hover events in fullscreen mode while preserving mouse-wheel scroll. Useful in terminals where accidental clicks disrupt the interface — set this to get scroll-only mouse interaction in fullscreen TUI sessions (v2.1.195).</td></tr>
   ```
3. Mark task complete in `todo.md`.

## Acceptance Criteria
- The env var row appears in the hardening env vars table inside the Subprocess Sandboxing section.
- Wording clearly distinguishes: disables clicks/drag/hover but preserves wheel scroll.
- Version tag `(v2.1.195)` appears at end of description.
- No other rows disturbed.
