# CBP-187 — Update `/code-review` Cheat Sheet row: add `--comment` flag

## Summary
Claude Code v2.1.147 added a `--comment` flag to `/code-review` that posts findings as inline GitHub PR comments. This was introduced alongside the rename from `/simplify`.

## Assessment
The `/code-review` row at line 6485 currently reads:

```
Run an in-session interactive code review on the current branch. Optionally pass an effort level (e.g., `/code-review high`) to override the default. Renamed from `/simplify` in v2.1.146.
```

The `--comment` flag is entirely missing and is a significant usability feature for teams using GitHub PRs.

## Plan
1. Read line 6485 of `fsad-playbook.html`
2. Edit the `/code-review` row td to add the `--comment` flag:
   - Append after the effort level sentence: `Pass <code>--comment</code> to post findings as inline GitHub PR comments.`
   - Keep the rename note at the end.

## Acceptance Criteria
- The `/code-review` Cheat Sheet row mentions `--comment` for posting inline GitHub PR comments.
- Effort level usage and rename note are preserved.
