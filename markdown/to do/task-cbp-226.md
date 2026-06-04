# CBP-226 — Rename Windsurf to Devin Desktop in `/terminal-setup` and `/scroll-speed` rows (v2.1.162)

## Summary

Claude Code v2.1.162 renamed "Windsurf" to "Devin Desktop" in the `/ide` menu, `/terminal-setup`, and `/scroll-speed` following the editor's rebrand. The playbook references "Windsurf" in the `/terminal-setup` Cheat Sheet row (line 9691) and in the IDE extensions comparison table (line 11628 in the Codex page).

## Assessment

**Does this content exist in the playbook?**
Yes — "Windsurf" appears at:
- Line 9691: `/terminal-setup` Cheat Sheet row (Claude Best Practices page)
- Line 11628: IDE extensions comparison table (Codex page)

There may be additional references in the changelog section (line 13349) but those are historical and should not be updated.

**What needs to change:**
Replace "Windsurf" with "Devin Desktop" in:
1. The `/terminal-setup` Cheat Sheet row description
2. The IDE extensions comparison table on the Codex page

Do NOT update the changelog text at line 13349 — that is historical record.

## Plan

1. Read lines 9688–9695 to confirm the `/terminal-setup` row text.
2. Edit the `/terminal-setup` row: replace "Windsurf" with "Devin Desktop".
3. Read lines 11625–11632 to confirm the IDE extensions table row.
4. Edit the IDE extensions table: replace "Windsurf" with "Devin Desktop".
5. Mark task complete in `todo.md`.

## Acceptance Criteria

- "Windsurf" is replaced with "Devin Desktop" in both `/terminal-setup` and the IDE extensions table.
- The historical changelog reference at line 13349 is untouched.
- HTML is valid.
