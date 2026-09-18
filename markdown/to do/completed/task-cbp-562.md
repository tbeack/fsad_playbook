# CBP-562: [Claude] Document Monitor watch deadline change — Monitor Tool collapsible (v2.1.271)

## Summary
Claude Code v2.1.271 changed Monitor watches to always have a deadline (at most 30 minutes; 10 minutes in single-prompt `-p` runs) and notify Claude to re-arm, replacing the previous no-timeout `persistent` option.

## Assessment
The Monitor Tool collapsible (`src/pages/practices.html`, `power-usage--monitor-tool`) documents the tool's behavior and tracks version-specific changes in its intro paragraph (most recently the v2.1.260 one-hour cutoff removal for subagent background commands). The removal of the no-timeout `persistent` option is a behavior change worth flagging since anyone relying on indefinite watches needs to know Claude will now re-arm instead.

**Action:** Append a sentence to the intro paragraph of the Monitor Tool collapsible.

## Plan
1. Locate the intro paragraph in `src/pages/practices.html` (`power-usage--monitor-tool`) ending "...matching the main session."
2. Append: "As of v2.1.271, Monitor watches always carry a deadline (at most 30 minutes, or 10 minutes in single-prompt `-p` runs) and notify Claude to re-arm when it expires — replacing the previous no-timeout `persistent` option."

## Acceptance Criteria
- The Monitor Tool collapsible mentions the watch deadline change
- Version attribution (v2.1.271) included
- No existing content removed
