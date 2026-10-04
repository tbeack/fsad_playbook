# CBP-641: Add `CLAUDE_CODE_DISABLE_STRUCTURED_OUTPUTS` to env vars table

## Summary

Claude Code v2.1.288 added `CLAUDE_CODE_DISABLE_STRUCTURED_OUTPUTS` to fix session titles, memory recall, and prompt hooks failing on Mantle or gateways that reject structured outputs. Setting this variable turns structured outputs off globally.

## Assessment

The env vars table in `src/pages/practices.html` ends around line 2880 with `CLAUDE_CODE_NONSTREAMING_TIMEOUT_RETRIES` (added in v2.1.285). The new env var is not present anywhere in the file.

The new row belongs at the end of the table, after `CLAUDE_CODE_NONSTREAMING_TIMEOUT_RETRIES`.

## Plan

1. Read `src/pages/practices.html` around lines 2878–2886 to find the exact closing `</tbody>` tag of the env vars table.
2. Insert a new `<tr>` before the closing `</tbody>`:

   ```html
   <tr><td><code>CLAUDE_CODE_DISABLE_STRUCTURED_OUTPUTS=1</code></td><td>Turns off structured output formatting for session-title generation, memory recall, and prompt-hook requests. Use when running behind Mantle or a gateway that rejects structured outputs and those features are failing (v2.1.288).</td></tr>
   ```

## Acceptance Criteria

- The env vars table contains a row for `CLAUDE_CODE_DISABLE_STRUCTURED_OUTPUTS`.
- The row describes the use case (Mantle / gateways that reject structured outputs).
- The row is the last entry before `</tbody>`.
- No other rows are changed.
