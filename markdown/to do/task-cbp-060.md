# CBP-060 — Test Security Review multi-agent prompt on Opus 4.7 and package as reusable skill

## Source
Own idea, triggered by the Opus 4.7 release and engineer feedback flagging the Security Review prompt for re-validation against the new model.

## Summary
The Security Review multi-agent prompt (`markdown/design/Team_of_security_agents.md`) was authored against an older Claude model and has since been flagged by an engineer for re-validation. Now that Opus 4.7 is live, we want to (a) test the prompt end-to-end on 4.7 to confirm the 6 specialists still execute correctly and produce useful findings, and (b) package it as a reusable `/security-review` skill so teams can invoke it without copy-pasting.

## Assessment
The Security Review sub-section (CBP-008) already exists on the Claude Best Practices page at `#practices/security-review` — it embeds the full team prompt as a copy-pasteable block, sourced verbatim from `markdown/design/Team_of_security_agents.md`. The prompt has never been re-validated against Opus 4.7, and there is no packaged skill version — users must manually copy the prompt into a fresh session. The existing `.claude/skills/` directory already hosts reusable skills (e.g., `cbp-add-task`, `cbp-commit-changes`) that demonstrate the pattern to follow.

**Locations:**
- Prompt source: `markdown/design/Team_of_security_agents.md`
- Embedded copy: `fsad-playbook.html` — `#practices/security-review` section
- Skill pattern reference: `.claude/skills/cbp-add-task/`

## Plan

1. **Verify prompt source is current** — read `markdown/design/Team_of_security_agents.md` and the embedded copy in `fsad-playbook.html` (`#practices/security-review`); confirm they match. If they drifted, reconcile first.
2. **Dry-run the prompt on Opus 4.7** — launch the multi-agent team against a known-safe scope (suggestion: `scripts/` or a recent diff vs `main`). Confirm:
   - All 6 specialist agents spawn and complete
   - Each writes findings to its own file under the expected path
   - The lead agent consolidates correctly
   - Findings are substantive (no hallucinated CVEs, no empty outputs)
3. **Capture test results** — save the run artifacts to `markdown/research/security-review-opus-4.7-validation.md` with: scope tested, agents that ran, findings summary, any prompt tweaks required for 4.7 compatibility.
4. **If prompt tweaks were needed** — update `markdown/design/Team_of_security_agents.md` and mirror the change into `fsad-playbook.html` (`#practices/security-review`).
5. **Create the skill** at `.claude/skills/security-review/SKILL.md` following the pattern in `.claude/skills/cbp-add-task/`:
   - Frontmatter: `name`, `description` (include trigger phrases: "security review", "audit this branch", "pre-release hardening"), model hint if needed
   - Skill body: the validated prompt, with clear placeholder instructions for `<PATH>` and `<scope>`
   - Include a short "How to invoke" section
6. **Link the skill from the playbook** — in the Security Review sub-section of `fsad-playbook.html`, add a note/callout pointing to the new `/security-review` skill as the preferred invocation path, with the raw prompt retained below as reference.
7. **Bump playbook version** and update `README.md` / `CHANGELOG.md` per CBP conventions.

## Acceptance Criteria
- [x] `markdown/design/Team_of_security_agents.md` and the embedded copy in `fsad-playbook.html` are confirmed in sync (verified verbatim match; no reconciliation needed)
- [x] Full 6-specialist team run completed on Opus 4.7 against a documented scope (target: `/Users/theobeack/Desktop/AI/claude_projects/recall`, full tree)
- [x] All 6 specialist agents spawned, completed, and wrote findings files; lead agent produced a consolidated report (see `recall/.planning/security-review/REPORT.md`)
- [x] Findings reviewed for substance (no hallucinated CVEs, no empty outputs); any prompt tweaks needed for 4.7 are captured — **none needed**; prompt works as-authored
- [x] Test run artifacts saved to `markdown/research/security-review-opus-4.7-validation.md`
- [x] If prompt was updated, design source + embedded playbook copy are both updated and still match — **N/A**, prompt unchanged
- [x] `.claude/skills/sec-review-team/SKILL.md` created, following the `cbp-add-task` frontmatter/body pattern (renamed from `security-review` to avoid collision with the pre-existing built-in `/security-review` branch review)
- [x] Skill invocable via `/sec-review-team` from a fresh session; trigger phrases resolve correctly (confirmed visible in the skills list, distinct from `/security-review` built-in)
- [x] Security Review sub-section in `fsad-playbook.html` points to the new skill as the preferred invocation, with raw prompt retained as reference
- [x] Playbook version bumped (v32 → v33); `README.md` and `CHANGELOG.md` updated per CBP conventions
- [x] `todo.md` CBP-060 marked complete

## Follow-up / non-blockers
- UI not browser-verified in this session (sandboxed environment). Callout uses the existing `callout-tip` class and was inserted with valid HTML; recommend opening `fsad-playbook.html` locally to confirm visual layout before declaring the render fully verified.
- Validation run used the `general-purpose` fallback for all 6 specialists (typed plugin agents unavailable in the harness). A future run in a harness with `TeamCreate` + typed plugin specialists loaded would confirm the prompt also runs cleanly on its canonical form.
- `npm audit` and `cargo audit` could not run (tools unavailable on audit host). Recommend re-running the dependency axis on a tooled host for real CVE coverage.
