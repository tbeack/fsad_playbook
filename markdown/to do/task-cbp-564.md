# CBP-564 — Add `CLAUDE_CODE_GATEWAY_HINT_HEADERS=1` to Notable Environment Variables

**Source:** Claude Code v2.1.273  
**Tag:** [Claude]

## Summary
v2.1.273 adds an opt-in env var `CLAUDE_CODE_GATEWAY_HINT_HEADERS=1`. When set, Claude Code adds five hint headers to every LLM gateway request: `x-claude-code-request-class`, `x-claude-code-agent-type`, `x-claude-code-prev-tool-durations`, `x-claude-code-compaction`, and `x-claude-code-context-compacted`. These let gateway administrators observe request class, agent context, tool timing, and compaction state without parsing request bodies.

## Assessment
The Notable Environment Variables table in `src/pages/practices.html` has no entry for this var. The table already contains other CLAUDE_CODE gateway-related vars (e.g., `CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY`, `CLAUDE_CODE_GATEWAY_MODEL_DISCOVERY_TIMEOUT_MS` referenced in the `/model` row). The new row should be inserted near the end of the env vars table, after the `CLAUDE_CODE_GOAL_CHECKIN_MINUTES` row (line 2838).

## Plan
1. Open `src/pages/practices.html`
2. Find the `CLAUDE_CODE_GOAL_CHECKIN_MINUTES` row (line 2838, inside the env vars `<tbody>`)
3. Insert a new `<tr>` row after it:
   ```html
   <tr><td><code>CLAUDE_CODE_GATEWAY_HINT_HEADERS=1</code></td><td>Sends five hint headers — <code>x-claude-code-request-class</code>, <code>x-claude-code-agent-type</code>, <code>x-claude-code-prev-tool-durations</code>, <code>x-claude-code-compaction</code>, and <code>x-claude-code-context-compacted</code> — on every LLM gateway request. Gateway admins can observe request class, agent context, tool-call timing, and compaction state without parsing request bodies. Opt-in; no effect when <code>ANTHROPIC_BASE_URL</code> is unset (v2.1.273).</td></tr>
   ```
4. Mark CBP-564 complete in todo.md

## Acceptance Criteria
- The new row appears in the Notable Environment Variables table after `CLAUDE_CODE_GOAL_CHECKIN_MINUTES`
- The row lists all five header names
- Build passes without errors
