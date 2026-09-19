# CBP-585 — Add `CLAUDE_GATEWAY_PROXY_IS_EGRESS_BOUNDARY=1` to Env Vars Table

## Summary

Claude Code v2.1.277 added `CLAUDE_GATEWAY_PROXY_IS_EGRESS_BOUNDARY=1` for Claude apps gateways whose only egress is a forward proxy. When set, every outbound request passes the proxy the hostname instead of resolving it locally — necessary when DNS resolution is restricted to the proxy.

## Assessment

The Notable Environment Variables table in `src/pages/practices.html` is around lines 2820-2847. The last row before `</tbody>` is `CLAUDE_CODE_GATEWAY_HINT_HEADERS=1` at line 2846. The new env var belongs in the same table, near other gateway-related vars.

## Plan

1. Open `src/pages/practices.html`.
2. Find the `CLAUDE_CODE_GATEWAY_HINT_HEADERS=1` row at line 2846.
3. Insert a new row **after** it (before `</tbody>`):

```html
<tr><td><code>CLAUDE_GATEWAY_PROXY_IS_EGRESS_BOUNDARY=1</code></td><td>For Claude apps gateways where the only egress path is a forward proxy. When set, every outbound request hands the proxy the hostname instead of resolving it locally — required in environments where DNS resolution is restricted to the proxy. Use alongside <code>ANTHROPIC_BASE_URL</code> pointing at a Claude apps gateway (v2.1.277).</td></tr>
```

## Acceptance Criteria

- The new `CLAUDE_GATEWAY_PROXY_IS_EGRESS_BOUNDARY=1` row is present in the env vars table.
- The description explains the hostname-vs-DNS behavior.
- Version `v2.1.277` is cited.
- Table structure is valid (no broken HTML).
