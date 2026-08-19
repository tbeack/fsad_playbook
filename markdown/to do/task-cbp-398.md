# CBP-398 — [Codex] `codex doctor` gains storage diagnostics

## Source
Codex CLI rust-v0.148.0

## Summary
`codex doctor` now includes storage diagnostics.

## Assessment
Update-existing, one-clause edit. The `codex doctor` row (line 13907) enumerates diagnostic domains — "runtime, auth, terminal, network, config, and local state" — and storage is simply absent from that list.

## Plan
1. Extend the domain list in the `<td>` at line 13907 to include storage, noting it was added in rust-v0.148.0 while preserving the existing "Added in v0.131.0" provenance.

## Acceptance Criteria
- [ ] Storage appears in the `codex doctor` diagnostic domain list
- [ ] Original v0.131.0 provenance is preserved
- [ ] Row markup unchanged apart from the `<td>` text
