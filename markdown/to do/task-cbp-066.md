# CBP-066 — sec-review-team: enforce hard read-only tool allowlist when spawning specialists (P1.2)

## Source
Recommendation P1.2 in [`markdown/research/sec-review-recommendations.md`](../research/sec-review-recommendations.md). "Review only" is currently enforced by prompt instruction alone. A misbehaving agent could still call `Edit`, arbitrary `Bash`, or `Write` to paths outside the findings directory.

## Summary
When spawning each specialist `Agent`, pass an explicit `allowed-tools` restriction that grants read-only capabilities only: `Read`, `Grep`, `Glob`, specific allowlisted `Bash` commands (read-only), and `Write` restricted to the agent's own findings / status file paths. Block `Edit`, general `Bash`, and `Write` to any other path. Makes "review only" a hard guarantee, not a prompt wish.

## Assessment
- **Current state:** Specialist briefs say "Read-only. Never edit files." That's a prompt instruction, not an enforcement.
- **Platform capability:** Claude Code supports per-Agent tool allowlisting via `allowed-tools` in agent frontmatter and per-invocation, plus Bash command matchers in permission config. See CBP-055 which documented `allowed-tools: Read Bash(grep:*) Bash(git *)` pattern.
- **Risk addressed:** An agent that has a bug or prompt-injection exposure can't silently corrupt the target repo. Also reduces blast radius if a specialist ever hallucinates a fix-apply step.

**Location:** `.claude/skills/sec-review-team/SKILL.md` — Step 3 (Agent spawning); each specialist brief. Depends on CBP-064 (library refactor) for clean per-specialist policy.

## Plan

1. Define the shared allowlist for all specialists:
   - `Read` — any file under `<TARGET>`
   - `Grep`, `Glob` — any file under `<TARGET>`
   - `Bash` — allowlisted read-only commands: `ls`, `cat`, `head`, `tail`, `wc`, `find`, `fd`, `rg`, `grep`, `git status`, `git log`, `git diff`, `git ls-files`, `git show`, `git blame`, `npm ls`, `npm audit`, `cargo tree`, `cargo audit`, `pip list`, `pip-audit`, `osv-scanner`, `gitleaks`, `semgrep` (with no write flags), `bandit`, `jq`.
   - `Write` — restricted to `<TARGET>/.planning/security-review/<agent>.md`, `<agent>.findings.jsonl`, `<agent>.coverage.jsonl`, `<agent>.status.json`.
   - **Denied:** `Edit`, any `Bash` not on the allowlist, any `Write` outside the paths above, `NotebookEdit`, `WebFetch` (should come from orchestrator if needed), `WebSearch`.
2. Add an `allowed-tools` section to each specialist brief in `.claude/skills/sec-review-team/specialists/<agent>.md` (post-CBP-064) with the allowlist.
3. Update the orchestrator's Step 3 to pass `allowed-tools` in each `Agent` invocation.
4. Test enforcement:
   - Write a negative-test brief that asks the agent to `Edit` a file in the target; confirm the call is refused.
   - Write a negative-test brief that asks for `Bash("rm -rf /tmp/x")`; confirm refused.
   - Confirm positive path: `Read`, `Grep`, and findings-file `Write` still work.
5. Document the enforcement in `SKILL.md` so users know the skill is sandbox-safe.

## Acceptance Criteria
- [x] Each specialist brief lists the explicit `allowed-tools` and denied-tools set.
- [x] Orchestrator passes `allowed-tools` when spawning each Agent.
- [ ] Negative tests confirm `Edit`, unlisted `Bash`, and out-of-scope `Write` are refused for a specialist.
- [ ] Positive tests confirm all in-scope operations still work.
- [x] `SKILL.md` documents the enforcement and the allowlist.
- [ ] No regression in findings produced for the `recall` reference target — same severity counts as CBP-060.
