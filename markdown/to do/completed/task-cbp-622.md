# CBP-622: Document `<server>.<key>=<value>` bundled MCP server config via `claude plugin install --config` (v2.1.285)

## Summary

v2.1.285 added `<server>.<key>=<value>` support to `claude plugin install --config`, so a bundled `.mcpb` MCP server's own settings can be set at install time and it starts without a separate visit to `/plugin` → Configure.

## Assessment

- Same Plugins collapsible as CBP-621 (`src/pages/practices.html`, `id="power-usage--plugins"`). Adds a second, related bullet distinguishing this install-time flag from the standalone `claude plugin configure` command.

## Plan

1. In `src/pages/practices.html`, add a bullet immediately after the CBP-621 `claude plugin configure` bullet:
   `<li><strong><code>claude plugin install --config server.key=value</code>:</strong> set a bundled <code>.mcpb</code> MCP server's own options at install time — e.g. <code>claude plugin install my-plugin --config my-server.apiKey=xyz</code> — so the server starts configured without a separate Configure step (v2.1.285).</li>`

## Acceptance Criteria

- The Plugins collapsible documents the `--config server.key=value` install-time syntax, version-tagged v2.1.285.
