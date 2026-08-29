# CBP-495 — [Codex] Document configurable MCP discovery grace period for optional servers

## Source
Codex CLI rust-v0.151.0 release notes: "Added a configurable grace period for discovering tools from optional MCP servers." (#41199)

## Summary
Codex CLI now lets users configure the grace period before it times out tool discovery from a slow-starting *optional* MCP server, extending the non-blocking-startup behavior shipped in rust-v0.147.0 (MCP 2026-07-28 protocol support). Document this as a new dated note in the Codex Best Practices → Integrations section, alongside the existing MCP protocol-support notes.

## Assessment
`src/pages/codex.html`, `#codex-integrations` section (lines 338–556), already tracks a running series of dated MCP capability notes:
- Line 353: Tool search by default (rust-v0.142.2)
- Line 355: Interactive MCP tool authentication (rust-v0.144.0)
- Line 357: MCP 2026-07-28 protocol support (rust-v0.147.0, opt-in) — includes "non-blocking server startup — Codex no longer waits on a slow-starting MCP server before the session becomes usable"
- Line 359: OAuth reauthentication recovery (rust-v0.148.0)

The new rust-v0.151.0 grace-period configurability is a direct extension of the non-blocking-startup behavior noted at line 357. Content does not exist yet — this is a genuine gap (`update-existing` verdict: add a new dated paragraph, following the established pattern).

## Plan
1. Open `src/pages/codex.html`.
2. After the paragraph ending at line 359 (OAuth reauthentication recovery, rust-v0.148.0) and before the `step-card` block starting at line 361, insert a new paragraph in the same style:
   ```html
   <p style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:1.5rem;"><strong>Configurable MCP discovery grace period (rust-v0.151.0):</strong> The grace period before Codex times out tool discovery from a slow-starting <em>optional</em> MCP server is now configurable, extending the non-blocking startup behavior introduced in rust-v0.147.0 — raise it for servers that are consistently slow to respond instead of losing their tools to a fixed timeout.</p>
   ```
3. Run `python3 scripts/build-source.py` then `python3 scripts/build-dist.py` after all three CBP-495/496/497 edits are applied (batched with the other two tasks in this run) to regenerate `fsad-playbook.html` and `dist/fsad-playbook.html`.

## Acceptance Criteria
- [ ] New paragraph present in `#codex-integrations`, correctly ordered after the rust-v0.148.0 note and before the "Add an MCP Server" step-card.
- [ ] Version tag `rust-v0.151.0` present and accurate.
- [ ] Matches existing paragraph styling (`font-size:0.85rem; color:var(--text-secondary); margin-bottom:1.5rem;`, `<strong>` version-label prefix).
- [ ] `build-source.py` and `build-dist.py` both run cleanly after all edits for this run land, with `build-dist.py` logging "Injected PLAYBOOK_EMBEDDINGS".
