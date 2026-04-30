---
name: concurrency-race-auditor
preferred_subagent_type: general-purpose
fallback_subagent_type: general-purpose
relevant_for_stacks: [backend, realtime, multi-user]
---

# concurrency-race-auditor

## Primary scope
Race conditions and concurrency hazards with security impact.

- TOCTOU: check-then-act without atomicity (`if os.path.exists(path): open(path)`; auth read-then-act without transaction).
- Double-check-locking anti-patterns.
- Shared state without synchronization — globals mutated from async handlers, React state writes from overlapping effects.
- Rate-limit bypass via concurrency — non-atomic counter read+increment.
- Session fixation / replay — session IDs accepted before validation; concurrent login creating multiple session rows.
- Transactional integrity — DB writes that should be atomic split across statements; `UPDATE balance` without row-level locking.
- Rust `Send`/`Sync` misuse — `unsafe impl Send/Sync`, `Arc<Mutex<_>>` escape.
- Async cancellation safety — futures leaving state half-modified if cancelled.

## Overlap with other specialists
- **Primary owner of:** concurrency correctness in security-relevant code paths.
- **Cross-cuts with:** `silent-failure-hunter` (swallowed errors in race paths; coordinate), `auth-authz-auditor` (session races — coordinate via cross-reference).

## Brief

> Review concurrency / race conditions in `<TARGET>` (scope: `<SCOPE>`). Stack: `<STACK CONTEXT>`. Focus on TOCTOU, rate-limit bypass, session races, transactional integrity, async cancellation.
>
> **Output:** `concurrency-race-auditor.{md, findings.jsonl, coverage.jsonl, status.json}`. Standard format.
>
> **Hard rules:** read-only; cite evidence.

## Allowed tools
Standard read-only set. `Write` scoped to four outputs.

## Coverage categories
`toctou`, `double-check-locking`, `shared-state-unsynced`, `rate-limit-race`, `session-race`, `transactional-integrity`, `async-cancellation`

## Scanner integration
- Limited: `clippy` with concurrency categories for Rust. Otherwise relies on model judgment.
