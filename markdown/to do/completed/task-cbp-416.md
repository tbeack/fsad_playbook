# CBP-416 — Source changelog content from each task file's Summary section

## Source
User request: modify the `playbook-updater` agent so the "What's changed this week" widget gets informative per-task summaries, and so `CHANGELOG.md` entries are sourced from the same place.

## Summary
The `playbook-updater` agent (`~/.claude/agents/playbook-updater.md`, Phase 6) currently free-writes a single prose `<p>` bundle description per version for both `CHANGELOG.md` and the in-app changelog modal, instead of reusing each task file's `## Summary` section as the single source of truth. This has two consequences:

1. **Regression in "What's new this week."** The widget (`initWhatsNew()` in `fsad-playbook.html`, built for CBP-237) expects a `<ul><li>` — one `<li>` per CBP task — inside each auto-update `<section>` of the changelog modal, so it can render one card per task. Every version since v3.2.30 (v3.2.31 through the current v3.2.40) dropped that structure and writes only a single `<p>`, so the widget falls back to one generic bundle card instead of per-task detail.
2. **No documented single source of truth.** Nothing in Phase 6 says the per-task `CHANGELOG.md` bullet and the modal `<li>` must both come from the task file's `## Summary` section, so the two surfaces are free to drift from each other and from what was actually assessed in Phase 4.

Scope (per user decision): fix the agent's forward-looking behavior **and** backfill the broken versions.

## Assessment
- `~/.claude/agents/playbook-updater.md` Phase 6, step 3 (in-app modal) currently just says "add a new `<section>`... matching the existing format" with no mention of a `<ul><li>` breakdown or of sourcing content from task files.
- Phase 6, step 4 (`CHANGELOG.md`) says "add new version header with all changes grouped by CBP task" with no instruction to source bullet text from `## Summary`. In practice `CHANGELOG.md` bullets are already written per-CBP-task and are reasonably good (e.g. CBP-408's bullet), but they're independently drafted, not explicitly tied to the task file's `## Summary` section.
- `CLAUDE.md` (project root, ~line 97–103) "Version bump checklist" documents only the single-`<p>` modal format — it doesn't mention the `<ul><li>` pattern at all, so it's actively misleading anyone (agent or human) following it.
- Confirmed via `fsad-playbook.html` (~line 14986): CBP-237 explicitly built the "one card per CBP task" behavior and back-converted v2.93.0/v2.89.0 to `<ul><li>` "with content sourced from the task file summaries" — i.e. this task is restoring an established, previously-correct convention, not inventing a new one.
- Auto-update versions currently missing the `<ul><li>` breakdown, confirmed by grepping the changelog modal and cross-checking against `CHANGELOG.md`'s CBP ranges (only versions whose headline contains "auto-update" are in scope — `initWhatsNew()` filters to those):
  | Version | Date | CBP range | Task count |
  |---|---|---|---|
  | v3.2.33 | 2026-08-07 | CBP-344–364 | 21 |
  | v3.2.34 | 2026-08-11 | CBP-368–370 | 3 |
  | v3.2.35 | 2026-08-13 | CBP-371–373 | 3 |
  | v3.2.36 | 2026-08-14 | CBP-374–375 | 2 |
  | v3.2.37 | 2026-08-15 | CBP-376–379 | 4 |
  | v3.2.38 | 2026-08-18 | CBP-380–390 | 11 |
  | v3.2.39 | 2026-08-19 | CBP-391–405 | 15 |
  | v3.2.40 | 2026-08-20 | CBP-408–415 | 8 |

  (v3.2.31/CBP-339 and v3.2.32/CBP-341 are Skills Library resync entries, not auto-update runs — their headlines don't contain "auto-update" so `initWhatsNew()` already excludes them; out of scope.)
- All 67 task files across those 8 versions (`task-cbp-344.md` … `task-cbp-415.md`) exist under `markdown/to do/completed/` — confirmed present, none missing.
- `CHANGELOG.md` already carries one well-formed Markdown bullet per CBP task for all 8 versions (`**CBP-### — [Claude|Codex] Title.** Description (vX.Y.Z).`), so the backfill can mechanically convert those existing bullets into matching `<li>` HTML rather than re-deriving fresh prose from 67 individual `## Summary` sections — this keeps the two surfaces identical in content, which is the actual goal.

## Plan

### Phase A — Fix agent + doc behavior (forward-looking)
1. Edit `~/.claude/agents/playbook-updater.md` Phase 6, step 3 (in-app changelog modal): keep the existing intro `<p><strong>headline.</strong> summary.</p>`, then require appending a `<ul>` with one `<li>` per CBP task created in this run, formatted `<li><strong>CBP-### — [Claude|Codex] {short title}.</strong> {1–2 sentence description}.</li>`. Explicitly state the description text must be derived from that task's own `## Summary` section (not freshly authored), matching the pattern CBP-237 established.
2. Edit Phase 6, step 4 (`CHANGELOG.md`): explicitly state that each per-task bullet's description must come from the same `## Summary` section used for the modal `<li>` in step 1 — one source of truth, so the two surfaces can't drift.
3. Edit `CLAUDE.md` (project root), "Version bump checklist" (~line 97–103): extend the in-app changelog modal example to show the `<ul><li>` per-task block alongside the intro `<p>`, so the documented convention matches what Phase 6 now does.

### Phase B — Backfill v3.2.33 through v3.2.40
4. For each of the 8 versions in the Assessment table, extract that version's per-task Markdown bullets from `CHANGELOG.md` and convert each to `<li><strong>...</strong> ...</li>` (Markdown `**bold**` → `<strong>`, backtick code spans → `<code>`, escape any raw `&`/`<`/`>` as needed for valid HTML).
5. Insert the resulting `<ul>...</ul>` immediately after the existing intro `<p>` inside each version's `<section>` in the changelog modal in `fsad-playbook.html` (search each version's `<h3>vX.X.X` to locate its `<section>`). Do not touch v3.2.31 or v3.2.32 (not in scope).
6. Verify tag balance (no unclosed `<ul>`/`<li>`/`<section>`) after all 8 insertions.
7. Run `python3 scripts/build-dist.py` to rebuild `dist/fsad-playbook.html` so it stays in sync with source.

## Acceptance Criteria

All criteria verified 2026-08-20 before commit.

- [x] `~/.claude/agents/playbook-updater.md` Phase 6's in-app-modal step explicitly instructs building one `<li>` per CBP task, with description text sourced from that task's `## Summary` section.
- [x] `~/.claude/agents/playbook-updater.md` Phase 6's `CHANGELOG.md` step explicitly instructs sourcing each per-task bullet from the same `## Summary` section referenced in the modal step (single source of truth).
- [x] `CLAUDE.md`'s Version bump checklist documents the `<ul><li>` per-task pattern for the in-app changelog modal, not just the single `<p>`.
- [x] Each of the 8 changelog `<section>` blocks for v3.2.33 through v3.2.40 in `fsad-playbook.html` contains a `<ul>` whose `<li>` count matches that version's CBP task count in `CHANGELOG.md` (21, 3, 3, 2, 4, 11, 15, 8 respectively).
- [x] `fsad-playbook.html` has no unclosed/mismatched `<ul>`/`<li>`/`<section>` tags introduced by the backfill.
- [x] `dist/fsad-playbook.html` is rebuilt via `python3 scripts/build-dist.py` and matches source (no drift).
- [x] v3.2.31 and v3.2.32 changelog sections are unchanged (out of scope, confirmed via `git diff`).
