# CBP-079: Update `--from-pr` Cheat Sheet row — GitLab/Bitbucket/GHE support

## Summary
In v2.1.119, `--from-pr` was extended to accept GitLab merge-request, Bitbucket pull-request, and GitHub Enterprise PR URLs — not just github.com PR URLs.

## Assessment
The CLI flags section does not have a `--from-pr` row at all (confirmed by grep returning no results). This is a gap — `--from-pr` is a powerful feature for code review workflows that should be documented. Now that it supports multiple platforms, it's more broadly relevant to FSAD teams.

The best place is the "Print / programmatic mode" flags table (line ~5174–5188) since `--from-pr` is commonly used with `--print` for automated code review.

## Plan
1. Read fsad-playbook.html around line 5174–5188 (Print/programmatic mode flags table)
2. Add a new row for `--from-pr`:
   ```html
   <tr><td><code>--from-pr</code></td><td>Load PR/MR diff as context — accepts GitHub, GitHub Enterprise, GitLab, and Bitbucket URLs</td></tr>
   ```
   Insert before the closing `</tbody>` of that table section.

## Acceptance Criteria
- `--from-pr` row appears in Cheat Sheet CLI flags
- Description mentions GitHub, GitLab, Bitbucket, and GitHub Enterprise support
- Positioned logically in the Print / programmatic mode section
