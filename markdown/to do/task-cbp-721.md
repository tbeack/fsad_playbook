# CBP-721: Write tool read-before-overwrite protection for large CLAUDE.md/rules files (v2.1.312)

## Summary
Claude Code v2.1.312 fixes Claude overwriting a very large CLAUDE.md, rules file, or @-included file in a subdirectory after seeing only its start; Write now asks Claude to read the whole file or edit in place instead. This directly extends the nested-CLAUDE.md-size-limit note added for CBP-715 (v2.1.309), which documents that an oversized nested CLAUDE.md loads only its start.

## Assessment
`src/pages/practices.html` line ~401, in "Pillar 5: Local CLAUDE.md for Risky Modules", already says: "a nested CLAUDE.md over the size limit loads only its start instead, but a lean, focused file avoids both the truncation and the compaction churn." It doesn't mention what happens if Claude then tries to Write to that file — v2.1.312 closes that gap.

## Plan
1. Open `src/pages/practices.html`.
2. Extend the sentence at line ~401 to note that as of v2.1.312, Write now asks Claude to read the whole file or edit in place instead of overwriting it after seeing only the truncated start.

## Acceptance Criteria
- The Pillar 5 paragraph documents the new Write safeguard.
- Version-tagged `(v2.1.312)`.
- Existing v2.1.309 sentence about truncation untouched otherwise.
