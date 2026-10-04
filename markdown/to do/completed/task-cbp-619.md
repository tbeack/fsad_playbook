# CBP-619: Add `CLAUDE_CODE_DISABLE_WEB_FETCH` env var to Notable Environment Variables table (v2.1.285)

## Summary

v2.1.285 added `CLAUDE_CODE_DISABLE_WEB_FETCH` to turn off the WebFetch tool entirely for a session.

## Assessment

- `src/pages/practices.html`'s "Hardening env vars (shared environments & CI/CD)" table (Notable Environment Variables) is where new env var rows land, following existing rows like `CLAUDE_GATEWAY_PROXY_IS_EGRESS_BOUNDARY` (~line 2865).

## Plan

1. In `src/pages/practices.html`, append a new row after the `CLAUDE_GATEWAY_PROXY_IS_EGRESS_BOUNDARY=1` row:
   `<tr><td><code>CLAUDE_CODE_DISABLE_WEB_FETCH=1</code></td><td>Turns off the WebFetch tool entirely for the session. Use where fetching external URLs should never be possible, regardless of permission rules (v2.1.285).</td></tr>`

## Acceptance Criteria

- The Notable Environment Variables table documents `CLAUDE_CODE_DISABLE_WEB_FETCH`, version-tagged v2.1.285.
