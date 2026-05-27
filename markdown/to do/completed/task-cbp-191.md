# CBP-191 — Add `MessageDisplay` hook event to hooks tables

## Summary
Claude Code v2.1.152 added a new `MessageDisplay` hook event. This hook fires when assistant message text is about to be displayed, allowing hooks to transform or hide the text. This is a new output-side hook type.

## Assessment
The Cheat Sheet hooks section (lines 6603–6665) organizes events by category. The "Core hooks" table has: SessionStart, SessionEnd, InstructionsLoaded, UserPromptSubmit, Stop, StopFailure. `MessageDisplay` is a display-layer event that fires when output is rendered — it fits closest to the "Core hooks" category (since it's a session-lifecycle event tied to response display), or could be added as its own "Display hooks" category.

**Does this content exist?** No — `MessageDisplay` is not mentioned anywhere in the playbook. The total count currently says "26 Events" in the heading at line 6604.

**Where to add:** Add `MessageDisplay` to the Core hooks table (after `Stop`/`StopFailure` rows). Also update the heading count from "26 Events" to "27 Events".

## Plan
1. Read lines 6603–6618 to confirm the Core hooks table structure
2. Add `MessageDisplay` row after the `StopFailure` row:
   ```html
   <tr><td><code>MessageDisplay</code></td><td>Before assistant message text is displayed — hooks can transform or hide the output</td></tr>
   ```
3. Update heading at line 6604 from "26 Events" to "27 Events"
4. Also update the Codex vs Claude comparison table at line 8338 which mentions "26 event types"

## Acceptance Criteria
- `MessageDisplay` appears in the Core hooks table after `StopFailure`
- Event count updated to 27 in section heading
- Codex comparison table updated to 27 event types
