# CBP-616 [Codex] Update `/daemon` and `--no-daemon` rows — automatic background-server startup now default (rust-v0.157.0)

## Summary

Codex rust-v0.157.0 enables automatic background-server (daemon) startup by default for eligible interactive sessions. It also adds recovery choices when server settings are incompatible.

## Assessment

**`/daemon` cheat sheet row** — needed a note that the daemon now starts automatically by default and that incompatible server settings trigger a recovery prompt.

**`--no-daemon` CLI flag row** — needed a note that since the daemon now starts automatically by default, this flag is the opt-out path.

## Plan

1. Update the `/daemon` row: note automatic startup is the default for eligible interactive sessions as of rust-v0.157.0; recovery choices appear when server settings are incompatible.
2. Update the `--no-daemon` row: note that as of rust-v0.157.0 the daemon starts automatically by default and this flag opts out.

## Acceptance Criteria

- `/daemon` row notes automatic daemon startup as default as of rust-v0.157.0.
- `--no-daemon` row notes it opts out of automatic startup.
- No HTML is broken; the build succeeds.
