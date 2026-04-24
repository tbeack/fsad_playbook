# CBP-076: Update `/config` Cheat Sheet row — settings persist to `~/.claude/settings.json`

## Summary
In v2.1.119, changes made via `/config` (theme, editor mode, verbose, etc.) now persist to `~/.claude/settings.json` and participate in the full project/local/policy override precedence chain. Previously, the `/config` row only said "Open settings interface (alias: `/settings`)".

## Assessment
The current `/config` row in the Cheat Sheet (line ~5076) reads:
```
<tr><td><code>/config</code></td><td>Open settings interface (alias: <code>/settings</code>)</td></tr>
```
It does not mention that changes persist to `~/.claude/settings.json` or that they participate in cascade precedence. This is actionable — update the description.

## Plan
1. Read fsad-playbook.html around line 5076
2. Update the `/config` row description to: "Open settings interface — changes persist to `~/.claude/settings.json` and participate in the config cascade (alias: `/settings`)"

## Acceptance Criteria
- `/config` row mentions persistence to `~/.claude/settings.json`
- `/config` row mentions config cascade participation
- Alias note still present
