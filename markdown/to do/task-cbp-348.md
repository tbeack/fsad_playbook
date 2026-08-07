# CBP-348 — [Claude] Add cross-session `SendMessage` + `ListAgents` to Agent Teams collapsible

## Source
Claude Code v2.1.224

## Summary
v2.1.224 added cross-session `SendMessage`: Claude Code sessions can now message each other, on any of your machines, with `ListAgents` to discover them (macOS and Linux). This is a significant capability expansion of multi-agent coordination beyond the existing single-machine/tmux-based Agent Teams pattern.

## Assessment
`fsad-playbook.html`, Power Usage → Agent Teams collapsible, lines 11344–11375. Currently covers same-machine multi-instance collaboration via `@mention`, worktrees, and tmux/in-process teammate modes, plus nested sub-agent spawning. No mention of cross-session or cross-machine messaging.

## Plan

### Step 1 — Add a new bullet to the list (after line 11355)
```html
<li><strong>Cross-session <code>SendMessage</code>:</strong> as of v2.1.224, Claude Code sessions can message each other across any of your machines — not just teammates in the same tmux/worktree setup. Use <code>ListAgents</code> to discover reachable sessions. Available on macOS and Linux.</li>
```

### Step 2 — Add a short code example to the existing code block (after line 11364's `@` mention comment, before closing `</code></pre>` at line 11365)
```
# Message another running session by name/id
SendMessage(to: "<agent-name-or-id>", ...)

# Discover reachable sessions across machines
ListAgents()
```

## Acceptance Criteria
- Agent Teams collapsible documents cross-session `SendMessage` and `ListAgents` (v2.1.224)
- Bullet clarifies this works across machines, not just within one tmux/worktree setup, and is macOS/Linux only
- HTML is valid
