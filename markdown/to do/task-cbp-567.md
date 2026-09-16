# CBP-567 — Update `OTEL_LOG_TOOL_DETAILS=1` description in Monitoring callout (v2.1.273)

**Source:** Claude Code v2.1.273  
**Tag:** [Claude]

## Summary
v2.1.273 extends `OTEL_LOG_TOOL_DETAILS=1`: it now also includes **real agent, skill, plugin, and MCP server names** on cost and token metrics (in addition to tool parameters, bash commands, MCP names, and file paths it already logged).

## Assessment
The Monitoring collapsible in `src/pages/practices.html` at line 3792 has an "Opt-in Detail Levels" callout that describes `OTEL_LOG_TOOL_DETAILS=1` as adding "tool parameters (bash commands, MCP names, file paths)". The description needs to note the v2.1.273 enhancement: it now also surfaces real agent, skill, plugin, and MCP server names in cost and token metrics.

## Plan
1. Open `src/pages/practices.html`
2. Find line 3792:
   ```
   <p><code>OTEL_LOG_USER_PROMPTS=1</code> includes prompt text. <code>OTEL_LOG_TOOL_DETAILS=1</code> adds tool parameters (bash commands, MCP names, file paths). <code>OTEL_LOG_ASSISTANT_RESPONSES=1</code> ...
   ```
3. Update `OTEL_LOG_TOOL_DETAILS=1` description to append the v2.1.273 addition:
   Change:
   ```
   <code>OTEL_LOG_TOOL_DETAILS=1</code> adds tool parameters (bash commands, MCP names, file paths).
   ```
   To:
   ```
   <code>OTEL_LOG_TOOL_DETAILS=1</code> adds tool parameters (bash commands, MCP names, file paths); as of v2.1.273 it also includes real agent, skill, plugin, and MCP server names on cost and token metrics.
   ```
4. Mark CBP-567 complete in todo.md

## Acceptance Criteria
- The callout at line 3792 notes the v2.1.273 enhancement for `OTEL_LOG_TOOL_DETAILS=1`
- The description mentions "agent, skill, plugin, and MCP server names on cost and token metrics"
- Build passes without errors
