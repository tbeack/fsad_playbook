# CBP-082: Update Cheat Sheet — `/ultrareview` non-interactive subcommand + `/resume` PR URL paste

## Summary
Two Cheat Sheet rows affected across v2.1.120 and v2.1.122:
- **v2.1.120:** `claude ultrareview [target]` is now available as a non-interactive CLI subcommand for CI/scripts use. Accepts `--json` flag for raw output; exits 0 on completion, 1 on failure.
- **v2.1.122:** `/resume` search box now accepts a pasted GitHub, GitHub Enterprise, GitLab, or Bitbucket PR URL to jump directly to the session that created that PR.

## Assessment
- `/ultrareview` row existed from CBP-047 but only documented the interactive slash command form. The new `claude ultrareview [target]` non-interactive form was not mentioned.
- `/resume` row existed from CBP-053 but only mentioned the stale-session summarization feature. The PR URL paste-to-find feature was not mentioned.
Both rows needed in-place updates.

## Plan
1. Read fsad-playbook.html around the Cheat Sheet `/ultrareview` row
2. Append non-interactive CLI form description: `claude ultrareview [target]` from CI/scripts, `--json` flag, exit codes
3. Read `/resume` row and append: paste a PR URL (GitHub, GHE, GitLab, Bitbucket) into the search box to find the originating session

## Acceptance Criteria
- `/ultrareview` row describes both the interactive (`/ultrareview [PR#]`) and non-interactive (`claude ultrareview [target]`) forms with `--json` and exit code notes
- `/resume` row mentions the PR URL paste-to-find-session feature and the supported platforms
- No other Cheat Sheet rows changed
