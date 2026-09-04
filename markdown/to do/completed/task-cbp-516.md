# CBP-516 — Add Prompt-Cache Miss Cause to `/cost` / `prompt_cache` and `/effort` Cache Note

## Source
Claude Code v2.1.260

## Summary
v2.1.260 adds a likely cause for prompt-cache misses (tool definitions or system prompt changed, idle past the TTL) to `/cost` and the status line's `prompt_cache` field. Separately, changing `/effort` mid-session on Claude Fable 5.1 no longer invalidates the prompt cache.

## Assessment
`src/pages/practices.html` line 1893 (`/usage` row) ends with the v2.1.251 prompt-cache line on `/cost` and the `prompt_cache` status-line object — no mention of the miss cause. Line 1888 (`/effort` row) has no cache note. Update existing.

## Plan
1. Read lines 1888 and 1893.
2. Line 1893: append "As of v2.1.260, the `/cost` prompt-cache line and the `prompt_cache` status-line object also report a likely cause for cache misses — e.g. tool definitions or system prompt changed, or the session idled past the cache TTL."
3. Line 1888: append "As of v2.1.260, changing effort mid-session on Claude Fable 5.1 no longer invalidates the prompt cache."

## Acceptance Criteria
- `/usage` row mentions the prompt-cache miss cause with v2.1.260 attribution
- `/effort` row mentions the Fable 5.1 cache preservation with v2.1.260 attribution
- HTML is valid
