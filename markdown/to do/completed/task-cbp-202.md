# CBP-202 — Fix `/code-review` Cheat Sheet row: `/simplify` reverted to cleanup-only (v2.1.154)

## Summary

In v2.1.154, Anthropic **reverted** the `/simplify` behavior introduced in v2.1.152. As of v2.1.154:
- `/simplify` runs a cleanup-only review (reuse, simplification, efficiency, altitude) and applies the fixes — it does **not** invoke `/code-review --fix`.
- `/code-review --fix` still applies review findings to the working tree, but `/simplify` is now a distinct, lighter-weight command.

The current playbook (CBP-192) says `/simplify` now invokes `/code-review --fix`. This is outdated.

## Assessment

**File:** `fsad-playbook.html`  
**Line:** 9158  
**Current text:**
```
Run an in-session interactive code review on the current branch. Optionally pass an effort level (e.g., /code-review high) to override the default. Pass --comment to post findings as inline GitHub PR comments. Pass --fix to automatically apply findings (reuse, simplification, efficiency) to your working tree after review. /simplify now invokes /code-review --fix.
```

**Change needed:** Remove the trailing sentence "`/simplify` now invokes `/code-review --fix`." and replace it with: "`/simplify` runs a cleanup-only review (reuse, simplification, efficiency, altitude) and applies fixes directly — a lighter alternative to `--fix`."

## Plan

1. Locate line 9158 in `fsad-playbook.html`.
2. Replace the `/code-review` table row `<td>` description:
   - Remove: `<code>/simplify</code> now invokes <code>/code-review --fix</code>.`
   - Add: `<code>/simplify</code> runs a cleanup-only review (reuse, simplification, efficiency, altitude) and applies the fixes directly — lighter than <code>--fix</code>.`
3. Mark task complete in `todo.md`.

## Acceptance Criteria

- The Cheat Sheet `/code-review` row no longer says `/simplify` invokes `/code-review --fix`.
- The row accurately reflects v2.1.154 behavior.
