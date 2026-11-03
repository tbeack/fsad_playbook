# CBP-740: Update `/schedule` row — warns on unexpected connectors (v2.1.317)

## Summary
Claude Code v2.1.317 added a warning to `/schedule` when a new cloud scheduled task gets connectors you did not ask for, with how to remove them.

## Assessment
`src/pages/practices.html`'s Cheat Sheet slash-commands table has a `/schedule` row (~line 1841) that currently just says "Create / manage cloud scheduled tasks" with no detail. Several other cheat-sheet rows in this table already carry versioned behavioral notes (e.g. `/code-review`, `/effort`), so this fits the established pattern. It's also directly relevant to how this very playbook-updater automation runs (as a cloud scheduled task), making it a notable safety detail for teams setting up their own scheduled tasks.

## Plan
1. Open `src/pages/practices.html`.
2. Replace the `/schedule` row:
   ```html
   <tr><td><code>/schedule</code></td><td>Create / manage cloud scheduled tasks</td></tr>
   ```
   with:
   ```html
   <tr><td><code>/schedule</code></td><td>Create / manage cloud scheduled tasks. As of v2.1.317, warns when a new scheduled task would get connectors you did not ask for, and tells you how to remove them before the task starts running unattended.</td></tr>
   ```
3. No other files require changes for this task.

## Acceptance Criteria
- The `/schedule` cheat-sheet row documents the new unexpected-connectors warning.
- HTML is valid (no unclosed tags).
