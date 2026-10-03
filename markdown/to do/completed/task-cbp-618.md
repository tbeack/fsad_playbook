# CBP-618 [Codex] Update `/import` row — available in remote and local background-server sessions (rust-v0.157.0)

## Summary

Codex rust-v0.157.0 makes `/import` available in remote sessions and local background-server sessions. Previously it was only available in local TUI sessions.

## Assessment

**`/import` cheat sheet row** — needed a new sentence noting that as of rust-v0.157.0, `/import` is also available in remote sessions and local background-server (daemon) sessions.

## Plan

1. Append to the `/import` row description: "As of rust-v0.157.0, `<code>/import</code>` is also available in remote sessions and local background-server (daemon) sessions."

## Acceptance Criteria

- `/import` row notes availability in remote and local background-server sessions as of rust-v0.157.0.
- No HTML is broken; the build succeeds.
