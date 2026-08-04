# CBP-330: Add `/deep-research` to cheat sheet — manual invocation only (v2.1.218)

## Summary
Claude Code v2.1.218 changed `/deep-research` to start only when invoked manually by the user. Claude no longer launches it autonomously. Since this is a meaningful behavior constraint for users who may expect Claude to auto-use it, it should be documented in the cheat sheet.

## Assessment
`/deep-research` does not currently appear in the playbook cheat sheet. Given that `v2.1.218` made this an explicit manual-only command (no more auto-launch), it's worth adding a cheat sheet row alongside `/ultrareview` and `/code-review` in the Power Usage / Info & account table.

Looking at the cheat sheet structure (~line 10155–10168), the best placement is after `/ultrareview` (line 10159) and before `/code-review` (line 10160), since all three are multi-agent review-related commands.

## Plan
1. Open `fsad-playbook.html`.
2. Locate the `/ultrareview` row at ~line 10159.
3. Insert a new row for `/deep-research` after `/ultrareview` and before `/code-review`.

## Exact change

Insert after the `/ultrareview` row (line ~10159) and before the `/code-review` row:

```html
          <tr><td><code>/deep-research</code> <code>[topic]</code></td><td>Fan-out web research harness — launches parallel agents to search, fetch sources, verify claims, and synthesize a cited report on the given topic. As of v2.1.218, only starts when invoked manually; Claude no longer launches it autonomously.</td></tr>
```

## Acceptance Criteria
- A `/deep-research` row appears in the cheat sheet between `/ultrareview` and `/code-review`.
- The description explains what it does and notes the manual-only behavior from v2.1.218.
- No HTML formatting is broken.
