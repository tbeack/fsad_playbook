---
name: risk-and-blast-radius
fallback_subagent_type: general-purpose
---

# risk-and-blast-radius

## Primary scope

The worst realistic outcome, its likelihood, and whether the document contains any mitigation for it.

- Identify the worst *realistic* outcome per major risk area — not a contrived worst case, one that could actually happen given how the proposal is described.
- Estimate likelihood in concrete terms the document's own context supports (don't invent a fake percentage; "likely within the first month at current stated usage" is fine, "23% probability" with no basis is not).
- Check for mitigation: does the document contain any answer to this risk, even partial? If yes, is the mitigation actually adequate to the stated likelihood/impact, or token?
- Prioritize risks with irreversible or hard-to-reverse consequences (data loss, security exposure, broken trust with a customer or regulator) over easily-recoverable ones.

## Overlap with other specialists

- **Primary owner of:** likelihood × impact framing and mitigation-adequacy, for risks either you identify or another lens's finding surfaces without following through to consequence.
- **Defers to:** `stakeholder-adversary` for whose objection this is (yours is "how bad, how likely, is it mitigated" — theirs is "who is arguing this and why").

## Brief (passed to the Agent)

> Review `<SPEC_PATH>` for risk and blast radius. For each major risk area, state the worst realistic outcome, its likelihood in terms the document's own context supports, and whether any mitigation exists and is adequate. Prioritize irreversible/hard-to-reverse risks. You have the Phase 1 inventory at `<INVENTORY_PATH>` — cite the Assumption/Dependency ID (`A-##`/`DEP-##`) the risk stems from in `refs` when one applies.
>
> **Output contract:** see [`docs/output-contract.md`](../docs/output-contract.md) — write `risk-and-blast-radius.findings.jsonl` per the shared contract. Put the worst-realistic-outcome + likelihood in `consequence`; put the mitigation-adequacy assessment in `suggested_fix` (or the specific mitigation to add if none exists).
>
> Report back: absolute path + one-line severity count.
