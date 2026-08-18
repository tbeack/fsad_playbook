# CBP-385 — Add Remote Control bullets for cross-device session-state sync and account-switch termination

## Source
Claude Code v2.1.234 — three related Remote Control changes:
1. "Remote Control: effort picks made on a phone or on claude.ai/code now apply to terminal- and Desktop/VS Code-hosted sessions, and the session publishes its effort level to connected clients."
2. "Remote Control sessions started from Claude Code Desktop or VS Code now keep phones and claude.ai/code updated on the session's permission mode (and claude.ai/code on the model) as they change."
3. "Remote Control: signing this computer in to a different claude.ai account or organization now stops the running session within seconds and says why, instead of a misleading HTTP 404 hours later."

## Summary
Changes 1 and 2 are two directions of the same idea — session state (effort, permission mode,
model) now syncs between the host session and connected clients. Merge them into one bullet.
Change 3 is a distinct lifecycle behavior and gets its own bullet.

## Assessment
- `fsad-playbook.html` lines 11586-11592, inside `#power-usage` → `power-usage--remote-control`,
  in the `<ul>` following the `/desktop` / `/mobile` / `/teleport` code block.
- Existing bullets in that list:
  - 11587 `/desktop` — continue in the desktop app
  - 11588 `/mobile` — QR code
  - 11589 bridge sessions display git repo/branch/cwd
  - 11590 footer pill with direct link (v2.1.162)
  - 11591 mobile photo attachments shown directly (v2.1.225)
- The list already carries version-tagged behavior entries (v2.1.162, v2.1.225 — the latter
  added by CBP-369), so this is the established pattern. Content does not exist.

## Plan
1. Read lines 11585-11594 to confirm the `<ul>` styling and each `<li>`'s exact form
   (note: existing bullets use `&mdash;` and no inline `style` on the `<li>` elements).
2. Insert **two** new `<li>` elements after the v2.1.225 photo-attachment bullet (line 11591),
   before `</ul>`.
3. **Bullet A (state sync):** session state now stays in sync across connected clients — an
   effort level picked on a phone or on claude.ai/code applies to the terminal- or
   Desktop/VS Code-hosted session, and the session publishes its effort level back to
   connected clients; sessions started from Claude Code Desktop or VS Code also keep phones
   and claude.ai/code current on permission mode as it changes, and claude.ai/code on the
   model. Tag `(v2.1.234)`.
4. **Bullet B (account switch):** signing this computer in to a different claude.ai account or
   organization now stops a running Remote Control session within seconds and states the
   reason, instead of surfacing a misleading HTTP 404 much later. Tag `(v2.1.234)`.
5. Do **not** touch `#model-effort` (lines 10886-10889) — Phase 3 flagged it as an alternate
   home, but the Remote Control list is the more precise fit and duplicating would be worse.

## Acceptance Criteria
- [ ] Exactly two new `<li>` elements are added inside the Remote Control `<ul>` (lines ~11586-11592).
- [ ] All five pre-existing bullets are unchanged.
- [ ] Bullet A correctly distinguishes the two sync directions: phone/web effort pick → host session, and host session → connected clients.
- [ ] Bullet A names permission mode as syncing to **both** phones and claude.ai/code, but the **model** as syncing to claude.ai/code only — matching the changelog's parenthetical.
- [ ] Bullet B states the session stops within seconds **and** reports why, replacing the delayed HTTP 404.
- [ ] Both bullets carry a `(v2.1.234)` tag consistent with the v2.1.162 / v2.1.225 bullets.
- [ ] The `<ul>` remains well-formed and `#model-effort` is untouched.
