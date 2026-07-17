# CBP-308 — Work Trees: Note that "always allow" permission rules persist across worktrees

## Summary

Claude Code v2.1.211 changed "always allow" permission rules to save at the repository root, so approvals granted in a git worktree persist across sessions and worktrees. Previously, permission grants made inside a worktree were scoped to that worktree session and would be lost when switching sessions or worktrees.

## Assessment

The playbook has a Work Trees collapsible section (line 10296–10339) that discusses isolated git worktrees for parallel work. The section includes a callout tip (line 10334–10337) that already covers lifecycle notes (auto-cleanup, `WorktreeCreate`/`WorktreeRemove` hooks, mid-session worktree hopping, parallel tool calls). This behavioral change about permission persistence is directly relevant to worktree users and belongs in that callout tip.

**Status:** New content — not in playbook.

## Plan

1. Read lines 10334–10337 of `fsad-playbook.html` to confirm the exact callout tip content.
2. Append a sentence to the existing callout tip `<p>` element:
   ```
   As of v2.1.211, "always allow" permission grants are saved at the repository root — approvals made inside a worktree persist across all sessions and worktrees for that repo.
   ```

## Acceptance Criteria

- [ ] A sentence about permission persistence appears in the Work Trees callout tip
- [ ] The sentence references v2.1.211
- [ ] The existing callout tip text is intact and unmodified
- [ ] No surrounding HTML is disturbed
