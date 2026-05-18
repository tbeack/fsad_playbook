# CBP-162: [Codex] Document Hooks General Availability

## Source
OpenAI developers.openai.com/codex/changelog — 2026-05-14 entry: "Hooks general availability"

## Summary
Codex Hooks reached General Availability on 2026-05-14. The feature was previously in preview/experimental status. The playbook's Codex Hooks section already uses GA-ready language but lacks a note marking when GA shipped. Add a small GA callout to the hooks section intro to communicate stability and production-readiness to playbook readers.

## Assessment
The `#codex-hooks` section (line 8863) does not contain "research preview" wording (that was already removed from the `codex exec` startup banner per v0.130.0 notes). The section is written with stable language but has no explicit marker for when GA launched. A brief inline note or callout is warranted to communicate that hooks are production-ready.

## Plan
1. Read `#codex-hooks` section intro paragraph (line 8868).
2. Add a `callout-tip` or inline note after the intro paragraph stating hooks reached GA on 2026-05-14 — no feature flag required, safe for production pipelines.

## Acceptance Criteria
- Codex Hooks section has a visible note or callout marking hooks as GA (reached May 2026)
- No "research preview" or "experimental" language remains in the hooks section
- Existing hook config examples and table are unchanged
