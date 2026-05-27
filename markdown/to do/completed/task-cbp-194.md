# CBP-194 — Auto-merge PR after creation in cbp_auto_updater_agent

## Summary
The auto-updater agent currently ends Phase 7 by creating a PR and stopping. This task adds a Phase 7 step 8 that immediately merges the PR (using `gh pr merge`) after it is successfully created, and deletes the remote feature branch. This makes the update workflow fully hands-off — no manual PR review or merge step is required for routine playbook updates.

## Assessment
Two agent instruction files need updating:

1. **`.claude/agents/playbook-updater/agent.md`** — the actual agent spec consumed by the `playbook-updater` subagent type. Phase 7 ends at step 7 (`gh pr create …`). No merge step exists.

2. **`markdown/agents/auto_update_agent.md`** — the reference/documentation copy called `cbp_auto_updater_agent`. Phase 7 also ends at step 7. No merge step exists.

Both files need a new **step 8** appended to Phase 7. No other sections need changes; the merge is a tail addition, not an insertion.

## Plan

1. **Edit `.claude/agents/playbook-updater/agent.md`** — after the `gh pr create` block in Phase 7, append:

   ```
   8. **Merge the pull request** — immediately after the PR is created successfully:
      ```bash
      gh pr merge --merge --delete-branch
      ```
      This merges using a standard merge commit and deletes the remote feature branch.
      If the merge fails (e.g. branch protection rules), report the error and stop — do not retry.
   ```

2. **Edit `markdown/agents/auto_update_agent.md`** — mirror the same addition after the `gh pr create` block in Phase 7, keeping the same wording.

3. **Verify**: read both files back after editing to confirm the step appears correctly and the surrounding context is intact.

All criteria verified 2026-05-27 before commit.

## Acceptance Criteria
- [x] `.claude/agents/playbook-updater/agent.md` Phase 7 includes step 8 with `gh pr merge --merge --delete-branch`
- [x] `markdown/agents/auto_update_agent.md` Phase 7 includes the same step 8 with identical instructions
- [x] Both files' existing content (steps 1–7, guardrails) is unchanged
- [x] No version bump required — this is an agent config change, not a playbook content change
