# CBP-744: Document auto-backgrounded subagent shell commands protecting prompt cache (v2.1.318)

## Summary
Claude Code v2.1.318 changed background subagents to move a long-running shell command to the background after 3 minutes on all providers, so the prompt cache doesn't expire while it runs.

## Assessment
`src/pages/practices.html`'s Prompt Caching & KV Cache collapsible has a "TTL configuration" table (~line 2855-2860) covering the env vars and settings that control subagent prompt cache TTL (`subagentPromptCacheTtl`, `experimental.cacheTtl`). This new behavior is a complementary, automatic protection for the same problem (a subagent's cache expiring mid-task) — rather than configuring a longer TTL, Claude Code now proactively backgrounds a slow command so the cache window isn't consumed waiting on it. It fits as a new row in that same table.

## Plan
1. Open `src/pages/practices.html`.
2. In the TTL configuration table, after the `subagentPromptCacheTtl` row, insert:
   ```html
   <tr><td>Auto-backgrounded subagent shell commands</td><td>As of v2.1.318, a background subagent running a long shell command now moves it to the background after 3 minutes on all providers, so the wait doesn't let the subagent's own prompt cache expire mid-command.</td></tr>
   ```
3. No other files require changes for this task.

## Acceptance Criteria
- The Prompt Caching TTL configuration table documents the v2.1.318 auto-backgrounding behavior for subagent shell commands.
- HTML is valid (no unclosed tags).

## Status
Implemented.
