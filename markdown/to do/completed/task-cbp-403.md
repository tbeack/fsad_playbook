# CBP-403 — [Codex] Amazon Bedrock Runtime as a built-in provider

## Source
Codex CLI rust-v0.148.0

## Summary
Amazon Bedrock Runtime is now a built-in provider with AWS profile, region, and GPT-5.6 routing support.

## Assessment
Partially covered. A dedicated Bedrock collapsible (14211-14230) already documents `[model_providers.amazon-bedrock.aws]` with `profile` and `region`, and `AWS_PROFILE`/`AWS_REGION` appear in the cheat-sheet env table (13947). Two real gaps: the Multi-Provider Models table (14152-14162 — OpenAI, Azure, Ollama, Gemini, Mistral, DeepSeek, OpenRouter) has no Bedrock row despite the section subtitle naming Bedrock; and GPT-5.6 routing is unmentioned anywhere.

## Plan
1. Add a Bedrock `<tr>` to the multi-provider table after line 14155 (the Azure row), matching that row's exact cell structure.
2. Append GPT-5.6 routing support to the Bedrock prose at line 14228, tagged rust-v0.148.0.

## Acceptance Criteria
- [ ] Multi-provider table includes a Bedrock row with the same column count as its siblings
- [ ] GPT-5.6 routing is documented in the Bedrock collapsible
- [ ] Tagged rust-v0.148.0
