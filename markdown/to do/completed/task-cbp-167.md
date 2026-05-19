# CBP-167: Update `/model` Cheat Sheet row — current-session-only behavior (v2.1.144)

## Summary
Claude Code v2.1.144 changed `/model` behavior: it now changes the model for the current session only. Press `d` in the model picker to set a default for new sessions.

## Assessment
The `/model` row at line 6245 says "Selection persists across restarts" — this is now outdated. The new behavior is session-scoped; `d` sets the default for future sessions.

## Plan
1. Read line 6245 context in `fsad-playbook.html`.
2. Replace the "persists across restarts" phrasing with the new session-scoped behavior. Keep the gateway discovery note.

**Current start of description (line 6245):**
`Select or change AI model. Selection persists across restarts, overriding project-pinned models. Startup header shows when the active model comes from a project or managed-settings pin.`

**New description start:**
`Select or change AI model for the current session only. Press <code>d</code> in the picker to set a default for new sessions. Startup header shows when the active model comes from a project or managed-settings pin.`

## Acceptance Criteria
- `/model` row reflects that the change is session-scoped
- `d` key to set default for new sessions is documented
- Gateway discovery note is preserved
