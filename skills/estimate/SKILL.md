---
description: Estimate story points for epics, stories, and tasks using Fibonacci scale
---

# Story Point Estimator

Estimate story points for work items using a Fibonacci scale (1, 2, 3, 5, 8, 13, 21) and a three-factor rubric: Complexity, Effort, and Risk.

## Input

The user provides work items after invoking `/fsd:estimate`. Items can be in any format:
- Bullet list
- Numbered list
- Paragraphs
- Mixed formats

Each item needs at minimum a title. Descriptions are optional but improve accuracy.

If no work items are provided after the command, ask the user to provide them.

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

**Scoring method:** The highest individual factor score becomes the point value. The riskiest/hardest dimension dominates.

## Process

1. Parse the input to identify each distinct work item (title + optional description)
2. For each item, silently evaluate Complexity, Effort, and Risk against the rubric
3. Assign the highest factor score as the final point value
4. Output the results table

## Output Format

Output a simple markdown table:

| Item | Points |
|------|--------|
| [Item name] | [N] |
| [Item name] | [N] |
| **Total** | **[sum]** |

## Rules

- If any item scores 13 or higher, add a note below the table: "[Item name]: Consider breaking this down into smaller stories."
- If an item is too vague to estimate (e.g., "improve performance" with no context), ask the user to clarify before estimating that specific item. Estimate the rest normally.
- Treat epics, stories, and tasks the same — estimate whatever is provided regardless of hierarchy labels.
- Do NOT show the individual Complexity/Effort/Risk scores — only the final point value.
- Do NOT add lengthy justifications. Keep output concise.
