# CBP-797: [Codex] Add `/rc`/`/remote` TUI commands and `codex exec --remote` (rust-v0.171.0)

## Summary
Codex rust-v0.171.0 added `/rc` and `/remote` TUI commands to manage local remote control and display device pairing codes, plus `codex exec --remote <ADDR>` to start or resume noninteractive sessions on an existing app server.

## Assessment
`src/pages/codex.html`'s `codex remote-control` row (~line 1057) documents the headless app-server entrypoint and the `codex remote-control pair` manual pairing flow, but not these new in-TUI commands or the remote noninteractive `exec` option.

## Plan
1. Open `src/pages/codex.html`.
2. In the `codex remote-control` row, append after the existing rust-v0.155.0 sentence:
   ```
   As of rust-v0.171.0, <code>/rc</code> and <code>/remote</code> manage local remote control and show device pairing codes from inside the TUI, and <code>codex exec --remote &lt;ADDR&gt;</code> starts or resumes a noninteractive session on an existing app server.
   ```
3. No other files require changes for this task.

## Acceptance Criteria
- The `codex remote-control` row documents `/rc`/`/remote` and `codex exec --remote <ADDR>` (rust-v0.171.0).
- HTML is valid (no unclosed tags).

## Status
Implemented.
