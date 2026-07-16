# CBP-309 — Config/Monitoring: `otelHeadersHelper` auto-reconnect on 401/403

## Summary

Claude Code v2.1.193 improved MCP `headersHelper` auth: the helper now re-runs and reconnects the MCP server automatically when a tool call returns 401 or 403. Previously the helper only refreshed headers on a timer (every 29 min); now it also triggers on auth failures, making token rotation more reliable.

## Assessment

This item was originally scoped as CBP-273 on PR #136 (`auto-update/claude-code-v2.1.193-2026-06-26`), which went stale and was closed unmerged after several later auto-update runs (#143, #144, etc.) caught main up past v2.1.193 without ever picking up this specific change. Re-scoped here as CBP-309 against current `main`.

The `otelHeadersHelper` is documented in two places:
1. Notable settings.json Keys callout (line 8668): `otelHeadersHelper — Path to a script that auto-refreshes OTEL auth tokens (runs every 29 min). See Monitoring section.`
2. Enterprise Configuration collapsible (line 11671): `Dynamic auth — set "otelHeadersHelper": "/path/to/script.sh" in settings.json to auto-refresh tokens (runs every 29 min)`

Both said "runs every 29 min" but did not mention the auto-reconnect on 401/403.

**Status:** New content — not previously in playbook.

## Plan

1. Update the Notable settings.json Keys callout bullet (line 8668) to mention the MCP `headersHelper` 401/403 auto-reconnect behavior.
2. Update the Enterprise Configuration "Dynamic auth" bullet (line 11671) to append the same note.

## Acceptance Criteria

- [x] Notable settings.json Keys callout mentions 401/403 reconnect
- [x] Enterprise Configuration "Dynamic auth" bullet mentions 401/403 reconnect
- [x] Both reference v2.1.193
