# CBP-790: Update `/tasks` row — scheduled tasks, `/loop` wakeups, goal, and forks now listed (v2.1.329)

## Summary
Claude Code v2.1.329 added this session's scheduled tasks, `/loop` wakeups, the active `/goal`, and this conversation's forks to `/tasks`; pressing `x` on one stops it after asking for confirmation.

## Assessment
`src/pages/practices.html`'s cheat-sheet `/tasks` row (~line 1846) documents the subagent model/effort display, "Earlier in this session" row, and MCP-task-waiting notice, but not this broadened scope of what `/tasks` now lists.

## Plan
1. Open `src/pages/practices.html`.
2. In the `/tasks` row, append after the existing v2.1.325 sentence:
   ```
    As of v2.1.329, <code>/tasks</code> also lists this session's scheduled tasks, <code>/loop</code> wakeups, the active <code>/goal</code>, and this conversation's forks; pressing <kbd>x</kbd> on one stops it after asking for confirmation.
   ```
3. No other files require changes for this task.

## Acceptance Criteria
- The `/tasks` row documents the v2.1.329 broadened listing (scheduled tasks, `/loop` wakeups, goal, forks) and the `x`-to-stop confirmation.
- HTML is valid (no unclosed tags).

## Status
Implemented.
