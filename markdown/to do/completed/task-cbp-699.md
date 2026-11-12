# CBP-699 — Add max 12 concurrent prompt/agent hooks note

## Summary

Claude Code v2.1.302 added a concurrency limit for prompt and agent hooks: at most 12 hooks of the same event type run at a time. The rest wait their turn.

## Assessment

This limit is not documented in the playbook. It applies only to prompt and agent hooks (not command hooks or HTTP hooks). The hooks section starts at line ~2025 and has a general description paragraph at line ~2862. The best place for this note is the hooks intro paragraph or near the hook configuration table, so engineers who deploy many hooks know about the constraint.

Looking at the hooks section, there is a paragraph at line ~2862:
"Hooks are user-defined shell commands, HTTP endpoints, LLM prompts, or agents that execute automatically at specific points in Claude Code's lifecycle. They fire deterministically..."

Add a sentence about the concurrency limit at the end of this paragraph or as a follow-on note.

## Plan

1. Open `src/pages/practices.html`.
2. Find the hooks intro paragraph at line ~2862 that starts "Hooks are user-defined shell commands".
3. Find where this paragraph ends and append a note:

```
 As of v2.1.302, prompt and agent hooks run at most 12 of the same event at a time; additional concurrent firings of that event wait their turn. This limit does not apply to command or HTTP hooks.
```

4. Save the file.

## Acceptance Criteria

- The note is in the hooks section (not the mods section).
- The note correctly scopes the limit to prompt and agent hooks only.
- The note does not say "hooks are capped at 12" without qualification.
