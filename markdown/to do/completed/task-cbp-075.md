# CBP-075 — sec-review-team: document known tradeoffs + output-dir pollution warning in the skill

## Source
"Known-fine / non-issues" section of [`markdown/research/sec-review-recommendations.md`](../research/sec-review-recommendations.md). Six items listed there are deliberate tradeoffs (not bugs), and without explicit documentation future contributors will keep re-raising them. Also rolls in the P2.6 "output-dir pollution warning" recommendation which is a small user-facing tweak that fits naturally with the tradeoffs doc.

## Summary
Add a "Known tradeoffs and deliberate non-features" section to the skill documentation (`.claude/skills/sec-review-team/docs/tradeoffs.md`, linked from `SKILL.md`) that captures the six tradeoffs the recommendations doc calls out as "known-fine." Also add a Step-0 warning when the target's `.gitignore` doesn't exclude `.planning/` — since the skill writes findings into the target repo, this surfaces the risk of accidentally committing internal security findings.

## Assessment
- **Current state:** `.claude/skills/sec-review-team/SKILL.md` has no section that lists deliberate non-features. A contributor proposing "enable typed plugin specialists always" or "move findings to /tmp" has no durable artifact explaining why the current choice was made.
- **Six tradeoffs to document** (from rec doc section "Known-fine / non-issues"):
  1. `general-purpose` fallback is the intended path when typed plugin specialists aren't loaded. Not a gap.
  2. Findings live in `<target>/.planning/security-review/` inside the target repo (preserves history, enables re-run). The *real fix* is CBP-075's output-dir warning (below), not moving to `/tmp`.
  3. No streaming / interim output during an agent run — platform limitation; CBP-065 (heartbeat files) is the right-sized workaround, not a real fix.
  4. Two sources of truth (canonical prompt in `markdown/design/` + embedded in `fsad-playbook.html`) — not broken; resolves naturally when CBP-071 (playbook refactor post-library) lands.
  5. No automatic fix application — intentionally out of scope; fix risk is different from review risk. Fix workflow is CBP-070 (`/sec-review-fixes` companion skill).
  6. "Review-only" enforced by prompt instruction today — real fix is CBP-066 (hard read-only allowlist). Once CBP-066 lands, this tradeoff is closed.
- **Output-dir pollution warning (was P2.6):** before creating `.planning/security-review/`, the orchestrator should check the target's `.gitignore` for `.planning/` or equivalent. If absent, warn the user and offer to (a) add `.planning/` to `.gitignore`, (b) write to `/tmp/sec-review-<timestamp>/` instead, or (c) proceed anyway.

**Location:** `.claude/skills/sec-review-team/docs/tradeoffs.md` (new); `.claude/skills/sec-review-team/SKILL.md` — Step 2 (prepare findings directory, line ~21-23); linked from skill body.

## Plan

1. Create `.claude/skills/sec-review-team/docs/tradeoffs.md` documenting the six tradeoffs above. For each:
   - **What** — the tradeoff
   - **Why** — the reason the current design is correct
   - **When to revisit** — what would have to change for the tradeoff to flip
   - **Related tasks** — if a partial mitigation exists (CBP-065/066/070/071), link it
2. Link `docs/tradeoffs.md` from `SKILL.md` under a new "Design notes" section near the Related block.
3. Update Step 2 of `SKILL.md` (prepare findings directory) to include the output-dir pollution check:
   - Read the target's `.gitignore` (or check `git check-ignore <target>/.planning/`).
   - If `.planning/` is not ignored, print a warning:
     > "⚠ `.planning/` is not in the target's .gitignore. Security findings will land inside the repo and could be committed accidentally. Options: (a) add `.planning/` to .gitignore, (b) write to /tmp/sec-review-<timestamp>/ instead, (c) proceed."
   - Respect user choice. Default (if no prompt response) is (c) proceed — do not block the run.
4. Document this behavior in `docs/tradeoffs.md` under tradeoff #2.
5. Update the playbook Security Review section (future task CBP-071) to link to `docs/tradeoffs.md` for users curious why certain choices were made.

## Acceptance Criteria
- [x] `.claude/skills/sec-review-team/docs/tradeoffs.md` exists covering all six tradeoffs with What / Why / When to revisit / Related tasks.
- [x] `SKILL.md` has a "Design notes" link pointing at `docs/tradeoffs.md`.
- [x] Step 2 of `SKILL.md` checks target `.gitignore` for `.planning/` and warns if absent.
- [x] Warning offers three clear options (add to .gitignore / /tmp / proceed).
- [x] User choice is respected; default is "proceed" (don't block the run on warning).
- [ ] Re-run against `recall` triggers the warning (recall does not gitignore `.planning/` by default) and the user can respond.
- [ ] Tradeoffs doc referenced from the playbook's security-review section (in CBP-071 scope).
