# CBP-556: Update `/workflows` cheat sheet row with agent detail improvements (v2.1.265)

## Summary
Claude Code v2.1.265 improved the `/workflows` agent detail view: tool calls are now marked running, failed, or done; the subagent's task list shows when it has one; and pressing Enter unfolds listed calls with their inputs and results.

## Assessment
The current `/workflows` row in the cheat sheet table (line 1915 of `src/pages/practices.html`) reads:
```
<tr><td><code>/workflows</code></td><td>View and manage dynamic workflow runs — Claude orchestrates tens to hundreds of parallel agents to tackle large-scale tasks. Available on Max, Team, and Enterprise plans (v2.1.154).</td></tr>
```
The description is accurate but does not mention the improved detail view. Adding a sentence tells users they can get live status on individual tool calls.

**Action:** Append a sentence to the `/workflows` table row description.

## Plan
1. Find line 1915 in `src/pages/practices.html` — the `/workflows` table row
2. Append to the existing description: "As of v2.1.265, the agent detail view marks tool calls running, failed, or done; shows the subagent's task list when it has one; and pressing Enter unfolds calls with their inputs and results."

## Acceptance Criteria
- The `/workflows` cheat sheet row mentions the improved detail view
- Version attribution (v2.1.265) is included
- No existing content is removed
