# CBP-492 — Document live streaming of a foreground subagent's tool calls to Remote Control

## Summary
Claude Code v2.1.251 added live streaming of a foreground subagent's tool calls and results to Remote Control clients as they happen. Background subagents (the default) still show status only.

## Assessment
`src/pages/practices.html` Power Usage section has a dedicated "Remote Control & Cross-Device" collapsible (`#power-usage--remote-control`, ~line 2475-2506) with a bulleted list of Remote Control behaviors and version-tagged updates (most recently v2.1.238). It does not yet mention foreground-subagent tool-call streaming.

## Plan
1. In `src/pages/practices.html`, `#power-usage--remote-control` collapsible bullet list (~line 2493-2504), add a new `<li>` after the existing v2.1.238 bullet (~line 2503):
   ```html
   <li>A foreground subagent's tool calls and results now stream live to Remote Control clients as they happen — background subagents, the default, still show status only (v2.1.251)</li>
   ```

## Acceptance Criteria
- [ ] New bullet added to the Remote Control & Cross-Device collapsible describing live foreground-subagent tool-call streaming (v2.1.251).
