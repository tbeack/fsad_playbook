# CBP-731: Update idle compaction — now runs in VS Code and Claude Desktop Code tab (v2.1.314)

## Summary
Claude Code v2.1.314 extended idle compaction to VS Code and Claude Desktop's Code tab. Previously, idle compaction only ran in the CLI. Now a 200K+ token conversation left idle is summarized in the IDE too, and the summary is used on the next message if the prompt cache has expired.

## Assessment
The playbook has two places that describe idle compaction:

1. `src/pages/practices.html` line 667 — the settings reference bullet for `idleCompaction`.
2. `src/pages/practices.html` line 2684 — the Power Usage "Idle compaction" bullet.

Both currently describe only the CLI behavior. Both need a note that VS Code and Desktop Code tab sessions also compact when idle as of v2.1.314.

## Plan
1. At line 667, append to the end of the `<li>` text (before the closing `</li>`):
   ` As of v2.1.314, also runs in VS Code and Claude Desktop's Code tab.`

2. At line 2684, append to the end of the `<li>` text (before the closing `</li>`):
   ` As of v2.1.314, idle compaction also runs in VS Code and Claude Desktop's Code tab.`

## Acceptance Criteria
- Both idle compaction bullets mention v2.1.314 and VS Code / Desktop Code tab.
- No existing text is removed.
