# CBP-322 — Env vars: `CLAUDE_CODE_MAX_CONCURRENT_SUBAGENTS` and `CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH` + Agent Teams update (v2.1.217)

## Summary

Claude Code v2.1.217 added two new env vars and changed subagent nesting defaults:

1. `CLAUDE_CODE_MAX_CONCURRENT_SUBAGENTS` — caps how many subagents run at the same time (default 20). Previously there was no concurrency cap; now one message can't fan out unbounded background agents.
2. `CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH` — controls how many levels of nested spawning are allowed. **Default is now 1** — subagents no longer spawn nested subagents by default. Set to 2+ to allow deeper nesting.

The existing Agent Teams collapsible (line 10278) says "sub-agents can spawn their own sub-agents (up to 5 levels deep)" — this is now outdated. The default depth is 1 (nesting disabled by default).

## Assessment

**Hardening env vars table** (lines 10746–10749): Two new rows need to be added after `CLAUDE_CODE_MAX_SUBAGENTS_PER_SESSION` (line 10747).

**Agent Teams nested sub-agents bullet** (line 10278): Needs to be updated to reflect the v2.1.217 change that nesting is disabled by default; mention `CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH` to re-enable.

## Plan

### Step 1: Update hardening env vars table

After line 10747 (the `CLAUDE_CODE_MAX_SUBAGENTS_PER_SESSION` row), add two new rows:

```html
<tr><td><code>CLAUDE_CODE_MAX_CONCURRENT_SUBAGENTS</code></td><td>Cap on concurrently-running subagents within a session. Default <code>20</code>; set to a lower integer to prevent a single message from fanning out unbounded background agents (v2.1.217).</td></tr>
<tr><td><code>CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH</code></td><td>Maximum nesting depth for subagent spawning. Default <code>1</code> — subagents do not spawn nested subagents by default. Set to <code>2</code> or higher to re-enable hierarchical agent architectures (v2.1.217).</td></tr>
```

### Step 2: Update Agent Teams nested sub-agents bullet

At line 10278, change the bullet to reflect that nesting is now disabled by default:

Old text: `<li><strong>Nested sub-agents:</strong> sub-agents can spawn their own sub-agents (up to 5 levels deep), enabling hierarchical architectures like orchestrator → specialist → worker trees (v2.1.172)</li>`

New text: `<li><strong>Nested sub-agents:</strong> sub-agents can spawn their own sub-agents, enabling hierarchical architectures like orchestrator → specialist → worker trees. Nesting is <strong>disabled by default as of v2.1.217</strong> — set <code>CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH=2</code> (or higher) to allow it; max depth was previously 5 levels (v2.1.172, updated v2.1.217)</li>`

## Acceptance Criteria

- [ ] Two new env var rows appear in the Subprocess Sandboxing hardening table, after `CLAUDE_CODE_MAX_SUBAGENTS_PER_SESSION`
- [ ] Agent Teams bullet accurately reflects that nested spawning is off by default as of v2.1.217 and explains how to re-enable it
- [ ] No HTML structure or styling is broken
