# CBP-273 — Sync tb:add-task and tb:do-task improvements to fsd:add-task and fsd:do-task

**Todoist ID:** 6gwXffgcg2M9J5mG

## Summary

The `tb:add-task` and `tb:do-task` commands received several improvements (targeted bash commands instead of full-file reads, token estimation, plan chunking, session summary hook) that have not been applied to the installable `fsd:` skill equivalents in `skills/`. This task syncs those improvements while keeping the fsd: skills generic — no project-specific references, no Todoist steps.

## Assessment

**fsd:add-task** (`skills/add-task/SKILL.md`):
- Step 0: description frontmatter names specific projects by example (`fsad_playbook, fsad_training, hangman, KHB, fsd, etc.`) — should be generic
- Step 1: instructs to `Read cfg.todo_file` (full file read) — tb: version uses `grep -oE` to find the highest number without reading the whole file
- Step 2: says "scan the todo file" for duplicates — tb: version uses `grep -i "{keyword_from_title}"` with 2–3 distinctive words
- Step 3: describes insertion rules in plain prose — tb: version adds specific grep commands to locate line numbers before the targeted `Read`

**fsd:do-task** (`skills/do-task/SKILL.md`):
- Missing Step 5a.5 (token cost estimation before executing)
- Missing Step 5a.6 (chunk agents for plans that exceed the 130 k-token threshold)
- Missing Step 5h.5 (write narrative session summary to `/tmp/tb-session-summary-{TASK_ID}.txt` for the Stop hook)
- No Todoist step should be added (per user request — keep fsd: skills generic)

## Plan

### fsd:add-task changes (`skills/add-task/SKILL.md`)

1. **Frontmatter description** — Remove the parenthetical project list. New text: `"Add a new task to any of your local projects. Auto-detects the current project from the working directory and conforms to that project's conventions — prefix, numbering, todo-file layout, task-file template. Reads conventions from \`~/.claude/commands/fsd/projects.yaml\`. Use when the user wants to add a task, capture a TODO, or track a new idea."`

2. **Step 1** — Replace the two "read the full file" sub-steps with targeted bash commands:

   ```
   ## Step 1 — Compute the next number

   Do **not** read the full todo file. Use targeted Bash commands instead:

   1. **Find the highest task number** — run:
      ```bash
      grep -oE '{prefix}-[0-9]+' "{todo_file_path}" | sort -t- -k2 -n | tail -1
      ```
      Substitute the literal prefix and resolved absolute path. Quote the path to handle spaces. If output is empty, no tasks exist — start at 1.

   2. **Clean up empty placeholder entries** — run:
      ```bash
      grep -nE '^- \[ \] `{prefix}-[0-9]+`\s*$' "{todo_file_path}"
      ```
      If any lines are returned, remove each with `Edit` using the exact line text as `old_string`. If the only entry removed was the last real line, treat the file as empty and start numbering from 1.

   3. **Increment** by 1; zero-pad to `cfg.number_digits` digits → `nnn`.
   4. Build IDs and tokens as before.
   ```

3. **Step 2** — Replace "scan the todo file" with a targeted grep:

   ```
   Before adding, check for an existing entry with a similar title using:
   ```bash
   grep -i "{keyword_from_title}" "{todo_file_path}"
   ```
   Pick 2–3 distinctive words from the title as the keyword. If any lines are returned, surface them and ask whether to proceed, edit the existing one, or abandon.
   ```

4. **Step 3** — Add grep-based insertion discovery before the Edit instruction:

   ```
   Insertion point — use grep to find the right location without a full-file read:
   - If `cfg.insert_before_section` is set → run `grep -n "{section_heading}" "{todo_file_path}"` to get the line number. Then `Read` with `offset` set to ~5 lines before that line number and `limit` of ~10 lines to get enough context for a unique `Edit` match.
   - Else if `cfg.insert_under_section` is set → run `grep -n "^##" "{todo_file_path}"` to find section boundaries. Read ~10 lines around the target section's end to locate the last bullet.
   - Else → run `grep -c "" "{todo_file_path}"` to get the total line count, then `Read` with `offset` set to the last ~10 lines to find the final bullet.

   Use the `Edit` tool with enough surrounding context to be unique. Don't rewrite the whole file.
   ```

### fsd:do-task changes (`skills/do-task/SKILL.md`)

