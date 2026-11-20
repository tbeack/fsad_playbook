# CBP-789: Update `/schedule` row — "Exit and stop tasks" + rescheduling-on-sign-in note (v2.1.329)

## Summary
Claude Code v2.1.329 changed "Exit and stop tasks" to end the session's scheduled tasks so they don't run again on resume, unless you exit while Claude is still responding. It also changed saved scheduled tasks so that, in new signed-in sessions, most tasks saved by earlier versions need to be scheduled again — though `--resume` of their own session still runs them.

## Assessment
`src/pages/practices.html`'s cheat-sheet `/schedule` row (~line 1844) documents warnings and skill-approval behavior for scheduled tasks but not this exit/resume lifecycle detail — a real gotcha for anyone relying on scheduled tasks surviving a sign-out or new session.

## Plan
1. Open `src/pages/practices.html`.
2. In the `/schedule` row, append after the existing v2.1.325 sentence:
   ```
    As of v2.1.329, "Exit and stop tasks" ends the session's scheduled tasks so they don't run again on resume, unless you exit while Claude is still responding; most scheduled tasks saved by earlier versions need to be scheduled again in a new signed-in session, though <code>--resume</code> of their own session still runs them.
   ```
3. No other files require changes for this task.

## Acceptance Criteria
- The `/schedule` row documents the v2.1.329 "Exit and stop tasks" change and the rescheduling note.
- HTML is valid (no unclosed tags).

## Status
Implemented.
