# CBP-606 [Codex] Update `/daemon` and `--no-daemon` rows — automatic background-server startup now default (rust-v0.157.0)

## Summary

Codex rust-v0.157.0 enables automatic background-server (daemon) startup by default for eligible interactive sessions. It also adds recovery choices when server settings are incompatible. Previously the daemon was available but not auto-started.

## Assessment

**`/daemon` cheat sheet row** (`src/pages/codex.html`, line ~1011):
```
<tr><td><code>/daemon</code></td><td>Update the local background server from within the TUI. Use the <code>--no-daemon</code> CLI flag at startup to bypass the daemon entirely. (rust-v0.156.0)</td></tr>
```
Needs a note that the daemon now starts automatically by default for eligible sessions, and that incompatible server settings trigger a recovery prompt.

**`--no-daemon` CLI flag row** (`src/pages/codex.html`, line ~1046):
```
<tr><td><code>--no-daemon</code></td><td>Bypass the local background server and run without a daemon process. Useful when the daemon is not desired or when troubleshooting daemon issues. Use <code>/daemon</code> from within the TUI to update the daemon in place. (rust-v0.156.0)</td></tr>
```
Since the daemon now starts automatically by default, `--no-daemon` is more important to document for users who want to opt out. Add a note about this.

## Plan

1. Read `src/pages/codex.html` lines 1008–1015 to confirm the `/daemon` row.
2. Update the `/daemon` row description to note: automatic startup is the default for eligible interactive sessions as of rust-v0.157.0; recovery choices appear when server settings are incompatible.
3. Read `src/pages/codex.html` lines 1043–1050 to confirm the `--no-daemon` row.
4. Update the `--no-daemon` row to note: use this flag to opt out of the automatic daemon startup introduced in rust-v0.157.0.

## Acceptance Criteria

- `/daemon` row notes that automatic daemon startup is the default as of rust-v0.157.0.
- `--no-daemon` row notes it opts out of the automatic startup.
- No HTML is broken; the build succeeds.
