# CBP-475 — Cross-session peer messages collapse to a one-line preview

## Summary
Claude Code v2.1.247 changed cross-session peer messages to collapse by default to a one-line `Message from @<sender>: <first line>` preview; Ctrl+O expands the full body.

## Assessment
This directly extends the existing Agent Teams "Cross-session `SendMessage`" bullet (`src/pages/practices.html` ~line 2262), which already tracks the version-by-version evolution of cross-session messaging (v2.1.224 through v2.1.239). Append rather than create a new bullet, matching the existing "As of vX.X.X, ..." running-list style.

## Plan
1. In `src/pages/practices.html`, locate the Cross-session `SendMessage` bullet (~line 2262).
2. Append a new sentence at the end of the bullet, before the closing `</li>`:
   ```html
    As of v2.1.247, cross-session peer messages collapse by default to a one-line <code>Message from @&lt;sender&gt;: &lt;first line&gt;</code> preview; press <kbd>Ctrl+O</kbd> to expand the full body.
   ```

## Acceptance Criteria
- [x] v2.1.247 collapse/expand behavior documented at the end of the existing Cross-session `SendMessage` bullet.
