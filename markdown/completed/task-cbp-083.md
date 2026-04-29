# CBP-083: Add `${CLAUDE_EFFORT}` to Building Skills frontmatter String substitutions note

## Summary
In v2.1.120, a new template variable `${CLAUDE_EFFORT}` was added to skill frontmatter. It exposes the current effort level (`low`, `medium`, `high`, `xhigh`, `max`) so skills can branch their behavior based on how much compute is available in the session.

## Assessment
The Building Skills section has a "String substitutions" note (single `<p>` tag) listing `$ARGUMENTS`, `$0`/`$1`, `${CLAUDE_SKILL_DIR}`, and `${CLAUDE_SESSION_ID}`. The new `${CLAUDE_EFFORT}` variable was not listed. A simple append to the existing note is sufficient — no new collapsible or section needed.

## Plan
1. Read fsad-playbook.html to find the String substitutions paragraph in the Building Skills section
2. Append `${CLAUDE_EFFORT}` with a brief description: current effort level — lets a skill branch on `low` / `medium` / `high` / `xhigh` / `max`

## Acceptance Criteria
- String substitutions note includes `${CLAUDE_EFFORT}` with its valid values
- No other Building Skills content changed
