# CBP-497 — Document the 5 new `fsd:` skills and 2 new hooks in the Skills Library

## Source
Follow-up to `TBS-083` (in the `tb_skills` project tracker), which ported `plan`, `set-context`, `prompt-improver`, `spec-review`, `plan-review` into `skills/`, and `context-monitor.js` / `fsd-memory-recommend.sh` into a new `hooks/`, but deliberately deferred all Skills Library HTML/diagram/dist work to this task. See `~/repo/tb_skills/planning/plan/task-tbs-083.md`'s Assessment for the full precedent this follows (`CBP-339`, "Skills Library resync").

## Summary
`fsad-playbook.html`'s Skills Library page (`#skills-definitions`) embeds every `fsd:` skill's `SKILL.md` source as a copyable code block. The 5 skills added by `TBS-083` aren't represented there yet, and the repo has no precedent at all for documenting a *hook* (only skills have been documented in the Skills Library so far) — `context-monitor.js` and `fsd-memory-recommend.sh` need a home in the page, or a decision that hooks don't belong in the Skills Library and get documented elsewhere (e.g. a new page section, or `CLAUDE.md`/`ONBOARDING.md`). This task makes that call, executes it, and rebuilds `dist/`.

## Assessment

**What already exists (verified by direct inspection of `skills/`):**
- `skills/plan/SKILL.md` (+ `skills/plan/roles/{project,architecture,instructions,roadmap,verification}.md`)
- `skills/set-context/SKILL.md`
- `skills/prompt-improver/SKILL.md` (+ `skills/prompt-improver/references/best_practices.md`)
- `skills/spec-review/SKILL.md` (+ `skills/spec-review/{docs,schema,specialists}/*` — 10 specialist lens briefs)
- `skills/plan-review/SKILL.md` (+ `skills/plan-review/{checks,schema}/*`, `lenses.md`, `report-template.md` — 7 specialist lens briefs in `lenses.md`)
- `hooks/context-monitor.js`, `hooks/fsd-memory-recommend.sh`

All 5 skills were genericized per this repo's established `fsd:` pattern (see `CBP-339`): `tb:` → `fsd:`, no personal references, no dependency on files outside the skill's own directory (relative `roles/`, `docs/`, `specialists/`, `schema/` paths).

**Corrected location (verified 2026-08-31 — task file originally referenced the stale pre-Option-E layout):** Source of truth is `src/pages/skills.html` — `#skills-definitions` section starts at line 149 and currently has **13** skill cards (not 12 as originally assessed; `prd` was added since). `fsad-playbook.html` at the repo root is a gitignored generated intermediate (`build-source.py` output) — never hand-edit it. The build sequence is `python3 scripts/build-source.py` (assembles `src/` → `fsad-playbook.html`) **then** `python3 scripts/build-dist.py` (produces `dist/fsad-playbook.html`; internally runs `build-embeddings.py` and `build-assistant-index.py` as subprocesses and logs `Injected PLAYBOOK_EMBEDDINGS` — no need to invoke `build-embeddings.py` separately).

**Decisions resolved with the user (2026-08-31):**
- **Hooks documentation (item 4):** **Option (a)** — a new "Hooks Library" section in the Skills Library page (`src/pages/skills.html`), mirroring the existing skill-card pattern with full source embed per hook. Note: `src/pages/practices.html` does have a `#hooks-deep-dive` section with a "Practical Recipes" subsection, but that subsection's style is short generic JSON config snippets, not full script source — confirmed as a style mismatch, not reused for this.
- **Diagrams (item 3):** **Yes** — build SVG orchestration diagrams for both `plan` and `plan-review`, matching `sec-review-team`'s established visual style (dark + light variants, solid/dashed border convention, `<figure>`/`<title>`/`<desc>` accessibility pattern). `set-context`, `prompt-improver`, `spec-review` remain diagram-free (linear/single-pass).

