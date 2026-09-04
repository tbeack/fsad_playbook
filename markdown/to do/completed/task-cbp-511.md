# CBP-511 — Document `managedMcpServers` Org-Level MCP Setting

## Source
Claude Code v2.1.259

## Summary
Claude Code v2.1.259 adds `managedMcpServers` as a managed setting: organizations can push HTTP/SSE MCP servers to every user via org/MDM policy. Entries use the same shape as `.mcp.json`. Entries that name a command to run are skipped (HTTP/SSE only). Companion to the `allowedMcpServers`/`deniedMcpServers` behavior change: `allowedMcpServers` now governs only servers users add, so use `deniedMcpServers` to block a managed server.

## Assessment
The Notable `settings.json` Keys list in `src/pages/practices.html` (around line 651–654) documents managed settings like `modelPricing` and `enforceAvailableModels`. `managedMcpServers` is not listed. This is a new addition to that list.

## Plan
1. Read `src/pages/practices.html` around line 651–654
2. Append a new list item after `spinnerTipsOverride` (line 654), before closing `</ul>`:
   ```html
   <li style="margin-bottom:0;"><code>managedMcpServers</code> — Managed setting (org/MDM only): provide HTTP/SSE MCP servers to every user — same entry shape as <code>.mcp.json</code>. Entries that specify a command to run are skipped; only remote servers are pushed. Use <code>deniedMcpServers</code> (not <code>allowedMcpServers</code>) to block a managed server from loading (v2.1.259).</li>
   ```
   Note: `spinnerTipsOverride` currently has `margin-bottom:0` — change it back to `margin-bottom:0.4rem` and set the new entry to `margin-bottom:0`.

## Acceptance Criteria
- New list item appears at the end of the Notable settings.json Keys list
- `spinnerTipsOverride` keeps appropriate spacing (0.4rem)
- Text accurately describes org-level MCP server delivery
