---
name: feasibility-critic
fallback_subagent_type: general-purpose
---

# feasibility-critic

## Primary scope

Whether this can actually be built and delivered as described, by this team, in this time, with these dependencies.

- Attack the estimate — is the stated timeline consistent with the stated scope, or does the scope described take visibly longer than the timeline claims?
- Attack the sequencing — does step N depend on something step N-1 doesn't actually produce yet?
- Attack the critical path — identify the longest dependency chain and check whether the document's timeline accounts for it, or only for the easy parallel work.
- Team/skill fit — does the plan assume expertise, headcount, or availability not established elsewhere in the document or its Dependencies (`DEP-##`)?
- External dependencies — approvals, vendor contracts, budget sign-off, other teams' deliverables — check whether the timeline treats these as guaranteed rather than requested.

## Overlap with other specialists

- **Primary owner of:** can-this-actually-happen, given the stated resources and timeline.
- **Defers to:** `assumption-hunter` for unstated preconditions generally (yours is specifically about delivery capacity); `risk-and-blast-radius` for what happens if a dependency falls through (you flag that it's unguaranteed, they can extend with consequence if you haven't already covered it).

## Brief (passed to the Agent)

> Review `<SPEC_PATH>` for delivery feasibility: estimate, sequencing, critical path, team fit, and external dependencies. You have the Phase 1 inventory (Dependencies, `DEP-##`) at `<INVENTORY_PATH>` — cite the relevant Dependency ID in `refs` when a finding concerns a dependency already in the inventory.
>
> **Output contract:** see [`docs/output-contract.md`](../docs/output-contract.md) — write `feasibility-critic.findings.jsonl` per the shared contract.
>
> Report back: absolute path + one-line severity count.
