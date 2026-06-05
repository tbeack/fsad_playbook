# CBP-233 — Add `\$` escape syntax to Skill Invocation section

## Summary
Claude Code v2.1.163 added a `\$` escape syntax to skill command bodies. When a skill command body contains `\$` followed by a digit, it outputs a literal `$` — preventing it from being treated as a positional argument substitution (`$0`, `$1`, etc.).

## Assessment
- **Skill Invocation "Manual" card** (line 9037): Documents `$ARGUMENTS`, `$0`, `$1` but does not mention `\$` escape.
- **Action needed:** Add a sentence explaining the `\$` escape syntax.

## Plan

### Step 1 — Update Skill Invocation Manual card
Find: `Arguments available via <code>$ARGUMENTS</code>, <code>$0</code>, <code>$1</code>.`
Add sentence: `Use <code>\$</code> to include a literal <code>$</code> before a digit in the command body (e.g. <code>\$1</code> outputs <code>$1</code> verbatim, not as a substitution).`

## Acceptance Criteria
- Manual card mentions `\$` escape syntax with an example
- No HTML broken
