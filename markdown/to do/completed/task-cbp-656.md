# CBP-656 — Add `CLAUDE_CODE_WEB_SEARCH_REFILLS_PER_HOUR` env var and update WebSearch budget note

## Summary
Claude Code v2.1.290 changed the WebSearch budget from a hard per-session cap to a refilling bucket:
- The session cap (default 200) still exists via `CLAUDE_CODE_MAX_WEB_SEARCHES_PER_SESSION`.
- A new env var `CLAUDE_CODE_WEB_SEARCH_REFILLS_PER_HOUR` controls the refill rate. Default is 100 calls/hour; set to `0` to turn off refills entirely.

## Assessment
The playbook has `CLAUDE_CODE_MAX_WEB_SEARCHES_PER_SESSION` at line 2748 in `src/pages/practices.html`. The description says "Default 200; set to a lower integer to prevent runaway search loops" but does not mention refills. A new row for `CLAUDE_CODE_WEB_SEARCH_REFILLS_PER_HOUR` needs to be added after it.

## Plan
1. Read `src/pages/practices.html` around line 2748 to confirm surrounding HTML.
2. Update the `CLAUDE_CODE_MAX_WEB_SEARCHES_PER_SESSION` row to note that the budget now refills over time:
   - Old: `Per-session cap on WebSearch tool calls. Default <code>200</code>; set to a lower integer to prevent runaway search loops in unattended or agentic sessions (v2.1.212).`
   - New: `Per-session cap on WebSearch tool calls. Default <code>200</code>; set to a lower integer to prevent runaway search loops in unattended or agentic sessions (v2.1.212). As of v2.1.290 the budget refills over time — see <code>CLAUDE_CODE_WEB_SEARCH_REFILLS_PER_HOUR</code>.`
3. Add a new row immediately after for `CLAUDE_CODE_WEB_SEARCH_REFILLS_PER_HOUR`:
   ```html
   <tr><td><code>CLAUDE_CODE_WEB_SEARCH_REFILLS_PER_HOUR</code></td><td>Rate at which the WebSearch budget refills. Default <code>100</code> calls/hour. Set to <code>0</code> to disable refills and make <code>CLAUDE_CODE_MAX_WEB_SEARCHES_PER_SESSION</code> a hard lifetime cap (v2.1.290).</td></tr>
   ```
4. Run `python3 scripts/build-source.py` to confirm the build passes.

## Acceptance Criteria
- `CLAUDE_CODE_MAX_WEB_SEARCHES_PER_SESSION` row is updated with the refill cross-reference.
- New `CLAUDE_CODE_WEB_SEARCH_REFILLS_PER_HOUR` row appears after it.
- Build passes.
