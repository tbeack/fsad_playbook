# CBP-512 — Add Vim Mode Undo/Redo to Codex Vim Section

## Source
Codex rust-v0.153.0

## Summary
Codex rust-v0.153.0 adds undo (`u`) and redo (`Ctrl+R`) to the Vim mode TUI composer, preserving complete drafts including pasted content and attachments.

## Assessment
The Codex page (`src/pages/codex.html`) has a Vim mode section at line 1179 that lists supported Vim motions. The existing list ends with `/`/`?` search (added rust-v0.152.0). Undo/redo are not listed. This is an update to that existing paragraph.

## Plan
1. Read `src/pages/codex.html` around line 1179
2. Append undo/redo to the end of the existing motions sentence, before the period:
   - Current text ends with: `…and <code>n</code>/<code>N</code> repeat navigation (rust-v0.152.0). Vim-specific keybindings are scoped separately…`
   - Add: `, and undo (<code>u</code>) and redo (<code>Ctrl+R</code>) that preserve complete drafts including pasted content and attachments (rust-v0.153.0).`

## Acceptance Criteria
- Undo/redo mentioned in the Vim section of codex.html
- Version attribution `rust-v0.153.0` included
- Paragraph reads naturally
