# CBP-773: Claude now says when an MCP task is waiting on your answer, pointing to `/tasks` (v2.1.325)

## Summary
Claude Code v2.1.325 improved MCP tasks: Claude is now told when a task is waiting for your answer, and can point you to `/tasks`.

## Assessment
`src/pages/practices.html` has a `/tasks` row in the slash-commands table (~line 1846) that already carries version notes for v2.1.243 and v2.1.319 in the same running-sentence style. This is a direct fit for an appended sentence.

## Plan
1. Open `src/pages/practices.html`.
2. Append a sentence to the `/tasks` row (~line 1846), after the existing v2.1.319 sentence and before the closing `</td></tr>`:
   ```
    As of v2.1.325, Claude is told when an MCP task is waiting on your answer and can point you to <code>/tasks</code> to answer it.
   ```
3. No other files require changes for this task.

## Acceptance Criteria
- The `/tasks` row documents the v2.1.325 MCP-task-awaiting-input improvement.
- HTML is valid (no unclosed tags).
