# CBP-224 — Update `/effort` Cheat Sheet row: confirms when level will persist as new-session default (v2.1.162)

## Summary

Claude Code v2.1.162 changed `/effort` to display a confirmation when the selected effort level will persist as the default for new sessions. Previously no feedback was given about persistence. This is useful context for users to understand when a `/effort` choice affects the current session only vs. future sessions.

## Assessment

**Does this content exist in the playbook?**
The `/effort` section exists throughout the playbook (Cheat Sheet, Effort Levels section, model comparison). The current Cheat Sheet slash command table shows `/effort` in the configuration table. The effort levels section (around line 3465–3470) notes that effort persists for the session but does not mention the new confirmation behavior about new-session default persistence.

**What needs to change:**
Find the `/effort` row in the Cheat Sheet configuration table and append a note that the command now confirms when the chosen level will persist as the default for new sessions.

## Plan

1. Search for the `/effort` row in the Cheat Sheet configuration table.
2. Locate the row with the `/effort` slash command description.
3. Append a note: confirms when the chosen level will persist as the default for new sessions (v2.1.162).
4. Mark task complete in `todo.md`.

## Acceptance Criteria

- The `/effort` Cheat Sheet row mentions the confirmation of new-session default persistence.
- The effort levels guide text is not modified (it's a separate section).
- HTML is valid.