**Not yet done (this task's scope):**
1. **Skills Library embeds** — `src/pages/skills.html`'s `#skills-definitions` section needs a new code-block entry per skill for all 5, matching the HTML-escaping convention (`&quot;`/`&#x27;`/`&amp;`) the existing 13 entries use.
2. **Specialist/lens sub-content** — `spec-review` (10 specialist lenses under `specialists/`) and `plan-review` (7 lenses documented in `lenses.md`, not a `specialists/` dir) both get a "Specialist Definitions"-style sub-section, matching `code-review-team` (7 cards) and `sec-review-team` (13 cards)'s existing card markup as the template (card list, not full source dump).
3. **Diagrams** — build inline SVG orchestration diagrams for `plan` (named-agent resume via `SendMessage` in Phase 4.5) and `plan-review` (inventory → parallel-lens → verify → adjudicate → completeness-critic-loop pipeline), matching `sec-review-team`'s established visual language — see `CBP-339`'s Phase 4 for the exact precedent to follow.
4. **Hooks Library section** — new section in `src/pages/skills.html` mirroring the skill-card pattern, with full source embeds for `hooks/context-monitor.js` and `hooks/fsd-memory-recommend.sh`.
5. **`context-monitor.js`'s statusline dependency caveat.** This hook reads context-usage metrics that a *statusline* hook writes to `/tmp/claude-ctx-{session_id}.json` — `fsad_playbook` has no statusline hook of its own. Document this dependency explicitly in the Hooks Library entry: it ships as reference material with a stated prerequisite (adopters need their own statusline hook writing that file). Scope is NOT expanded to port a statusline hook.
6. **Build rebuild.** Run `build-source.py` then `build-dist.py` (which handles embeddings + assistant index internally) after all Skills Library edits, or the shipped build silently serves stale content.

**Location:** `src/pages/skills.html` (`#skills-definitions` section, all new content — skill embeds, specialist/lens cards, diagrams, Hooks Library), `dist/` (regenerate only via build scripts, don't hand-edit).

## Plan

1. Add Skills Library code-block embeds for the 5 new skills' `SKILL.md` source in `src/pages/skills.html`, matching existing HTML-escaping and markup conventions.
2. Build Specialist Definitions-style cards for `spec-review`'s 10 lenses and `plan-review`'s 7 lenses, matching the `code-review-team`/`sec-review-team` card format.
3. Build SVG orchestration diagrams for `plan` and `plan-review` (dark + light variants), matching `sec-review-team`'s established SVG diagram style.
4. Build a new Hooks Library section documenting the two hooks with full source embeds, including the `context-monitor.js` statusline-dependency caveat (item 5).
5. Run `python3 scripts/build-source.py` then `python3 scripts/build-dist.py`; confirm both exit cleanly, `build-dist.py` logs `Injected PLAYBOOK_EMBEDDINGS`, and `dist/` timestamps update.
6. Update `CHANGELOG.md` and bump the version (semver, patch) per this repo's versioning convention — `README.md` version table + `src/playbook.tmpl.html` `<title>`.

## Acceptance Criteria

All criteria verified 2026-08-31 before commit.

- [x] `src/pages/skills.html`'s `#skills-definitions` section contains an HTML-escaped embed of the current `SKILL.md` source for all 5 of `plan`, `set-context`, `prompt-improver`, `spec-review`, `plan-review`, matching the files on disk under `skills/`
- [x] `spec-review` and `plan-review` each have a Specialist/Lens Definitions sub-section with one card per specialist/lens (10 and 7 respectively), in the same visual style as `code-review-team`/`sec-review-team`'s existing cards
- [x] A new Hooks Library section in `src/pages/skills.html` documents both `hooks/context-monitor.js` and `hooks/fsd-memory-recommend.sh` with full source embeds, mirroring the skill-card pattern, and states the `context-monitor.js` → statusline-hook dependency explicitly
- [x] `plan` and `plan-review` each have an inline SVG orchestration diagram (dark + light variants) matching `sec-review-team`'s established visual convention
- [x] `dist/fsad-playbook.html` and `dist/embeddings.json` have a newer mtime than their pre-task state, and both `build-source.py` and `build-dist.py` exit without error (`build-dist.py` logs `Injected PLAYBOOK_EMBEDDINGS`)
- [x] `README.md` version table and `src/playbook.tmpl.html`'s `<title>` reflect a version bump above the version current when this task started (v4.1.4), and `CHANGELOG.md` has a matching new entry
