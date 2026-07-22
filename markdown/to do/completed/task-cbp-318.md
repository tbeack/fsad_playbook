# CBP-318 — Update `/code-review` cheat sheet row (v2.1.215)

## Summary
Claude Code v2.1.215 changed the behavior of the `/verify` and `/code-review` skills: Claude will no longer invoke them automatically on its own. Users must explicitly call `/code-review` when they want a code review. Previously the model might proactively trigger the skill after completing work; that behavior is removed.

## Assessment
The `/code-review` row already exists in the cheat sheet at line 9987 in the "Info & account" table. The current description does not mention anything about automatic invocation. A brief note should be appended to clarify that, as of v2.1.215, you must invoke it manually — Claude will not run it on your behalf.

## Plan
1. Read lines 9980–9995 of `fsad-playbook.html` to confirm the exact text of the `/code-review` row.
2. Edit the `/code-review` table row to append: "As of v2.1.215, Claude no longer runs this skill automatically — invoke it explicitly when you want a review."
3. Mark CBP-318 complete in `todo.md`.

## Current text (line 9987)
```html
<tr><td><code>/code-review</code> <code>[effort]</code></td><td>Run an in-session interactive code review on the current branch. Optionally pass an effort level (e.g., <code>/code-review high</code>) to override the default. Pass <code>--comment</code> to post findings as inline GitHub PR comments. Pass <code>--fix</code> to automatically apply findings (reuse, simplification, efficiency) to your working tree after review. <code>/simplify</code> runs a cleanup-only review (reuse, simplification, efficiency, altitude) and applies the fixes directly — a lighter alternative to <code>--fix</code>.</td></tr>
```

## Target text
Append to the description cell: " Claude no longer runs this skill automatically — invoke it explicitly when you want a review (v2.1.215)."

## Acceptance Criteria
- [ ] The `/code-review` row in the Info & account table notes that explicit invocation is required as of v2.1.215.
- [ ] No other content is changed in that row.
- [ ] HTML is valid (no broken tags).
