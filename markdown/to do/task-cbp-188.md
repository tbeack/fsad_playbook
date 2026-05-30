# CBP-188 — Update `/code-review` Cheat Sheet row with v2.1.152 `--fix` behavior

## Summary
Claude Code v2.1.152 added a `--fix` flag to `/code-review`: it applies review findings directly to your working tree (surfacing reuse, simplification, and efficiency suggestions). Additionally, `/simplify` was updated to invoke `/code-review --fix` instead of its old behavior.

Previous CBP-185 (v2.1.147) noted the rename from `/simplify` and the `--comment` flag. CBP-180 was the original add. Now the row needs `--fix` documented.

## Assessment
Line 6485 in `fsad-playbook.html`:
```
<tr><td><code>/code-review</code> <code>[effort]</code></td><td>Run an in-session interactive code review on the current branch. Optionally pass an effort level (e.g., <code>/code-review high</code>) to override the default. Pass <code>--comment</code> to post findings as inline GitHub PR comments. Renamed from <code>/simplify</code> in v2.1.147.</td></tr>
```
Needs `--fix` documented and note that `/simplify` now invokes `/code-review --fix`.

## Plan
1. Edit line 6485 — append to the description: "Pass `--fix` to apply findings directly to your working tree. `/simplify` now invokes `/code-review --fix`."
2. Keep existing effort and `--comment` documentation intact.

## Acceptance Criteria
- `/code-review` row mentions `--fix` flag and its effect (applies findings to working tree)
- Row notes `/simplify` invokes `/code-review --fix`
- Existing `--comment` and effort-level docs are preserved
