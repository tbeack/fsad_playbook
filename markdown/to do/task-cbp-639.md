# CBP-639: Update `claude project purge` row — `claude purge` is now the primary name

## Summary

Claude Code v2.1.288 renamed `claude project purge` to `claude purge`. The old name still works and prints a notice. The row needs to show `claude purge` as primary, with a note that `claude project purge` is a backward-compatible alias.

## Assessment

One mention exists: `src/pages/practices.html` line 1999. The `<td>` currently reads `<code>claude project purge [path]</code>`.

No other mention of `project purge` appears in `src/pages/practices.html` (grep confirmed single hit at line 1999).

## Plan

1. In `src/pages/practices.html`, change the row's first `<td>` from:

   ```
   <td><code>claude project purge [path]</code></td>
   ```

   to:

   ```
   <td><code>claude purge [path]</code></td>
   ```

2. In the same row's second `<td>`, add a note at the end before `</td></tr>`:

   ```
    As of v2.1.288, <code>claude purge</code> is the primary name; <code>claude project purge</code> still works and prints a notice.
   ```

## Acceptance Criteria

- The row's first cell shows `claude purge [path]`.
- The description notes `claude project purge` still works.
- No other rows are changed.
