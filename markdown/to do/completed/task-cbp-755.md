# CBP-755: Document MCP tasks background support + `CLAUDE_CODE_DISABLE_MCP_TASK_BACKGROUND` (v2.1.319)

## Summary
Claude Code v2.1.319 added support for MCP tasks in the terminal: when an MCP server runs a tool call as a task (the MCP spec's task mechanism), Claude Code moves it to the background right away and tells Claude the result when it finishes, rather than waiting for the auto-background timeout. The new `CLAUDE_CODE_DISABLE_MCP_TASK_BACKGROUND` env var makes Claude Code wait for an MCP task inside its tool call instead of backgrounding it immediately.

## Assessment
`src/pages/practices.html` already documents `CLAUDE_CODE_MCP_AUTO_BACKGROUND_MS` (~line 2804) — the generic timeout-based auto-backgrounding for long-running MCP tool calls. MCP tasks are a distinct, immediate-backgrounding mechanism (triggered by the server declaring a call as a task, not by elapsed time), so it gets its own row right after that one rather than being folded in.

## Plan
1. Open `src/pages/practices.html`.
2. In the env var table, immediately after the `CLAUDE_CODE_MCP_AUTO_BACKGROUND_MS` row (~line 2804), insert:
   ```html
   <tr><td><code>CLAUDE_CODE_DISABLE_MCP_TASK_BACKGROUND=1</code></td><td>By default (v2.1.319), when an MCP server runs a tool call as a task (the MCP spec's task mechanism), Claude Code moves it to the background immediately and tells Claude the result when it finishes — distinct from the elapsed-time auto-backgrounding above. Set this var to make Claude Code wait for an MCP task inside its tool call instead.</td></tr>
   ```
3. No other files require changes for this task.

## Acceptance Criteria
- A new env var table row documents `CLAUDE_CODE_DISABLE_MCP_TASK_BACKGROUND` and the MCP-tasks-in-the-terminal feature it is paired with (v2.1.319).
- HTML is valid (no unclosed tags).
