# CBP-018 — Add /agents Command to Cheat Sheet Automation Table

## Summary
The `/agents` command received a significant UI overhaul in v2.1.98: it now has a tabbed layout with a **Running** tab (shows live subagents) and a **Library** tab (browse/run/view agents). This is a key command for multi-agent workflows but is completely missing from the Cheat Sheet's automation slash commands table.

## Assessment
The automation table (lines 3784–3795) has 5 entries: `/loop`, `/schedule`, `/batch`, `/tasks`, `/security-review`. The `/agents` command belongs here and should be added with an accurate description reflecting the new tabbed layout.

## Plan

1. Read lines 3783–3795 (automation slash commands table)
2. Add `/agents` row after `/tasks`:
   ```html
   <tr><td><code>/agents</code></td><td>Browse agent library and manage live subagents (Running + Library tabs)</td></tr>
   ```

## Acceptance Criteria
- [ ] `/agents` appears in the "Automation & agents" slash commands table
- [ ] Description accurately reflects the tabbed UI (Running + Library)
- [ ] Row matches existing `<tr><td><code>/cmd</code></td><td>Description</td></tr>` pattern
