# CBP-692 — Update `tool_decision` OTel row with new attributes (v2.1.301)

## Summary
Claude Code v2.1.301 adds two new fields to `claude_code.tool_decision` OpenTelemetry events:
- `classifier_verdict` — distinguishes auto-mode classifier decisions from permission rules
- `permission_mode` — records the permission mode at decision time
- `classifier_category` — names the built-in rule a classifier block matched (only when `OTEL_LOG_TOOL_DETAILS=1`)

## Assessment
The `tool_decision` row in the OTel events table (line 3916) currently shows:
`tool_name, decision, source, tool_use_id`

It needs to add `classifier_verdict`, `permission_mode`, and a note about `classifier_category` being available with `OTEL_LOG_TOOL_DETAILS=1`.

File: `src/pages/practices.html`

## Plan
1. Read `src/pages/practices.html` around line 3916 to confirm exact cell text.
2. Update the attributes cell of the `claude_code.tool_decision` row to:
   `tool_name, decision, source, tool_use_id, classifier_verdict, permission_mode; <code>classifier_category</code> available with <code>OTEL_LOG_TOOL_DETAILS=1</code> (v2.1.301)`

## Acceptance Criteria
- `tool_decision` row attributes column shows the three new fields.
- `classifier_category` is noted as requiring `OTEL_LOG_TOOL_DETAILS=1`.
- Version tag `(v2.1.301)` appears at the end of the attributes cell.
- Build passes without errors.
