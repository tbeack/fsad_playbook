# CBP-057 — Update /theme Cheat Sheet row for named custom themes

## Summary
Claude Code v2.1.118 expanded `/theme` to support named custom themes. Users can now create and switch between named custom themes from `/theme`, hand-edit JSON files in `~/.claude/themes/`, and plugins can ship themes via a `themes/` directory.

## Assessment
The Cheat Sheet (line 5041 of fsad-playbook.html) currently reads:
```
/theme — Change color theme: dark | light | auto (match terminal)
```
This is now outdated — the command also supports custom named themes.

## Plan
1. Update the `/theme` row description to include the new custom theme capability.

## Acceptance Criteria
- `/theme` row mentions named custom themes and `~/.claude/themes/` JSON files
- Original `dark | light | auto` options still referenced
