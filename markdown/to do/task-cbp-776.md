# CBP-776: `Ctrl+O` now also shows hidden startup notices (v2.1.326)

## Summary
Claude Code v2.1.326 added `Ctrl+O` as a way to show hidden startup notices.

## Assessment
`src/pages/practices.html`'s keyboard shortcuts table has a `Ctrl+O` row (~line 1774) currently documenting only "Toggle normal / verbose transcript". This is a direct extension of that same key's documented behavior.

## Plan
1. Open `src/pages/practices.html`.
2. Update the `Ctrl+O` row (~line 1774) from:
   ```html
   <tr><td><kbd>Ctrl+O</kbd></td><td>Toggle normal / verbose transcript</td></tr>
   ```
   to:
   ```html
   <tr><td><kbd>Ctrl+O</kbd></td><td>Toggle normal / verbose transcript. As of v2.1.326, also shows hidden startup notices.</td></tr>
   ```
3. No other files require changes for this task.

## Acceptance Criteria
- The `Ctrl+O` row documents the v2.1.326 hidden-startup-notices behavior.
- HTML is valid (no unclosed tags).
