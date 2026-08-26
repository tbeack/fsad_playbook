# CBP-467 — `/code-review`: auto-start expanded to Bedrock/Vertex/Foundry/gateway/telemetry-disabled

## Summary
Claude Code v2.1.246 changed `/code-review` so Claude can also start it on its own on Amazon Bedrock, Google Vertex AI, and Foundry, through the Claude apps gateway, and when telemetry or non-essential traffic is disabled — platforms previously excluded from the auto-start behavior.

## Assessment
The `/code-review` Cheat Sheet row (line 11794) already documents that "as of v2.1.215, Claude no longer runs this skill automatically — invoke it explicitly." v2.1.246 partially reverses/extends that constraint for specific deployment platforms. This is an update to existing, closely-related content — must be phrased carefully to not contradict the still-true general v2.1.215 statement (auto-start is now available again, but only on these platforms/configs).

## Plan
1. In `fsad-playbook.html`, locate the `/code-review` Cheat Sheet row (line 11794).
2. Append a clause after the existing v2.1.215 sentence, before the v2.1.223 sentence, clarifying the v2.1.246 platform-specific exception:
   ```html
   ...As of v2.1.215, Claude no longer runs this skill automatically — invoke it explicitly when you want a review. As of v2.1.246, this restriction is lifted on Amazon Bedrock, Google Vertex AI, and Foundry, through the Claude apps gateway, and when telemetry or non-essential traffic is disabled — Claude may start a review on its own in these configurations. As of v2.1.223, <code>/review</code> is an alias of <code>/code-review</code>; ...
   ```

## Acceptance Criteria
- [ ] `/code-review` row documents the v2.1.246 platform-specific auto-start exception without contradicting the still-true general v2.1.215 explicit-invocation rule.
- [ ] Row remains a single well-formed `<tr>`.
