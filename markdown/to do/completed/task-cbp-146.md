# CBP-146 — Update `/rewind` Cheat Sheet row to mention "Summarize up to here"

## Summary
Claude Code v2.1.141 added "Summarize up to here" to the Rewind menu. This option compresses earlier context while keeping recent turns intact — essentially a targeted compaction that preserves the conversation's most recent state. It complements the existing rewind/checkpoint behavior and is useful when context is growing large but you do not want to lose recent work.

## Assessment
The Cheat Sheet `/rewind` row exists. The "Summarize up to here" option is a new sub-feature of the Rewind menu. Currently: **not mentioned in the playbook**.

## Plan
1. Locate the `/rewind` row in the Cheat Sheet.
2. Update the description to mention the "Summarize up to here" option.
3. Mark CBP-146 complete in todo.md.

## Acceptance Criteria
- The `/rewind` Cheat Sheet row mentions "Summarize up to here" and explains what it does.
- The existing aliases (`/undo`, `/checkpoint`) are preserved.
- No HTML is broken.
