# CBP-159 — Update `/model` Cheat Sheet row: current-session-only behavior (v2.1.144)

**Status:** done

## What changed
Claude Code v2.1.144 changed `/model` behavior. Previously, model selection persisted across restarts. Now `/model` changes the model for the current session only. To set a default for new sessions, press `d` in the model picker.

## Change made
Rewrote the `/model` Cheat Sheet row to:
- Remove the outdated "Selection persists across restarts" language
- State "for the current session only"
- Document the `d` key for setting a default for new sessions
