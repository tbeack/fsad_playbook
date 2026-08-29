# CBP-493 — Extend `/usage` and `/effort` Cheat Sheet rows

## Summary
Claude Code v2.1.251 added a per-session prompt-cache line to `/cost` (hit ratio, misses, tokens re-cached, warm/cold) with a matching `prompt_cache` object for status line scripts, and changed `/effort` to save the default effort level per model, so each model keeps its own setting when you switch.

## Assessment
Both commands already have detailed, version-tagged rows in `src/pages/practices.html` Cheat Sheet, "Model, mode & usage" table (~line 1875-1890):
- `/usage` row (~line 1886) already covers `/cost`/`/stats` as typing shortcuts and multiple prior version updates through v2.1.243.
- `/effort` row (~line 1881) already covers per-tier defaults and the v2.1.162/v2.1.243 updates.

Both are direct extensions of existing documented behavior — append a sentence to each row.

## Plan
1. In `src/pages/practices.html`, `/usage` row (~line 1886), append:
   ```
   As of v2.1.251, a per-session prompt-cache line is also shown on <code>/cost</code> — hit ratio, misses, tokens re-cached, warm/cold — with a matching <code>prompt_cache</code> object available for status line scripts.
   ```
2. In `src/pages/practices.html`, `/effort` row (~line 1881), append:
   ```
   As of v2.1.251, <code>/effort</code> saves your default effort level per model, so each model keeps its own setting when you switch.
   ```

## Acceptance Criteria
- [ ] `/usage` row extended with the v2.1.251 per-session prompt-cache line / `prompt_cache` object detail.
- [ ] `/effort` row extended with the v2.1.251 per-model default-persistence detail.
