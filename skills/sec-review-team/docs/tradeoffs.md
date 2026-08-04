# Design Tradeoffs and Deliberate Non-Features

These are things that look like gaps but are deliberate choices. Captured here so future contributors don't re-raise them — or know exactly what would have to change to flip the decision.

## 1. `general-purpose` fallback is the intended path when typed plugin specialists aren't loaded

**What:** Each specialist brief lists a `preferred_subagent_type` (e.g., `security-auditor`, `pr-review-toolkit:code-reviewer`) and `fallback_subagent_type: general-purpose`. When the preferred type isn't registered, the orchestrator falls back without warning.

**Why:** Validated in CBP-060 (historical reference run, executed on Opus 4.7 — the finding is about agent-type fallback behavior, not tied to that specific model generation) — quality of findings did not degrade when all 6 specialists ran as `general-purpose`. The brief is what produces focus, not the agent type. Forcing typed plugins would make the skill unusable in plain Claude Code installs.

**When to revisit:** If typed plugin specialists gain meaningful capability the brief alone can't replicate (e.g., pre-loaded scanner integration, specialized tool allowlists), make the fallback warn the user and offer to install the plugin.

---

## 2. Findings are written to `<TARGET>/.planning/security-review/` inside the target repo

**What:** Per-specialist files and the consolidated REPORT.md live inside the target's `.planning/` directory.

**Why:** Preserves history across runs (enables re-run mode, ledger), makes findings co-located with the code they describe, works with existing `.planning/` conventions in the FSAD Playbook and related projects. Moving to `/tmp/` loses all of this for very little privacy gain (the target-repo owner already has access).

**Mitigation:** Step 2 (`SKILL.md`) checks target `.gitignore` for `.planning/` and warns if absent, offering to write to `/tmp/sec-review-<timestamp>/` instead. This handles the minority of teams that don't gitignore `.planning/` and don't want internal findings committable.

**When to revisit:** If multiple users report accidental commits of findings — consider reversing the default.

---

## 3. No streaming / interim output during a specialist's run

**What:** The `Agent` tool is synchronous. The orchestrator blocks until a subagent returns. No incremental updates from a running specialist.

**Why:** Platform limitation, not a skill bug.

**Workaround (CBP-065):** Specialists write `<name>.status.json` files during their run. Users can `tail -f .planning/security-review/*.status.json` in a second terminal for live progress. As each agent returns, the orchestrator prints a one-line interim status.

**When to revisit:** If the `Agent` tool ever gains streaming semantics, remove the status-file dance and stream progress inline.

---

## 4. Two sources of truth: canonical prompt + embedded playbook copy

**What:** This skill (`SKILL.md` + `specialists/`) is the canonical source. The playbook embeds a copy of the orchestration prompt in the Security Review HTML section. They must be kept in sync manually.

**Why:** The playbook is a shareable static asset (one HTML file); the skill is an executable artifact. Both are legitimate distribution paths with different audiences.

**Mitigation (CBP-071):** Playbook refactors to render a summary + invocation example pointing at the canonical skill, rather than inlining the full prompt. Legacy prompt is preserved in a collapsible. This cuts most of the duplication.

**When to revisit:** If a future build pipeline can render the HTML section from the skill source directly, remove the duplicate.

---

## 5. No automatic fix application

**What:** The skill is explicitly review-only. It never edits files, never opens PRs, never applies fixes.

**Why:** Fix-application risk is very different from review risk — review reads code, fix writes code. Conflating them would break the predictability guarantee that makes the skill safe to run unattended.

**Complement (CBP-070):** `/sec-review-fixes` is a separate companion skill that consumes `REPORT.md` / `findings.jsonl` and proposes fix PRs with interactive approval gates. Separate skill = separate sandbox = separate approval surface.

**When to revisit:** Never. This separation is load-bearing.

---

## 6. "Review-only" is enforced by tool allowlists, not prompt instruction alone

**What:** Every specialist brief includes an `## Allowed tools` section. When the orchestrator spawns the agent, it passes `allowed-tools` restricting the agent to `Read`, `Grep`, `Glob`, a read-only `Bash` allowlist, and `Write` scoped to the four output file paths. `Edit`, unlisted `Bash`, and `Write` to anything else are **denied at the harness level**.

**Why:** Prompt-level "don't edit files" is a wish, not a guarantee. A misbehaving or prompt-injected agent could silently mutate the target. Tool allowlisting closes that gap with a hard enforcement boundary.

**When to revisit:** If a specialist provably needs a tool outside the current allowlist (e.g., a future `trivy apply` that only has read-only modes as flags), update the allowlist per-specialist rather than loosening globally.

---

## Summary: what this skill deliberately is NOT

- Not a replacement for human security review — a force-multiplier.
- Not a CI gate for new vulns — that's a scanner's job (the skill feeds scanners in via pre-pass and adds architectural signal on top).
- Not a fix-generating tool — that's `/sec-review-fixes`.
- Not a compliance audit — regulatory mapping is out of scope (see `privacy-telemetry-auditor` for telemetry/consent, which is as close as it gets).
- Not a pentest — no dynamic analysis, no exploitation, no runtime fuzzing.

If you want any of those, the skill is the wrong tool. These separations are intentional and load-bearing.
