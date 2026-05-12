# CBP-132 — Add `/scroll-speed` to Cheat Sheet configuration table

## Summary
Claude Code v2.1.139 added `/scroll-speed` as a new slash command to tune mouse wheel scroll speed with a live preview. This is a quality-of-life terminal configuration command.

## Assessment
**Does this content exist in the playbook?**

- `/scroll-speed` does NOT appear anywhere in `fsad-playbook.html`
- The Claude Cheat Sheet "Configuration & setup" table (around line 6295–6315) contains commands like `/config`, `/tui`, `/theme`, `/color`, `/terminal-setup`, `/keybindings`, `/doctor`, `/less-permission-prompts`
- `/terminal-setup` row mentions "configures scroll sensitivity in VS Code, Cursor, and Windsurf terminals" — `/scroll-speed` is the more general command for tuning scroll speed globally

**What needs to change:**
Add `/scroll-speed` row to the "Configuration & setup" table in the Claude Cheat Sheet.

## Plan
1. Read lines 6295–6335 to confirm the configuration table structure
2. Add `<tr><td><code>/scroll-speed</code></td><td>Tune mouse wheel scroll speed with a live preview</td></tr>` — place after `/terminal-setup` or after `/keybindings` (thematically fits near terminal config items)
3. Keep description concise

## Acceptance Criteria
- `/scroll-speed` appears in the "Configuration & setup" table
- Placement is logical (near other terminal/display configuration commands)
- Description matches official release note language
