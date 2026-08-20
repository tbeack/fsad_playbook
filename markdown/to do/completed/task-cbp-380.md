# CBP-380 — Add `CLAUDE_CODE_PROJECT_DIR_NAME` to Power Usage Hardening env vars table

## Source
Claude Code v2.1.234 — "Added the optional `CLAUDE_CODE_PROJECT_DIR_NAME` environment variable: hosts that give each session its own config directory can choose a short name for the per-project transcript directory."

## Summary
Document the new opt-in env var in the established Hardening env vars table so the
`CLAUDE_CODE_*` reference stays complete.

## Assessment
- The Hardening env vars table lives in `fsad-playbook.html` inside the `#power-usage`
  Sandboxing collapsible. Rows run from ~line 11841 to ~line 11890.
- The table's last two rows are `CLAUDE_CODE_TOOL_MEMORY_LIMIT` and
  `CLAUDE_CODE_WEBFETCH_CACHE_TTL_MS`, both added in the v2.1.233 cycle (CBP-377/378).
- `CLAUDE_CODE_PROJECT_DIR_NAME` does not appear anywhere in the file. Content does not exist.

## Plan
1. Read lines 11885-11892 to confirm the closing rows of the Hardening env vars `<tbody>`.
2. Insert one new `<tr>` immediately after the `CLAUDE_CODE_WEBFETCH_CACHE_TTL_MS` row
   (~line 11889), before `</tbody>`.
3. Match the exact existing row pattern:
   `<tr><td><code>VAR</code></td><td>Effect … (vX.Y.Z).</td></tr>`
4. Copy should explain: sets a short name for the per-project transcript directory under
   `~/.claude/projects/`; intended for hosts that give each session its own config
   directory; keeps transcript paths short and readable rather than deriving a long
   slug from the full working-directory path. Tag `(v2.1.234)`.

## Acceptance Criteria
- [ ] A single new `<tr>` exists in the Hardening env vars table naming `CLAUDE_CODE_PROJECT_DIR_NAME`.
- [ ] The row is inside the same `<tbody>` as `CLAUDE_CODE_WEBFETCH_CACHE_TTL_MS` and uses the identical two-cell `<code>`/prose structure.
- [ ] The description matches the changelog wording (per-project transcript directory name; for hosts with per-session config directories) without overstating scope.
- [ ] The row carries the `(v2.1.234)` version tag, consistent with neighbouring rows.
- [ ] No other table rows are modified.
