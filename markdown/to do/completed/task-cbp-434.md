# CBP-434: Extend Agent Teams cross-session `SendMessage`/`ListAgents` bullet — Windows parity + live-teammates fix

## Source
Claude Code v2.1.239 CHANGELOG.md entries:
- "Windows: cross-session messaging is now available, so Claude Code sessions across your machines can message each other with `SendMessage` and find each other with `ListAgents`, as on macOS and Linux"
- "`ListAgents` and `/list-agents` now list your live teammates (previously only subagents and other sessions appeared, so a reachable teammate looked absent)"
- "`ListAgents` now tells a session its own name (the one peers use to message it), and `SendMessage` to your own name says so instead of \"no agent named …\""

## Summary
Three related `ListAgents`/`SendMessage` changes in v2.1.239: (1) cross-session messaging is now available on Windows, reaching parity with the existing macOS/Linux support; (2) `ListAgents`/`/list-agents` now correctly includes live teammates in its output, not just subagents and other sessions; (3) `ListAgents` now tells a session its own addressable name, and self-addressed `SendMessage` reports that instead of a "no agent named" error.

## Assessment
The playbook has an established, repeatedly-extended bullet for this exact feature area: the "Cross-session `SendMessage`" bullet in the Agent Teams collapsible (Power Usage section, ~line 11380). Every prior release with a `SendMessage`/`ListAgents` change (v2.1.224, v2.1.225, v2.1.228, v2.1.232, v2.1.234, v2.1.235, v2.1.236, v2.1.238 — see CBP-348, CBP-368, CBP-375, CBP-384, CBP-393, CBP-410, CBP-420) extended this same bullet with an "As of vX.Y.Z, ..." clause. None of the three v2.1.239 changes above are yet reflected in it. This is squarely `update-existing`, not a new section.

## Plan
1. In `fsad-playbook.html`, locate the Cross-session `SendMessage` bullet in the Agent Teams collapsible (~line 11380). It currently ends with the v2.1.238 clause about Remote Control peer listing/idle-worker exposure/refusal reporting.
2. Append three new clauses, following the file's established "As of vX.Y.Z, ..." style, before the closing `</li>`:
   ```html
   As of v2.1.239, cross-session messaging is available on Windows, reaching parity with macOS and Linux — Windows sessions can message each other with <code>SendMessage</code> and discover each other with <code>ListAgents</code>. <code>ListAgents</code> and <code>/list-agents</code> now correctly include your live teammates in the listing (previously only subagents and other sessions appeared, making a reachable teammate look absent). <code>ListAgents</code> also now tells a session its own addressable name, and <code>SendMessage</code> to your own name reports that instead of "no agent named …".
   ```
3. Do not touch the "Available on macOS and Linux" note attached to the separate `notify_when_idle` clause earlier in the same bullet — that option remains macOS/Linux-only; only baseline cross-session `SendMessage`/`ListAgents` gains Windows support in v2.1.239.

## Acceptance Criteria
- [ ] The Agent Teams cross-session `SendMessage` bullet gains a new v2.1.239 clause covering Windows parity, the `ListAgents` live-teammates fix, and the self-name fix.
- [ ] All prior version clauses in the bullet remain intact and unmodified.
- [ ] The `notify_when_idle` macOS/Linux-only scoping is not altered or contradicted.
