# CBP-664 — [Codex] Add /mcp login <name> (rust-v0.161.0)

## Summary
[Codex] Add /mcp login <name> (rust-v0.161.0)

## Source
Codex CLI rust-v0.161.0 (2026-10-07)

## Assessment
Not covered or outdated in src/pages/codex.html.

## Plan
Add a `/mcp login <name>` row after the `/mcp` row in the #codex-cheat-sheet table (~line 1006).
Then run `python3 scripts/build-source.py`.

## Acceptance Criteria
- The change appears in src/pages/codex.html with the version tag.
- Build passes.
