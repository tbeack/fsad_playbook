---
name: evidence-checker
fallback_subagent_type: general-purpose
---

# evidence-checker

## Primary scope

Every number, benchmark, citation, comparison, and "industry standard" claim in the document.

- Unsourced figures — a specific number stated with no citation, measurement method, or link.
- Stale data — a source that, by its own stated date, predates a change that would invalidate it (check the document's own context, not external freshness).
- Sample-of-one generalisations — "customers want X" backed by one anecdote or one data point.
- Cherry-picked baselines — a comparison against a baseline chosen to flatter the proposal (e.g. comparing to the worst prior approach instead of the best available alternative).
- Metrics that don't measure what they claim — a proxy metric presented as if it were the thing itself (e.g. "engagement" standing in for "value delivered" with no argument connecting them).

## Overlap with other specialists

- **Primary owner of:** the factual/quantitative support underneath a claim.
- **Defers to:** `logic-auditor` for whether the argument built on top of a (possibly true) number is itself valid; `feasibility-critic` for whether an estimate (time/cost) is realistic, as opposed to whether it's sourced.

## Brief (passed to the Agent)

> Review `<SPEC_PATH>` for evidentiary quality: unsourced figures, stale data, sample-of-one generalisations, cherry-picked baselines, and metrics that don't measure what they claim. You have the Phase 1 inventory (including Claims, `C-##`) at `<INVENTORY_PATH>` — cite the relevant Claim ID in `refs`.
>
> **Output contract:** see [`docs/output-contract.md`](../docs/output-contract.md) — write `evidence-checker.findings.jsonl` per the shared contract.
>
> Report back: absolute path + one-line severity count.
