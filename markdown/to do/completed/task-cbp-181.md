# CBP-181 — Add `claude_code.tool` OTEL span to Monitoring events table (v2.1.145)

## Summary

In v2.1.145, `agent_id` and `parent_agent_id` attributes were added to `claude_code.tool` OTEL spans. Trace parenting was also fixed so background subagent spans nest correctly under the dispatching Agent tool span. This was not covered in the CBP-175–177 batch that processed v2.1.145.

## Assessment

The OTEL Events table in the Monitoring section has rows for `claude_code.tool_result` and `claude_code.tool_decision`, but no `claude_code.tool` span row. This is a new span distinct from `tool_result`.

**Action required:** Add a new `<tr>` row for `claude_code.tool` to the OTEL Events table.

## Plan

1. Locate the `claude_code.tool_result` row in the OTEL Events table.
2. Insert a new row immediately before `claude_code.tool_result`:
   ```html
   <tr><td><code>claude_code.tool</code></td><td>Tool call trace span</td><td>agent_id, parent_agent_id — background subagent spans nest under the dispatching Agent tool span for correct trace hierarchy</td></tr>
   ```

## Acceptance Criteria

- `claude_code.tool` row is present in the OTEL Events table before `claude_code.tool_result`.
- Row documents `agent_id` and `parent_agent_id` attributes and the trace nesting behavior.
- No duplicate rows, no broken HTML.
