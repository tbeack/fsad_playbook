---
description: Estimate story points for epics, stories, and tasks using Fibonacci scale
---

# Story Point Estimator

Estimate story points for work items using a Fibonacci scale (1, 2, 3, 5, 8, 13, 21) and a three-factor rubric: Complexity, Effort, and Risk.

## Goal

The point of an estimation pass is **relative consistency within the batch**, not absolute accuracy against some external truth. Two comparably-scoped items should land on comparable point values, and the process should surface — not hide — the cases where that's genuinely hard to call. Everything below (the judge panel, the spread flag, the adversarial consistency pass) exists in service of that one goal.

## Input

The user provides work items after invoking `/fsad-harness:estimate`. Items can be in any format:
- Bullet list
- Numbered list
- Paragraphs
- Mixed formats

Each item needs at minimum a title. Descriptions are optional but improve accuracy.

If no work items are provided after the command, ask the user to provide them.

Optional flag: `--show-factors` — surface the per-factor Complexity/Effort/Risk breakdown for each item (see Output Format). Omit for the default, concise output.

## Estimation Rubric

For each work item, evaluate three factors independently:

| Points | Complexity | Effort | Risk |
|--------|-----------|--------|------|
| 1 | Trivial, well-understood | < 1 hour of focused work | Near-zero unknowns |
| 2 | Simple, minor logic | A few hours | Minimal unknowns |
| 3 | Moderate, some moving parts | Half a day to a day | Some unknowns, manageable |
| 5 | Significant, multiple components | 1-3 days | Notable unknowns or dependencies |
| 8 | Complex, cross-cutting concerns | 3-5 days | Significant unknowns or external dependencies |
| 13 | Very complex, architectural impact | 1-2 weeks | High uncertainty, consider breaking down |
| 21 | Extremely complex, system-wide | 2+ weeks | Very high uncertainty, must break down |

**Scoring method:** The highest individual factor score becomes an item's point value from that pass. The riskiest/hardest dimension dominates.

## Process

### 1. Determine batch size

Count the distinct work items. This determines which estimation mode to use:

- **≤ 5 items** — single-pass mode (step 2a).
- **> 5 items** — 3-judge panel mode (step 2b). The extra passes are worth the cost once there's enough of a batch to actually need cross-item consistency.

### 2a. Single-pass mode (batches of ≤5 items)

For each item, silently evaluate Complexity, Effort, and Risk against the rubric and assign the highest factor score as the point value. Retain the per-factor scores internally (needed for `--show-factors`; see Output Format). No panel, no spread flag — skip straight to step 3.

### 2b. 3-judge panel mode (batches of >5 items)

Dispatch **three independent `Agent` tool calls**, each scoring the full item list fresh against the rubric using step 2a's method. This is what makes the judges genuinely independent rather than a same-context roleplay: each spawned agent's context contains only the item list (titles + descriptions) and the Estimation Rubric — never the other judges' scores, never this conversation's history — so a judge's numbers can't be anchored on another judge's numbers, and correlated bias across "judges" isn't left to an instruction to imagine independence. Send all three `Agent` calls in a **single message** so they run concurrently.

Each agent's prompt:
> Score each of the following work items against this rubric. For each item, evaluate Complexity, Effort, and Risk independently and assign the highest factor score as its point value — the riskiest/hardest dimension dominates. If an item is ambiguous, make a reasonable assumption and score it anyway; don't ask questions back. Return, for each item: `{item_name, complexity, effort, risk, points}`.
>
> [paste the Estimation Rubric table]
>
> Items:
> [paste the item list — titles and descriptions, nothing else from this conversation]

Collect the three structured returns (`judge_1`, `judge_2`, `judge_3`). For each item:
- Record all three judges' point values (and their underlying Complexity/Effort/Risk scores, for `--show-factors`).
- **Final point value = the median of the three judge scores.** (For three values, median is the middle value once sorted — not the mean, so it isn't pulled toward outliers.)
- **Spread = max judge score − min judge score**, measured in Fibonacci steps (position in the 1,2,3,5,8,13,21 sequence, not raw arithmetic difference). If spread ≥ 2 steps, flag the item as **low-confidence** in the output — the judges genuinely disagreed and that disagreement is signal, not noise to be silently averaged away.
- If one agent's return doesn't parse as the expected structure for a given item (missing, malformed, or the agent call itself failed), treat that judge's score for that item as missing: use the average of the two remaining valid scores, rounded to the nearest Fibonacci step, as the final value, and flag the item as **low-confidence** regardless of spread — a missing judge is itself a confidence-reducing event, not something to silently paper over by falling back to single-pass scoring.

### 3. Adversarial consistency pass

After the estimate table is finalized (median values assigned, low-confidence flags set), run one more pass that reads **only the finished table** — item names/descriptions and their final point values, not the scoring conversation or intermediate judge numbers. Compare items pairwise for comparable scope (similar description length, similar keywords, similar apparent surface area) and flag any pair that landed 5+ points apart (by sequence position, e.g. one at 3 and another comparably-scoped one at 13) with no stated reason in either item's description. Report flagged pairs as a note below the table: "Possible inconsistency: '[Item A]' (N pts) vs '[Item B]' (M pts) — comparable scope, no stated reason for the gap."

This pass runs regardless of batch size or which mode (2a/2b) produced the table — it's a check on the output, not on how the output was produced.

### 4. Handle 13+ point items — offer, don't just note

If any item's final point value is 13 or higher, don't just print a suggestion and move on. Ask the user directly: "[Item name] scored [N] — that's high enough to suggest breaking it down. Want me to split it into sub-items and re-estimate each?"

- If the user accepts: work with them to break the item into smaller sub-items, then estimate each sub-item using the mode (2a/2b) determined by the *sub-item* count, and replace the original item's row with the sub-items' rows in the output table.
- If the user declines or doesn't respond: keep the item as-is in the table with the original note ("Consider breaking this down into smaller stories.") and move on. Don't ask again for the same item in this session.

## Output Format

Default output — a simple markdown table:

| Item | Points |
|------|--------|
| [Item name] | [N] |
| [Item name] | [N] |
| **Total** | **[sum]** |

Add a low-confidence marker (e.g. `⚠` next to the point value, or a `Confidence` column) for any item flagged in step 2b. Add adversarial-pass notes (step 3) below the table.

With `--show-factors`, add a per-item factor breakdown beneath the table (or as extra columns — pick whichever stays readable for the batch size):

| Item | Points | Complexity | Effort | Risk | Judges (panel mode only) |
|------|--------|-----------|--------|------|----------------------------|
| [Item name] | [N] | [score] | [score] | [score] | [j1, j2, j3] |

In panel mode, the `Complexity`/`Effort`/`Risk` columns show the factors from the judge pass that produced the median point value.

## Rules

- If any item scores 13 or higher, follow the offer-and-loop in Process step 4 — do not just print advice and stop.
- If an item is too vague to estimate (e.g., "improve performance" with no context), ask the user to clarify before estimating that specific item. Estimate the rest normally.
- Treat epics, stories, and tasks the same — estimate whatever is provided regardless of hierarchy labels.
- Per-factor Complexity/Effort/Risk scores are always computed and retained internally, never discarded — they're required for `--show-factors` and for the panel's median/spread logic. Only the default *output* stays terse; the underlying evidence stays available on request.
- Without `--show-factors`, keep output concise — final point value (plus confidence flag / adversarial notes where applicable), no lengthy justifications.
