# CBP-698 — Extend fork-subagents bullet (now on by default in -p, SDK, desktop, VS Code)

## Summary

Claude Code v2.1.302 made three related changes to subagent behavior:
1. `subagent_type: "fork"` is now on by default in `claude -p`, the Agent SDK, the desktop app, and VS Code — as it already was in the terminal. `CLAUDE_CODE_FORK_SUBAGENT=0` turns it off. `claude mcp serve` never offers fork subagents.
2. The desktop app and VS Code now always run the main conversation's subagents in the background, as the terminal does.
3. A subagent's own Agent calls in `claude -p`, the Agent SDK, the desktop app, and VS Code now run in the foreground by default.

## Assessment

The current subagent forking bullet at line ~2196 of `src/pages/practices.html` says "as of v2.1.232, forking is on by default — a `subagent_type: "fork"` subagent inherits the full conversation and prompt cache from its parent instead of starting fresh, and non-teammate agent spawns in interactive sessions now also run in the background by default."

This is incomplete: it does not cover the v2.1.302 extension to `claude -p`, Agent SDK, desktop, and VS Code. Append a new sentence to this bullet.

## Plan

1. Open `src/pages/practices.html`.
2. Find the `<li>` containing "Subagent forking:" (line ~2196).
3. Append the following text before the closing `</li>`:

```
 As of v2.1.302, fork subagents are also on by default in <code>claude -p</code>, the Agent SDK, the desktop app, and VS Code. Set <code>CLAUDE_CODE_FORK_SUBAGENT=0</code> to turn them off; <code>claude mcp serve</code> never offers fork subagents. The desktop app and VS Code now always run the main conversation's subagents in the background. A subagent's own Agent calls in <code>claude -p</code>, the Agent SDK, the desktop app, and VS Code run in the foreground by default.
```

4. Save the file.

## Acceptance Criteria

- The bullet lists all four new contexts where fork subagents are on by default.
- `CLAUDE_CODE_FORK_SUBAGENT=0` is documented as the opt-out.
- `claude mcp serve` exclusion is noted.
- The foreground/background behavior for subagent-spawned agents is stated.
