# CBP-344 — [Claude] Fix stale `CLAUDE_CODE_MAX_SUBAGENTS_PER_SESSION` row — 200-cap removed

## Source
Claude Code v2.1.224

## Summary
v2.1.224 removed the previously-documented 200-subagent-per-session spawn cap entirely: "long-running sessions no longer refuse new agents (concurrency and depth limits still apply)." The playbook currently states a default cap of 200 that no longer exists — this is a correctness fix, not just an addition.

## Assessment
`fsad-playbook.html` line 11825, in the Power Usage → Subprocess Sandboxing "Hardening env vars" table:
```html
<tr><td><code>CLAUDE_CODE_MAX_SUBAGENTS_PER_SESSION</code></td><td>Per-session cap on subagent spawns. Default <code>200</code>; set to a lower integer to limit runaway delegation. The budget resets when you run <code>/clear</code> (v2.1.212).</td></tr>
```
This claim ("Default 200") is now stale/wrong as of v2.1.224.

## Plan

### Step 1 — Update the row at line 11825
Replace with:
```html
<tr><td><code>CLAUDE_CODE_MAX_SUBAGENTS_PER_SESSION</code></td><td><strong>Hard cap removed in v2.1.224</strong> — long-running sessions no longer refuse new agents once this budget is spent. Originally a per-session cap on subagent spawns (default <code>200</code>, resetting on <code>/clear</code>) introduced in v2.1.212; concurrency (<code>CLAUDE_CODE_MAX_CONCURRENT_SUBAGENTS</code>) and nesting-depth (<code>CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH</code>) limits still apply.</td></tr>
```

## Acceptance Criteria
- The row no longer claims a default cap of 200 subagent spawns per session as current behavior
- The row explains the cap was removed in v2.1.224 and cross-references the still-active concurrency/depth limits
- HTML is valid
