# CBP-805: Update `/doctor` row — API connectivity section (v2.1.331)

## Summary
Claude Code v2.1.331 added an API connectivity section to `claude doctor` that reports whether the API can be reached, with the HTTP status or the error, or says why it wasn't tested.

## Assessment
`src/pages/practices.html`'s `/doctor` cheat-sheet row (~line 1873) already tracks several diagnostics additions (v2.1.206, v2.1.205, v2.1.282, v2.1.283) but not this one.

## Plan
1. Open `src/pages/practices.html`.
2. Append to the `/doctor` row, after the v2.1.283 `prompt-audit` sentence:
   ```
   As of v2.1.331, /doctor also includes an API connectivity section reporting whether the API can be reached — the HTTP status or error, or why it wasn't tested.
   ```
3. No other files require changes for this task.

## Acceptance Criteria
- The `/doctor` row documents the v2.1.331 API connectivity section.
- HTML is valid (no unclosed tags).

## Status
Implemented.
