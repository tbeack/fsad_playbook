# CBP-180 — Add `/code-review [effort]` to Cheat Sheet slash commands (v2.1.146)

## Summary

Claude Code v2.1.146 renamed `/simplify` to `/code-review` and added an optional effort level argument (e.g. `/code-review high`). The `/simplify` command was never documented in the playbook, so this is a net-new addition to the Cheat Sheet.

## Assessment

- `/simplify` was never present in `fsad-playbook.html`.
- `/code-review` as a slash command does not currently appear in the Cheat Sheet slash commands tables.
- The "Automation & agents" slash commands sub-table (around line 6258–6272) is the right home — it already includes `/security-review`, `/goal`, `/batch`, and similar action-oriented commands.
- `/code-review [effort]` should be added as a row in that table.

## Plan

1. Read lines 6258–6272 of `fsad-playbook.html` to confirm exact table structure.
2. Insert a new row after `/security-review`:
   ```html
   <tr><td><code>/code-review</code> <code>[effort]</code></td><td>AI-assisted code review of the current diff — flags bugs, security issues, and style problems without modifying files. Optional effort level: <code>low</code> | <code>medium</code> | <code>high</code>. Renamed from <code>/simplify</code> in v2.1.146.</td></tr>
   ```
3. Save the file.
4. Mark CBP-180 complete in `todo.md`.

## Acceptance Criteria

- The Cheat Sheet "Automation & agents" table contains a `/code-review [effort]` row.
- The description explains the command purpose, the optional effort argument, and the rename from `/simplify`.
- No other rows are disturbed.
- The HTML is valid and follows the existing `<tr><td><code>…</code></td><td>…</td></tr>` pattern.
