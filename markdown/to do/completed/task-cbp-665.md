# CBP-665 — [Codex] Voice microphone/speaker selection (rust-v0.161.0)

## Summary
[Codex] Voice microphone/speaker selection (rust-v0.161.0)

## Source
Codex CLI rust-v0.161.0 (2026-10-07)

## Assessment
Not covered or outdated in src/pages/codex.html.

## Plan
Extend the `/voice` cheat-sheet row (~line 1012) and Voice Conversations section (~line 1205) with microphone, speaker and input-channel selection.
Then run `python3 scripts/build-source.py`.

## Acceptance Criteria
- The change appears in src/pages/codex.html with the version tag.
- Build passes.
