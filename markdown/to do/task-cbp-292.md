# CBP-292 — Add `/dataviz` to Cheat Sheet slash commands

## Summary
Claude Code v2.1.198 added `/dataviz`, a built-in skill for chart and dashboard design guidance with a runnable color-palette validator.

## Assessment
Confirmed absent from `fsad-playbook.html` (grep returned no results). This is a new built-in skill that ships with Claude Code, similar to `/code-review`, `/simplify`, `/ultrareview`, etc. It should be added to the Cheat Sheet slash commands table in the "Skills & automation" or "Built-in skills" section.

## Plan
1. Read fsad-playbook.html to find where other built-in skills like `/code-review`, `/ultrareview` are listed in the Cheat Sheet
2. Add a new row for `/dataviz` following the same `<tr><td><code>/dataviz</code></td><td>...</td></tr>` pattern
3. Description: "Built-in skill for chart and dashboard design guidance with a runnable color-palette validator (v2.1.198)."
4. Place it alphabetically near other `/d*` commands or grouped with other built-in skills

## Acceptance Criteria
- `/dataviz` row exists in the Cheat Sheet slash commands table
- Description accurately reflects the skill's purpose
- Version note `v2.1.198` included
