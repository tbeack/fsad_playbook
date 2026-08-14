# CBP-374 — [Claude] Document subagent forking default in Agent Teams

## Source
Claude Code v2.1.232

## Summary
v2.1.232 makes subagent forking on by default: a `subagent_type: "fork"` subagent now inherits the full conversation and prompt cache from its parent instead of starting fresh. Separately, non-teammate agent spawns in interactive sessions now run in the background by default.

## Assessment
`fsad-playbook.html`, `#power-usage` → Agent Teams collapsible. The "Nested sub-agents" bullet (line 11361) already documents sub-agent spawning defaults (spawn depth, env var), and the pattern of adding version-tagged bullets to this `<ul>` is well established (see the "Cross-session SendMessage" bullet at line 11362, and CBP-373's Dynamic Workflows edit). No existing content mentions `subagent_type: "fork"`, prompt-cache inheritance, or the new background-by-default behavior for non-teammate spawns. Genuine gap — add a new bullet.

## Plan

### Step 1 — Insert a new `<li>` after line 11361 (the "Nested sub-agents" bullet) and before line 11362 (the "Cross-session SendMessage" bullet)

Current (line 11361):
```html
          <li><strong>Nested sub-agents:</strong> sub-agents can spawn their own sub-agents, enabling hierarchical architectures like orchestrator → specialist → worker trees. Nesting is <strong>disabled by default as of v2.1.217</strong> — set <code>CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH=2</code> (or higher) to allow it; max depth was 5 levels in earlier versions (v2.1.172, updated v2.1.217)</li>
```

Insert immediately after it:
```html
          <li><strong>Subagent forking:</strong> as of v2.1.232, forking is on by default — a <code>subagent_type: "fork"</code> subagent inherits the full conversation and prompt cache from its parent instead of starting fresh, and non-teammate agent spawns in interactive sessions now also run in the background by default.</li>
```

## Acceptance Criteria
- New `<li>` present in the Agent Teams `<ul>`, between the "Nested sub-agents" and "Cross-session SendMessage" bullets
- Describes: `subagent_type: "fork"` inheriting conversation + prompt cache, and non-teammate spawns defaulting to background
- Version tag (v2.1.232) included
- No changes to surrounding markup structure
