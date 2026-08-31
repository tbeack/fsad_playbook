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

**Not yet done (this task's scope):**
1. **Skills Library embeds** — `fsad-playbook.html`'s `#skills-definitions` section needs a new code-block entry per skill for all 5, matching the HTML-escaping convention (`&quot;`/`&#x27;`/`&amp;`) the existing 12 entries use. Locate the section and confirm the existing entries' exact markup structure before adding new ones.
2. **Specialist/lens sub-content** — `spec-review` (10 specialist lenses under `specialists/`) and `plan-review` (7 lenses documented in `lenses.md`, not a `specialists/` dir) both have enough internal structure to warrant a "Specialist Definitions"-style sub-section, similar to what `code-review-team` (7 cards) and `sec-review-team` (13 cards) already have. Decide, and if yes, build cards for `spec-review`'s 10 lenses and `plan-review`'s 7 lenses in the same visual style (card list, not full source dump — cross-reference the existing `code-review-team`/`sec-review-team` card markup as the template).
3. **Diagrams** — `plan` and `plan-review` both have enough orchestration complexity (named-agent resume via `SendMessage` in `plan`'s Phase 4.5; the inventory → parallel-lens → verify → adjudicate → completeness-critic-loop pipeline in `plan-review`) to be candidates for an inline SVG orchestration diagram matching `sec-review-team`'s established visual language (solid/dashed border convention, dark/light color tokens, `<figure>`/`<title>`/`<desc>` accessibility pattern — see `CBP-339`'s Phase 4 for the exact precedent). `set-context`, `prompt-improver`, and `spec-review` are comparatively linear/single-pass and likely don't need one — confirm with the user before skipping, don't assume.
4. **Hooks documentation — no existing precedent.** The Skills Library has never documented a hook before (only slash-command skills). Options: (a) add a new top-level page section (e.g. "Hooks Library") mirroring the Skills Library's structure but for hook scripts, (b) fold a short description into an existing section (e.g. the Claude Code hooks/observability section, if one exists — check `fsad-playbook.html` for an existing hooks-related section before assuming there isn't one), or (c) document only in `README.md`/`ONBOARDING.md` as setup instructions, not in the interactive playbook page at all. **Ask the user which** before building — this is a real information-architecture decision, not a mechanical port.
5. **`context-monitor.js`'s statutsline dependency caveat.** This hook reads context-usage metrics that a *statusline* hook writes to `/tmp/claude-ctx-{session_id}.json` — `fsad_playbook` has no statusline hook of its own. Document this dependency explicitly wherever the hook ends up described: either it ships as reference material with a stated prerequisite (adopters need their own statusline hook writing that file), or scope is expanded to also port a statusline hook (bigger decision — ask the user, don't assume expansion).
6. **`dist/` rebuild.** `dist/fsad-playbook.html` and `dist/embeddings.json` are generated from the root file via `scripts/build-dist.py` and `scripts/build-embeddings.py` — both must be re-run after any Skills Library edit, or the shipped build silently serves stale content.

**Location:** `fsad-playbook.html` (repo root, `#skills-definitions` section, ~line 5780 area per `CBP-339`'s precedent — re-verify the exact line, the file has likely shifted), `dist/` (regenerate only, don't hand-edit), and wherever the hooks-documentation decision (item 4) lands.

## Plan

1. **Resolve the hooks-documentation decision (item 4 above) with the user first** — this determines where the rest of the work lands. Present the three options from the Assessment and get a decision before writing anything.
2. Add Skills Library code-block embeds for the 5 new skills' `SKILL.md` source, matching existing HTML-escaping and markup conventions.
3. Build Specialist Definitions-style cards for `spec-review`'s 10 lenses and `plan-review`'s 7 lenses (per item 2), matching the `code-review-team`/`sec-review-team` card format.
4. Confirm with the user whether `plan` and `plan-review` get new orchestration diagrams (per item 3); if yes, build them matching `sec-review-team`'s established SVG diagram style (dark + light variants).
5. Document the two hooks per the decision from step 1, including the `context-monitor.js` statusline-dependency caveat (item 5).
6. Run `python3 scripts/build-dist.py` and `python3 scripts/build-embeddings.py`; confirm both exit cleanly and `dist/` timestamps update.
7. Update `CHANGELOG.md` and bump the version (semver, patch) per this repo's versioning convention — `README.md` version table + `fsad-playbook.html` `<title>`.

## Acceptance Criteria
- [ ] `fsad-playbook.html`'s `#skills-definitions` section contains an HTML-escaped embed of the current `SKILL.md` source for all 5 of `plan`, `set-context`, `prompt-improver`, `spec-review`, `plan-review`, matching the files on disk under `skills/`
- [ ] `spec-review` and `plan-review` each have a Specialist/Lens Definitions sub-section with one card per specialist/lens (10 and 7 respectively), in the same visual style as `code-review-team`/`sec-review-team`'s existing cards
- [ ] The hooks-documentation decision from item 4 is implemented, including the `context-monitor.js` → statusline-hook dependency stated explicitly wherever it's documented
- [ ] If diagrams were confirmed in scope for `plan`/`plan-review`, both exist as inline SVG figures (dark + light variants) matching `sec-review-team`'s established visual convention; if declined, no diagram work is expected
- [ ] `dist/fsad-playbook.html` and `dist/embeddings.json` have a newer mtime than their pre-task state, and both build scripts exit without error
- [ ] `README.md` version table and `fsad-playbook.html`'s `<title>` reflect a version bump above the version current when this task started, and `CHANGELOG.md` has a matching new entry
