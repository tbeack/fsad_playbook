# CBP-384 — Extend the Cross-session `SendMessage` bullet for truncated session-list reporting

## Source
Claude Code v2.1.234 — "`SendMessage` and `ListAgents` now say when your account's session list was too long to check completely, instead of treating unseen sessions as absent."

## Summary
Append the new reliability caveat to the existing version-tagged Cross-session `SendMessage`
bullet in the Agent Teams collapsible.

## Assessment
- `fsad-playbook.html` line 11367, inside `#power-usage` → `power-usage--agent-teams`, in the
  `<ul>` that also holds the Nested sub-agents (11365) and Subagent forking (11366) bullets.
- The bullet is already a version-chained sentence sequence: v2.1.224 (cross-machine
  messaging) → v2.1.225 (start by name, `name [ref]`) → v2.1.228 (inline sender/body) →
  v2.1.232 (`@` mentions, bare-name delivery, unique naming), ending with
  "Available on macOS and Linux."
- This is the exact same thread of behavior, previously extended by CBP-368 and CBP-375.
  Content does not exist. Appending is the established pattern.

## Plan
1. Read line 11367 in full to capture the bullet's exact current text and `<li>` structure.
2. Insert one new sentence into the chain, **before** the closing "Available on macOS and
   Linux." sentence so that platform note stays last.
3. New sentence should state: as of v2.1.234, `ListAgents` and `SendMessage` report when your
   account's session list was too long to enumerate completely, rather than silently treating
   unseen sessions as absent — so a failed lookup is distinguishable from a genuinely missing
   session.
4. Keep `ListAgents` and `SendMessage` in `<code>` tags, matching the rest of the bullet.

## Acceptance Criteria
- [ ] The bullet remains a single `<li>` inside the Agent Teams `<ul>`; no new list item is created.
- [ ] Every existing version clause (v2.1.224, v2.1.225, v2.1.228, v2.1.232) is preserved verbatim.
- [ ] "Available on macOS and Linux." remains the final sentence of the bullet.
- [ ] The new clause is tagged `(v2.1.234)` or introduced as "As of v2.1.234", matching the bullet's existing phrasing style.
- [ ] The behavior is described correctly: the tools now *report* incompleteness; they do not now enumerate more sessions.
- [ ] `<strong>Cross-session <code>SendMessage</code>:</strong>` lead-in is unchanged.
