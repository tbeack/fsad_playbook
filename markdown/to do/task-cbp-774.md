# CBP-774: Code Mode now works with agent teams enabled (v2.1.326)

## Summary
Claude Code v2.1.326 added support for turning on Code Mode while agent teams are enabled. If a user had already turned Code Mode on, sessions with teams enabled now start in Code Mode automatically.

## Assessment
`src/pages/practices.html` already has a dedicated "Code Mode" collapsible (added for v2.1.323, see CBP-763, ~line 2454-2467) whose intro paragraph describes Code Mode as opt-in. This v2.1.326 change is a direct update to that same paragraph — the previous text didn't address team compatibility, and now agent-teams sessions can start in Code Mode automatically.

## Plan
1. Open `src/pages/practices.html`.
2. In the Code Mode collapsible's intro `<p>` (~line 2461, ends "...applied to Claude's own ordinary tool use.</p>"), append a new sentence before the closing `</p>`:
   ```
    As of v2.1.326, Code Mode can also be turned on while agent teams are enabled; if you had already turned it on, sessions that start with teams on now begin in Code Mode automatically.
   ```
3. No other files require changes for this task.

## Acceptance Criteria
- The Code Mode collapsible documents the v2.1.326 agent-teams compatibility change.
- HTML is valid (no unclosed tags).
