# CBP-802: Update skill `model` frontmatter row — no longer affects subagents/forks/compaction/`/recap` (v2.1.330)

## Summary
Claude Code v2.1.330 changed skills that Claude runs with a `model` setting, other than `context: fork` skills, to leave subagents, forks, compaction, and `/recap` on the session's model instead of the skill's override.

## Assessment
`src/pages/practices.html`'s Frontmatter Reference table (`building-skills--frontmatter-reference` collapsible, ~line 1227) documents the `model` field but not this narrowing of its scope.

## Plan
1. Open `src/pages/practices.html`.
2. Update the `model` field row to append:
   ```
    As of v2.1.330, for skills other than context: fork skills, this override no longer changes the model that subagents, forks, compaction, and /recap run on — those stay on the session's own model.
   ```
3. No other files require changes for this task.

## Acceptance Criteria
- The `model` frontmatter row documents the v2.1.330 scope narrowing.
- HTML is valid (no unclosed tags).

## Status
Implemented.
