# CBP-346 — [Claude] Update `/code-review` row: `/review` alias, PR review argument, effort-level reuse

## Source
Claude Code v2.1.223

## Summary
v2.1.223 changed `/code-review`: `/review` is now an alias of it; it can review a PR via `/code-review <level> <pr#>`; `/code-review ultra` triggers a deep cloud review; and invoking with no effort level now reuses the level you last typed (previously always fell back to the default).

## Assessment
`fsad-playbook.html` line 11063, Cheat Sheet → Info & account table, `/code-review` row. Currently documents background-subagent execution, `--comment`, `--fix`, and the v2.1.215 explicit-invocation change, but says nothing about the `/review` alias, PR-review form, `ultra` level, or effort-level reuse.

## Plan

### Step 1 — Append to the existing row (line 11063)
Add after the existing sentence ending "...invoke it explicitly when you want a review.":
```html
 As of v2.1.223, <code>/review</code> is an alias of <code>/code-review</code>; pass a PR number to review a pull request instead of the current branch (<code>/code-review &lt;level&gt; &lt;pr#&gt;</code>), and <code>/code-review ultra</code> triggers a deep cloud review. Invoking with no effort level now reuses whichever level you last typed instead of falling back to the default.
```

## Acceptance Criteria
- `/code-review` row documents the `/review` alias
- Row documents PR-review invocation (`/code-review <level> <pr#>`)
- Row documents `/code-review ultra`
- Row documents effort-level reuse behavior
- HTML is valid
