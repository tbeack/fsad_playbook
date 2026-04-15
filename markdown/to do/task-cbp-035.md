# CBP-035 — Fix `/undo` — consolidate as alias for `/rewind` in Cheat Sheet

## Summary
As of Claude Code v2.1.108, `/undo` is an alias for `/rewind`. The playbook currently shows them as two separate entries:
- Line 4470: `/undo` — "Undo last action"
- Line 4471: `/rewind` — "Rewind to previous checkpoint (alias: `/checkpoint`)"

This is inaccurate. The fix is to remove the standalone `/undo` row and update `/rewind` to list both `/undo` and `/checkpoint` as aliases.

## Assessment
- **Existing coverage**: Both lines exist but incorrectly describe `/undo` as an independent command.
- **Target location**: Lines 4470–4471.

## Plan

1. Read `fsad-playbook.html` lines 4464–4477 to confirm surrounding context.
2. Remove the `/undo` standalone row (line 4470).
3. Update the `/rewind` row to:
   ```html
   <tr><td><code>/rewind</code></td><td>Rewind to previous checkpoint (aliases: <code>/undo</code>, <code>/checkpoint</code>)</td></tr>
   ```
4. Mark task complete in todo.md.

## Acceptance Criteria
- Only one row covers `/rewind`/`/undo`/`/checkpoint`.
- The `/rewind` row lists both `/undo` and `/checkpoint` as aliases.
- No separate `/undo` row exists in the table.
