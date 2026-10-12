# CBP-677 — Revise the harness page using the Agentic Harness Blueprint

## Source
Artifact https://claude.ai/artifact/TYgXGg4zTRcLdYCj8NynkB. The Docs connector denied access. The local copy is `markdown/research/Agentic Harness Blueprint.html`. The copy holds only the diagram text, with no styling or section prose.

## Summary
Align `src/pages/harness.html` with the Blueprint. The Blueprint states "Agent = Model + Harness" and shows one loop with a worked example.

## Assessment
The Blueprint content, as recovered from the copy:
- Thesis: "Agent = Model + Harness. The model decides. The harness executes."
- Loop: Think (context builder + model), Act (tool registry, policy gate, sandbox), Observe (trim, verify, remember), Cross-cutting (result, tracing).
- Components: verifier defines done, memory carries lessons past the context window, subagents split work, tracing records tokens and cost.
- Worked example: "fix failing checkout test", with steps tool call, check permission, approved call, trimmed result, not done so loop again, load notes, done so ship it, delegate and summary.
- Loop rule: "Until done." Think, act, observe until the verifier says done or the turn budget runs out (example: turn 2 of 25). On exhaustion, stop and leave a report instead of spinning.

The page already covers most of this. `model-vs-harness` has the thesis and a seven-jobs diagram. `graph-loop-engineering` has the bounded retry loop. `control-trust` has the permission check. `observe-improve` has verification and traces. The Blueprint adds three items the page lacks:
1. The Think / Act / Observe loop as one picture.
2. The worked example "fix failing checkout test".
3. The explicit turn budget (n / 25) with a stop-and-report exit.

**Location:** `src/pages/harness.html` — `model-vs-harness` (line 124) and `graph-loop-engineering` (line 293)

## Plan

1. Re-read the artifact in full if access is shared. The local copy has no prose, so confirm nothing else is missing.
2. In `model-vs-harness`, add the one-line form "Agent = Model + Harness" next to the existing opening claim.
3. In `graph-loop-engineering`, add the worked example "fix failing checkout test" as a numbered step list. Match the existing code-block and list styles.
4. In the same section, add the turn-budget rule and the stop-and-report exit to the loop text.
5. If a new diagram is needed, render 2-3 variants in a scratch `preview.html` first and serve it on localhost. Apply only the chosen variant. Pre-render the PNG assets as the other diagrams do.
6. Run `python3 scripts/build-source.py`, then `python3 scripts/build-dist.py`. Confirm it logs `Injected PLAYBOOK_EMBEDDINGS`.
7. Verify in a browser on `http://localhost:8000`, in both themes.
8. Update `CHANGELOG.md` and `README.md` if the user-visible content changes. Bump the version only if the user asks.

## Acceptance Criteria
- [x] `src/pages/harness.html` contains the phrase "Agent = Model + Harness" inside `#model-vs-harness`.
- [x] `#graph-loop-engineering` contains the worked example "fix failing checkout test" with at least 6 ordered steps.
- [x] `#graph-loop-engineering` states that the loop stops at a turn budget and leaves a report.
- [x] No new text uses an em dash or a word from the ASD-STE100 blocklist.
- [x] `python3 scripts/build-source.py` and `python3 scripts/build-dist.py` pass, and the dist log shows `Injected PLAYBOOK_EMBEDDINGS`.
- [x] The harness page loads on `http://localhost:8000` with no console errors except the 404 for `/_vercel/insights/script.js` (the Vercel host serves that script), and every sidebar link scrolls to its section (links broken before this task are CBP-678).

All criteria verified 2026-10-11 before commit.

## Agent Decisions Made
- 2026-10-11 — **Question:** CBP-668 and CBP-669 were taken by auto-update tasks on origin. Which IDs do these tasks use? **Decision:** This task is CBP-677. The sidebar anchor bug is CBP-678. **Why:** The skill says a colliding ID moves to the next free number. The highest used ID on origin was CBP-676.
- 2026-10-11 — **Question:** AC6 said no console errors, but the page logs a 404 for `/_vercel/insights/script.js`. **Decision:** The user chose to reword AC6 to exclude that 404 (decision D3). **Why:** The Vercel host serves that script, so the task did not cause the error.
- 2026-10-11 — **Question:** The AC4 check found "executes" and "attempt" in new text. **Decision:** Changed them to "acts" and "try", rebuilt, and checked again. **Why:** Both words are on the ASD-STE100 substitution list.
