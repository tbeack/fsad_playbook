# CBP-170: [Codex] Add `codex doctor` to Codex Cheat Sheet CLI subcommands (v0.131.0)

## Source
Codex CLI v0.131.0

## Summary
Codex v0.131.0 added `codex doctor` — a support-ready diagnostic command covering runtime, auth, terminal, network, config, and local state. This is a peer to Claude Code's `/doctor` and is not yet in the playbook.

## Assessment
The Codex Cheat Sheet CLI subcommands table ends at line 9125 with `codex remote-control`. Add `codex doctor` as a new row.

## Plan
1. Read lines 9124–9127 in `fsad-playbook.html`.
2. Add a new row after `codex remote-control`:

```html
<tr><td><code>codex doctor</code></td><td>Run support-ready diagnostics across runtime, auth, terminal, network, config, and local state. Added in v0.131.0.</td></tr>
```

## Acceptance Criteria
- `codex doctor` row appears in the Codex Cheat Sheet CLI subcommands table
