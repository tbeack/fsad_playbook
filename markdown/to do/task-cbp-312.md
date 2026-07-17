# CBP-312 — Add CLAUDE_CODE_MCP_AUTO_BACKGROUND_MS to hardening env vars table (v2.1.212)

## Summary
Claude Code v2.1.212 added automatic backgrounding for MCP tool calls that exceed 2 minutes. The threshold is configurable via `CLAUDE_CODE_MCP_AUTO_BACKGROUND_MS`; set to `0` to disable the behavior. This is not currently in the Subprocess Sandboxing hardening env vars table.

## Source
Claude Code v2.1.212 changelog entry:
> MCP tool calls running longer than 2 minutes now move to the background automatically so the session stays usable; configure the threshold or disable with `CLAUDE_CODE_MCP_AUTO_BACKGROUND_MS`

## Assessment
- The hardening env vars table in the Subprocess Sandboxing collapsible ends at line 10740 with `CLAUDE_CODE_PROCESS_WRAPPER`.
- This is a new addition. Related to `CLAUDE_CODE_MCP_TOOL_IDLE_TIMEOUT` (which handles no-response timeouts), but distinct — this handles long-running calls that should auto-background rather than abort.

## Plan
1. Read fsad-playbook.html around lines 10739–10741.
2. Insert after `CLAUDE_CODE_MAX_SUBAGENTS_PER_SESSION` (which will be added by CBP-311), before `</tbody>`:

```html
<tr><td><code>CLAUDE_CODE_MCP_AUTO_BACKGROUND_MS</code></td><td>Threshold (in milliseconds) at which a long-running MCP tool call is automatically moved to the background so the session stays usable. Default is <code>120000</code> (2 minutes). Set to <code>0</code> to disable auto-backgrounding and keep MCP calls in the foreground indefinitely (v2.1.212).</td></tr>
```

## Acceptance Criteria
- `CLAUDE_CODE_MCP_AUTO_BACKGROUND_MS` appears in the Subprocess Sandboxing hardening table
- Description correctly states default of 120000ms (2 minutes) and `0` disables it
- HTML renders correctly in browser
