# CBP-349 — [Claude] Update Work Trees tip: background sessions now commit/push and open draft PRs conditionally

## Source
Claude Code v2.1.221

## Summary
v2.1.221 changed background-session behavior: they now commit and push to preserve work, open a draft PR only when the task calls for one, follow the user's CLAUDE.md git instructions, and always end by reporting where the work lives.

## Assessment
`fsad-playbook.html`, Power Usage → Work Trees collapsible, tip callout at lines 11416–11419. Currently documents worktree cleanup, `EnterWorktree` mid-session switching, parallel tool call independence, and cross-worktree "always allow" persistence — but says nothing about background sessions' git/PR behavior.

## Plan

### Step 1 — Append a sentence to the tip callout (line 11418)
```html
<p>Worktrees are automatically cleaned up when the agent completes with no changes. If changes were made, the worktree path and branch are returned. <code>WorktreeCreate</code> and <code>WorktreeRemove</code> hooks fire on lifecycle events. As of v2.1.157, <code>EnterWorktree</code> can switch between Claude-managed worktrees mid-session — an agent can hop from one task-worktree to another without stopping and restarting. As of v2.1.161, parallel tool calls are independent — a failed Bash command no longer cancels other calls in the same batch; each tool returns its own result. As of v2.1.211, "always allow" permission grants are saved at the repository root — approvals made inside a worktree persist across all sessions and worktrees for that repo. As of v2.1.221, background sessions commit and push to preserve their work, open a draft PR only when the task calls for one, follow your CLAUDE.md git instructions, and always end by reporting where the work lives.</p>
```

## Acceptance Criteria
- Work Trees tip callout documents the v2.1.221 background-session git/PR behavior
- Existing sentences in the callout are preserved unchanged
- HTML is valid