5. **Add Step 5a.5** — Insert after the existing Step 5a ("Review critically before touching anything"):

   ```markdown
   ### 5a.5. Estimate token cost

   After reviewing the task file, compute a rough token estimate to decide whether the plan fits in a single-agent execution pass.

   **Count from the task file:**
   - `N_steps` = numbered items in `## Plan`
   - `N_files` = distinct file paths mentioned anywhere (quoted paths like `` `foo/bar.ts` ``)
   - `N_acs` = `- [ ]` checkbox items in `## Acceptance Criteria`
   - `has_exploration` = `true` if any plan step contains the words "research", "explore", "investigate", "audit", or "survey"

   **Formula:**

   ```
   estimated_tokens = 8000 + (N_steps × 3000) + (N_files × 2000) + (N_acs × 500) + (has_exploration ? 15000 : 0)
   ```

   **Threshold:** `LIMIT = 130000` (65% of the 200 000-token context window)

   Announce the estimate: `"Token estimate: ~{estimated_tokens} ({pct}% of context limit)."`

   - **Below threshold** (`estimated_tokens < LIMIT`) — continue to Step 5b as normal.
   - **At or above threshold** (`estimated_tokens >= LIMIT`) — announce that chunking will be used, then go to Step 5a.6 instead of Step 5b.
   ```

6. **Add Step 5a.6** — Insert after Step 5a.5:

   ```markdown
   ### 5a.6. Split plan into chunks (threshold exceeded only)

   This step runs only when Step 5a.5 finds `estimated_tokens >= LIMIT`. The worktree is created by Step 5c — run Step 5c first (sync + `EnterWorktree`), then return here to spawn chunk agents that write their files into that worktree.

   **Chunk count:**

   ```
   N_chunks = min(5, max(2, ceil(estimated_tokens / LIMIT)))
   ```

   **Divide plan steps** into `N_chunks` roughly equal slices. Prefer natural phase or heading boundaries if the plan uses them. Each slice gets a step range, e.g. "steps 1–8" and "steps 9–15".

   **Spawn chunk agents sequentially** (wait for chunk N to return before starting N+1):

   For each chunk, build the agent prompt:

   > You are implementing part of task `{ID}` in the worktree at `{worktree_path}`. All file writes must go to that path.
   >
   > **Full task file:** [paste full task file contents]
   >
   > **Your scope:** Implement **ONLY steps {start}–{end}** from the `## Plan` section. Steps before {start} are already complete; steps after {end} belong to a later chunk — do not implement them.
   >
   > **Do NOT:** verify acceptance criteria, update CHANGELOG.md, mark the task complete in the todo file, or write `.pmon-session-task`. The orchestrator handles all of that after every chunk finishes.
   >
   > Return a brief summary of the files you changed.

   **After all chunk agents return**, resume the main flow at **Step 5e** (verify ACs). Continue normally through 5f → 5g → 5h → 5i.
   ```

7. **Add Step 5h.5** — Insert after Step 5h ("Mark the task complete"):

   ```markdown
   ### 5h.5. Write session summary to temp file

   Before handing off, write a narrative summary so the Stop hook produces a meaningful log entry.

   1. Count ACs in the task file: scan `## Acceptance Criteria` for `- [x]` (verified) and `- [ ]` (remaining) lines.
   2. Generate a 4–6 sentence narrative in past tense covering: what was implemented, the approach taken, which ACs were verified, any notable decisions or deviations, and which files changed.
   3. Write the block to `/tmp/tb-session-summary-{TASK_ID}.txt` using the `Write` tool. The file content must be exactly:

   ```
   {TASK_ID} — {task title}

   {narrative text}

   ACs verified: N/M
   ```

   The Stop hook reads and deletes this file automatically when the session ends — do not delete it here.
   ```

All criteria verified 2026-06-22 before commit.

## Acceptance Criteria

- [x] `skills/add-task/SKILL.md` frontmatter description no longer names specific projects
- [x] `fsd:add-task` Step 1 uses `grep -oE` bash command to find the highest number (not full-file Read)
- [x] `fsd:add-task` Step 2 uses `grep -i "{keyword}"` for duplicate detection
- [x] `fsd:add-task` Step 3 uses grep commands to locate the insertion point before the targeted Read/Edit
- [x] `skills/do-task/SKILL.md` Step 5a.5 exists with the token formula and threshold announcement
- [x] `skills/do-task/SKILL.md` Step 5a.6 exists with N_chunks formula and sequential chunk agent prompts
- [x] `skills/do-task/SKILL.md` Step 5h.5 exists with the `/tmp/tb-session-summary-{TASK_ID}.txt` write
- [x] No Todoist steps added to either fsd: skill file
- [x] All other existing fsd: skill content is unchanged
