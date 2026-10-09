# CBP-671 — Update Codex Worktrees Section (rust-v0.162.0)

## Summary

Codex rust-v0.162.0 added tools for creating and listing managed Git worktrees from trusted local projects. This means the agent can programmatically create and enumerate worktrees via Codex tools, not just by using the `/worktree` slash command or `--worktree` CLI flag.

## Assessment

The worktrees section in `src/pages/codex.html` is documented at:
- Line 1011: `/worktree` cheat sheet row — last version mentioned is rust-v0.156.0
- Line 1189: worktrees prose paragraph — last version mentioned is rust-v0.156.0

Both need updating to mention the new tools (rust-v0.162.0).

## Plan

1. Read `src/pages/codex.html` lines 1009-1015 for the `/worktree` cheat sheet row.
2. Append to the `/worktree` cheat sheet row (line 1011): "As of rust-v0.162.0, tools for creating and listing managed Git worktrees are available from trusted local projects — the agent can now manage worktrees programmatically."
3. Read `src/pages/codex.html` lines 1187-1197 for the worktrees prose paragraph.
4. Append to the end of the worktrees paragraph (line 1189): "As of rust-v0.162.0, the agent gains tools to create and list managed Git worktrees from trusted local projects — useful for programmatic worktree lifecycle management inside a session."

## Edit locations

- `src/pages/codex.html` line 1011 — `/worktree` cheat sheet row
- `src/pages/codex.html` line 1189 — worktrees prose paragraph

## Acceptance Criteria

- rust-v0.162.0 appears in the worktrees section
- The managed Git worktree tools are described in both the cheat sheet and the prose
