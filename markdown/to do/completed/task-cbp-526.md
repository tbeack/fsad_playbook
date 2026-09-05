# CBP-526 — Add `--append-subagent-system-prompt-file` CLI Flag Row

## Source
Claude Code v2.1.261

## Summary
v2.1.261 adds `--append-subagent-system-prompt-file` to read the subagent system prompt from a file, for prompts too large to pass on the command line.

## Assessment
`src/pages/practices.html` Cheat Sheet "System prompt & config" CLI flags table documents `--system-prompt` and `--append-system-prompt` but has no subagent-specific system-prompt flag. New row.

## Plan
1. Locate the `--append-system-prompt` row.
2. Add a new row immediately after it for `--append-subagent-system-prompt-file` with v2.1.261 attribution.

## Acceptance Criteria
- New row present in the System prompt & config table
- HTML is valid
