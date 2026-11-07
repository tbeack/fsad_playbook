# CBP-757: Update `/tasks` row — "Earlier in this session" row for finished subagents (v2.1.319)

## Summary
Claude Code v2.1.319 added an "Earlier in this session" row to `/tasks` that lists finished subagents, so you can reopen one and message it even after it leaves the list or you restart.

## Assessment
`src/pages/practices.html` has a cheat-sheet row for `/tasks` (~line 1843) that already notes an earlier version-specific addition (model/effort display on each subagent's row, v2.1.243). The same row is the right place to append this new capability.

## Plan
1. Open `src/pages/practices.html`.
2. In the `/tasks` cheat-sheet row (~line 1843), append after the existing v2.1.243 sentence:
   ```html
   As of v2.1.319, an "Earlier in this session" row lists finished subagents, so you can reopen one and message it even after it leaves the main list or you restart.
   ```
3. No other files require changes for this task.

## Acceptance Criteria
- The `/tasks` cheat-sheet row documents the v2.1.319 "Earlier in this session" addition.
- HTML is valid (no unclosed tags).
