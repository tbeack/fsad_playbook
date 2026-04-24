# CBP-062 — sec-review-team: pre-run confirmation with target / scope / stack / ETA / estimated cost (P0.2)

## Source
Recommendation P0.2 in [`markdown/research/sec-review-recommendations.md`](../research/sec-review-recommendations.md). The current skill fires immediately and leaves the user waiting 15–30 minutes with no signal. A pre-run confirmation is the cheapest possible safeguard against scope sprawl and surprise cost.

## Summary
Add a mandatory **Step 0** before any Agent spawn that shows the user the target, scope, detected stack, proposed specialist roster, estimated runtime, estimated tokens, and estimated cost — and waits for approval. Support a `--yes` / `auto-approve` flag for power users who want the current fire-and-wait behavior.

## Assessment
- **Current state:** The skill's Step 1 asks for target + scope (if missing) and then silently proceeds into spawning 6 parallel agents. A user who accidentally points at a 30-project workspace root will waste ~30 minutes before the mistake is visible.
- **What exists already:** Step 1 already does a fast read of `README.md`, `package.json`, etc. (lines 11–19 of `SKILL.md`). That read can be repurposed to populate the confirmation screen.
- **What's missing:** file/line counts, stack signal detection, cost estimation, user-visible confirmation block, `--yes` bypass.

**Location:** `.claude/skills/sec-review-team/SKILL.md` — new Step 0 inserted before current Step 1 (line 11); argument parsing (line 13).

## Plan

1. Add Step 0 "Pre-run confirmation" before Step 1. Its duties:
   - Enumerate files and lines under the scope (via `fd` / `find` / `git ls-files` as available).
   - Detect stack signals (React / Tauri / Django / FastAPI / Terraform / Go module / Python package / LLM agent / etc.) from config files.
   - Pick the specialist roster based on detected stack (placeholder until CBP-064 lands — for now, print the default 6 with a note that roster-adaptation ships in CBP-064).
   - Estimate runtime (longest-path specialist × parallelism factor; baseline from CBP-060 was ~20–30 min for a Tauri target with ~1,250 files).
   - Estimate input/output tokens per specialist (read from the CBP-060 reference run: ~30–60k total input tokens per specialist, ~5–10k output; scale linearly with file count).
   - Estimate cost from token counts × current model pricing (Opus 4.7: $5/MTok input, $25/MTok output).
2. Render the confirmation block in the format shown in the recommendations doc (P0.2 example). Wait for a `y` / narrow-scope / abort response.
3. Add a `--yes` / `auto-approve` argument to skip confirmation. Document in the skill's `argument-hint`.
4. Handle "narrow scope" responses by re-prompting for a subdirectory or `diff vs main`.
5. If the user picks abort, do not create `.planning/security-review/` or spawn any agent.

## Acceptance Criteria
- [x] Step 0 renders a confirmation block listing target, scope, file count, line count, detected stack, specialist roster, estimated runtime, estimated tokens, estimated cost.
- [x] Confirmation blocks execution until the user confirms, narrows, or aborts.
- [x] `--yes` / `auto-approve` argument bypasses confirmation.
- [x] Abort path exits cleanly without creating `.planning/security-review/`.
- [x] `argument-hint` in the skill frontmatter updated to document the new flag.
- [ ] Cost estimate within ±25% of actual cost on the `recall` reference run.
