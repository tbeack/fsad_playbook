# CBP-704 — Update `/reload-skills` row to reflect new behavior

## Summary
Claude Code v2.1.304 changed `/reload-skills`: it now sends only new or changed skills to Claude after a compaction, instead of re-sending the full skill list. This is a behavioral change worth noting in the cheat sheet row.

## Assessment
The cheat sheet in `src/pages/practices.html` has this row at line 1850:
```
<tr><td><code>/reload-skills</code></td><td>Re-scan skill directories and reload skills without restarting the session</td></tr>
```
The description is now incomplete. It should note the new behavior: after a compaction, only new or changed skills are sent.

## Plan
1. Open `src/pages/practices.html`.
2. Find the row: `<tr><td><code>/reload-skills</code></td><td>Re-scan skill directories and reload skills without restarting the session</td></tr>`.
3. Replace it with:
   ```html
   <tr><td><code>/reload-skills</code></td><td>Re-scan skill directories and reload skills without restarting the session. As of v2.1.304, this command sends only new or changed skills to Claude; after a compaction, the full skill list is sent automatically.</td></tr>
   ```

## Acceptance Criteria
- The `/reload-skills` row in the cheat sheet includes the v2.1.304 behavior note.
- The description accurately reflects that after compaction the full list is sent, and /reload-skills itself sends only new/changed.
- No broken HTML.
