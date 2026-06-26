# CBP-270 — Monitoring: `claude_code.assistant_response` OTEL event + `OTEL_LOG_ASSISTANT_RESPONSES`

## Summary
Claude Code v2.1.193 added a new OpenTelemetry log event `claude_code.assistant_response` that captures the model's response text. It is redacted by default. The behavior follows `OTEL_LOG_USER_PROMPTS` unless `OTEL_LOG_ASSISTANT_RESPONSES` is explicitly set:
- `OTEL_LOG_ASSISTANT_RESPONSES=1` — includes response text
- `OTEL_LOG_ASSISTANT_RESPONSES=0` — keeps responses redacted even if `OTEL_LOG_USER_PROMPTS=1`
- Unset — follows `OTEL_LOG_USER_PROMPTS` (so deployments already logging prompt content will automatically start receiving response content on upgrade)

## Assessment
The Events & Logs table (lines 11521–11533) lists OTEL events. The new `claude_code.assistant_response` event is missing from this table. The Opt-in Detail Levels callout (line 11535–11538) lists `OTEL_LOG_USER_PROMPTS` and `OTEL_LOG_TOOL_DETAILS` — it needs a mention of `OTEL_LOG_ASSISTANT_RESPONSES`.

## Plan
1. Read lines 11520–11540 of `fsad-playbook.html` to confirm the table structure.
2. Add a new `<tr>` for `claude_code.assistant_response` after the `claude_code.user_prompt` row (line 11524):
   - Event: `claude_code.assistant_response`
   - Fires When: Model produces a response
   - Key Attributes: `response_length`, `response` (opt-in via `OTEL_LOG_ASSISTANT_RESPONSES=1`)
3. Update the Opt-in Detail Levels callout (line 11537) to add: `<code>OTEL_LOG_ASSISTANT_RESPONSES=1</code> includes model response text (follows <code>OTEL_LOG_USER_PROMPTS</code> when unset; set to <code>0</code> to keep responses redacted even when prompt logging is on).`

## Acceptance Criteria
- `claude_code.assistant_response` row appears in the Events & Logs table
- `OTEL_LOG_ASSISTANT_RESPONSES` is mentioned in the Opt-in Detail Levels callout
- grep confirms both are present in the playbook
