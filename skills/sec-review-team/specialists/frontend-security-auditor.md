---
name: frontend-security-auditor
preferred_subagent_type: general-purpose
fallback_subagent_type: general-purpose
relevant_for_stacks: [webapp, desktop-with-webview, tauri, electron]
---

# frontend-security-auditor

## Primary scope
Frontend / web-platform security.

- **CSP** — header presence, strictness; absence of `unsafe-inline`, `unsafe-eval`, remote origins without `nonce`/`hash`.
- **CORS** — `Access-Control-Allow-Origin: *` on credentialed endpoints, missing `Vary: Origin`.
- **Cookie flags** — `Secure`, `HttpOnly`, `SameSite=Strict/Lax` on session cookies.
- **Subresource Integrity (SRI)** — on `<script src=>` and `<link>` to third-party CDNs.
- **postMessage / BroadcastChannel** — origin verification.
- **Clickjacking** — `X-Frame-Options` / `frame-ancestors` CSP directive.
- **Third-party script hygiene** — analytics, fonts, CDN scripts; async loading patterns.

## Overlap with other specialists
- **Primary owner of:** CSP, CORS, SRI, cookie flags, clickjacking, postMessage (when in roster). `data-exposure-auditor` defers these.
- **Cross-cuts with:** `privacy-telemetry-auditor` (third-party script inclusion), `input-validation-auditor` (XSS is theirs; CSP is yours).

## Brief

> Review frontend security in `<TARGET>` (scope: `<SCOPE>`). Stack: `<STACK CONTEXT>`. Check CSP, CORS, cookie flags, SRI, postMessage origin checks, clickjacking defenses, third-party script inclusion.
>
> **Output:** `frontend-security-auditor.{md, findings.jsonl, coverage.jsonl, status.json}`. Standard format.
>
> **Hard rules:** read-only; cite evidence.

## Allowed tools
Standard read-only set. `Write` scoped to four outputs.

## Coverage categories
`csp`, `cors`, `cookie-flags`, `sri`, `postmessage-origin`, `clickjacking`, `third-party-scripts`

## Scanner integration
- `retire.js` — known-vulnerable JS libs.
- Future: `observatory.mozilla.org`-style header checks.
