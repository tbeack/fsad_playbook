# CBP-662 — Fix the CBP-152 todo entry that links `task-cbp-151.md` instead of its own task file

## Source

Found 2026-10-07 while checking CBP-658 AC7 (a headless `fsad-harness:next` run flagged it). Not caused by CBP-658.

## Summary

The open entry `CBP-152` in `markdown/to do/todo.md` links to `task-cbp-151.md`. That file no longer exists at that path: it sits in `markdown/to do/completed/`. `task-cbp-152.md` does not exist anywhere. Readers and skills (`fsad-harness:next`, `fsad-harness:do-task`) follow a dead link, and `do-task` would enter plan mode for CBP-152 because it finds no task file.

## Assessment

- `todo.md` line 165: `- [ ] \`CBP-152\` Add Natural Language Q&A (Haiku approach) … → [task-cbp-151.md](task-cbp-151.md)`.
- `markdown/to do/completed/task-cbp-151.md` has the title "CBP-151 — Add Natural Language Search & Q&A (Haiku Approach)". Its topic matches CBP-152, so the link may point at the right content but the wrong ID and path.
- `todo.md` line 164 (CBP-151) links `completed/task-cbp-148.md`, so the 148/151/152 numbering is shifted. Check both entries before choosing a fix.
- CBP-152 is still open (`- [ ]`), so its plan should stay reachable, not buried in `completed/`.

**Location:** `markdown/to do/todo.md` lines 164-165; `markdown/to do/completed/task-cbp-151.md`.

## Plan

1. Read `completed/task-cbp-151.md` and `completed/task-cbp-148.md`. Decide which one holds the CBP-152 plan.
2. Choose one fix and record the choice here before editing:
   - Repoint the CBP-152 link to the correct file under `completed/`, or
   - Create `task-cbp-152.md` from the right plan and link it.
3. Edit only the CBP-152 line (and the CBP-151 line if it also points at the wrong file).
4. Run the link check from the ACs.

## Acceptance Criteria

- [ ] The link target in the `CBP-152` line of `todo.md` resolves to an existing file (`test -f` on the path relative to `markdown/to do/` exits 0).
- [ ] The file that line links to has an H1 starting `# CBP-152` or states in its Source that it holds the CBP-152 plan.
- [ ] Every `→ [..](..)` link in `todo.md` for entries `CBP-148` to `CBP-152` resolves to an existing file.
