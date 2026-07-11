# CBP-297 — Update model defaults table: Bedrock/Vertex/Foundry → Opus 4.8

## Summary
Claude Code v2.1.207 changed the default model for Bedrock, Vertex AI, and Claude Platform on AWS from Sonnet 4.5 to Opus 4.8.

## Assessment
The Model & Effort section contains a model alias table (around line 9718) with a `default` row showing tier-dependent model resolution. Currently it says "Bedrock / Vertex / Foundry → Sonnet 4.5". This needs to be updated to "Bedrock / Vertex / Foundry → Opus 4.8".

The `sonnet` alias row (line 9721) has a parenthetical "(4.5 on Bedrock / Vertex / Foundry)" — this refers to the `sonnet` alias resolving to Sonnet 4.5 on those platforms, which is a separate concern from the `default` alias. The `sonnet` alias likely still resolves to Sonnet 4.5 since Sonnet 5 may not be available on Bedrock/Vertex/Foundry. Leave the `sonnet` row unchanged.

## Plan
1. Find line 9718 in `fsad-playbook.html` — the `default` alias row
2. Change "Bedrock / Vertex / Foundry → Sonnet 4.5" to "Bedrock / Vertex / Foundry → Opus 4.8"

## Acceptance Criteria
- The `default` alias row in the model table shows Opus 4.8 (not Sonnet 4.5) for Bedrock/Vertex/Foundry
- No other model table rows changed
