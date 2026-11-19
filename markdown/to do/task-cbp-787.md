# CBP-787: Add `mcp_tool` hooks `onFailure: "block"` support (v2.1.328)

## Summary
Claude Code v2.1.328 added `"onFailure": "block"` support for `mcp_tool` hooks, matching the existing behavior for `command` and `http` hooks: a hook whose call fails now blocks the action instead of failing open.

## Assessment
`src/pages/practices.html`'s hooks reference (~line 3025) already documents the `onFailure: "block"` (v2.1.295) fail-open/fail-closed behavior for `command` and `http` hooks, right after the hook-type table that lists `mcp_tool` as its own row (~line 3001). This is a direct extension of that existing note to the `mcp_tool` hook type.

## Plan
1. Open `src/pages/practices.html`.
2. In the `onFailure: "block"` note (~line 3025), replace:
   ```
   By default, a <code>command</code> or <code>http</code> hook that cannot start, times out, or exits with an unexpected code lets the action through (fail-open).
   ```
   with:
   ```
   By default, a <code>command</code>, <code>http</code>, or <code>mcp_tool</code> hook that cannot start, times out, or exits with an unexpected code lets the action through (fail-open).
   ```
3. At the end of the same paragraph, before the closing `</p>`, append:
   ```
    As of v2.1.328, <code>mcp_tool</code> hooks support <code>onFailure: "block"</code> too.
   ```
4. No other files require changes for this task.

## Acceptance Criteria
- The `onFailure: "block"` note covers `mcp_tool` hooks alongside `command` and `http`.
- HTML is valid (no unclosed tags).
