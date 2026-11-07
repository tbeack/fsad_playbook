# CBP-754: Add `CLAUDE_CODE_DISABLE_FEATURE_FLAGS` env var (v2.1.319)

## Summary
Claude Code v2.1.319 added the `CLAUDE_CODE_DISABLE_FEATURE_FLAGS` environment variable, which stops feature-flag fetching without turning off telemetry — every flag then uses its built-in default.

## Assessment
`src/pages/practices.html` has an env var reference table (~line 2760-2820) cataloging every documented `CLAUDE_CODE_*` / `ANTHROPIC_*` variable. Direct, table-shaped fit, same pattern as the other `CLAUDE_CODE_DISABLE_*` rows.

## Plan
1. Open `src/pages/practices.html`.
2. In the env var table, after the `CLAUDE_CODE_DISABLE_NESTED_SESSION_ID` row and before the closing `</tbody>`, insert:
   ```html
   <tr><td><code>CLAUDE_CODE_DISABLE_FEATURE_FLAGS=1</code></td><td>Stops feature-flag fetching without turning off telemetry — every feature flag then uses its built-in default instead of a server-assigned value. Use to pin behavior for reproducibility or to rule out a feature-flag rollout when debugging an inconsistency between sessions (v2.1.319).</td></tr>
   ```
3. No other files require changes for this task.

## Acceptance Criteria
- A new env var table row documents `CLAUDE_CODE_DISABLE_FEATURE_FLAGS` and what it does as of v2.1.319.
- HTML is valid (no unclosed tags).
