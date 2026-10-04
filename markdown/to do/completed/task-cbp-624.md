# CBP-624: Add `CLAUDE_CODE_NONSTREAMING_TIMEOUT_RETRIES` env var to Notable Environment Variables table (v2.1.285)

## Summary

v2.1.285 added `CLAUDE_CODE_NONSTREAMING_TIMEOUT_RETRIES` to cap re-sends of a non-streaming fallback request that timed out.

## Assessment

- Same table as CBP-619 (`src/pages/practices.html`'s Notable Environment Variables table). Adds a second new row alongside `CLAUDE_CODE_DISABLE_WEB_FETCH`.

## Plan

1. In `src/pages/practices.html`, append a new row after the CBP-619 `CLAUDE_CODE_DISABLE_WEB_FETCH` row:
   `<tr><td><code>CLAUDE_CODE_NONSTREAMING_TIMEOUT_RETRIES</code></td><td>Caps how many times a timed-out non-streaming fallback request is re-sent. Set to an integer to bound retry time on flaky connections to the non-streaming endpoint (v2.1.285).</td></tr>`

## Acceptance Criteria

- The Notable Environment Variables table documents `CLAUDE_CODE_NONSTREAMING_TIMEOUT_RETRIES`, version-tagged v2.1.285.
