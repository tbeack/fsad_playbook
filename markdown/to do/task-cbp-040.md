# CBP-040: Add `/tui` command to Cheat Sheet

## Summary
Claude Code v2.1.110 added a `/tui` command and a `tui` setting. Running `/tui fullscreen` switches the session to fullscreen TUI mode with flicker-free rendering without starting a new conversation.

## Assessment
The `/tui` command does not appear anywhere in `fsad-playbook.html`. It belongs in the "Configuration & setup" slash commands table in the Cheat Sheet section (~line 4783–4803), alongside similar display/UI commands like `/theme` and `/color`.

## Plan
1. Read the configuration & setup slash commands table (lines ~4783–4803)
2. Add a new row for `/tui` after `/theme` or near the display-related entries:
   ```html
   <tr><td><code>/tui</code> <code>[fullscreen]</code></td><td>Switch to fullscreen TUI mode with flicker-free rendering (<code>/tui fullscreen</code>)</td></tr>
   ```
3. Place it after the `/theme` row (line 4791) since it's a display/rendering setting

## Acceptance Criteria
- `/tui` appears in the Cheat Sheet "Configuration & setup" table
- Description accurately reflects the fullscreen/flicker-free rendering behavior
- No duplicate entries; no existing rows displaced
