# CBP-134 — Add hook `continueOnBlock` PostToolUse option to Hooks Deep Dive

## Summary
Claude Code v2.1.139 added a `continueOnBlock` config option for `PostToolUse` hooks. When set to `true`, instead of blocking the turn (which ends Claude's execution), the hook's rejection reason is fed back to Claude as context and the turn continues. This enables a "soft block" pattern where Claude is informed of the rejection but can retry or adjust.

## Assessment
**Does this content exist in the playbook?**

- The Hooks section covers exit codes and PostToolUse blocking at lines ~7270–7310
- The "PostToolUse output replacement" section at line 7289 covers `hookSpecificOutput.updatedToolOutput`
- There is NO mention of `continueOnBlock` anywhere in the playbook
- The Hooks Events table (around line 6447) shows PostToolUse blocking via exit code 2
- The Exit Codes collapsible in the Hooks section covers blocking behavior

**What needs to change:**
Add `continueOnBlock` documentation to the PostToolUse section, near the existing output replacement / blocking documentation.

## Plan
1. Read lines 7280–7320 to find the exact PostToolUse blocking documentation area
2. After the existing PostToolUse output replacement note, add a paragraph about `continueOnBlock`:
   - Explain: set `"continueOnBlock": true` in the hook config to turn a block (exit 2) into a soft rejection — Claude receives the hook's rejection reason as a tool result and can retry or adjust
   - Include a brief JSON config example showing `"continueOnBlock": true`
3. Also check if the exit codes table references this pattern and add a note if needed

## Acceptance Criteria
- `continueOnBlock` is documented near the PostToolUse output/blocking documentation
- The soft-block vs hard-block distinction is clearly explained
- A code example shows the config syntax
- The exit codes section or PostToolUse table references this option
