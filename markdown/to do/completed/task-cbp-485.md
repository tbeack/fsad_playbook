# CBP-485 — Document `experimental.cacheTtl` agent frontmatter

## Summary
Claude Code v2.1.248 added `experimental.cacheTtl` (`"5m"` or `"1h"`) to agent frontmatter: a per-agent prompt cache TTL used when no subagent TTL setting is configured.

## Assessment
The Prompt Caching & KV Cache collapsible in `src/pages/practices.html` (~line 2823-2834) already has a "TTL configuration" table covering `ENABLE_PROMPT_CACHING_1H`, `FORCE_PROMPT_CACHING_5M`, `promptCacheTtl`, and `subagentPromptCacheTtl` (settings.json, v2.1.243). `experimental.cacheTtl` is the natural next row — it's a finer-grained, per-agent override of the same subagent TTL that `subagentPromptCacheTtl` sets globally.

## Plan
1. In `src/pages/practices.html`, locate the TTL configuration table body (~line 2831, the `subagentPromptCacheTtl` row).
2. Add a new row immediately after it:
   ```html
   <tr><td><code>experimental.cacheTtl</code> (agent frontmatter)</td><td>Set a prompt cache TTL (<code>"5m"</code> or <code>"1h"</code>) for one specific agent, overriding the session-wide <code>subagentPromptCacheTtl</code> default when that setting isn't configured. Use when only a subset of your agents benefit from a longer TTL (v2.1.248).</td></tr>
   ```

## Acceptance Criteria
- [x] `experimental.cacheTtl` agent frontmatter documented as a new row in the Prompt Caching TTL configuration table.
