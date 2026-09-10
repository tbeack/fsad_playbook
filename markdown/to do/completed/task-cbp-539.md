# CBP-539: Add an "Inline Async Questions" Power Usage collapsible

## Source
Codex CLI rust-v0.154.0 release notes: "Answer questions inline while Codex continues working, using suggested choices or custom text without losing your main draft." (#42891, #42894, #42897)

## Summary
Codex 0.154.0 adds asynchronous inline questions: while Codex keeps working in the background, it can surface a question with suggested-choice or free-text answers, and answering it does not discard whatever reply draft you were already composing. This is a new interaction pattern with no existing playbook coverage.

## Assessment
Grep across `src/pages/codex.html` for "async" and "question" turns up only the unrelated "Async MCP-tool" `timeout` note (~line 819, about MCP tool call timeouts, not TUI Q&A). This is a distinct, undocumented TUI interaction feature — **new-section**.

## Plan
1. Open `src/pages/codex.html`, locate `#codex-power-usage` and the "Worktree Sessions" collapsible added by CBP-538 (execute CBP-538 first if sequencing matters, but the two edits are independent — this collapsible can also be inserted directly after "Conversation Forking" / before "Vim Editing Mode" if CBP-538 hasn't landed yet; if it has, insert after "Worktree Sessions" instead).
2. Insert a new collapsible using the existing markup pattern:
   ```html
   <!-- Inline Async Questions -->
   <div class="collapsible">
     <div class="collapsible-header">
       <h3>Inline Async Questions</h3>
       <span class="collapsible-chevron">&#9660;</span>
     </div>
     <div class="collapsible-body"><div class="collapsible-content">
       <p>As of rust-v0.154.0, Codex can ask a clarifying question <strong>while it keeps working in the background</strong> instead of blocking on your answer. Questions offer suggested-choice buttons or free-text input, and answering one does not discard whatever reply you were already typing in the main composer — your draft is preserved alongside the question.</p>
       <p style="margin-top:0.75rem; font-size:0.88rem; color:var(--text-secondary);">Useful for long-running tasks: you can keep steering the current turn in your draft while resolving a side question Codex raised, rather than losing your train of thought.</p>
     </div></div>
   </div>
   ```
3. Confirm placement does not break the section's existing heading order or duplicate an `id`.

## Acceptance Criteria
- [ ] A new "Inline Async Questions" collapsible exists in `#codex-power-usage`.
- [ ] It cites `rust-v0.154.0` and explains the background-question / preserved-draft behavior.
- [ ] Collapsible markup/classes match existing collapsibles exactly.
- [ ] `python3 scripts/build-source.py` completes without error after the edit.
