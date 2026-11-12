# CBP-713: Update `/ultrareview` row — workspace trust requirement (v2.1.309)

## Summary
Claude Code v2.1.309 changed `claude ultrareview` (and `/ultrareview`) to require workspace trust: it asks on a terminal, and refuses otherwise. Scripts and CI must now pass `--trust-workspace` (a bare flag — put a PR number or base branch before it) or set `CLAUDE_CODE_DISABLE_ULTRAREVIEW_TRUST_CHECK=1` to skip the check. This directly affects the playbook's existing `/ultrareview` row, which documents non-interactive CI/script usage without mentioning the trust requirement — a script following the current docs would now get refused.

## Assessment
`src/pages/practices.html` line 1902 (slash commands table) reads:
```html
<tr><td><code>/ultrareview</code> <code>[PR#]</code></td><td>Cloud-based parallel multi-agent code review — omit args for current branch, or pass a GitHub PR number. Also available as <code>claude ultrareview [target]</code> non-interactively from CI/scripts (<code>--json</code> for raw output; exits 0 on completion, 1 on failure). Both forms wait up to 45 minutes for long-running cloud reviews (v2.1.260; previously 30).</td></tr>
```
No mention of workspace trust exists elsewhere in the file.

## Plan
1. Open `src/pages/practices.html`.
2. Append a sentence to the `/ultrareview` row noting the v2.1.309 trust requirement and the two ways to satisfy it non-interactively.

## Acceptance Criteria
- The `/ultrareview` row explains that non-interactive/CI use now requires `--trust-workspace` or `CLAUDE_CODE_DISABLE_ULTRAREVIEW_TRUST_CHECK=1`.
- Version-tagged `(v2.1.309)`.
- No other rows disturbed.
