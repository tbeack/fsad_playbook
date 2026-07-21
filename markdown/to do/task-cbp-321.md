# CBP-321 — Update `/context` cheat sheet row with overflow warning behavior

## Summary
Claude Code v2.1.216 improved `/context`: it now shows an explicit warning when the conversation exceeds the context window. Additionally, a failed `/compact` now displays as an error rather than silently failing or showing a generic message.

## Assessment
The playbook has a `/context` row in the Cheat Sheet section (around line 9881):
```
/context    Visualize context usage with optimization suggestions
```
The current description is accurate but doesn't mention the new overflow warning or the improved `/compact` error behavior. Both are useful behavior notes for engineers managing long sessions.

## Plan
1. Locate the `/context` row at line 9881
2. Update the description to:
   ```
   Visualize context usage with optimization suggestions. As of v2.1.216, shows an explicit warning when the conversation exceeds the context window; a failed <code>/compact</code> now displays as an error.
   ```

## Acceptance Criteria
- The `/context` cheat sheet row description mentions the overflow warning behavior added in v2.1.216
- The `/compact` error display behavior is noted
- Version tag `v2.1.216` is present
- Row formatting matches surrounding rows
