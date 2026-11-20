# CBP-795: [Codex] Terminal workspace now stable and on by default (rust-v0.171.0)

## Summary
Codex rust-v0.171.0 marked the terminal workspace (introduced opt-in in rust-v0.168.0) as stable and enabled it by default. It also adds searchable document previews, image previews, and subagent transcripts shown alongside the main conversation.

## Assessment
`src/pages/codex.html`'s Terminal Workspace section (~line 1238) documents the feature as opt-in via `features.tui_workspace = true`. This is now out of date — the workspace ships on by default with new preview/transcript capabilities worth calling out.

## Plan
1. Open `src/pages/codex.html`.
2. In the Terminal Workspace section's paragraph, append after the existing rust-v0.169.0 sentence:
   ```
   As of rust-v0.171.0, the terminal workspace is stable and on by default — no config needed. It adds searchable document previews, image previews, and subagent transcripts shown alongside the main conversation.
   ```
3. No other files require changes for this task. (The `config.toml` snippet showing `tui_workspace = true` is left as-is since it still works as an explicit override/documentation of the setting.)

## Acceptance Criteria
- The Terminal Workspace section documents the rust-v0.171.0 stable/default-on change and the new preview/transcript features.
- HTML is valid (no unclosed tags).

## Status
Implemented.
