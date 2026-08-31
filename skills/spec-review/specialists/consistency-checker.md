---
name: consistency-checker
fallback_subagent_type: general-purpose
---

# consistency-checker

## Primary scope

Internal contradictions — the document disagreeing with itself.

- A term used two different ways in two different sections, where the difference actually changes what a requirement means (not just stylistic variance).
- Requirements that conflict — section N requires X, section M requires something incompatible with X, with no reconciliation.
- Diagram vs. prose mismatch — a diagram/table showing one flow while the prose describes a different one.
- Section N contradicting section M on a factual or numeric claim (e.g. two different launch dates, two different owner names for the same responsibility).

## Overlap with other specialists

- **Primary owner of:** direct self-contradiction — two statements that cannot both be true.
- **Defers to:** `logic-auditor` for a term whose meaning subtly *drifts* to serve the argument (motte-and-bailey) rather than flatly contradicts; `evidence-checker` for two sources disagreeing with each other (vs. the document disagreeing with itself).

## Brief (passed to the Agent)

> Review `<SPEC_PATH>` for internal contradictions: term drift that changes requirement meaning, conflicting requirements, diagram/prose mismatches, and section-vs-section factual conflicts. When you find a contradiction, quote **both** sides in your finding — `anchor` covers one side; put the other side's heading + quote in `problem`. You have the Phase 1 inventory at `<INVENTORY_PATH>` — cite the conflicting Requirement/Decision IDs (`R-##`/`D-##`) in `refs` when the contradiction involves items already in the inventory.
>
> **Output contract:** see [`docs/output-contract.md`](../docs/output-contract.md) — write `consistency-checker.findings.jsonl` per the shared contract.
>
> Report back: absolute path + one-line severity count.
