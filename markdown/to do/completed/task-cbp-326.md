# CBP-326: Update `/code-review` cheat sheet row — background subagent (v2.1.218)

## Summary
Claude Code v2.1.218 changed `/code-review` to run as a **background subagent**, so the review work no longer fills the active conversation context and stacked slash commands keep the review as their target.

## Assessment
The `/code-review` row exists in the cheat sheet at line ~10160 of `fsad-playbook.html`. The current description begins with "Run an in-session interactive code review on the current branch." This needs to be updated to reflect that the review now runs as a background subagent. The existing note about v2.1.215 (explicit invocation requirement) should be retained.

## Plan
1. Open `fsad-playbook.html`, locate the `/code-review` row (~line 10160).
2. Change the opening phrase from "Run an in-session interactive code review on the current branch." to "Run a code review on the current branch as a background subagent — review work no longer fills your active conversation, and stacked slash commands keep the review as their target."
3. Keep all other content (effort level, `--comment`, `--fix`, `/simplify`, v2.1.215 explicit-invocation note).
4. Add "As of v2.1.218, runs as a background subagent." at the end or integrate into the opening.

## Exact change
**Current text (line ~10160):**
```
<tr><td><code>/code-review</code> <code>[effort]</code></td><td>Run an in-session interactive code review on the current branch. Optionally pass an effort level (e.g., <code>/code-review high</code>) to override the default. Pass <code>--comment</code> to post findings as inline GitHub PR comments. Pass <code>--fix</code> to automatically apply findings (reuse, simplification, efficiency) to your working tree after review. <code>/simplify</code> runs a cleanup-only review (reuse, simplification, efficiency, altitude) and applies the fixes directly — a lighter alternative to <code>--fix</code>. As of v2.1.215, Claude no longer runs this skill automatically — invoke it explicitly when you want a review.</td></tr>
```

**Target text:**
```
<tr><td><code>/code-review</code> <code>[effort]</code></td><td>Run a code review on the current branch as a background subagent — review work no longer fills your active conversation, and stacked slash commands keep the review as their target (v2.1.218). Optionally pass an effort level (e.g., <code>/code-review high</code>) to override the default. Pass <code>--comment</code> to post findings as inline GitHub PR comments. Pass <code>--fix</code> to automatically apply findings (reuse, simplification, efficiency) to your working tree after review. <code>/simplify</code> runs a cleanup-only review (reuse, simplification, efficiency, altitude) and applies the fixes directly — a lighter alternative to <code>--fix</code>. As of v2.1.215, Claude no longer runs this skill automatically — invoke it explicitly when you want a review.</td></tr>
```

## Acceptance Criteria
- The `/code-review` cheat sheet row describes background subagent execution.
- All existing flags (`--comment`, `--fix`, `/simplify`, effort level) are retained.
- The v2.1.215 note about explicit invocation is retained.
- No HTML formatting is broken.
