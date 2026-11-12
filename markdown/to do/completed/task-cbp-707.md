# CBP-707 — `/usage` improvements: per-source warnings with `f` key

## Summary
Claude Code v2.1.305 improved `/usage`. Each inline warning is now a one-line fix that names its source. Press `f` at the `/usage` screen to apply all listed fixes at once. The same fixes also appear in VS Code and `/doctor`.

## Assessment
The `/usage` row in `src/pages/practices.html` is at line 1800. It already documents the v2.1.299 inline warnings. Add a trailing sentence noting the v2.1.305 per-source formatting and `f` shortcut.

## Plan
1. Open `src/pages/practices.html`.
2. Find the `/usage` cheat sheet row (line 1800). The row ends with: `...inline warnings when you approach or reach limits for max effort, workflows, always-on context, and large tool results.</td></tr>`
3. Replace the closing `.</td></tr>` with the new sentence before closing the cell.

**Text to append (before `</td></tr>` at the end of the v2.1.299 sentence):**
` As of v2.1.305, each warning is a one-line fix that names its source; press <kbd>f</kbd> at the <code>/usage</code> screen to apply all fixes at once. The same fixes appear in VS Code and <code>/doctor</code>.`

## Acceptance Criteria
- The `/usage` row ends with the v2.1.305 sentence about `f` and `/doctor`.
- The `<kbd>f</kbd>` element renders correctly in the table cell.
- The playbook builds without error.
