# CBP-421 — [Claude] Worktree-isolation Bash refusal message fix

## Source
Claude Code v2.1.238 release notes: "Fixed worktree-isolation Bash refusals telling you to remove a redirect when the command had none."

## Summary
A worktree-isolation Bash refusal previously told the user to "remove a redirect" even when the command had no redirect — now fixed. The Work Trees collapsible's Tip callout (`id="power-usage--work-trees"`, ~line 11446-11449) already tracks a running list of worktree-isolation behavior fixes with inline version tags (`EnterWorktree` switching, parallel-tool-call independence, permission-grant persistence, background-session commit behavior).

## Assessment
Content partially exists (the Tip callout tracks this exact category of fix) but this specific v2.1.238 correction is not yet listed.

## Plan
1. In `fsad-playbook.html`, locate the Tip callout inside `id="power-usage--work-trees"` (paragraph at line 11448).
2. Append one more sentence to the existing running list, following the "As of vX.Y.Z, ..." pattern already used: "As of v2.1.238, worktree-isolation Bash refusals no longer tell you to remove a redirect when the command had none."

## Acceptance Criteria
- [ ] Tip callout paragraph includes the v2.1.238 fix, matching the existing "As of vX.Y.Z, ..." sentence pattern.
- [ ] No existing sentences in the callout altered or removed.
