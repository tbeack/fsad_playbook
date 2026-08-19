# CBP-404 — [Codex] Session lifecycle: archive from picker, startup drafting, restored session state

## Source
Codex CLI rust-v0.148.0

## Summary
Three related session-lifecycle changes: sessions can be archived and restored directly from the TUI resume picker; prompts can be drafted while the TUI initializes, with resume/fork progress shown during startup; and resumed sessions now restore their persisted working directory and approval policy.

## Assessment
All three land on the same Session Management paragraph at line 14051 and should be applied as one coordinated edit rather than three conflicting ones.
- Archiving exists via CLI (`codex archive`/`codex unarchive`, cheat-sheet row 13858, v0.136.0) — what is new is doing it from the resume picker.
- Startup drafting: no startup-behavior content anywhere on the Codex page.
- Restored state: Session Management covers resume extensively (picker, `--last`, `exec resume`, pinning, sections) but never states what state is restored. Grep finds no "working directory" or "approval policy" restore language.

Note: the paragraph at 14051 is already a long changelog-style run-on and may warrant splitting into two paragraphs.

## Plan
1. Read the full `<p>` at line 14051.
2. Rewrite it as a single coordinated edit adding all three items in the existing `As of rust-v0.14x.0…` sentence pattern, splitting into two `<p>` blocks if length warrants.
3. Optionally extend the `/archive` cheat-sheet row at 13858 to note resume-picker access.

## Acceptance Criteria
- [ ] All three changes appear, tagged rust-v0.148.0
- [ ] Archiving is described as newly available from the resume picker, not as newly existing
- [ ] Restored state names both working directory and approval policy
- [ ] Paragraph markup remains well-formed
