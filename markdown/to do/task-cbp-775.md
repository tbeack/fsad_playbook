# CBP-775: Update `/status` row — new row for provider/env var disabled features (v2.1.326)

## Summary
Claude Code v2.1.326 added a row to `/status` that says when your provider or an environment variable such as `DISABLE_TELEMETRY` turns features off.

## Assessment
`src/pages/practices.html`'s Info & account commands table has a `/status` row (~line 1912) that already chains a running list of "As of vX.X.X, also..." sentences documenting incremental `/status` additions (v2.1.221, v2.1.243, v2.1.278, v2.1.282). The v2.1.282 entry already covers telemetry environment variables specifically; this v2.1.326 change generalizes that to provider/env-var-driven feature disablement more broadly, so it's a direct continuation of that same running list.

## Plan
1. Open `src/pages/practices.html`.
2. In the `/status` row (~line 1912), append a new sentence before the closing `</td></tr>`:
   ```
    As of v2.1.326, also adds a row showing when your provider or an environment variable such as <code>DISABLE_TELEMETRY</code> has turned a feature off.
   ```
3. No other files require changes for this task.

## Acceptance Criteria
- The `/status` row documents the v2.1.326 provider/env-var feature-off row.
- HTML is valid (no unclosed tags).
