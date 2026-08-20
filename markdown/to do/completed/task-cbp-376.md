# CBP-376 — Cheat Sheet: GitLab merge request URL support for `--worktree` and `claude agents`

## Source
Claude Code v2.1.233 changelog: "Added GitLab merge request URL support to the `--worktree` flag and the `claude agents` view (where MRs display as `!N`)."

## Summary
Claude Code's `--worktree` CLI flag and the `claude agents` view now support GitLab merge request URLs (in addition to GitHub PR URLs), displaying them as `!N`. The Cheat Sheet's CLI flag table and `claude agents` row don't mention this.

## Assessment
Does content exist? Partially. `fsad-playbook.html` has:
- L11094: `<tr><td><code>--worktree</code> / <code>-w</code></td><td>Start in isolated git worktree</td></tr>` — no mention of PR/MR URL support at all.
- L11071: the `claude agents` row — documents `--cwd`, `--json`, `--all`, `!<command>`, but not PR/MR URL jump-to-session behavior.
- L10962 (`/resume` row) already documents GitHub/GitLab/Bitbucket PR-URL jump-to-session as a precedent pattern — useful style reference.

Needs an update to both rows to note GitLab MR URL support (`!N` display), consistent with the `/resume` row's existing GitHub/GitLab/Bitbucket phrasing.

## Plan
1. Read `fsad-playbook.html` around L11090-11096 (CLI flag table) and L11071 (claude agents row) to confirm current exact text.
2. Update the `--worktree` / `-w` row to note it now accepts a GitHub PR URL or GitLab MR URL to start a worktree from that PR/MR (confirm exact behavior phrasing matches changelog: "Added GitLab merge request URL support to the `--worktree` flag").
3. Update the `claude agents` row (L11071) to note GitLab MRs now display as `!N` in the session list, alongside existing PR-URL handling.
4. Preserve existing table/row structure and inline styling conventions.

## Acceptance Criteria
- [ ] `--worktree` / `-w` row in Cheat Sheet's CLI flag table mentions GitLab MR URL support.
- [ ] `claude agents` row mentions MRs displaying as `!N`.
- [ ] No other content in the row is altered or removed.
- [ ] HTML remains well-formed (table structure, tags balanced).
