# CBP-767 — Update `codex agents` row and dashboard paragraph (Codex rust-v0.169.0)

## Summary

Codex rust-v0.169.0 adds the ability to search older tasks from the agent command center by name, prompt preview, or working directory.

## Assessment

The `codex agents` row (line 1060) and the Interactive dashboard paragraph (line 1163) both describe the agent command center. Neither mentions search by name, prompt preview, or working directory. Both need updating.

## Plan

1. Update line 1060: append to the existing `codex agents` table row cell text:
   - Add: "As of rust-v0.169.0, search older tasks from the command center by name, prompt preview, or working directory."
2. Update line 1163: append the same search capability to the Interactive dashboard paragraph at the end of the sentence about rust-v0.167.0.

## Acceptance Criteria

- The `codex agents` table row and the Interactive dashboard paragraph both mention task search by name, prompt preview, and working directory.
- Existing text is unchanged.
