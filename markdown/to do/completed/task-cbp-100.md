# CBP-100 — Update `/color` Cheat Sheet row: bare command picks random color

## Summary
In Claude Code v2.1.128, running `/color` with no arguments now picks a **random session color** instead of doing nothing. Previously the description implied an argument was required.

## Assessment
The playbook's Cheat Sheet (Configuration table) already has:
```
<tr><td><code>/color</code> <code>[color]</code></td><td>Set prompt-bar color (red, blue, green, purple, etc.)</td></tr>
```
Line ~6224. The description needs to add that omitting the argument picks a random color.

## Plan
1. Read the `/color` row at line 6224 in `fsad-playbook.html`
2. Update the description cell to: "Set prompt-bar color (red, blue, green, purple, etc.); omit the argument to pick a random color"

## Acceptance Criteria
- `/color` row in the Cheat Sheet mentions that no-args picks a random color
- HTML remains valid, no styling changes
