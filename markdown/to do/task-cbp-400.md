# CBP-400 — [Codex] MCP OAuth reauthentication recovery

## Source
Codex CLI rust-v0.148.0

## Summary
MCP servers now recover after OAuth reauthentication without restarting Codex; reauth errors are clearer; per-server OAuth callback ports and dynamic HTTP header helpers are supported.

## Assessment
Update-existing. `#codex-integrations` step-card 2 "Authenticate via OAuth" (13272-13279) covers only `codex mcp login`. The section has an established version-note pattern — stacked `<p style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:1.5rem;"><strong>… (rust-v0.14X.X):</strong> …</p>` at lines 13250, 13252, 13254 — so this drops in as a fourth.

## Plan
1. Insert a new version-note `<p>` after line 13254, before the step-card at 13256, matching the exact style attribute and `<strong>… (rust-v0.148.0):</strong>` lead-in.
2. Cover: recovery after reauth without restart, clearer reauth errors, per-server callback ports.

## Acceptance Criteria
- [ ] A fourth version-note paragraph exists with the identical style attribute
- [ ] Reauth-without-restart is the headline claim
- [ ] Tagged rust-v0.148.0
