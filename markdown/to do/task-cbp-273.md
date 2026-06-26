# CBP-273 — Config/Monitoring: `otelHeadersHelper` auto-reconnect on 401/403

## Summary
Claude Code v2.1.193 improved MCP `headersHelper` auth: the helper now re-runs and reconnects the MCP server automatically when a tool call returns 401 or 403. Previously the helper only refreshed headers on a timer (every 29 min); now it also triggers on auth failures, making token rotation more reliable.

## Assessment
The `otelHeadersHelper` is documented in two places:
1. Notable settings.json Keys callout (line 8579): `"otelHeadersHelper" — Path to a script that auto-refreshes OTEL auth tokens (runs every 29 min).`
2. Enterprise Configuration collapsible (line 11563): `"Dynamic auth" — set "otelHeadersHelper" in settings.json to auto-refresh tokens (runs every 29 min)`

Both say "runs every 29 min" but do not mention the new auto-reconnect on 401/403. Both should be updated to note the new behavior.

Note: The v2.1.193 release notes say "MCP headersHelper" which is the MCP connection authentication helper in settings.json (`mcpServers[name].headersHelper`), not the OTEL-specific `otelHeadersHelper`. These are separate settings. The playbook uses `otelHeadersHelper` for OTEL. For MCP servers, the equivalent is set in the `mcpServers` config. This task should update the Enterprise Configuration MCP/dynamic auth bullet to note that headersHelper for MCP also auto-reconnects on 401/403.

## Plan
1. Read lines 11560–11568 of `fsad-playbook.html` for the Enterprise Configuration bullet.
2. Update the "Dynamic auth" bullet (line 11563) to append: `; as of v2.1.193, the helper also re-runs and reconnects automatically when a tool call returns 401 or 403 — token expiry no longer requires a session restart.`

## Acceptance Criteria
- Enterprise Configuration bullet mentions 401/403 reconnect
- grep confirms the update is present
