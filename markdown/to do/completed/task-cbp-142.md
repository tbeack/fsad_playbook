# CBP-142 — Add `terminalSequence` hook JSON output field to Hooks Deep Dive

## Summary
Claude Code v2.1.141 added a `terminalSequence` field to hook JSON output. When a hook writes JSON to stdout with a `terminalSequence` key, Claude Code emits that value directly to the terminal — enabling hooks to send desktop notifications, set window titles, or ring the terminal bell, even when there is no controlling terminal. This is a significant new capability for hooks authors wanting ambient feedback.

## Assessment
The Exit Codes & Decision Control collapsible (`id="hooks-deep-dive--exit-codes"`) already documents `hookSpecificOutput.updatedToolOutput` and `continueOnBlock`. The `terminalSequence` field should be added in the same section as a third JSON output pattern. Currently: **not documented anywhere in the playbook**.

## Plan
1. Read fsad-playbook.html around the continueOnBlock closing paragraph (end of Exit Codes section).
2. After the closing paragraph for `continueOnBlock`, add a new sub-section documenting `terminalSequence`.
3. Mark CBP-142 complete in todo.md.

## Acceptance Criteria
- The `terminalSequence` JSON output pattern appears in the Exit Codes & Decision Control collapsible in the Hooks Deep Dive section.
- The bell escape sequence and window title escape sequence examples are shown.
- Renders correctly in browser with no broken HTML.
