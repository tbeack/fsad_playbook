# CBP-439 — Document `promptCacheTtl` / `subagentPromptCacheTtl` settings

## Summary
Claude Code v2.1.243 added `promptCacheTtl` and `subagentPromptCacheTtl` settings.json keys so API-key and cloud-provider users can keep a 1-hour prompt cache on the main conversation while subagents stay at the default 5-minute TTL.

## Assessment
The Power Usage → "Prompt Caching & KV Cache" collapsible (`#power-usage--prompt-caching`, lines 11914–~11970) already documents TTL configuration but only via env vars (`ENABLE_PROMPT_CACHING_1H`, `FORCE_PROMPT_CACHING_5M`) in a "TTL configuration" table at lines 11931–11937. It has no `settings.json`-based path and no mention of subagents having an independently configurable TTL — this is new, more granular control.

## Plan
1. In `fsad-playbook.html`, open the "TTL configuration" table inside `#power-usage--prompt-caching` (lines 11931–11937).
2. Add two new rows to that table, after the existing `FORCE_PROMPT_CACHING_5M=1` row:
   ```html
   <tr><td><code>promptCacheTtl</code> (settings.json)</td><td>Set the main conversation's prompt cache TTL to 1 hour (API key and cloud-provider users). Equivalent to <code>ENABLE_PROMPT_CACHING_1H</code> but configured in <code>settings.json</code> (v2.1.243).</td></tr>
   <tr><td><code>subagentPromptCacheTtl</code> (settings.json)</td><td>Set subagent prompt cache TTL independently of the main conversation — subagents default to 5 minutes even when the main session uses a 1-hour TTL (v2.1.243).</td></tr>
   ```
3. Optionally add a short sentence after the table noting that these settings.json keys are the recommended path for teams that want per-scope TTL control without shell env vars.

## Acceptance Criteria
- [ ] Both new settings documented in the TTL configuration table with v2.1.243 tag.
- [ ] Table structure (`<tr><td>...</td><td>...</td></tr>`) matches existing rows exactly.
- [ ] Content makes clear subagents default to 5 min independent of the main session's TTL.
