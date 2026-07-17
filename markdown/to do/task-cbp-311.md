# CBP-311 — Add CLAUDE_CODE_MAX_WEB_SEARCHES_PER_SESSION and CLAUDE_CODE_MAX_SUBAGENTS_PER_SESSION to hardening env vars table (v2.1.212)

## Summary
Claude Code v2.1.212 added two per-session safety caps: one for WebSearch tool calls (`CLAUDE_CODE_MAX_WEB_SEARCHES_PER_SESSION`, default 200) and one for subagent spawns (`CLAUDE_CODE_MAX_SUBAGENTS_PER_SESSION`, default 200). The subagent cap resets when the user runs `/clear`. Neither env var is currently in the Subprocess Sandboxing hardening env vars table.

## Source
Claude Code v2.1.212 changelog entries:
> Added a session-wide limit on WebSearch tool calls (default 200, tunable via `CLAUDE_CODE_MAX_WEB_SEARCHES_PER_SESSION`) to stop runaway search loops
> Added a per-session cap on subagent spawns (default 200, override with `CLAUDE_CODE_MAX_SUBAGENTS_PER_SESSION`) to stop runaway delegation loops; `/clear` resets the budget

## Assessment
- The hardening env vars table in the Subprocess Sandboxing collapsible ends at line 10740 with `CLAUDE_CODE_PROCESS_WRAPPER`.
- Both vars are new additions.

## Plan
1. Read fsad-playbook.html around lines 10739–10741.
2. Insert two new rows after `CLAUDE_CODE_PROCESS_WRAPPER` (line 10740), before `</tbody>`:

```html
<tr><td><code>CLAUDE_CODE_MAX_WEB_SEARCHES_PER_SESSION</code></td><td>Per-session cap on WebSearch tool calls. Default <code>200</code>; set to a lower integer to prevent runaway search loops in unattended or agentic sessions. Does not reset on <code>/clear</code> (v2.1.212).</td></tr>
<tr><td><code>CLAUDE_CODE_MAX_SUBAGENTS_PER_SESSION</code></td><td>Per-session cap on subagent spawns. Default <code>200</code>; set to a lower integer to limit runaway delegation. The budget resets when you run <code>/clear</code> (v2.1.212).</td></tr>
```

## Acceptance Criteria
- Both env vars appear in the Subprocess Sandboxing hardening table
- Descriptions accurately reflect default values and reset behavior
- HTML renders correctly in browser
