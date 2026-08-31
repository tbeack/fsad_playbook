# CBP-498 — Update the skills to use the prefix "fsd" similar to how "tb skills" do it.

## Source
Manual request.

## Summary
Audit and finish rolling the `fsd:` naming convention out across `skills/` (and its supporting files), so that every skill matches how `tb_skills` names its own equivalents — including places CBP-182's original `tb:` → `fsd:` rename pass, and the later TBS-083 port (plan, set-context, prompt-improver, spec-review, plan-review), didn't reach.

## Assessment
Most of this is already done. `grep -rn "tb:" skills/` turns up exactly **one** stray leftover:

- `skills/plan-review/checks/hygiene-check.py:2` — docstring still reads `"""Mechanical hygiene checks for the tb:plan-review skill files.` (should say `fsd:plan-review`).

Everything else checked out consistent with `tb_skills`' own convention:
- `skills/ac`, `add-task`, `do-task`, `next`, `sync`, `ship`, `ship-it`, `plan`, `set-context`, `prd`, `spec-review`, `plan-review`, `playbook-assistant` — H1 headings and descriptions already say `fsd:<name>`.
- `skills/estimate`, `init`, `code-review-team`, `sec-review-team`, `prompt-improver` — H1s are unprefixed (`# Story Point Estimator`, `# Project Init Skill`, etc.), but that matches `tb_skills`' own SKILL.md files for the same skills exactly (`~/repo/tb_skills/skills/{estimate,init,code-review-team,sec-review-team,prompt-improver}/SKILL.md` are unprefixed too) — this is not a gap, it's parity.
- `sec-review-fixes` has no H1 prefix either, matching `tb_skills`.
- `src/pages/skills.html` (the Skills Library catalog page) already documents all skills under the `/fsd:<name>` slash-command form throughout.

**Location:** `skills/` (19 skill directories — note: originally miscounted as 18) and `hooks/` — audit for any other stray `tb:`/`tb_skills`/personal-reference leftovers beyond the one found, then fix.

## Plan

1. Fix the one confirmed leftover: `skills/plan-review/checks/hygiene-check.py:2` — change `tb:plan-review` to `fsd:plan-review`.
2. Re-run a full sweep for stray references beyond a plain `tb:` grep (which only catches the literal token) — check for `tb_skills`, `tb ` (space), `~/repo/tb`, `Theo's`, or other personal/source-project leftovers across `skills/**` and `hooks/**`.
3. For each skill under `skills/`, diff its `fsd:`-prefixing (H1, description, in-body `Skill()` tool-name references) against the corresponding skill in `~/repo/tb_skills/skills/<name>/SKILL.md`'s own `tb:`-prefixing pattern — confirm parity (prefixed where `tb_skills` prefixes, unprefixed where it doesn't). Fix any skill that diverges from its `tb_skills` counterpart's pattern.
4. Re-run `python3 scripts/build-source.py` and `python3 scripts/build-dist.py` only if any change in this task touches `src/` (the HTML page already reflects `fsd:` correctly per Assessment, so this is likely a no-op — confirm before skipping).
5. Update `README.md` per this repo's task-completion convention if the skill count or naming description changed.

All criteria verified 2026-08-31 before commit.

## Acceptance Criteria
- [x] `grep -rn "tb:" skills/ hooks/` returns zero matches
- [x] `grep -rln "tb_skills\|~/repo/tb\|Theo's" skills/ hooks/` returns zero matches (or any genuine hits are triaged and fixed)
- [x] `skills/plan-review/checks/hygiene-check.py` docstring reads `fsd:plan-review`, not `tb:plan-review`
- [x] Every one of the skills under `skills/` matches its `tb_skills` counterpart's own H1/description prefixing pattern (prefixed skills stay prefixed, intentionally-unprefixed skills stay unprefixed — no new inconsistency introduced). Note: the directory actually contains 19 skills, not 18 as originally stated in this task's Assessment — the count was off by one, but every one of the 19 was individually verified with zero mismatches.
- [x] If any `src/` file changed, `scripts/build-source.py` and `scripts/build-dist.py` were both re-run and `dist/fsad-playbook.html` is in sync (logs `Injected PLAYBOOK_EMBEDDINGS`) — n/a: no `src/` file was touched by this task, confirmed by diff.
