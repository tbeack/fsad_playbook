# CBP-379 — Best Practices: Todo/task-tracking tools default-off on newer models

## Source
Claude Code v2.1.233 changelog: "Todo/task-tracking tools (TaskCreate/Get/Update/List, TodoWrite) are no longer available on Opus 4.8, Sonnet 5, Fable 5, Mythos 5, and newer models; set `CLAUDE_CODE_ENABLE_TODO_TOOLS=1` to bring them back."

## Summary
This is a meaningful default-behavior change: TodoWrite/TaskCreate-family tools, previously available by default, are now off by default on the model family the playbook treats as its default daily driver (Sonnet 5, referenced at `fsad-playbook.html` L10805). Anyone relying on default task-list/todo behavior for FSAD workflows needs to know about this and the opt-back-in env var.

## Assessment
Does content exist? No — confirmed via grep across the file: `TodoWrite` has zero mentions anywhere. `TaskCreate`/`TaskUpdate` appear only incidentally on other pages (Pod Compositions `/add-task` skill workflow example, and a Skills Library legacy-prompt example) — never in `#best-practices` or `#power-usage`, and neither of those existing mentions describes tool *availability*, so this isn't a case of correcting outdated info, it's genuinely new-section territory.

The `#best-practices` page's "Workflow" subsection (`fsad-playbook.html` L10706-10725) is the natural home — it already has cards for `/clear`, `/compact`, "Commit Frequently", and "Review Agent Output Before Shipping", i.e. default-workflow guidance cards of exactly this shape and granularity.

## Plan
1. Read `fsad-playbook.html` L10695-10730 to confirm the exact Workflow subsection card-grid structure and closing tags.
2. Add one new `<div class="card ">` entry to the Workflow card-grid (matching the existing `<h3>`/`<p>` card pattern), e.g.:
   - Title: "Todo Tools Are Opt-In on Newer Models"
   - Body: explain that TaskCreate/TaskUpdate/TaskList/TodoWrite are no longer available by default on Opus 4.8, Sonnet 5, Fable 5, Mythos 5+, and that `CLAUDE_CODE_ENABLE_TODO_TOOLS=1` restores them (v2.1.233).
3. Do not alter the existing four Workflow cards or any other subsection.

## Acceptance Criteria
- [ ] New card added to the `#best-practices` Workflow subsection card-grid documenting the todo-tools default-off change and the `CLAUDE_CODE_ENABLE_TODO_TOOLS=1` opt-in.
- [ ] Card follows the existing `<div class="card "><h3>...</h3><p>...</p></div>` pattern exactly.
- [ ] Version tag `(v2.1.233)` included somewhere in the card body, consistent with other versioned callouts elsewhere in the file.
- [ ] Existing Workflow cards unchanged; HTML remains well-formed.
