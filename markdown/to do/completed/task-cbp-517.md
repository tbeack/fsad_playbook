# CBP-517 — Add `/advisor` Cheat Sheet Row and Headless `/reload-plugins` Note

## Source
Claude Code v2.1.260

## Summary
v2.1.260 adds a text form of `/advisor` (`/advisor`, `/advisor <model>`, `/advisor off`) so the advisor model can be set from the desktop app, Remote Control and other headless (`-p` / Agent SDK) sessions. It also makes `/reload-plugins` available in headless sessions so it appears in the Claude Code Desktop and SDK command lists.

## Assessment
The Cheat Sheet slash-command tables in `src/pages/practices.html` have no `/advisor` row — the command is only mentioned in passing in the `/add-dir` row (line 1871). New row needed in the Model & Mode group (after `/model`, line 1887). The `/reload-plugins` row (line 1940) says only "Reload plugins without restart" — update existing.

## Plan
1. Read lines 1887 and 1940.
2. Insert after the `/model` row (line 1887):
   ```html
   <tr><td><code>/advisor</code> <code>[model|off]</code></td><td>Choose an advisor model — a second model Claude consults for guidance during a task. With no args opens the picker dialog (also openable mid-turn in the fullscreen TUI, v2.1.234). As of v2.1.260, the text form <code>/advisor &lt;model&gt;</code> / <code>/advisor off</code> works in the desktop app, Remote Control and headless (<code>-p</code> / Agent SDK) sessions.</td></tr>
   ```
3. Line 1940: change to "Reload plugins without restart. As of v2.1.260 also available in headless sessions, so it appears in the Claude Code Desktop and SDK command lists."

## Acceptance Criteria
- `/advisor` row exists in the Cheat Sheet with the text form and v2.1.260 attribution
- `/reload-plugins` row mentions headless availability with v2.1.260 attribution
- HTML is valid
