# CBP-701 — Add `/auto-mode-setup` slash command row to the cheat sheet

## Summary
Claude Code v2.1.304 added `/auto-mode-setup`: a guided setup that reads your project and recent sessions to teach auto mode about your environment. The command is now available on Bedrock, Vertex, Foundry, the Claude apps gateway, and telemetry-disabled sessions (the v2.1.304 fact is the provider expansion; the command existed earlier on first-party).

## Assessment
The cheat sheet in `src/pages/practices.html` does not mention `/auto-mode-setup`. The row for `claude auto-mode reset` is at line 1889. That row is the natural neighbor — both relate to auto-mode setup and configuration.

## Plan
1. Open `src/pages/practices.html`.
2. Find the row: `<tr><td><code>claude auto-mode reset</code></td>...`.
3. Insert a new row immediately before it:
   ```html
   <tr><td><code>/auto-mode-setup</code></td><td>Guided setup that reads your project and recent sessions to teach auto mode about your environment. Available on Bedrock, Vertex, Foundry, the Claude apps gateway, and telemetry-disabled sessions (v2.1.304).</td></tr>
   ```

## Acceptance Criteria
- The new row appears in the cheat sheet near `claude auto-mode reset`.
- The description is accurate and does not claim v2.1.304 introduced the command (only the provider expansion).
- No broken HTML.
