# CBP-190 — Add `/reload-skills` command to Cheat Sheet; update SessionStart hook row

## Summary
Claude Code v2.1.152 added:
1. `/reload-skills` — re-scans skill directories without restarting the session
2. `SessionStart` hooks can now return `reloadSkills: true` to re-scan skill directories on startup/resume, making skills installed by the hook available in the same session
3. `SessionStart` hooks can now set the session title via `hookSpecificOutput.sessionTitle` on startup and resume

## Assessment

### Part 1: `/reload-skills` in Cheat Sheet
Not currently in the playbook (confirmed by grep). Best placed in the Session / Context / History table with other session-management commands (near `/skills`, `/resume`, etc.). Let me check where `/skills` is placed.

The Cheat Sheet session table is around line 6420+. Need to find `/skills` row to place `/reload-skills` nearby.

grep shows `/skills` is at line 6452:
```
<tr><td><code>/skills</code></td><td>List all loaded skills; type to filter</td></tr>
```
Add `/reload-skills` immediately after it.

### Part 2: SessionStart hook row
Line 6610:
```
<tr><td><code>SessionStart</code></td><td>When a session begins</td></tr>
```
Needs `reloadSkills` and `sessionTitle` capability documented.

## Plan
1. Find `/skills` row and add `/reload-skills` row after it.
2. Update `SessionStart` row to mention that hook output can include `reloadSkills: true` (re-scan skills) and `hookSpecificOutput.sessionTitle` (set session title).

## Acceptance Criteria
- `/reload-skills` row appears in the Cheat Sheet after `/skills`
- `SessionStart` hook row mentions `reloadSkills: true` and `hookSpecificOutput.sessionTitle`
