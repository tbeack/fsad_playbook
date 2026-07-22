# CBP-324 — [Codex] Update `/import` cheat sheet row for expanded migration (rust-v0.145.0)

## Summary

Codex rust-v0.145.0 significantly expanded the `/import` command beyond its original v0.140.0 scope. Previously it could "selectively import setup, project configuration, and recent chats from Claude Code." In v0.145.0 it now migrates:

- Cursor settings
- Claude Code settings
- MCP servers
- Plugins
- Sessions (conversation history)
- Commands
- Project-scoped memories

This is a major cross-tool migration capability relevant to FSAD teams transitioning from Cursor or Claude Code to Codex.

## Assessment

The existing `/import` row in the Codex Cheat Sheet (line 12735) reads:
`<td>Selectively import setup, project configuration, and recent chats from Claude Code. (v0.140.0)</td>`

This needs updating to reflect the expanded scope including Cursor, MCP servers, plugins, sessions, commands, and memories. The expanded version is in v0.145.0.

## Plan

### Step 1: Update the `/import` cheat sheet row

At line 12735, change:
`<tr><td><code>/import</code></td><td>Selectively import setup, project configuration, and recent chats from Claude Code. (v0.140.0)</td></tr>`

To:
`<tr><td><code>/import</code></td><td>Migrate settings, MCP servers, plugins, sessions, commands, and project-scoped memories from <strong>Cursor</strong> or <strong>Claude Code</strong>. Selectively import any combination. Supports full cross-tool migration. (v0.140.0, expanded v0.145.0)</td></tr>`

## Acceptance Criteria

- [ ] The `/import` cheat sheet row now mentions Cursor as a migration source (not just Claude Code)
- [ ] The row lists the expanded import scope: MCP servers, plugins, sessions, commands, memories
- [ ] The version note references both v0.140.0 (original) and v0.145.0 (expanded)
- [ ] No HTML structure or styling is broken
