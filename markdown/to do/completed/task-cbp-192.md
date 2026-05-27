# CBP-192 — Update `/code-review` Cheat Sheet entry to document `--fix` flag

## Summary
Claude Code v2.1.152 added `/code-review --fix` which applies review findings directly to the working tree after review. Additionally, `/simplify` now invokes `/code-review --fix` (previously `/simplify` was renamed to `/code-review` in v2.1.147).

## Assessment
The current `/code-review` row (line 6485) reads:
> "Run an in-session interactive code review on the current branch. Optionally pass an effort level (e.g., `/code-review high`) to override the default. Pass `--comment` to post findings as inline GitHub PR comments. Renamed from `/simplify` in v2.1.147."

This needs to be updated to:
1. Document `--fix` flag
2. Note that `/simplify` now invokes `/code-review --fix` (restoring `/simplify` as a real alias)

**Does this content exist?** Partially — the row exists but `--fix` is not documented.

**Where to update:** Line 6485.

## Plan
1. Read line 6485 to confirm current text
2. Replace the existing row with an updated version that mentions `--fix`:
   ```html
   <tr><td><code>/code-review</code> <code>[effort]</code></td><td>Run an in-session interactive code review on the current branch. Optionally pass an effort level (e.g., <code>/code-review high</code>) to override the default. Pass <code>--comment</code> to post findings as inline GitHub PR comments. Pass <code>--fix</code> to automatically apply findings (reuse, simplification, efficiency) to your working tree after review. <code>/simplify</code> now invokes <code>/code-review --fix</code>.</td></tr>
   ```

## Acceptance Criteria
- `/code-review` row mentions `--fix` flag with a description of what it does
- Row notes that `/simplify` now invokes `/code-review --fix`
- `--comment` and effort-level info is preserved
