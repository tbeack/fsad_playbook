# CBP-347 — [Claude] Update `/fork` row: now creates its own worktree

## Source
Claude Code v2.1.221

## Summary
v2.1.221: "Sessions forked with `/fork` create a new worktree of their own instead of working in the original session's checkout." The playbook's `/fork` row documents the background-session behavior (v2.1.212) but not this worktree change.

## Assessment
`fsad-playbook.html` line 11002, Cheat Sheet → Automation table, `/fork` row:
```html
<tr><td><code>/fork</code></td><td>Copy the current conversation into a new background session (its own row in <code>claude agents</code>) while you keep working in the original. The former in-session subagent behavior is now <code>/subtask</code> (v2.1.212).</td></tr>
```

## Plan

### Step 1 — Append worktree note to the row at line 11002
```html
<tr><td><code>/fork</code></td><td>Copy the current conversation into a new background session (its own row in <code>claude agents</code>) while you keep working in the original. The former in-session subagent behavior is now <code>/subtask</code> (v2.1.212). As of v2.1.221, the forked session runs in its own new git worktree instead of continuing in the original session's checkout.</td></tr>
```

## Acceptance Criteria
- `/fork` row documents that the forked session gets its own new worktree (v2.1.221)
- HTML is valid
