# CBP-640 — Add `CLAUDE_CODE_DISABLE_STRUCTURED_OUTPUTS` to Notable Environment Variables

## Summary
Claude Code v2.1.288 added the `CLAUDE_CODE_DISABLE_STRUCTURED_OUTPUTS` environment variable. Setting it turns off structured outputs for session-title, memory-recall, and prompt-hook requests. Use it on Mantle or behind gateways that reject structured outputs, where those requests otherwise fail.

## Assessment
The env var is not present anywhere in `src/pages/practices.html`. The Notable Environment Variables table's last row is `CLAUDE_CODE_NONSTREAMING_TIMEOUT_RETRIES` at line 2877, followed by `</tbody>` at line 2878. Insert a new row just before `</tbody>`.

## Plan
1. Open `src/pages/practices.html`.
2. Locate line 2877 — the `CLAUDE_CODE_NONSTREAMING_TIMEOUT_RETRIES` row.
3. Insert the following new `<tr>` row after line 2877, just before `</tbody>`:
   ```html
   <tr><td><code>CLAUDE_CODE_DISABLE_STRUCTURED_OUTPUTS</code></td><td>Turns off structured outputs for session-title, memory-recall, and prompt-hook requests — use it on Mantle or behind gateways that reject structured outputs, where those requests otherwise fail (v2.1.288).</td></tr>
   ```

## Acceptance Criteria
- The env var table now includes `CLAUDE_CODE_DISABLE_STRUCTURED_OUTPUTS`.
- The row follows the same `<tr><td><code>VAR</code></td><td>Description</td></tr>` pattern.
- `python3 scripts/build-source.py` runs without error.
