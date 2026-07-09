# CBP-291 — [Codex] Update Codex Cheat Sheet: remote-control pair + remote plugins default (rust-v0.143.0)

## Summary
Codex rust-v0.143.0 introduced two notable changes:
1. `codex remote-control pair` — Generate manual pairing codes from a running daemon, without needing the full browser OAuth flow.
2. Remote plugins are now enabled by default — With richer catalog rows, npm marketplace sources, and visible remote/local version indicators.

## Assessment
The Codex Cheat Sheet CLI flags table at line ~12745 has:
```
codex remote-control — Start a headless, remotely controllable app-server — a simpler entrypoint than configuring the full app-server stack. Allows external clients to drive a Codex session via the protocol API. Added in v0.130.0.
```

The `pair` subcommand is not mentioned. This is the place to add a mention of it.

For remote plugins: there is no Codex Plugins section callout about remote plugins being enabled by default. The Codex Plugins section likely needs a brief note.

## Plan
1. Update the `codex remote-control` row at line ~12745 to mention the `pair` subcommand:
   - Append: "Use `codex remote-control pair` to generate a manual pairing code from a running daemon — useful when automated OAuth pairing isn't available (rust-v0.143.0)."

2. Find the Codex Plugins section and add a note about remote plugins being enabled by default:
   - Search for where Codex plugins are described and add: "Remote plugins are now enabled by default (rust-v0.143.0) — the marketplace shows richer catalog rows with npm sources and visible remote/local version indicators."

## Acceptance Criteria
- `codex remote-control` row mentions the `pair` subcommand
- Codex Plugins section (or nearby note) mentions remote plugins being enabled by default
- Both changes reference rust-v0.143.0
