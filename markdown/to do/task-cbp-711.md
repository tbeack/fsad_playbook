# CBP-711: Add `claude_code.safety_event` to OTEL events table

## Summary
Claude Code v2.1.307 added a new `claude_code.safety_event` OpenTelemetry log event. It fires for each tool call that a permission rule, auto mode, a safety check, a hook, or the sandbox stopped, prompted, or sent back. The playbook's OTEL events table does not include this event.

## Assessment
The content does not exist in the playbook. The OTEL log events table is in `src/pages/practices.html` around line 3918. The table rows include `claude_code.user_prompt`, `claude_code.tool`, `claude_code.tool_result`, `claude_code.api_request`, `claude_code.api_error`, `claude_code.tool_decision`, `claude_code.skill_activated`, and `claude_code.at_mention`. The new `claude_code.safety_event` row is missing.

## Plan
1. Open `src/pages/practices.html`.
2. Find the row with `claude_code.tool_decision`.
3. Insert a new `<tr>` row after `claude_code.tool_decision`:
   ```html
   <tr><td><code>claude_code.safety_event</code></td><td>Tool call stopped, prompted, or sent back by a permission rule, auto mode, a safety check, a hook, or the sandbox</td><td>tool_name, safety_source, tool_use_id (v2.1.307)</td></tr>
   ```

## Acceptance Criteria
- The row appears in the OTEL log events table after `claude_code.tool_decision`.
- The description matches the release note accurately.
- No other rows are disturbed.
