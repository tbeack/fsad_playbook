# CBP-213 — Update Work Trees collapsible: `EnterWorktree` mid-session switching (v2.1.157)

## Summary

Claude Code v2.1.157 enhanced `EnterWorktree` to support switching between Claude-managed worktrees mid-session. Previously, `EnterWorktree` was primarily used to enter a single worktree at the start of a task. Now agents can switch from one Claude-managed worktree to another without leaving the session.

## Assessment

The playbook's Work Trees collapsible (around lines 9746–9790) describes `EnterWorktree` in passing (in the `worktree.baseRef` and `worktree.bgIsolation` settings tables), but does not explicitly describe what `EnterWorktree` is or its new mid-session switching capability. The existing tip callout says "Worktrees are automatically cleaned up when the agent completes with no changes." and mentions `WorktreeCreate` and `WorktreeRemove` hooks.

**Action needed:**
Update the Work Trees collapsible tip callout (or add a note below the `worktree.bgIsolation` table) to document that `EnterWorktree` can now switch between Claude-managed worktrees mid-session.

## Plan

### Step 1 — Update the tip callout in the Work Trees collapsible

Find the tip callout at the end of the Work Trees collapsible (around line 9785–9788). Extend it to mention the new mid-session switching capability.

**Old text:**
```html
<div class="callout callout-tip" style="margin-bottom:0; margin-top:0.75rem;">
          <div class="callout-title">Tip</div>
          <p>Worktrees are automatically cleaned up when the agent completes with no changes. If changes were made, the worktree path and branch are returned. <code>WorktreeCreate</code> and <code>WorktreeRemove</code> hooks fire on lifecycle events.</p>
        </div>
```

**New text:**
```html
<div class="callout callout-tip" style="margin-bottom:0; margin-top:0.75rem;">
          <div class="callout-title">Tip</div>
          <p>Worktrees are automatically cleaned up when the agent completes with no changes. If changes were made, the worktree path and branch are returned. <code>WorktreeCreate</code> and <code>WorktreeRemove</code> hooks fire on lifecycle events. As of v2.1.157, <code>EnterWorktree</code> can switch between Claude-managed worktrees mid-session — an agent can hop from one task-worktree to another without stopping and restarting.</p>
        </div>
```

## Acceptance Criteria

- [ ] The Work Trees collapsible mentions that `EnterWorktree` can switch between Claude-managed worktrees mid-session
- [ ] Version reference v2.1.157 is included
- [ ] The existing content in the callout is preserved and extended, not replaced
- [ ] HTML is valid
