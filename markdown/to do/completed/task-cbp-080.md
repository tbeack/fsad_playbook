# CBP-080: Update OTEL events table — add `tool_use_id` and `tool_input_size_bytes`

## Summary
In v2.1.119, OpenTelemetry event attributes were expanded:
- `claude_code.tool_result` now includes `tool_use_id` and `tool_input_size_bytes`
- `claude_code.tool_decision` now includes `tool_use_id`

## Assessment
The OTEL events table (line ~6249–6255) currently shows:
- `claude_code.tool_result` key attributes: `tool_name, success, duration_ms`
- `claude_code.tool_decision` key attributes: `tool_name, decision, source`

Both need `tool_use_id` added to their key attributes column, and `tool_result` also needs `tool_input_size_bytes`. These are load-bearing for teams building observability dashboards that need to correlate tool calls.

## Plan
1. Read fsad-playbook.html around line 6249–6256 (OTEL events table)
2. Update `claude_code.tool_result` key attributes from `tool_name, success, duration_ms` to `tool_name, success, duration_ms, tool_use_id, tool_input_size_bytes`
3. Update `claude_code.tool_decision` key attributes from `tool_name, decision, source` to `tool_name, decision, source, tool_use_id`

## Acceptance Criteria
- `claude_code.tool_result` row includes `tool_use_id` and `tool_input_size_bytes`
- `claude_code.tool_decision` row includes `tool_use_id`
- No other changes to the OTEL section
