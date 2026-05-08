# CBP-126 — Add `worktree.baseRef` setting to Work Trees collapsible (v2.1.133)

## Summary

Claude Code v2.1.133 added a `worktree.baseRef` setting that controls where new worktrees branch from:
- `fresh` (default) — branches from `origin/<default-branch>` (always a clean base, no local uncommitted work)
- `head` — branches from local `HEAD` (includes any unpushed commits, restoring behavior from before v2.1.128)

This setting affects `--worktree` / `-w` flag, the `EnterWorktree` tool, and agent-isolation worktrees. It's important for FSAD practitioners doing parallel agent work — `fresh` guarantees a clean base, `head` lets you share unpushed scaffolding work with spawned agents.

## Assessment

The Work Trees collapsible is at lines 6611–6635 of `fsad-playbook.html`. It currently covers:
- What worktrees are (isolated git worktrees for parallel work)
- CLI examples (`claude -w feature-name`, `--tmux`)
- A tip about auto-cleanup and WorktreeCreate/WorktreeRemove hooks

`worktree.baseRef` is **not documented** anywhere in the playbook. This is a meaningful setting for parallel agent workflows — the choice between `fresh` vs `head` affects whether spawned agents pick up unpushed scaffolding work.

## Plan

1. Read lines 6611–6635 of `fsad-playbook.html` to confirm exact content.
2. Add a note about `worktree.baseRef` after the code block, before the existing tip callout.
3. Use a small `<p>` paragraph with the setting description, showing both values and when to use each.

## Acceptance Criteria

- [ ] `worktree.baseRef` setting is documented in the Work Trees collapsible
- [ ] Both `fresh` (default) and `head` values are explained with use cases
- [ ] Note mentions which operations are affected (`--worktree`, `EnterWorktree`, agent-isolation)
- [ ] Styling matches existing paragraph text in the collapsible
- [ ] No existing content is removed
