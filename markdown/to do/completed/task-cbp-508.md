# CBP-508 — Add `/effort` session-only `s` shortcut to the Cheat Sheet

## Summary
Claude Code v2.1.257 added `s` in `/effort` to change effort for the current session only, matching the existing `/model` picker's `s` shortcut.

## Assessment
`src/pages/practices.html` `#cheat-sheet` section, Cheat Sheet command table:
- The `/model` row (line 1880) already documents: "Press `s` in the picker to switch models for the current session only."
- The `/effort` row (line 1881) documents the interactive slider, per-model persistence (v2.1.251), and immediate-apply behavior on certain platforms (v2.1.243), but does not mention any session-only shortcut.

This is "update existing" — same table, same row, directly analogous feature to the already-documented `/model` behavior.

## Plan
1. In `src/pages/practices.html`, `#cheat-sheet` section, `/effort` row (line 1881), append a clause noting the new shortcut, e.g.:
   ```html
   As of v2.1.257, press <code>s</code> in the picker to change effort for the current session only, matching <code>/model</code>.
   ```
   Insert this after the existing "saves your default effort level per model" (v2.1.251) sentence, at the end of the cell.

## Acceptance Criteria
- [ ] `/effort` cheat-sheet row documents the `s` (session-only) shortcut with a v2.1.257 version marker.
- [ ] `python3 scripts/build-source.py` runs clean after the edit.
