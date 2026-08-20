# CBP-399 — [Codex] Async hooks and MCP-tool hooks

## Source
Codex CLI rust-v0.148.0

## Summary
Codex hooks can now run commands asynchronously and invoke MCP tools. Hook listings expose execution mode, timed-out hook process trees are terminated, and hook runtimes refresh after plugin changes.

## Assessment
Not covered. The `#codex-hooks` section documents only synchronous `type = "command"` hooks. The config example at 13698-13718 shows `type = "command"` with `timeout = 10` (line 13709). Nothing mentions async execution, MCP-tool hooks, execution mode in listings, or process-tree termination.

Separate pre-existing defect found during assessment: line 13815 states "Codex has 6 hook event types" while the table at 13675-13682 lists 8 (`SessionStart`, `UserPromptSubmit`, `PreToolUse`, `PermissionRequest`, `PostToolUse`, `Stop`, `PreCompact`, `PostCompact`).

## Plan
1. Add a version-note paragraph after the Configuration intro (around line 13689) describing async hooks, MCP-tool hooks, and execution mode in listings, tagged rust-v0.148.0.
2. Extend the TOML config block at 13706-13718 with an async hook entry and an MCP-tool hook entry, matching its existing highlight-span style.
3. Note that timed-out hooks now have their whole process tree terminated.
4. Fix line 13815: "6 hook event types" → "8 hook event types".

## Acceptance Criteria
- [ ] Async execution and MCP-tool invocation are both documented
- [ ] Config example shows the new hook shapes and stays valid TOML
- [ ] Line 13815 says 8, matching the table
- [ ] Version tagged rust-v0.148.0
