# CBP-557: Add VS Code auto-archive inactive sessions note (v2.1.265)

## Summary
Claude Code v2.1.265 added automatic archiving of inactive sessions to the VS Code extension: a new "Archive inactive sessions" setting (default 14 days) archives sessions that have not been used for the configured period. This keeps the VS Code sidebar from accumulating stale sessions.

## Assessment
The Remote Control & Cross-Device collapsible (line 2525 of `src/pages/practices.html`) ends with:
```
<li>A foreground subagent's tool calls and results now stream live to Remote Control clients as they happen — background subagents, the default, still show status only (v2.1.251)</li>
```
The VS Code auto-archive feature fits naturally after this bullet, as VS Code session management.

**Action:** Add a new `<li>` after line 2525 in the Remote Control list.

## Plan
1. Find line 2525 in `src/pages/practices.html` — the foreground subagent streaming bullet
2. After that `<li>`, add:
   ```html
   <li>[VS Code] Sessions inactive for a configurable period are automatically archived — the default is 14 days. Adjust via the "Archive inactive sessions" setting in the VS Code extension (v2.1.265)</li>
   ```

## Acceptance Criteria
- New bullet appears after the foreground subagent streaming bullet
- The note mentions the 14-day default, that it is configurable, and where to find the setting
- Version attribution (v2.1.265) is included
- `[VS Code]` prefix makes it clear this is VS Code-specific
- No existing content is removed
