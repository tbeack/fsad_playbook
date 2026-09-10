# CBP-531: Update `/workflows` cheat sheet row with agent detail improvements (v2.1.265)

## Summary
Claude Code v2.1.265 improved the `/workflows` agent detail view: tool calls are now marked running, failed, or done; the subagent's task list is shown when it has one; and pressing Enter unfolds the listed calls with their inputs and results. Previously the detail view was essentially static.

## Assessment
The current `/workflows` row in the cheat sheet table (around line 1912 of `src/pages/practices.html`) reads:
```
<tr><td><code>/workflows</code></td><td>View and manage dynamic workflow runs — Claude orchestrates tens to hundreds of parallel agents to tackle large-scale tasks. Available on Max, Team, and Enterprise plans (v2.1.154).</td></tr>
```
The description is accurate but doesn't mention the improved detail view. Adding a sentence about the new detail capabilities helps users know they can get live status information.

**Action:** Update the `/workflows` table row description to mention the improved agent detail view.

## Plan
1. Find the exact `/workflows` table row (around line 1912 in `src/pages/practices.html`)
2. Append to the existing description: "As of v2.1.265, the agent detail view marks tool calls running, failed, or done; shows the subagent's task list; and pressing Enter unfolds calls with their inputs and results."

## Acceptance Criteria
- The `/workflows` cheat sheet row mentions the improved detail view capabilities
- Version attribution (v2.1.265) is included
- No existing content is removed
