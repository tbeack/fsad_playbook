# CBP-578: Add Touch ID verification for MCP requests to Project Trust callout (rust-v0.155.0)

## Source
Codex CLI rust-v0.155.0 release notes: "Added Touch ID verification for MCP requests in local TUI sessions on supported Macs." (#43624, #43712, #43715)

## Summary
On supported Macs, Codex can now require Touch ID confirmation before honoring an MCP request in a local TUI session — an additional identity-verification layer alongside the existing project-trust and managed-auth protections.

## Assessment
`src/pages/codex.html` `#codex-guidelines` has a "Project Trust & Managed Auth" callout (~line 772) covering rust-v0.147.0/v0.150.0 trust-gating and managed-auth-credential protections. Touch ID verification for MCP requests is a related, additive identity/trust control — **update-existing** rather than a new callout, to keep trust-related security notes consolidated in one place.

## Plan
1. Open `src/pages/codex.html`.
2. In the "Project Trust & Managed Auth" callout (~line 772), append a sentence: as of rust-v0.155.0, on supported Macs, Codex can require Touch ID verification before honoring MCP requests in local TUI sessions — an extra identity check layered on top of project trust and managed-auth protections.
3. Mark CBP-578 complete in `markdown/to do/todo.md`.

## Acceptance Criteria
- The "Project Trust & Managed Auth" callout in `#codex-guidelines` mentions Touch ID verification for MCP requests, tagged `rust-v0.155.0`.
- `python3 scripts/build-source.py` completes without error after the edit.
