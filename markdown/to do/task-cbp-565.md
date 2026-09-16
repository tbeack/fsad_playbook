# CBP-565 — Add `CLAUDE_CODE_AUTO_MODE_SERVER=1` to Notable Environment Variables

**Source:** Claude Code v2.1.273  
**Tag:** [Claude]

## Summary
v2.1.273 changes auto mode on Bedrock, Vertex, and Foundry to use the **local classifier** by default (instead of the platform's server-side classifier). A new env var `CLAUDE_CODE_AUTO_MODE_SERVER=1` lets users opt back in to the server-side classifier.

## Assessment
The Notable Environment Variables table in `src/pages/practices.html` already has `CLAUDE_CODE_ENABLE_AUTO_MODE=1` (deprecated, line 2817) and nearby auto-mode rows. The new `CLAUDE_CODE_AUTO_MODE_SERVER=1` row should be placed immediately after the `CLAUDE_CODE_ENABLE_AUTO_MODE=1` row for logical grouping.

## Plan
1. Open `src/pages/practices.html`
2. Find the `CLAUDE_CODE_ENABLE_AUTO_MODE=1` row (line 2817, deprecated notice)
3. Insert a new `<tr>` row immediately after it:
   ```html
   <tr><td><code>CLAUDE_CODE_AUTO_MODE_SERVER=1</code></td><td>On Bedrock, Vertex AI, and Foundry, auto mode uses the local permission classifier by default as of v2.1.273. Set this var to switch back to the platform's server-side classifier — useful when your gateway's server classifier is configured for your organisation's policies (v2.1.273).</td></tr>
   ```
4. Mark CBP-565 complete in todo.md

## Acceptance Criteria
- The new row appears after `CLAUDE_CODE_ENABLE_AUTO_MODE=1` in the env vars table
- The description explains the default-is-now-local change and the opt-back-in
- Build passes without errors
