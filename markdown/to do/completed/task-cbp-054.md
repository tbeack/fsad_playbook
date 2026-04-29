# CBP-054 — Add `mcpServers` to skill frontmatter reference table (v2.1.117)

## Summary
Claude Code v2.1.117: "Agent frontmatter `mcpServers` are now loaded for main-thread agent sessions via `--agent`." This mirrors how CBP-049 added `hooks:` fires via `--agent`. The `mcpServers` frontmatter key lets skills declare which MCP servers they need — previously this only worked for fork-subagent invocations; now it works for main-thread `--agent` sessions too.

## Assessment
The frontmatter reference table (lines ~4338-4351) does NOT currently have an `mcpServers` entry. The `hooks` row (line 4348) already says "Also fires when the agent is run as a main-thread agent via `--agent`" — the `mcpServers` row should follow the same pattern.

Location: **lines ~4338-4351**, frontmatter reference table inside the "Frontmatter Reference (All Fields)" collapsible.

## Plan

### Step 1 — Add `mcpServers` row to the frontmatter table
Insert a new row after the `hooks` row (line 4348) and before the `monitors` row (line 4349):

```html
<tr><td><code>mcpServers</code></td><td>object</td><td>MCP server definitions scoped to this skill. Loaded for fork-subagent contexts and for main-thread agent sessions via <code>--agent</code>.</td></tr>
```

## Acceptance Criteria
- `mcpServers` row appears in the frontmatter reference table
- Description accurately states it works for both fork-subagent and main-thread `--agent` sessions
- Row is positioned logically (near `hooks` and `monitors`)
- No existing rows are duplicated or removed
