# CBP-219 — Add parallel tool call independence note to Power Usage / Work Trees

## Summary
In Claude Code v2.1.161, parallel tool calls are now independent: a failed Bash command no longer cancels other calls in the same batch — each tool returns its own result. This is important for users running parallel agent operations who previously saw cascading cancellations when one tool in a batch failed.

## Assessment
**Existing content:** The Work Trees collapsible (lines 9746–9789) covers parallel worktree usage. There is no mention of parallel tool call independence. The Hooks description at line 9798 mentions "26 lifecycle points" but does not discuss parallel tool call behavior.

**Best placement:** Add a note to the Work Trees collapsible tip box, or append a brief note after the existing tip on line 9784–9787. The Work Trees section is the closest existing context for parallel agent execution. The tip callout on line 9784 is a good anchor.

**Action needed:** UPDATE EXISTING — extend the tip callout in the Work Trees collapsible to include a sentence about parallel tool call independence.

## Plan
1. Locate the existing tip callout in Work Trees (lines 9784–9787).
2. Append a sentence about parallel tool call independence to the tip paragraph.

**Current tip text (line 9786):**
```
<p>Worktrees are automatically cleaned up when the agent completes with no changes. If changes were made, the worktree path and branch are returned. <code>WorktreeCreate</code> and <code>WorktreeRemove</code> hooks fire on lifecycle events. As of v2.1.157, <code>EnterWorktree</code> can switch between Claude-managed worktrees mid-session — an agent can hop from one task-worktree to another without stopping and restarting.</p>
```

**New text — append sentence to end of paragraph:**
```
<p>Worktrees are automatically cleaned up when the agent completes with no changes. If changes were made, the worktree path and branch are returned. <code>WorktreeCreate</code> and <code>WorktreeRemove</code> hooks fire on lifecycle events. As of v2.1.157, <code>EnterWorktree</code> can switch between Claude-managed worktrees mid-session — an agent can hop from one task-worktree to another without stopping and restarting. As of v2.1.161, parallel tool calls are independent — a failed Bash command no longer cancels other calls in the same batch; each tool returns its own result.</p>
```

## Acceptance Criteria
- The Work Trees tip callout includes the parallel tool call independence note.
- No HTML structure change outside the paragraph text.
