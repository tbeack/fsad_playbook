# CBP-146 — Update `/rewind` Cheat Sheet row to mention "Summarize up to here"

## Summary
Claude Code v2.1.141 added a "Summarize up to here" option to the Rewind menu. This compresses earlier context while keeping recent turns intact — useful for long sessions where you want to prune old context without fully rewinding to a checkpoint.

## Assessment
The playbook's Cheat Sheet has a `/rewind` row at approximately line 6218:
```
<tr><td><code>/rewind</code></td><td>Rewind to previous checkpoint (aliases: <code>/undo</code>, <code>/checkpoint</code>)</td></tr>
```
The "Summarize up to here" option is an important new capability of the rewind menu that users should know about — it's an alternative to full rewind that compresses rather than discards.

## Plan
1. Read line 6218 to confirm exact text
2. Update the description to mention that the Rewind menu now also offers "Summarize up to here" — compresses earlier context while keeping recent turns

## Acceptance Criteria
- The `/rewind` Cheat Sheet row mentions the "Summarize up to here" rewind menu option
- The description remains concise (one sentence addition is sufficient)
