# CBP-277 — Add `/btw` to the Cheat Sheet slash commands table

## Summary
Claude Code v2.1.187 improved `/btw` with ←/→ arrow navigation to step through earlier answers. `/btw` ("by the way") is a slash command that lets you share context or corrections mid-task without interrupting the model's current turn. It is not yet documented in the playbook at all.

## Assessment
The Cheat Sheet slash commands table is in the Claude Best Practices page (`page-practices`). The table has rows for commands like `/config`, `/install-github-app`, `/review`, `/model`, etc. A search confirms `/btw` is absent from the playbook.

A new `<tr>` row must be added. The best location is near other contextual/conversational commands. Look for `/share`, `/review`, or `/bug` rows to find a logical grouping.

## Plan
1. Read `fsad-playbook.html` around line 9958 (where `/install-github-app` was found) to see the full slash commands table structure and find a logical insertion point for `/btw`.
2. Add a new row in the slash commands table — near conversational or utility commands:
   ```html
   <tr><td><code>/btw</code></td><td>Share a side note or correction mid-task without derailing the current turn. Use ←/→ arrows to step through earlier answers (v2.1.187)</td></tr>
   ```
3. Mark this task complete in `todo.md`.

## Acceptance Criteria
- The Cheat Sheet slash commands table contains a `/btw` row with an accurate description.
- The row is in a logically appropriate position within the table.
- No surrounding HTML is broken.
- A search for "/btw" in the playbook returns the new row.
