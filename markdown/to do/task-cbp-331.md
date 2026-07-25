# CBP-331 — Add Claude Opus 5 to model table and update `opus` alias

**Source:** Claude Code v2.1.219
**Date:** 2026-07-25

## Summary

Claude Code v2.1.219 added Claude Opus 5 (`claude-opus-5`) as the new default Opus model. It has 1M context and fast mode pricing at $10/$50 per MTok. The `opus` alias now resolves to Opus 5.

## Assessment

**Does this content exist in the playbook? Where?**

- The model comparison table (around line 9870) has columns: Fable 5, Opus 4.8, Opus 4.7, Sonnet 4.6, Haiku 4.5. No Opus 5 column exists.
- The alias table (around line 9894) has an `opus`/`best` row that says "Latest Opus (4.8 on API, Bedrock, Vertex, Foundry)" — now outdated.
- The Key Dates callout (around line 9967) lists model releases up through June 2026 — missing Opus 5.

**What needs to change:**
1. Add a new "Opus 5" column to the model comparison table (between Fable 5 and Opus 4.8)
2. Update the `best`/`opus` alias row to reflect Opus 5
3. Add a Key Dates bullet for Opus 5 (July 25, 2026)

## Plan

### Step 1: Update the model comparison table header (line ~9872)
Add `<th>Opus 5 <span style="font-size:0.7em; font-weight:500; color:var(--accent); vertical-align:middle;">New</span></th>` between Fable 5 and Opus 4.8 columns.

### Step 2: Update each tbody row (lines 9882–9889)
Add a new `<td>` after the Fable 5 `<td>` in each of the 7 data rows:
- Positioning: "Next-gen Opus — 1M context, fast mode; now default `opus` alias (v2.1.219)"
- API ID: `claude-opus-5`
- Input/Output: $10 / $50 per MTok (fast mode)
- Context window: 1M tokens
- Max output: See docs
- Adaptive thinking: Yes
- Relative latency: See docs
- Best for: Complex reasoning, architecture, gnarly bugs — when Fable 5 is over-budget

### Step 3: Update alias table `opus`/`best` row (line ~9901)
Change "Latest Opus (4.8 on API, Bedrock, Vertex, Foundry)" to reflect Opus 5 is now default.

### Step 4: Update Key Dates callout
Change heading from "Key Dates (Apr–Jun 2026)" to "Key Dates (Apr–Jul 2026)" and add July 2026 entry for Opus 5.

## Acceptance Criteria
- Model table shows Opus 5 column between Fable 5 and Opus 4.8
- `opus`/`best` alias row reflects Opus 5 as current target
- Key Dates callout includes Opus 5 release date
- No broken HTML or missing columns in any row
