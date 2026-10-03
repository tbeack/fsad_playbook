# CBP-612: Add `/mcp reconnect all` note to `/mcp` Cheat Sheet row (v2.1.284)

## Summary

v2.1.284 added `/mcp reconnect all` in the interactive terminal to retry every MCP server that failed to connect or needs authentication, all at once.

## Assessment

- `src/pages/practices.html`'s Cheat Sheet table has an `/mcp` row (~line 1953) that already accumulates version-tagged additions (v2.1.161, v2.1.186, v2.1.238, v2.1.243) as appended sentences. The new `/mcp reconnect all` subcommand fits the same pattern.

## Plan

1. In `src/pages/practices.html`, append to the end of the `/mcp` row's cell (~line 1953):
   ` As of v2.1.284, <code>/mcp reconnect all</code> retries every MCP server that failed to connect or needs authentication in one command, instead of reconnecting servers one at a time.`

## Acceptance Criteria

- The `/mcp` Cheat Sheet row documents `/mcp reconnect all`, version-tagged v2.1.284.
