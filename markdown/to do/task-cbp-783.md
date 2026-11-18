# CBP-783: [Codex] Add WebRTC voice call note to Voice Conversations (rust-v0.170.0)

## Summary
Codex CLI rust-v0.170.0 added WebRTC negotiation for realtime voice calls in the TUI.

## Assessment
`src/pages/codex.html` has a Voice Conversations collapsible (~line 1207-1226) that already chains "As of rust-vX.X.X" sentences documenting incremental voice feature additions (rust-v0.156.0, rust-v0.161.0, rust-v0.168.0). This is a direct continuation.

## Plan
1. Open `src/pages/codex.html`.
2. In the Voice Conversations collapsible, after the rust-v0.168.0 audio-recording-attachment paragraph, add a new paragraph:
   ```html
   <p style="margin-top:0.5rem; font-size:0.88rem; color:var(--text-secondary);">As of rust-v0.170.0, voice calls negotiate over WebRTC in the TUI, instead of the previous transport, for lower-latency realtime audio.</p>
   ```
3. No other files require changes for this task.

## Acceptance Criteria
- The Voice Conversations collapsible documents the rust-v0.170.0 WebRTC transport change.
- HTML is valid (no unclosed tags).
