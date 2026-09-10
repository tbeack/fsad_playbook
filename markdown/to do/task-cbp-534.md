# CBP-534: Add VS Code auto-archive inactive sessions note (v2.1.265)

## Summary
Claude Code v2.1.265 added automatic archiving of inactive sessions to the VS Code extension: a new "Archive inactive sessions" setting (default 14 days) automatically archives sessions that haven't been used for the configured period. This keeps the VS Code sidebar chat from accumulating stale sessions indefinitely.

## Assessment
The Remote Control & Cross-Device collapsible (`#power-usage--remote-control`, around line 2490 of `src/pages/practices.html`) already mentions VS Code in a bullet at ~line 2514: "Sessions started from Claude Code Desktop or VS Code also keep phones and claude.ai/code updated on the session's permission mode...". This section is the best existing home for a VS Code session management note, as it covers session lifecycle topics and already references VS Code sessions.

**Action:** Add a bullet to the Remote Control & Cross-Device `<ul>` list noting the VS Code auto-archive setting.

## Plan
1. Find the Remote Control & Cross-Device collapsible `<ul>` (around lines 2509–2524 in `src/pages/practices.html`)
2. Append a new `<li>` at the end of the list (after the last bullet about foreground subagent streaming):
   ```html
   <li>[VS Code] Sessions inactive for a configurable period are automatically archived — the default is 14 days. Adjust via the "Archive inactive sessions" setting in the VS Code extension (v2.1.265)</li>
   ```

## Acceptance Criteria
- New bullet appears in the Remote Control & Cross-Device collapsible
- The note mentions the default (14 days), that it's configurable, and where to find the setting
- Version attribution (v2.1.265) is included
- `[VS Code]` prefix matches the format used in the raw changelog entries, making it clear this is VS Code-specific
