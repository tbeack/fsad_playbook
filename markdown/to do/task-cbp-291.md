# CBP-291 — Update `claude agents` Cheat Sheet row (auto-commit/PR)

## Summary
Claude Code v2.1.198: background agents launched from `claude agents` now automatically commit, push, and open a draft PR when they finish code work in a worktree. Previously they would stop and ask.

## Assessment
**Line 9979** of `fsad-playbook.html` has the `claude agents` row which documents dispatch flags, `! <command>`, subagent progress, etc., but nothing about the auto-commit/push/draft-PR finish behavior. This is important operational knowledge for teams using background worktree agents.

## Plan
1. Read fsad-playbook.html around line 9979
2. Append a sentence to the `claude agents` row describing the auto-finish behavior:
   - "When a background agent finishes code work in a worktree, it now automatically commits, pushes, and opens a draft PR — no manual prompting required (v2.1.198)."
   - Add this near the end of the existing cell content, before the closing `</td>`

## Acceptance Criteria
- `claude agents` row mentions auto-commit, push, and draft PR behavior for worktree agents
- Version note `v2.1.198` included
- Existing row content is preserved
