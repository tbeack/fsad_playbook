# CBP-382 — Update the `prUrlTemplate` Notable Keys bullet for the native GitLab MR badge

## Source
Claude Code v2.1.234 — "Added a GitLab merge request badge to the footer and statusline: repos with a GitLab remote and an authenticated glab CLI show MR !N with draft/pending/green states."

## Summary
The `prUrlTemplate` bullet currently recommends a custom URL template as the workaround for
GitLab teams. That advice is now partially stale — GitLab gets a native footer/statusline
badge. Update the bullet rather than adding a new section.

## Assessment
- `fsad-playbook.html` line 9738, inside the "Notable `settings.json` Keys" callout in
  `#config-cascade` (callout starts line 9734):
  `<li …><code>prUrlTemplate</code> — Point the footer PR badge to a custom review URL instead of github.com. Useful for GitLab, Bitbucket, or GitHub Enterprise teams.</li>`
- Existing GitLab coverage elsewhere (do **not** duplicate into these):
  - Line 11075 `claude agents` row — GitLab MR URLs display as `!N` (v2.1.233).
  - Line 11098 `--worktree` flag — accepts a GitLab MR URL (v2.1.233).
  - Line 11136 `--from-pr` — accepts GitLab URLs.
  - Line 10966 `/resume` — accepts a GitLab PR URL in the search box.
- None of these cover the **footer/statusline badge**. `#integrations` is MCP-only and is not
  a fit. Content does not exist; the line-9738 bullet is the precise home.

## Plan
1. Read lines 9734-9742 to confirm the callout's `<li>` styling attributes exactly.
2. Rewrite the `prUrlTemplate` `<li>`, preserving its inline `style` attribute and the
   `<code>prUrlTemplate</code>` lead-in.
3. New copy should: keep the original meaning (point the footer PR badge at a custom review
   URL instead of github.com; still useful for Bitbucket and GitHub Enterprise), then note
   that as of v2.1.234 GitLab no longer needs the template for the badge — repos with a
   GitLab remote and an authenticated `glab` CLI show a native `MR !N` badge in the footer
   and statusline, with draft / pending / green states.
4. Keep `glab` and `MR !N` in `<code>` tags, matching the callout's existing use of `<code>`.

## Acceptance Criteria
- [ ] The `prUrlTemplate` bullet remains a single `<li>` in the Notable Keys callout with its original inline `style` preserved.
- [ ] The bullet still explains what `prUrlTemplate` does (custom footer PR badge URL) — the original guidance is not lost.
- [ ] The native GitLab MR badge is described accurately: requires a GitLab remote **and** an authenticated `glab` CLI, displays `MR !N`, and has draft/pending/green states.
- [ ] The change is tagged `(v2.1.234)`.
- [ ] Bitbucket / GitHub Enterprise remain listed as cases where the template is still the answer.
- [ ] No duplicate GitLab badge content is added to the Cheat Sheet rows at 11075/11098/11136.
