# CBP-430: Add `/claude-api upgrade` to Cheat Sheet Info & account table

## Source
Claude Code v2.1.239 CHANGELOG.md entry: "Added `/claude-api upgrade` to migrate Python projects from `anthropic` 0.x to 1.x, and updated the skill's Python reference for 1.x (timeouts use `anthropic.Timeout`, not `httpx.Timeout`)"

## Summary
Claude Code v2.1.239 added a new slash command, `/claude-api upgrade`, that migrates a Python project's use of the `anthropic` SDK from the 0.x line to 1.x. The playbook's Cheat Sheet does not yet list this command anywhere in its Slash Commands tables.

## Assessment
Checked all Slash Commands tables in `fsad-playbook.html` (~lines 10967-11096). No row for `/claude-api` exists anywhere. The "Info & account" table (lines 11074-11096) is the best fit — it already hosts single-purpose utility/account commands like `/insights`, `/login`, `/logout`.

## Plan
1. In `fsad-playbook.html`, locate the "Info & account" table body (around line 11096, just before the closing `</tbody>` and after the `/insights`/`/login`/`/logout` rows).
2. Add a new row:
   ```html
   <tr><td><code>/claude-api upgrade</code></td><td>Migrate a Python project's use of the <code>anthropic</code> SDK from 0.x to 1.x (v2.1.239)</td></tr>
   ```
3. Place it near `/insights` since both are utility-style one-shot commands, before `/login`.

## Acceptance Criteria
- [ ] A new `<tr>` row for `/claude-api upgrade` exists in the Cheat Sheet "Info & account" table.
- [ ] The row cites v2.1.239.
- [ ] No existing rows or table structure broken (valid HTML, matching `<tr><td>...</td><td>...</td></tr>` pattern).
