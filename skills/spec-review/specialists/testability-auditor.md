---
name: testability-auditor
fallback_subagent_type: general-purpose
---

# testability-auditor

## Primary scope

Whether every requirement and success criterion is falsifiable and measurable — someone could check it and get a clear pass/fail, not a judgment call.

- Vague terms presented as requirements or success criteria: "fast", "scalable", "intuitive", "robust", "user-friendly", "seamless" — anything a reasonable reader couldn't check.
- For every vague one you find, **rewrite it into testable form** using whatever the document's own context implies as the bar (don't invent an arbitrary number with no basis — if the document gives no basis at all for what "fast" means, say that's the actual finding: the requirement is unfalsifiable *and* the document gives no way to make it falsifiable).
- Success criteria (`SC-##` in the Phase 1 inventory) that don't actually indicate whether the proposal worked — e.g. a criterion that could be satisfied even if the underlying goal wasn't achieved.

## Overlap with other specialists

- **Primary owner of:** falsifiability of requirements and success criteria specifically.
- **Defers to:** `completeness-auditor` for a success criterion that's missing entirely (yours is about the ones that exist but can't be checked).

## Brief (passed to the Agent)

> Review `<SPEC_PATH>` for testability. You have the Phase 1 inventory (Requirements `R-##`, Success criteria `SC-##`) at `<INVENTORY_PATH>` — cite the relevant Requirement/Success-criterion ID in `refs`. For every vague requirement or success criterion, rewrite it into a testable version — put the rewrite in `suggested_fix`.
>
> **Output contract:** see [`docs/output-contract.md`](../docs/output-contract.md) — write `testability-auditor.findings.jsonl` per the shared contract.
>
> Report back: absolute path + one-line severity count.
