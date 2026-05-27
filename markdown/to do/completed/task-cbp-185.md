# CBP-185 — Update `/code-review` Cheat Sheet entry: add `--comment` flag, correct version reference

## Summary

Claude Code v2.1.147 renamed `/simplify` to `/code-review` (not v2.1.146 as currently stated in the playbook) and added a `--comment` flag to post findings as inline GitHub PR comments. The current cheat sheet row is missing the `--comment` capability and has the wrong version number.

## Assessment

**Current state in playbook (line 6485):**
```html
<tr><td><code>/code-review</code> <code>[effort]</code></td><td>Run an in-session interactive code review on the current branch. Optionally pass an effort level (e.g., <code>/code-review high</code>) to override the default. Renamed from <code>/simplify</code> in v2.1.146.</td></tr>
```

**Problems:**
1. The rename happened in v2.1.147, not v2.1.146
2. The `--comment` flag (posts findings as inline GitHub PR comments) is not mentioned

**Action:** Update existing — edit the td description in the cheat sheet row.

## Plan

1. Read `fsad-playbook.html` around line 6485
2. Edit the `/code-review` table row to:
   - Add mention of `--comment` flag
   - Correct version reference from `v2.1.146` to `v2.1.147`

**New text for the description td:**
```
Run an in-session interactive code review on the current branch. Optionally pass an effort level (e.g., <code>/code-review high</code>) to override the default. Pass <code>--comment</code> to post findings as inline GitHub PR comments. Renamed from <code>/simplify</code> in v2.1.147.
```

## Acceptance Criteria

- [ ] The `/code-review` cheat sheet row mentions `--comment` with a clear description
- [ ] The version reference reads `v2.1.147` (not `v2.1.146`)
- [ ] No other content is changed
