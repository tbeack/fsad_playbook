# CBP-640: Update `claude agents` row — Ctrl+F, Alt+↑/↓, best-match Enter, rebindable

## Summary

Claude Code v2.1.288 added to the agents view:
- Ctrl+F to find a session by name (same as typing `n:<text>`)
- Alt+↑/↓ to jump between groups
- Both shortcuts (and rename) can be rebound in `keybindings.json`
- Enter now opens the session whose name matches best, not just the top row

The existing row (added in v2.1.287) says "Enter opens the first result" — this is now wrong.

## Assessment

The `claude agents` row is at `src/pages/practices.html` line 1998. It ends with:

```
As of v2.1.287, type <code>n:&lt;text&gt;</code> in the agents view to filter sessions by name or task — collapsed sections show matches, and Enter opens the first result.
```

This sentence needs two changes:
1. "Enter opens the first result" → "Enter opens the session whose name matches best"
2. After the existing sentence, add a new sentence noting Ctrl+F, Alt+↑/↓, and rebound shortcuts.

## Plan

1. In `src/pages/practices.html`, find the end of the `claude agents` row's `<td>` cell near line 1998.
2. Change the v2.1.287 sentence's ending from:

   ```
   and Enter opens the first result.
   ```

   to:

   ```
   and Enter opens the session whose name matches best.
   ```

3. Add after that sentence (before `</td></tr>`):

   ```
    As of v2.1.288, press <kbd>Ctrl+F</kbd> to open the same name-search without typing <code>n:</code>, and <kbd>Alt+↑</kbd>/<kbd>Alt+↓</kbd> to jump between groups; both shortcuts and the rename action can be rebound in <code>keybindings.json</code>.
   ```

## Acceptance Criteria

- "Enter opens the first result" is gone; "matches best" is present.
- The row mentions Ctrl+F and Alt+↑/↓.
- The row notes that both shortcuts and rename are rebindable.
- No other rows are changed.
