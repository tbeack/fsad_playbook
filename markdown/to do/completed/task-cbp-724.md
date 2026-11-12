# CBP-724: `CLAUDE_CODE_AUTO_COMPACT_WINDOW` only lowers a subagent's window, never raises it (v2.1.312)

## Summary
Claude Code v2.1.312 changes a subagent's `autoCompactWindow` to lower the window set by `CLAUDE_CODE_AUTO_COMPACT_WINDOW`, where the var previously had no effect on subagents; it still never raises that window. This clarifies the env var row added for CBP-709 (v2.1.305), which didn't distinguish subagent behavior.

## Assessment
`src/pages/practices.html` line ~2802 documents `CLAUDE_CODE_AUTO_COMPACT_WINDOW` as a general "raise or lower the compaction point" var with no mention of subagents. As of v2.1.312 it can only lower (never raise) a subagent's own compaction window.

## Plan
1. Open `src/pages/practices.html`.
2. Append a clause to the `CLAUDE_CODE_AUTO_COMPACT_WINDOW` row (~line 2802) noting that as of v2.1.312, this var can only lower a subagent's own auto-compact window, never raise it, whereas it previously had no effect there.

## Acceptance Criteria
- The `CLAUDE_CODE_AUTO_COMPACT_WINDOW` row notes the subagent-specific lower-only behavior.
- Version-tagged `(v2.1.312)`.
- Existing v2.1.305 sentence about the main session's behavior untouched.
