# CBP-638: Add `--max-findings` flag to `/code-review` cheat sheet row

## Summary

Claude Code v2.1.288 added `--max-findings <n>|all` to `/code-review`. Pass a number to report more or fewer findings than the usual limit. Pass `all` to report every finding. Pass `--max-findings default` to reset to the standard limit. The choice persists across invocations until you reset it.

## Assessment

The `/code-review` row exists at `src/pages/practices.html` line 1996. It documents `--comment`, `--fix`, effort levels, and aliases, but does not mention `--max-findings`.

No other location in the playbook covers this flag.

## Plan

1. Read `src/pages/practices.html` lines 1994–1998 to confirm the current row text.
2. Append a sentence to the end of the `<td>` cell for `/code-review`:

   ```
   As of v2.1.288, pass <code>--max-findings &lt;n&gt;|all</code> to report more or fewer findings than the default limit; pass <code>--max-findings default</code> to reset. The choice is reused until you reset it.
   ```

3. The sentence goes after the existing "As of v2.1.274" sentence, before the closing `</td></tr>`.

## Acceptance Criteria

- The `/code-review` row in the cheat sheet mentions `--max-findings <n>|all` and `--max-findings default`.
- The sentence is inside the existing `<td>` cell, not a new row.
- No other row is changed.
