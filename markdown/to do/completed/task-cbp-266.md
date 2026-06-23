# CBP-266 — Add `claude mcp login/logout` CLI commands to Cheat Sheet MCP row

## Summary

Claude Code v2.1.186 added `claude mcp login <name>` and `claude mcp logout <name>` as dedicated CLI subcommands for authenticating MCP servers without needing to open the interactive `/mcp` menu. The `--no-browser` flag redirects the OAuth flow to stdin, enabling completion over SSH. This is a meaningful addition for teams that set up MCP servers in CI/CD or headless environments.

## Assessment

The playbook's Cheat Sheet (page-practices) has a `/mcp` slash command row at line 9846 that describes managing MCP connections. It does not mention the `claude mcp login`/`claude mcp logout` CLI subcommands. These are distinct from the slash command — they are run from the terminal prompt, not inside an active Claude session. The row needs to be updated to mention these CLI commands, or a new CLI flags/subcommands row should be added.

Existing content at line 9846:
```
<tr><td><code>/mcp</code></td><td>Manage MCP server connections; shows tool count per server and flags servers with 0 tools (usually a misconfiguration). As of v2.1.161, claude.ai connectors you have never signed in to are collapsed behind a "Show unused connectors" row to reduce visual noise</td></tr>
```

The best approach is to append a note about the CLI commands to this existing row description, keeping related MCP content together.

## Plan

1. Read `fsad-playbook.html` around line 9846 to confirm exact current text.
2. Edit the `/mcp` Cheat Sheet row (line 9846) to append a sentence about `claude mcp login <name>` and `claude mcp logout <name>` and the `--no-browser` flag.
3. Mark task complete in `todo.md`.

## Acceptance Criteria

- The `/mcp` Cheat Sheet row mentions `claude mcp login <name>` and `claude mcp logout <name>` as CLI alternatives for authenticating MCP servers.
- The `--no-browser` flag for SSH/stdin flows is mentioned.
- No other content changed.
