# CBP-147 — Update `claude agents` Cheat Sheet row with v2.1.142 dispatch flags

## Summary

Claude Code v2.1.142 added eight new CLI flags to `claude agents` for configuring dispatched background sessions:
- `--add-dir <path>` — mount additional working directories into the background session
- `--settings <path>` — point to a specific settings file
- `--mcp-config <path>` — load MCP servers from a JSON file
- `--plugin-dir <path>` — load plugins from a directory or .zip archive
- `--permission-mode <mode>` — set the permission mode for the background session
- `--model <name>` — specify the model for the background session
- `--effort <level>` — set effort level for the background session
- `--dangerously-skip-permissions` — skip all permission prompts for background session

## Assessment

The `claude agents` row exists at **line 6311** in `fsad-playbook.html`:
```
<tr><td><code>claude agents</code></td><td>Agent View — a unified list of every Claude Code session: running, blocked on you, or done. Use <code>--cwd &lt;path&gt;</code> to scope the list to a specific directory (useful in monorepos). Run <code>claude agents</code> to get started.</td></tr>
```

The current description only mentions `--cwd`. The new dispatch flags are not mentioned anywhere in the playbook.

## Plan

Update line 6311 to extend the `claude agents` description with a note about the new dispatch flags. Keep the description concise — list the flags inline without expanding into a full table.

**New content:**
```html
<tr><td><code>claude agents</code></td><td>Agent View — a unified list of every Claude Code session: running, blocked on you, or done. Use <code>--cwd &lt;path&gt;</code> to scope to a directory. When launching a new agent session, configure the dispatched background session with: <code>--add-dir</code>, <code>--settings</code>, <code>--mcp-config</code>, <code>--plugin-dir</code>, <code>--permission-mode</code>, <code>--model</code>, <code>--effort</code>, <code>--dangerously-skip-permissions</code>.</td></tr>
```

## Acceptance Criteria

- The `claude agents` row in the Cheat Sheet lists all 8 new dispatch flags by name
- The `--cwd` description is preserved
- No other rows are modified
