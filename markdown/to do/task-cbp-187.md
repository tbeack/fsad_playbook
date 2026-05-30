# CBP-187 — Update `/model` Cheat Sheet row to v2.1.153 behavior

## Summary
Claude Code v2.1.153 reversed the `/model` behavior: it now **saves your selection as the default for new sessions** (the old behavior, re-enabled). To switch models for the current session only, press `s` in the picker (was `d`). The keybinding `modelPicker:setAsDefault` was renamed to `modelPicker:thisSessionOnly`.

This is a reversal of CBP-167 (v2.1.144) which documented that `/model` changes current-session-only with `d` for default.

## Assessment
Line 6404 in `fsad-playbook.html`:
```
<tr><td><code>/model</code></td><td>Select or change AI model for the current session only. Press <code>d</code> in the picker to set a default for new sessions. Startup header...</td></tr>
```
This is now stale. The description incorrectly says "current session only" and "press `d` to set default". The correct behavior is: `/model` sets the default for new sessions. Press `s` to switch for current session only.

## Plan
1. Edit line 6404 — change description from "current session only. Press `d` in the picker to set a default for new sessions" to "Select or change AI model — selection is saved as the default for new sessions. Press `s` in the picker to switch models for the current session only."
2. Keep the gateway model discovery and managed-settings pin content intact.

## Acceptance Criteria
- `/model` row no longer says "current session only" or "press `d`"
- Row correctly documents that `/model` sets the default, `s` is for session-only
- All other text in the row is preserved
