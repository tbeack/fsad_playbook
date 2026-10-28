# CBP-723: Remove `claude_code.safety_event` OTel row — event no longer sent (v2.1.312)

## Summary
Claude Code v2.1.312 changes Claude Code to stop sending the `claude_code.safety_event` OpenTelemetry event. This reverses CBP-711 (v2.1.307), which added a row documenting this event to the Monitoring OTel log-events table.

## Assessment
`src/pages/practices.html` line ~3954 has: `<tr><td><code>claude_code.safety_event</code></td><td>Tool call stopped, prompted, or sent back by a permission rule, auto mode, a safety check, a hook, or the sandbox (v2.1.307)</td><td>tool_name, safety_source, tool_use_id</td></tr>`. Since the event is no longer emitted as of v2.1.312, the row is stale and should be removed rather than left describing dead behavior.

## Plan
1. Open `src/pages/practices.html`.
2. Delete the `claude_code.safety_event` table row (~line 3954) from the OTel log events table.

## Acceptance Criteria
- The `claude_code.safety_event` row no longer appears in the OTel log events table.
- Surrounding rows (`claude_code.tool_decision`, `claude_code.skill_activated`) untouched.
- The changelog entry for this task explains the removal references v2.1.312, not v2.1.307 (the original CBP-711 changelog entry for v4.1.65 is left as-is — it's an accurate historical record of what was added then).
