# CBP-073 — sec-review-team: add concurrency-race-auditor + privacy-telemetry-auditor specialists

## Source
Specialist roster audit in [`markdown/research/sec-review-recommendations.md`](../research/sec-review-recommendations.md) — the remaining two missing specialists after CBP-069 (iac + prompt-injection) and CBP-072 (frontend-security + container-runtime + ci-cd-security). Rounds out the roster to 13 specialists total, covering the attack surface classes the original 6 don't address.

## Summary
Add two more specialists to fill niche-but-important gaps:
- **concurrency-race-auditor** — TOCTOU bugs, double-check-locking mistakes, shared-state mutation without locking, async/await misuse. Security-relevant in auth, rate-limiting, session handling, and state-machine code.
- **privacy-telemetry-auditor** — What the app phones home about, what data leaves the boundary, cookie/localStorage/IndexedDB tracking, third-party script inclusion, GDPR/CCPA signals. Overlaps with data-exposure but uses a different analytical lens (tracking / consent / regulatory).

## Assessment
- **Current state:** After CBP-069 + CBP-072, roster is 11 specialists. After this task, 13.
- **Why these two aren't merged with existing:**
  - `concurrency-race-auditor` — silent-failure-hunter touches async issues but its focus is error silences, not race conditions. TOCTOU / double-check / missing-lock are a distinct analytical frame.
  - `privacy-telemetry-auditor` — data-exposure-auditor covers what data COULD leak; privacy-telemetry covers what data IS deliberately sent out AND whether consent/regulatory requirements are met.
- **Dependency:** CBP-064 (specialist library). Both specialists are lower-priority than CBP-069/072 additions but important enough to land for roster completeness.

**Location:** `.claude/skills/sec-review-team/specialists/concurrency-race-auditor.md`, `privacy-telemetry-auditor.md` (new); `stack-signals.md` updated.

## Plan

### concurrency-race-auditor

1. Scope:
   - **TOCTOU (Time-of-check to time-of-use)** — checking permission/existence/validity, then acting on the result in a non-atomic way. Classic: `if os.path.exists(path): open(path)` in a multi-process context; auth checks that read-then-act without transaction.
   - **Double-check-locking anti-patterns** — JS / Python idioms that *look* thread-safe but aren't.
   - **Shared state without synchronization** — globals mutated from multiple async handlers; React state writes from overlapping effects; Zustand/Redux stores mutated via async without cancellation.
   - **Rate-limit bypass via concurrency** — rate-limiter that reads counter then increments (not atomic); burst requests beat the check.
   - **Session fixation / replay** — session IDs accepted before being validated; concurrent login that creates multiple session rows for the same user without expiry.
   - **Transactional integrity** — DB writes that should be atomic split across multiple statements; `UPDATE balance SET ... WHERE id = ?` without `SELECT FOR UPDATE` or equivalent.
   - **Rust `Send`/`Sync` misuse** — `unsafe impl Send/Sync`, `Arc<Mutex<_>>` patterns that escape their guard.
   - **Async cancellation safety** — futures that leave state half-modified if cancelled mid-flight.
2. Scanner integration: no great scanner for this; rely on model judgment. Possibly `clippy --warn concurrent` categories for Rust.
3. Preferred subagent_type: `general-purpose`. Relevant for: backend, realtime, any multi-user / multi-session code.

### privacy-telemetry-auditor

1. Scope:
   - **Outbound data inventory** — enumerate every `fetch`/`XMLHttpRequest`/`reqwest`/`axios` destination and what payload goes with it. Does it include PII?
   - **Analytics / tracking SDKs** — Google Analytics, Segment, Mixpanel, PostHog, Sentry, FullStory, etc. Are they opt-in? Do they respect DNT / GPC? Do they load before consent is gathered?
   - **Cookie inventory** — every cookie the app sets or reads, its domain, expiry, flags, and purpose. Map to "strictly necessary" / "functional" / "analytics" / "marketing" categories.
   - **Storage inventory** — `localStorage`, `sessionStorage`, `IndexedDB`, cache APIs — what PII is stored client-side, with what retention.
   - **Third-party script / iframe inclusion** — what domains are contacted at page load. Any unexpected ones. Is SRI used.
   - **Cross-border data transfer** — are servers / CDNs / logging endpoints in jurisdictions the product claims not to transfer data to.
   - **Consent flow** — is a consent banner present when required, does it actually gate the analytics / marketing SDKs (classic bug: banner shows but scripts load anyway), opt-out functional.
   - **Retention / deletion** — is user data deletable; is there a DSAR flow; logs retention visible.
   - **Telemetry in desktop apps** — Sentry, crash-reporters, auto-update pings, product analytics.
2. Scanner integration: `cookie-enabled headless-chrome` crawl to enumerate runtime cookies/storage (future); `npm ls` filter for analytics packages; manual for regulatory mapping.
3. Preferred subagent_type: `general-purpose`. Relevant for: webapp (consumer-facing especially), desktop-with-analytics.

### Wiring

1. Update `stack-signals.md`:
   - `concurrency-race-auditor` — triggered by backend code (Python/Go/Rust/Node with async), realtime (WebSocket/SSE), multi-user flags.
   - `privacy-telemetry-auditor` — triggered by consumer-facing webapp (presence of analytics packages in dependency list, `<script src="google-analytics.com"/>`, `posthog`, `sentry`, `segment`, etc.).
2. Add fixture repos: a small backend with a TOCTOU auth bug; a small webapp with an analytics tag loaded before consent.

## Acceptance Criteria
- [x] Two new specialist briefs in `.claude/skills/sec-review-team/specialists/`.
- [x] `stack-signals.md` triggers each on appropriate signals.
- [x] Scanner / tooling notes (even if "relies on model judgment" for concurrency).
- [x] Fixture repos added (`concurrency-race-vulnerable`, `privacy-telemetry-vulnerable`) with `expected-findings.jsonl`, `expected-coverage.jsonl`, and `README-FIXTURE.md` for each.
- [x] After this task, roster is 13 specialists total and stack-signal detection picks an appropriate subset per run.
- [ ] Re-run against `recall` reference target: roster should be `desktop` default (not including these two); they should be auto-excluded. Confirmed no regression. *(pending — live run required)*
