# CBP-190 — Add `/reload-skills` to configuration commands table

## Summary
Claude Code v2.1.152 added a `/reload-skills` command that re-scans skill directories without restarting the session. This is useful after installing new skills or modifying skill files mid-session.

## Assessment
The Cheat Sheet configuration commands table (lines ~6437–6454) has `/reload-plugins` (line 6453) but no `/reload-skills`. The new command is a natural companion to `/reload-plugins` and should be placed near it.

**Does this content exist?** No — `/reload-skills` is not in the playbook.

**Where to add:** After `/reload-plugins` row (line 6453), just before the closing `</tbody>` of the configuration section.

## Plan
1. Read lines 6450–6456 to confirm the `/reload-plugins` row location
2. Insert new row after `/reload-plugins`:
   ```html
   <tr><td><code>/reload-skills</code></td><td>Re-scan skill directories and reload skills without restarting the session</td></tr>
   ```

## Acceptance Criteria
- `/reload-skills` appears in the configuration commands table
- Row is positioned after `/reload-plugins`
- Description accurately reflects the command purpose
