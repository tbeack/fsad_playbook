# CBP-589: Add CLAUDE_CODE_MAX_MCP_DESCRIPTION_LENGTH to env vars table (v2.1.280)

## Summary

v2.1.280 added the `CLAUDE_CODE_MAX_MCP_DESCRIPTION_LENGTH` environment variable. It controls the character cap on MCP tool descriptions and server instructions for every MCP server in the session. The default cap is 2,048 characters.

## Assessment

The Notable Environment Variables table in `src/pages/practices.html` does not yet include this env var. The most appropriate insertion point is near other MCP-related env vars. The `CLAUDE_CODE_MCP_STARTUP_WAIT_MS` row is at approximately line 2829. The new row should be inserted after `CLAUDE_CODE_MCP_STARTUP_WAIT_MS`.

## Plan

Find this line in `src/pages/practices.html`:
```html
<tr><td><code>CLAUDE_CODE_MCP_STARTUP_WAIT_MS</code></td><td>Bounds how long the first non-interactive...
```

Insert a new row after it:
```html
<tr><td><code>CLAUDE_CODE_MAX_MCP_DESCRIPTION_LENGTH</code></td><td>Changes the 2,048-character cap on MCP tool descriptions and server instructions. Applies to every MCP server in the session. Increase if your MCP tools have long descriptions that get truncated; decrease in memory-constrained environments. Set to an integer (e.g. <code>4096</code>). (v2.1.280)</td></tr>
```

## Acceptance Criteria

- The env vars table includes `CLAUDE_CODE_MAX_MCP_DESCRIPTION_LENGTH` with an accurate description.
- The row appears near other MCP-related env vars.
