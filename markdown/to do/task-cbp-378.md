# CBP-378 — Power Usage: `CLAUDE_CODE_WEBFETCH_CACHE_TTL_MS` env var

## Source
Claude Code v2.1.233 changelog: "Added `CLAUDE_CODE_WEBFETCH_CACHE_TTL_MS` environment variable to configure the WebFetch session URL cache TTL (default unchanged: 15 minutes)."

## Summary
New env var configures how long WebFetch caches fetched URL content within a session (default 15 min). No existing mention anywhere in the playbook. This is distinct from the unrelated Prompt Caching & KV Cache collapsible (`ENABLE_PROMPT_CACHING_1H` / `FORCE_PROMPT_CACHING_5M`) — do not conflate the two caching mechanisms.

## Assessment
Does content exist? No — confirmed via grep, zero hits for `WEBFETCH` or "WebFetch cache" anywhere in `fsad-playbook.html`. Best fit is the same "Hardening env vars (shared environments & CI/CD)" table in `#power-usage` used for CBP-377 — that table already functions as a general power-usage env var reference beyond strict security hardening (e.g. it includes `CLAUDE_CODE_MAX_WEB_SEARCHES_PER_SESSION`, `CLAUDE_CODE_MCP_TOOL_IDLE_TIMEOUT`, `CLAUDE_CODE_DISABLE_1M_CONTEXT`).

## Plan
1. Read `fsad-playbook.html` L11832-11868 (Hardening env vars table) — same table as CBP-377.
2. Insert a new `<tr>` row for `CLAUDE_CODE_WEBFETCH_CACHE_TTL_MS`, placed adjacent to the CBP-377 row (both are new v2.1.233 additions — group them together for readability). If CBP-377 is applied first, insert directly after it; if applied independently, insert after `CLAUDE_CODE_OTEL_CONTENT_MAX_LENGTH` (L11866) and before `</tbody>`.
3. Row content: `CLAUDE_CODE_WEBFETCH_CACHE_TTL_MS` — configures the WebFetch session URL cache TTL in milliseconds. Default unchanged at 15 minutes (900000 ms). Set lower to force more frequent re-fetches of URLs that change often; raise for long sessions repeatedly referencing the same slow-changing pages (v2.1.233).

## Acceptance Criteria
- [ ] New row added to the Hardening env vars table in `#power-usage` documenting `CLAUDE_CODE_WEBFETCH_CACHE_TTL_MS`.
- [ ] Row follows existing table row HTML pattern exactly.
- [ ] Version tag `(v2.1.233)` included.
- [ ] Row does not conflate this with the separate Prompt Caching & KV Cache collapsible's TTL vars.
- [ ] No existing rows altered; HTML remains well-formed.
