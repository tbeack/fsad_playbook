# CBP-482 — [Codex] Add `Interrupt` hook event

## Source
Codex CLI rust-v0.150.0 (2026-08-26), PR #40511: "New `Interrupt` hooks can run commands or MCP handlers when an active top-level turn is interrupted."

## Summary
Codex gains a ninth hook event type: `Interrupt`, firing when an active top-level turn is interrupted, able to run commands or MCP handlers. Add it to the Hook Event Types table and bump the two "8 event types" counts to 9.

## Assessment
- `src/pages/codex.html` line ~796–803 (`#codex-hooks` Hook Event Types table): 8 rows, no `Interrupt`.
- Line ~43 (`#codex-best-practices` comparison table): "8 event types (SessionStart, UserPromptSubmit, PreToolUse, PermissionRequest, PostToolUse, Stop, PreCompact, PostCompact)" — stale count.
- Line ~938 (`#codex-hooks` closing note): "Codex has 8 hook event types" — stale count.

## Plan
1. Add table row after `Stop` (or after `PostCompact`): `Interrupt` — fires when an active top-level turn is interrupted; runs commands or MCP handlers; no blocking (the turn is already stopping); nearest Claude Code analog is a Stop-family/interrupt notification (no direct equivalent — mark "—" or "(no direct equivalent)"). Use "No — runs on interruption" for Can block?.
2. Update line ~43 count to "9 event types (… Stop, Interrupt, PreCompact, PostCompact)".
3. Update line ~938 to "Codex has 9 hook event types".

## Acceptance Criteria
- [ ] `Interrupt` row present in Hook Event Types table with rust-v0.150.0 tag.
- [ ] Both event counts read 9 and the comparison-table event list includes Interrupt.
- [ ] `build-source.py` assembles cleanly.
