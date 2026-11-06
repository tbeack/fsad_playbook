# CBP-751 — [Codex] System proxy opt-in via `/experimental`

## Summary
Codex rust-v0.167.0 lets macOS and Windows users opt into native system proxy settings from the `/experimental` panel inside the TUI. Teams behind a corporate proxy configured at the OS level can use it without setting `CODEX_CA_CERTIFICATE` or `SSL_CERT_FILE` manually.

## Assessment
The playbook's Environment Variables table in `src/pages/codex.html` documents `CODEX_CA_CERTIFICATE` (line 1105) and `SSL_CERT_FILE` (line 1106) for proxy scenarios. The new system proxy opt-in is a TUI setting, not an env var, so it does not belong in the env vars table. The best location is a brief note added after the env vars table close tag (after `</div>` at line 1110, before `</section>` at line 1111).

## Plan
1. Open `src/pages/codex.html`.
2. Find the env vars section close: `    </div>\n  </section>` (around line 1110-1111).
3. Insert a `<p>` note between `</div>` and `</section>`.
4. Text: `System proxy (macOS/Windows, rust-v0.167.0): Enable native OS proxy settings from the /experimental panel inside the TUI — Codex uses the system-level proxy configured in macOS or Windows instead of requiring manual env var overrides.`

## Acceptance Criteria
- A `<p>` note about the system proxy opt-in appears after the env vars table in the browser render.
- The note references `/experimental` and rust-v0.167.0.
- No HTML tags are unclosed.
