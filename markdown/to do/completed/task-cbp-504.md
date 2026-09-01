# CBP-504 — [Codex] Document `tools.update_plan.enabled` (planning tool now off by default)

## Source
Codex CLI rust-v0.152.0 release notes: "The planning tool is disabled by default; enable it with `tools.update_plan.enabled = true`." (Chores, #41744)

## Summary
Codex's internal planning tool (the model-invoked tool it uses to track and update its own step-by-step plan during a task, independent of the `/plan` slash command) is now off by default. Users who relied on this behavior need to explicitly opt in via `tools.update_plan.enabled = true` in `config.toml`. This is a behavioral default change worth a Configuration Reference row since nothing in the playbook currently documents the planning tool at all.

## Assessment
`src/pages/codex.html`, `#codex-cheat-sheet` → Configuration Reference table, lines ~1074–1080. Grepped the full file for `update_plan`, `plan tool`, and `task list` — no existing mention of the model's internal planning tool (distinct from the already-documented `/plan` slash command, which proposes an approach before implementing). Gap confirmed — `update-existing` (extends the Configuration Reference table with a new row; the underlying tool has no prior playbook coverage to update, but the target is an existing table, not a new section).

## Plan
1. Open `src/pages/codex.html`.
2. In the Configuration Reference table (`#codex-cheat-sheet`), after the `[features].codex_hooks` row (~line 1079), add:
   ```html
   <tr><td><code>tools.update_plan.enabled</code></td><td>Enable the model's internal planning tool (tracks/updates its own step-by-step plan during a task — distinct from the <code>/plan</code> slash command). Disabled by default as of rust-v0.152.0.</td><td><code>false</code></td></tr>
   ```
3. Run `python3 scripts/build-source.py` after all this run's edits land.

## Acceptance Criteria
- [ ] New `tools.update_plan.enabled` row present in the Configuration Reference table, distinguishing the internal planning tool from `/plan`.
- [ ] Default value documented as `false` (disabled), tagged `rust-v0.152.0`.
- [ ] Existing table rows unchanged.
- [ ] `build-source.py` runs cleanly after all edits for this run land.
