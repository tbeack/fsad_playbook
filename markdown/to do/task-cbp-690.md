# CBP-690 — Update `claude_code.api_request` OTel event row: cache lifetime fields (v2.1.300)

## Summary
Claude Code v2.1.300 added `cache_creation_5m_tokens` and `cache_creation_1h_tokens` to the OpenTelemetry `api_request` event, splitting cache writes by their TTL lifetime (5-minute vs 1-hour cache). It also added OpenTelemetry GenAI semantic-convention attributes to trace spans: `gen_ai.provider.name`, `gen_ai.conversation.id`, `gen_ai.tool.name`, and `error.type`.

## Assessment
The `claude_code.api_request` row at line 3913 (src/pages/practices.html) currently lists "model, cost_usd, input/output tokens" as key attributes. The two new cache-creation fields are missing. The GenAI semantic-convention span attributes are not mentioned anywhere in the monitoring section. Both are "Update existing / Add content" tasks.

## Plan
1. Read src/pages/practices.html around line 3913.
2. Update the `claude_code.api_request` row's key attributes cell from "model, cost_usd, input/output tokens" to "model, cost_usd, input/output tokens, cache_creation_5m_tokens, cache_creation_1h_tokens (v2.1.300)".
3. Find the Opt-in Detail Levels callout near line 3930 (after the events table).
4. After that callout, add a sentence noting the new span attributes: "As of v2.1.300, trace spans also carry OpenTelemetry GenAI semantic-convention attributes: `gen_ai.provider.name`, `gen_ai.conversation.id`, `gen_ai.tool.name`, and `error.type`."

## Acceptance Criteria
- The `claude_code.api_request` row lists `cache_creation_5m_tokens` and `cache_creation_1h_tokens`.
- The GenAI semantic-convention span attributes are mentioned.
- No other event rows are altered.
