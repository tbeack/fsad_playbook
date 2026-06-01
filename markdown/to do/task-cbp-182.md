# CBP-182 — Update `/code-review` cheat sheet entry for v2.1.147 behavior

## Summary

In v2.1.147, `/code-review` (renamed from `/simplify`) received a major behavior change:
- It now **reports correctness bugs** at a chosen effort level (e.g., `/code-review high`)
- New `--comment` flag posts findings as **inline GitHub PR comments**
- The old cleanup-and-fix behavior has been removed

The playbook's current entry (line 6327) references "v2.1.146" as the rename version (incorrect — it was v2.1.147) and doesn't mention the `--comment` flag or the correctness-bug focus.

## Assessment

**Existing content:** Line 6327 in the Cheat Sheet (Info & account table):
```html
<tr><td><code>/code-review</code> <code>[effort]</code></td><td>Run an in-session interactive code review on the current branch. Optionally pass an effort level (e.g., <code>/code-review high</code>) to override the default. Renamed from <code>/simplify</code> in v2.1.146.</td></tr>
```

**What needs to change:**
1. Fix the version reference: v2.1.146 → v2.1.147
2. Update description to reflect correctness-bug reporting focus
3. Add `--comment` flag

## Plan

Edit line 6327 of `fsad-playbook.html`:

**Old:**
```html
<tr><td><code>/code-review</code> <code>[effort]</code></td><td>Run an in-session interactive code review on the current branch. Optionally pass an effort level (e.g., <code>/code-review high</code>) to override the default. Renamed from <code>/simplify</code> in v2.1.146.</td></tr>
```

**New:**
```html
<tr><td><code>/code-review</code> <code>[effort]</code> <code>[--comment]</code></td><td>Report correctness bugs in the current branch at a chosen effort level (e.g., <code>/code-review high</code>). Pass <code>--comment</code> to post findings as inline GitHub PR comments. Renamed from <code>/simplify</code> in v2.1.147.</td></tr>
```

## Acceptance Criteria
- `/code-review` row description mentions correctness bugs, not generic "code review"
- `--comment` flag is documented
- Version reference reads v2.1.147
