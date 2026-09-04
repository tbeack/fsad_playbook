# CBP-523 — Note Removal of One-Hour Subagent Background-Command Limit

## Source
Claude Code v2.1.260

## Summary
v2.1.260 removes the one-hour time limit on background commands started by subagents; they now run until they exit or are stopped, matching the main session.

## Assessment
`src/pages/practices.html` Monitor Tool collapsible (line 2716) describes `Bash(run_in_background: true)` streaming but does not mention subagent time limits. Update existing.

## Plan
1. Read line 2716.
2. Append to the paragraph: "As of v2.1.260, background commands started by subagents are no longer cut off after one hour — they run until they exit or are stopped, matching the main session."

## Acceptance Criteria
- Monitor Tool paragraph mentions the removed subagent limit with v2.1.260 attribution
- HTML is valid
