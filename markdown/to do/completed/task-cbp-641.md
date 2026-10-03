# CBP-641 — Update `claude project purge` → `claude purge` in cheat sheet

## Summary
Claude Code v2.1.288 renamed `claude project purge` to `claude purge`. The old name still works and prints a notice. The shorter form is now the canonical command.

## Assessment
The cheat sheet row at line 1999 in `src/pages/practices.html` shows `claude project purge [path]` in the `<code>` element. This needs to be updated to `claude purge [path]` with a note that the old name still works.

## Plan
1. Open `src/pages/practices.html`.
2. Locate line 1999 — the row with `<code>claude project purge [path]</code>`.
3. Replace the `<code>` text with `claude purge [path]` and append a note to the description:
   - Change `<code>claude project purge [path]</code>` to `<code>claude purge [path]</code>`
   - Append to the `<td>` description: ` As of v2.1.288, <code>claude project purge</code> is renamed to <code>claude purge</code>; the old name still works and prints a notice.`

## Acceptance Criteria
- The row now shows `claude purge [path]` as the primary command.
- The description notes the rename and that the old name still works.
- `python3 scripts/build-source.py` runs without error.
