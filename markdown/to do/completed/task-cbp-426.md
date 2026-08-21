# CBP-426 — [Codex] `codex agents` interactive dashboard

## Source
Codex CLI rust-v0.149.0 release notes: "Added an interactive `codex agents` dashboard for searching, starting, opening, renaming, and stopping tasks, with configurable shortcuts."

## Summary
Codex CLI adds an interactive `codex agents` dashboard command for searching, starting, opening, renaming, and stopping tasks, with configurable keyboard shortcuts. Two natural homes: the Codex Cheat Sheet's CLI Flags table (alongside `codex doctor`/`codex update`/`codex remote-control`) and the Codex Power Usage Multi-Agent Workflows collapsible (which already documents `[agents]` config, per-role model/reasoning, and batch processing).

## Assessment
Content does not exist. `id="codex-cheat-sheet"` CLI Flags table (~line 13920-13945) has no `codex agents` row. `id="codex-power-usage"` Multi-Agent Workflows collapsible (~line 13996-14038) covers config-driven multi-agent behavior but not an interactive task-management dashboard.

## Plan
1. In `fsad-playbook.html`, CLI Flags table (`id="codex-cheat-sheet"`, ~line 13939-13942, following the `codex remote-control`/`codex exec fork`/`codex doctor` row pattern): add a new `<tr>` for `codex agents` — "Open an interactive dashboard to search, start, open, rename, and stop tasks, with configurable shortcuts (rust-v0.149.0)."
2. In `fsad-playbook.html`, Multi-Agent Workflows collapsible (`id="codex-power-usage"`, after the intro paragraph at line 14003 or as a new paragraph before the "Built-in roles" section at line 14022): add a short paragraph describing the `codex agents` interactive dashboard as the way to manage running/spawned agent tasks day-to-day, distinct from the `[agents]` config.toml settings above it. Tag `(rust-v0.149.0)`.

## Acceptance Criteria
- [ ] New `codex agents` row exists in the Codex Cheat Sheet CLI Flags table, tagged `(rust-v0.149.0)`.
- [ ] Multi-Agent Workflows collapsible mentions the `codex agents` dashboard, tagged `(rust-v0.149.0)`.
- [ ] No existing rows/paragraphs removed or altered.
