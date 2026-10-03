# CBP-642 — Update background command time limit note — terminal/desktop have no limit

## Summary
Claude Code v2.1.288 changed the background command time limit to apply only in unattended sessions (`-p`, Agent SDK, CI, cloud). Terminal, desktop app, and VSCode sessions now have no background command time limit.

## Assessment
The Monitor/Background Commands paragraph in `src/pages/practices.html` at line 2771 currently says: "As of v2.1.260, background commands started by subagents are no longer cut off after one hour — they run until they exit or are stopped, matching the main session." This is partially superseded: the new change means terminal/desktop/VSCode sessions have NO limit at all, while the limit still applies for unattended/CI sessions.

## Plan
1. Open `src/pages/practices.html`.
2. Locate line 2771 — the Monitor paragraph.
3. Append the following sentence after the existing v2.1.260 sentence (before the v2.1.271 sentence about Monitor deadlines):
   ` As of v2.1.288, the background command time limit applies only in unattended sessions (<code>-p</code>, Agent SDK, CI, cloud); interactive terminal, desktop app, and VS Code sessions have no background time limit.`

## Acceptance Criteria
- The Monitor paragraph now mentions the v2.1.288 change about unattended vs. interactive session limits.
- The note is inserted in version order (after v2.1.260, before or alongside the v2.1.271 note about Monitor deadlines).
- `python3 scripts/build-source.py` runs without error.
