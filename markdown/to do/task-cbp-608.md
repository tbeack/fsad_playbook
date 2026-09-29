# CBP-608 [Codex] Update `/import` row — available in remote and local background-server sessions (rust-v0.157.0)

## Summary

Codex rust-v0.157.0 makes `/import` available in remote sessions and local background-server sessions. Previously it was only available in local TUI sessions.

## Assessment

**`/import` cheat sheet row** (`src/pages/codex.html`, line ~1004):
```
<tr><td><code>/import</code></td><td>Migrate settings, MCP servers, plugins, sessions, commands, and project-scoped memories from <strong>Cursor</strong> or <strong>Claude Code</strong>. Selectively import any combination for full cross-tool migration. (v0.140.0, expanded v0.145.0) As of rust-v0.147.0, also imports Cursor-managed skills, and re-running the import synchronizes changes to previously-imported Claude/Cursor conversations without creating duplicates.</td></tr>
```
Needs a new sentence at the end noting that as of rust-v0.157.0, `/import` is also available in remote sessions and local background-server sessions.

## Plan

1. Read `src/pages/codex.html` lines 1001–1007 to confirm the `/import` row text.
2. Append to the `/import` row description: "As of rust-v0.157.0, <code>/import</code> is also available in remote sessions and local background-server (daemon) sessions."

## Acceptance Criteria

- `/import` row notes availability in remote and local background-server sessions as of rust-v0.157.0.
- No HTML is broken; the build succeeds.
