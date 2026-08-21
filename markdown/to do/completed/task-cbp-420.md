# CBP-420 — [Claude] Cross-session-messaging & Remote Control sync bug-fix bullets

## Source
Claude Code v2.1.238 release notes (bundle of related fixes):
- Fixed `ListAgents`/`SendMessage` reporting "Remote Control is not connected" in sessions run by `claude remote-control` (server mode) or Desktop/IDE hosts; they now list and reach Remote Control peers.
- Fixed `ListAgents` and `SendMessage` exposing the idle worker that the agent view pre-warms for your next background session; it now appears only once a task claims it.
- Cross-session messaging: sending to a session that refuses inbound messages now reports "refused" to the sender instead of a silent success.
- Cross-session messaging: a session whose inbox drops your messages (rate limit or full queue) now tells your session, instead of the messages vanishing silently.
- Fixed Remote Control sessions started by `claude remote-control` inheriting session-scoped environment variables from the launching shell.
- Fixed a Remote Control session whose process crashed staying unavailable until `claude remote-control` was restarted; it can now be reused when you next message it.
- Fixed Remote Control messages sent from the web or Desktop while Claude is mid-turn disappearing from the transcript after the turn finishes.
- Fixed Remote Control model picks made on a phone or web not updating the model shown in the terminal.
- Fixed Remote Control disconnecting with "login expired" when a brief network hiccup delays renewing sign-in.
- Fixed Remote Control reporting a failed reconnect on sign-out; signing out now ends the session with a clear message.

## Summary
A bundle of Claude Code v2.1.238 bug fixes tightens `ListAgents`/`SendMessage` cross-session-messaging reliability (Agent Teams collapsible already tracks this API's versioned changelog) and Remote Control session-state sync/reliability (Remote Control collapsible already tracks similar fixes). Splits naturally across the two existing collapsibles rather than needing a new section.

## Assessment
Both collapsibles already contain dense, versioned bullet lists tracking exactly this kind of incremental fix — `id="power-usage--agent-teams"` (~line 11366-11405, `SendMessage`/`ListAgents` bullet at line 11379) and `id="power-usage--remote-control"` (~line 11580-11609, bullet list at 11598-11607). No new section needed.

## Plan
1. In `fsad-playbook.html`, `id="power-usage--agent-teams"` (line 11379's long bullet, or a new adjacent `<li>`): append a clause noting that `ListAgents`/`SendMessage` now correctly list and reach Remote Control peers from server-mode/Desktop/IDE-hosted sessions, and no longer expose the idle pre-warmed worker before a task claims it; and that refused/dropped-inbox cross-session messages now report failure to the sender instead of silently vanishing. Tag `(v2.1.238)`.
2. In `fsad-playbook.html`, `id="power-usage--remote-control"` bullet list (lines 11598-11607): add one consolidated bullet covering the remaining Remote Control-specific fixes — env var inheritance from launching shell, crashed-session reuse without restart, mid-turn message transcript sync, phone/web model-pick sync to terminal, sign-in-hiccup reconnect resilience, and clean sign-out reporting. Tag `(v2.1.238)`.
3. Keep each addition to 1-2 bullets total per section — consolidate rather than listing all ten fixes verbatim; match the file's existing style of grouping related fixes into one descriptive bullet (see the v2.1.234 bullet at line 11604 as a model).

## Acceptance Criteria
- [ ] Agent Teams collapsible reflects the `ListAgents`/`SendMessage` Remote Control connectivity + idle-worker + refused/dropped-message fixes, tagged `(v2.1.238)`.
- [ ] Remote Control collapsible reflects the env-var/crashed-session/transcript-sync/model-sync/reconnect/sign-out fixes, tagged `(v2.1.238)`.
- [ ] No existing bullets removed; new bullets match existing tone/density (consolidated, not exhaustive line-by-line).
