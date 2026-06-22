# CBP-244 — Add Claude Fable 5 (Mythos-class) to Model & Effort section

## Summary
Claude Code v2.1.170 introduces **Claude Fable 5**, described as a "Mythos-class model that we've made safe for general use" with capabilities exceeding any model previously made generally available. This is a new top-tier model in the Claude lineup. Reference: https://www.anthropic.com/news/claude-fable-5-mythos-5

## Assessment
The playbook's **Model & Effort section** (around line 9580–9695) contains:
1. A **current model lineup table** with columns: Opus 4.8 (newest), Opus 4.7, Sonnet 4.6, Haiku 4.5
2. A **Claude Code model aliases table** (default, best/opus, sonnet, haiku, opus[1m]/sonnet[1m], opusplan)
3. **Code examples** for /model aliases
4. A **best-practice combinations by workload** table
5. A **Key Dates callout** listing model releases

Claude Fable 5 is described as a new Mythos-class model exceeding all previous models. It needs to be added as a new column to the lineup table, and the aliases/workload tables should be updated to reflect it as the new frontier model.

## Plan

### Step 1 — Update the model lineup table (~line 9591)
Add a new "Fable 5" column as the leftmost (most capable) column:
- Positioning: Most capable — Mythos-class, general-use frontier
- API ID: `claude-fable-5` (inferred from naming pattern; use Fable 5 as name)
- Mark with `New` badge
- Move Opus 4.8's `New` badge off (it's no longer newest)

Since we don't have confirmed pricing/specs beyond "Mythos-class", use available info and mark unknowns with "See docs".

### Step 2 — Update the `best/opus` alias row (~line 9616)
Add Fable 5 as the new top-tier model resolved by `best` / `opus` aliases (or note it as a separate alias).

### Step 3 — Update the Key Dates callout (~line 9682)
Add a June 9, 2026 entry: "Claude Fable 5 released — Mythos-class model, generally available."

### Step 4 — Update the best-practice combinations table (~line 9656)
Add Fable 5 as the recommended model for highest-stakes workloads (incident RCA, architecture).

## Acceptance Criteria
- Model lineup table shows Fable 5 as newest column with `New` badge
- Key Dates callout includes June 9, 2026 Fable 5 release entry
- Aliases table references Fable 5 for `best`/`opus` or as a separate entry
- No broken HTML; table renders correctly in browser
