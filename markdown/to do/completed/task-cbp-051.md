# CBP-051 — Update default effort for Pro/Max on Opus 4.6 / Sonnet 4.6 (v2.1.117)

## Summary
Claude Code v2.1.117 changed the default effort level for **Pro/Max subscribers** using **Opus 4.6 and Sonnet 4.6** from `medium` to `high`. The playbook currently says "medium (default)" everywhere without model/tier qualification, and the "Effort Default Changed to Medium" callout actively contradicts this new behavior.

## Assessment
Four locations in the playbook need updates:

1. **Line ~4910 callout** (id: model-effort section) — "Effort Default Changed to Medium" callout. The title and body need rewording: medium is still the default for most contexts, but Pro/Max on Opus 4.6/Sonnet 4.6 now defaults to high.
2. **Line ~5004** — Cheat Sheet `/effort` row: `medium (default)` label needs qualification.
3. **Line ~5115** — CLI flags `--effort` row: `medium [default]` label needs qualification.
4. **Line ~4860** — Code block comment `# Balanced (default) — speed + quality` on the `medium` line. Consider adding a note.

The frontmatter effort row (line ~4345) says "Overrides session default (medium)" — this also needs updating to reflect the tier-dependent default.

## Plan

### Step 1 — Update the "Effort Default" callout (lines ~4909-4912)
Change title from "Effort Default Changed to Medium" to "Default Effort Is Tier-Dependent" and rewrite the body to explain:
- Pro/Max subscribers on Opus 4.6 or Sonnet 4.6: default is `high` (as of v2.1.117)
- All other tiers/models: default remains `medium`
- The setting is still sticky across sessions

### Step 2 — Update Cheat Sheet `/effort` row (line ~5004)
Change `medium (default)` to `medium (default for most tiers; Pro/Max on Opus/Sonnet 4.6 defaults to high)` — or a shorter version that fits a table cell.

### Step 3 — Update CLI flags `--effort` row (line ~5115)
Same update: `medium [default]` → note the tier-dependent behavior.

### Step 4 — Update frontmatter effort field description (line ~4345)
Change "Overrides session default (medium)" to "Overrides session default (medium for most tiers; high for Pro/Max on Opus 4.6/Sonnet 4.6)".

### Step 5 — Optionally update the code block comment (line ~4860)
The `/effort medium` line has a comment `# Balanced (default) — speed + quality`. Leave as-is since the code block is illustrative and the callout provides context, OR add a footnote comment.

## Acceptance Criteria
- The "Effort Default" callout no longer says medium is always the default
- The callout explains the Pro/Max + Opus 4.6/Sonnet 4.6 case (default: high) vs other tiers (default: medium)
- Cheat Sheet and CLI flag rows reflect the tier-dependent default
- No other effort-related content contradicts the new reality
- Frontmatter effort row updated
