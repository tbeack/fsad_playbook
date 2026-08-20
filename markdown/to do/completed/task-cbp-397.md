# CBP-397 — [Codex] `/status` shows estimated thread credits and cost

## Source
Codex CLI rust-v0.148.0

## Summary
`/status` now shows estimated thread credits or cost for eligible workspaces; the same estimate is surfaced in status lines and terminal titles.

## Assessment
Update-existing. The `/status` row (line 13878) currently reads only "Show session config and token usage metrics" — no cost/credit mention. `/usage` (13879) covers account-level activity, which is a different scope. `/statusline` (13874) says only "Configure footer status items".

## Plan
1. Extend the `/status` `<td>` at line 13878 to mention estimated thread credits/cost for eligible workspaces, tagged rust-v0.148.0.
2. Optionally extend the `/statusline` row at 13874 to note the credits/cost status item.

## Acceptance Criteria
- [ ] `/status` row mentions estimated thread credits/cost
- [ ] Scoping to eligible workspaces is stated (not presented as universal)
- [ ] Version tagged rust-v0.148.0
