# CBP-091 — Add `claude_code.skill_activated` and `claude_code.at_mention` to OTEL events table

## Summary
Two new OpenTelemetry log events were added across v2.1.122 and v2.1.126:
- `claude_code.skill_activated` — fires when a skill is activated via user-typed slash command, Claude-proactive invocation, or nested skill call. Carries `invocation_trigger` attribute: `"user-slash"`, `"claude-proactive"`, or `"nested-skill"`.
- `claude_code.at_mention` — fires when an `@`-mention is resolved.

## Assessment
The OTEL events table is in the Claude Monitoring section (lines 7419–7425). It currently has 5 rows:
- `claude_code.user_prompt`
- `claude_code.tool_result`
- `claude_code.api_request`
- `claude_code.api_error`
- `claude_code.tool_decision`

Neither `claude_code.skill_activated` nor `claude_code.at_mention` are present. Both are directly useful for teams monitoring skill usage patterns and mention-resolution in agentic workflows. Both should be added.

## Plan
1. Read the OTEL events table at lines 7416–7426.
2. Append two new rows after `claude_code.tool_decision`:
   - `claude_code.skill_activated` with description and `invocation_trigger` key attribute
   - `claude_code.at_mention` with description

### HTML pattern to follow (match existing rows)
```html
<tr><td><code>claude_code.skill_activated</code></td><td>Skill is invoked</td><td>skill_name, invocation_trigger (<code>user-slash</code> | <code>claude-proactive</code> | <code>nested-skill</code>)</td></tr>
<tr><td><code>claude_code.at_mention</code></td><td>@-mention is resolved</td><td>mention_target, resolution_result</td></tr>
```

## Acceptance Criteria
- Both events appear in the OTEL events table in the Claude Monitoring section
- `invocation_trigger` values are listed for `skill_activated`
- No existing rows are modified or broken
