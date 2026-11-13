# CBP-769 — Add `codex exec / codex review --trust` security note (Codex rust-v0.169.0)

## Summary

Codex rust-v0.169.0 fixes a security issue: `codex exec` and `codex review` now keep project configuration and MCP servers disabled in untrusted directories, even when you pass `--sandbox workspace-write`. Use `--trust` with `codex exec` or `codex review` to explicitly save project trust for a directory.

## Assessment

The `codex exec` section (around line 1306-1322) shows `codex exec --sandbox workspace-write` as a standard command for autonomous execution. It does not mention the trust requirement for untrusted directories. This change affects the safety assumptions in that section.

## Plan

1. Find the `codex exec --sandbox workspace-write` code block (around line 1321 in the headless exec section).
2. Add a note paragraph below the code block (or after the existing paragraph) that explains:
   - In untrusted directories, `codex exec` and `codex review` keep project config and MCP servers disabled even with `--sandbox workspace-write`.
   - Add `--trust` to explicitly save project trust for the directory.
3. Also update the `codex exec fork` row (line 1058) or the `codex exec --cyber-access-program` row area to note the `--trust` flag is now recognized by both `codex exec` and `codex review` for untrusted directories.

## Acceptance Criteria

- The headless exec section explains the untrusted-directory behavior and the `--trust` flag.
- The existing `codex exec --sandbox workspace-write` example is not removed, but is contextualized by the trust requirement.
