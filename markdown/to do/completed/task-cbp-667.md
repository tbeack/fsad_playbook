# CBP-667 — [Codex] GPT-6.1 Sol default model in bundled and Bedrock catalogs (rust-v0.161.0)

## Summary
[Codex] GPT-6.1 Sol is now the default model in the bundled and Amazon Bedrock catalogs; Bedrock supports multi-agent V2 and Ultra reasoning, and Mantle accepts AWS GovCloud regions (rust-v0.161.0).

## Source
Codex CLI rust-v0.161.0 (2026-10-07). Found by the Phase 5.5 refuter as an unaccounted release item.

## Assessment
src/pages/codex.html still limited the GPT-6.1 Sol default to Mantle/Runtime catalogs (rust-v0.159.1) and omitted it from the OpenAI row.

## Plan
Update the OpenAI and Amazon Bedrock rows of the provider table in src/pages/codex.html.
Then run `python3 scripts/build-source.py`.

## Acceptance Criteria
- [x] The OpenAI row lists `gpt-6.1-sol` and the Bedrock row cites rust-v0.161.0.
- [x] Build passes.
