# CBP-770 — Add audio recording attachment note to Voice Conversations section (Codex rust-v0.168.0)

## Summary

Codex rust-v0.168.0 adds support for attaching audio recordings when using an audio-capable model. Codex skips recordings the user has already rejected and uses clip duration to keep more short recordings in context.

## Assessment

The Voice Conversations section (around line 1206) covers `/voice`, `F8` to toggle the microphone, and voice settings. It does not mention attaching recordings as a separate input (distinct from live voice). This is new functionality.

## Plan

1. Read the Voice Conversations collapsible (lines 1206-1225).
2. Append a sentence or short paragraph after the existing rust-v0.161.0 note:
   - As of rust-v0.168.0, you can attach audio recordings when using an audio-capable model. Codex skips recordings you have already rejected and uses clip duration to keep more short recordings in context.

## Acceptance Criteria

- The Voice Conversations section mentions audio recording attachment (rust-v0.168.0).
- Existing voice content is unchanged.
