# CBP-779: Update `/tui` row — `/tui classic` alias (v2.1.327)

## Summary
Claude Code v2.1.327 added `/tui classic` as the name for the non-fullscreen renderer; `/tui default` still works.

## Assessment
`src/pages/practices.html` has a `/tui [fullscreen]` row (~line 1867) documenting the fullscreen toggle. This adds a named alias for the other side of that toggle.

## Plan
1. Open `src/pages/practices.html`.
2. In the `/tui` row (~line 1867), append a new sentence before the closing `</td></tr>`:
   ```
    As of v2.1.327, the non-fullscreen renderer can also be named explicitly: <code>/tui classic</code> is an alias for it, and <code>/tui default</code> still works too.
   ```
3. No other files require changes for this task.

## Acceptance Criteria
- The `/tui` row documents the v2.1.327 `classic`/`default` names.
- HTML is valid (no unclosed tags).
