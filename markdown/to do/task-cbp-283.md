# CBP-283 — Add `OTEL_LOG_ASSISTANT_RESPONSES` to OTEL privacy callout (v2.1.193)

## Summary
Claude Code v2.1.193 added a new `claude_code.assistant_response` OpenTelemetry log event that captures the model's response text. It is redacted by default. The new env var `OTEL_LOG_ASSISTANT_RESPONSES=1` opts in to capturing response text. When the var is unset, it follows `OTEL_LOG_USER_PROMPTS` — so any deployment already logging prompts will also start receiving responses on upgrade unless `OTEL_LOG_ASSISTANT_RESPONSES=0` is set explicitly.

## Assessment
The "Opt-in Detail Levels" callout at line 11627–11630 of `fsad-playbook.html` currently documents `OTEL_LOG_USER_PROMPTS=1` and `OTEL_LOG_TOOL_DETAILS=1`. It also has a corresponding Privacy section around lines 11714–11716. Both places should be updated to mention `OTEL_LOG_ASSISTANT_RESPONSES`.

The "Opt-in Detail Levels" callout text (line 11629) should be extended to mention the new var. The Privacy section bullets (lines 11714–11716) should also get a new bullet.

## Plan
1. Read lines 11627–11630 and 11710–11720 to confirm context.
2. Update the "Opt-in Detail Levels" callout (line 11629) to add mention of `OTEL_LOG_ASSISTANT_RESPONSES=1`.
3. Add a new bullet to the Privacy section after the "Prompts redacted" bullet documenting the assistant response redaction.
4. Mark CBP-283 complete in `todo.md`.

## Acceptance Criteria
- The "Opt-in Detail Levels" callout mentions `OTEL_LOG_ASSISTANT_RESPONSES=1`.
- The Privacy section has a bullet documenting that response text is redacted unless `OTEL_LOG_ASSISTANT_RESPONSES=1` is set, and that it follows `OTEL_LOG_USER_PROMPTS` when unset.
- Version tag `(v2.1.193)` is present.
