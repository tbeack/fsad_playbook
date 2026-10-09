# CBP-672 — [Codex] Update worktree entries to mention managed worktree tools and `p` pinning (rust-v0.162.0)

## Summary
Codex CLI rust-v0.162.0 added tools for creating and listing managed Git worktrees from trusted local projects in the agent Command Center. It also added `p` as a keybinding to pin tasks in the Command Center.

## Assessment
Two locations need updates in `src/pages/codex.html`:

1. The `/worktree` slash command row (line 1011) — append a sentence about managed worktree tools.
2. The Worktree Sessions collapsible paragraph (line 1189) — append a sentence about managed worktrees and `p` pinning.

## Plan
1. Read `src/pages/codex.html` lines 1011 and 1189 to confirm exact text.
2. Update `/worktree` row to mention managed worktree tool support (rust-v0.162.0).
3. Update the Worktree Sessions paragraph to mention managed worktree tools from trusted local projects and `p` pinning in the Command Center.

## Edit 1 — `/worktree` row (line 1011)
Append to the `<td>` content (before `</td>`):
` As of rust-v0.162.0, Codex also provides tools for creating and listing managed Git worktrees from trusted local projects via the agent Command Center.`

## Edit 2 — Worktree Sessions paragraph (line 1189)
Append to the `<p>` content (before `</p>`):
` As of rust-v0.162.0, Codex adds tools for creating and listing managed Git worktrees directly from trusted local projects in the agent Command Center. Press <kbd>p</kbd> in the Command Center to pin a task to the shared Pinned group.`

## Acceptance Criteria
- "managed Git worktrees" appears in both locations.
- The `p` keybinding for pinning is documented.
- Version attribution `rust-v0.162.0` is included.
