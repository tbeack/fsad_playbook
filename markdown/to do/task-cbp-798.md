# CBP-798: Add `easel` built-in chart mod to Built-in Mods table (v2.1.330)

## Summary
Claude Code v2.1.330 added `easel`, a built-in mod that draws charts when asked and under MCP metrics results, on Pro, Max, and — where available — Team and Enterprise, on macOS and Linux. Automatic charts can be turned off in `/config`.

## Assessment
`src/pages/practices.html`'s Built-in Mods table (Mods section, `mods--built-in` collapsible) lists every other built-in mod (`cc-plugin-agents-md`, `cc-plugin-diff`, `cc-plugin-plugin-authoring`, `cc-plugin-sec-default`, `cc-plugin-telemetry`, `cc-plugin-you-should-know`) but was missing this new one.

## Plan
1. Open `src/pages/practices.html`.
2. In the Built-in Mods table body, add a new row after the `cc-plugin-you-should-know` row:
   ```html
   <tr><td><code>easel</code></td><td>Draws charts when asked, and under MCP metrics results, on Pro, Max, and — where available — Team and Enterprise, on macOS and Linux (v2.1.330). Turn off automatic charts in <code>/config</code>.</td></tr>
   ```
3. No other files require changes for this task.

## Acceptance Criteria
- The Built-in Mods table documents `easel`.
- HTML is valid (no unclosed tags).

## Status
Implemented.
