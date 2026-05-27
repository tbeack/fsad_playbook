---
description: Pick the next open task from the current project's todo file and invoke `/fsd:do-task` with that task ID. Auto-detects the current project from the working directory using the same YAML config as other fsd skills. Use when the user says "do the next task", "what's next", "next task", or similar.
---

# fsd:next — pick the next open task and hand off to do-task

You find the first unchecked task in the current project's todo file and invoke `fsd:do-task` with that task ID. There are no arguments.

## Step 0 — Detect the project

1. Determine the current working directory.
2. Read `~/.claude/commands/fsd/projects.yaml`.
3. Match cwd against each project's `match_paths` (expand `~`). Prefer the longest (most specific) match if multiple match.
4. If a project matches, refer to its entry as `cfg` and the resolved project root as `project_root`. Proceed.
5. If **no project matches**:
   - Tell the user the project is not registered.
   - Suggest running `/fsd:add-task` from the project to register it.
   - Stop.

## Step 1 — Find the next open task

Read `cfg.todo_file` (resolved relative to `project_root`).

Scan the lines top-to-bottom. Find the **first** line that:
- Starts with `- [ ]` (unchecked), and
- Contains the project's `cfg.prefix` (e.g. `TBS`, `CBP`, `FSD`)

Extract the full canonical task identifier from that line (e.g. `TBS-006`).

## Step 2 — No open tasks

If no matching unchecked line is found, tell the user:

> No open tasks found in `[cfg.todo_file]`. All done!

Then stop.

## Step 3 — Hand off to do-task

Tell the user which task was selected, e.g.:

> Next task: **TBS-006** — "Add a new skill `fsd:next`". Handing off to `fsd:do-task`…

Then invoke `fsd:do-task` via the Skill tool, passing the canonical task identifier as the argument.
