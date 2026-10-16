# CBP-692 — Update `claude_code.tool_decision` OTel event row: new classifier fields (v2.1.301)

## Summary
Claude Code v2.1.301 added three new attributes to the `claude_code.tool_decision` OpenTelemetry event:
- `classifier_verdict` — the auto-mode classifier's decision
- `permission_mode` — distinguishes auto mode classifier decisions from permission rules
- `classifier_category` — names the built-in rule a classifier block matched (requires `OTEL_LOG_TOOL_DETAILS=1`)

## Assessment
The `claude_code.tool_decision` row at line 3916 in `src/pages/practices.html` currently lists only `tool_name, decision, source, tool_use_id`. The three new fields are missing. The row needs to be updated to include them, noting that `classifier_category` requires `OTEL_LOG_TOOL_DETAILS=1`.

## Plan
1. Read `src/pages/practices.html` around line 3916.
2. Update the key attributes cell of the `claude_code.tool_decision` row to include the three new fields.
3. New cell text: "tool_name, decision, source, tool_use_id, classifier_verdict, permission_mode (auto-mode classifier decisions vs permission rules, v2.1.301); classifier_category (built-in rule matched, requires `OTEL_LOG_TOOL_DETAILS=1`, v2.1.301)"

## Acceptance Criteria
- The `claude_code.tool_decision` row lists all three new fields.
- `classifier_category` is noted as requiring `OTEL_LOG_TOOL_DETAILS=1`.
- No other event rows are altered.
