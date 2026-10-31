# CBP-735: Add `CLAUDE_CODE_SUBAGENT_EFFORT` env var (v2.1.316)

## Summary
Claude Code v2.1.316 added `CLAUDE_CODE_SUBAGENT_EFFORT`, which sets the effort level subagents run at when nothing else names one, instead of inheriting the session's effort.

## Assessment
The playbook already documents the companion var `CLAUDE_CODE_SUBAGENT_MODEL` / `CLAUDE_CODE_SUBAGENT_MODEL_FORCE` (Cost Optimization Checklist, `src/pages/practices.html` ~line 1695, and the env var reference table ~line 2799) and the Agent tool's per-spawn `effort` parameter (~line 1696, v2.1.292). The new var is the effort-side analog of `CLAUDE_CODE_SUBAGENT_MODEL`: a session-wide default, overridden by an agent's own frontmatter or an explicit per-spawn effort. It belongs next to `CLAUDE_CODE_SUBAGENT_MODEL_FORCE` in the reference table, and the Cost Optimization Checklist bullet about the Agent tool's `effort` parameter should note it as the global-default counterpart.

## Plan
1. Open `src/pages/practices.html`.
2. In the Cost Optimization Checklist, update the existing bullet (currently ending "...without changing the session effort (v2.1.292)."):
   ```html
   <li>The Agent tool accepts an <code>effort</code> parameter, so Claude can run a sub-agent at the effort level you ask for (e.g. <code>low</code> for lookups, <code>high</code> for review) without changing the session effort (v2.1.292). Set <code>CLAUDE_CODE_SUBAGENT_EFFORT</code> to change the default a subagent falls back to when nothing else names an effort — it's overridden by an agent's own frontmatter or an explicit per-spawn <code>effort</code> (v2.1.316).</li>
   ```
3. In the env var reference table, immediately after the `CLAUDE_CODE_SUBAGENT_MODEL_FORCE` row, add:
   ```html
   <tr><td><code>CLAUDE_CODE_SUBAGENT_EFFORT</code></td><td>Sets the effort level subagents run at when nothing else names one, instead of inheriting the session's effort. An agent's own <code>model:</code>/effort frontmatter or an explicit per-spawn <code>effort</code> parameter still takes precedence. Use to run cheap/mechanical subagents at <code>low</code> by default without touching the main session's effort (v2.1.316).</td></tr>
   ```
4. No other files require changes for this task.

## Acceptance Criteria
- `CLAUDE_CODE_SUBAGENT_EFFORT` appears in the env var reference table, directly after `CLAUDE_CODE_SUBAGENT_MODEL_FORCE`.
- The Cost Optimization Checklist bullet about the Agent tool's `effort` parameter mentions the new var.
- HTML is valid (no unclosed tags).
