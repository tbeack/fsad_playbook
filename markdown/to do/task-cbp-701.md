# CBP-701 — Add `/auto-mode-setup` slash command

## Summary

Claude Code v2.1.304 adds `/auto-mode-setup`: a guided setup that reads your project and recent sessions to teach auto mode about your environment. It is now also available on Bedrock, Vertex, Foundry, Claude apps gateway, and telemetry-disabled sessions.

## Assessment

Not yet documented. The slash commands table in `src/pages/practices.html` already has an auto-mode-related CLI row, `claude auto-mode reset`, at line ~1889. Add the new row directly after it.

## Plan

1. Open `src/pages/practices.html`.
2. Find the `claude auto-mode reset` row (line ~1889).
3. Insert a new `<tr>` row immediately after it:

```html
<tr><td><code>/auto-mode-setup</code></td><td>Guided setup that reads your project and recent sessions to teach auto mode about your environment. Available on Bedrock, Vertex, Foundry, the Claude apps gateway, and telemetry-disabled sessions (v2.1.304).</td></tr>
```

4. Save the file.

## Acceptance Criteria

- The row appears immediately after `claude auto-mode reset` in the slash commands table.
- The row notes the expanded platform availability.
