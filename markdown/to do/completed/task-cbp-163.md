# CBP-163: [Codex] Add Codex Access Tokens collapsible to Power Usage

## Source
OpenAI developers.openai.com/codex/changelog — 2026-05-14 entry: "Codex access tokens for trusted automation"
Also: 2026-05-05 entry: "ChatGPT Enterprise workspace owners can authorize members to create Codex access tokens — tokens enable trusted, non-interactive Codex local workflows; members use access tokens for scripts, schedulers, private CI runners; tokens use ChatGPT workspace identity"

## Summary
Codex access tokens allow ChatGPT Enterprise workspace members to run non-interactive Codex workflows without manual authentication. Tokens are scoped to a ChatGPT workspace identity and are suitable for scripts, schedulers, and private CI runners. This is the Codex equivalent of Claude Code's headless/API-key usage pattern and belongs in the Power Usage section.

## Assessment
No coverage of Codex access tokens exists in `#codex-power-usage`. The CI/CD collapsible (line 9248) covers `codex exec` for pipelines but doesn't address authentication for automated/non-interactive runs. A new collapsible should be added after the CI/CD Integration collapsible.

## Plan
1. Read the CI/CD Integration collapsible (lines 9248–9276) to match HTML pattern.
2. Insert a new collapsible `Codex Access Tokens` after the CI/CD collapsible covering:
   - What access tokens are (ChatGPT workspace-scoped, non-interactive)
   - Who can create them (Enterprise workspace owners authorize members)
   - Use cases: scripts, schedulers, private CI runners
   - Brief note on how to generate (ChatGPT Enterprise settings)
   - Security note: treat like API keys — don't commit to version control

## Acceptance Criteria
- New "Codex Access Tokens" collapsible appears in `#codex-power-usage` after CI/CD Integration
- Covers use case, who can create tokens, and security guidance
- Follows existing collapsible HTML pattern
