# CBP-423 — [Claude] `claude mcp list`/`get` show ⊘ Disabled without health check

## Source
Claude Code v2.1.238 release notes: "Changed `claude mcp list` and `claude mcp get` to show disabled servers as `⊘ Disabled` instead of connecting to them for a health check."

## Summary
`claude mcp list`/`claude mcp get` no longer attempt a health-check connection for disabled MCP servers — they now show a `⊘ Disabled` status directly. The Cheat Sheet's `/mcp` row (`id="cheat-sheet"`, line 11045) already documents `claude mcp login`/`claude mcp logout` CLI subcommands, making it the natural place for this related CLI-surface change.

## Assessment
Content partially exists (the `/mcp` row documents related `claude mcp` CLI subcommands) but this specific list/get behavior change is not mentioned.

## Plan
1. In `fsad-playbook.html`, locate the `/mcp` row in the Slash Commands table (`id="cheat-sheet"`, line 11045).
2. Append a short clause to the cell's existing text: disabled servers now show as `⊘ Disabled` in `claude mcp list`/`claude mcp get` output instead of triggering a connection attempt for a health check. Tag `(v2.1.238)`.

## Acceptance Criteria
- [ ] `/mcp` row documents the `⊘ Disabled` behavior for `claude mcp list`/`get`, tagged `(v2.1.238)`.
- [ ] Existing row content (marketplace preview, `claude mcp login`/`logout` docs) preserved unchanged.
