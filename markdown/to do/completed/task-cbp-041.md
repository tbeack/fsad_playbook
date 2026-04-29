# CBP-041: Add `/focus` command and update `Ctrl+O` description

## Summary
Claude Code v2.1.110 split the transcript/focus toggle into two separate controls:
- `Ctrl+O` — now toggles between normal and verbose transcript only
- `/focus` — new command to toggle focus view (previously part of `Ctrl+O`)

## Assessment
Two places in the playbook need updating:

1. **Keyboard shortcuts table** (~line 4709): `Ctrl+O` row says "Toggle transcript viewer" — needs update to "Toggle normal / verbose transcript"
2. **Slash commands — Model, mode & usage table** (~line 4751–4765): `/focus` command needs a new row
3. **Power Usage — Session Logs collapsible** (~line 5242): bullet says "Press `Ctrl+O` to open the transcript viewer mid-session" — needs update to reflect split behavior

The `/focus` command fits best in the "Model, mode & usage" section (alongside `/plan`, `/fast`, etc.) since it's a display mode toggle.

## Plan
1. Update `Ctrl+O` keyboard shortcut row:
   - Old: `Toggle transcript viewer`
   - New: `Toggle normal / verbose transcript`
2. Add `/focus` to the "Model, mode & usage" slash commands table after `/plan`:
   ```html
   <tr><td><code>/focus</code></td><td>Toggle focus view (hides system status lines for a cleaner reading experience)</td></tr>
   ```
3. Update the Session Logs bullet (~line 5242):
   - Old: `Press <kbd>Ctrl+O</kbd> to open the transcript viewer mid-session`
   - New: `Press <kbd>Ctrl+O</kbd> to toggle normal / verbose transcript; use <code>/focus</code> to toggle focus view`

## Acceptance Criteria
- `Ctrl+O` description in keyboard shortcuts table is accurate
- `/focus` command appears in the "Model, mode & usage" slash commands table
- Session Logs Power Usage bullet reflects the split behavior
