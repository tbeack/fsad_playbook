# CBP-402 — [Codex] Automatic review enforcement for managed models and MCP tool calls

## Source
Codex CLI rust-v0.148.0

## Summary
Automatic review is now enforced for managed models, and strict auto-review is enforced for MCP tool calls.

## Assessment
Update-existing, materially changes the section's premise. `#codex-code-review` documents `/review` purely as a manual, user-invoked slash command across three step-cards (13473-13494) and frames it as "single-agent by default" (13498). Nothing mentions automatic review, managed-model enforcement, or auto-review gating MCP tool calls — which is now the reality for enterprise/managed users.

## Plan
1. Insert a new callout at line 13495, between the last step-card (ends 13494) and the Claude Code Comparison callout (13496-13499).
2. State that review is no longer exclusively manual for managed configurations, and that MCP tool calls are subject to strict auto-review. Tag rust-v0.148.0.

## Acceptance Criteria
- [ ] Section no longer implies `/review` is the only review path
- [ ] Managed-model enforcement and MCP-tool-call auto-review are both named
- [ ] Callout markup matches sibling callouts in the section
- [ ] Tagged rust-v0.148.0
