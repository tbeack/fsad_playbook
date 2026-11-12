# CBP-715: Note nested CLAUDE.md size limit fix (v2.1.309)

## Summary
Claude Code v2.1.309 fixed sessions compacting repeatedly after reading files under a very large nested CLAUDE.md; a nested CLAUDE.md over the size limit now loads only its start instead of triggering repeat compaction. "Pillar 5: Local CLAUDE.md for Risky Modules" tells readers to place small CLAUDE.md files near sharp edges but gives no reason tied to a concrete failure mode — this fix is a good, concrete reason to keep them small, worth a short callout.

## Assessment
`src/pages/practices.html` lines 384-401 ("Pillar 5: Local CLAUDE.md for Risky Modules") currently has no mention of a size limit or compaction consequence for oversized nested CLAUDE.md files.

## Plan
1. Open `src/pages/practices.html`.
2. After the existing "Good candidates: ..." line in Pillar 5, add one sentence noting that an oversized nested CLAUDE.md used to cause repeated compaction, and that as of v2.1.309 Claude Code loads only the start of a nested CLAUDE.md over the size limit — keep these files small and focused.

## Acceptance Criteria
- Pillar 5 section mentions the size-limit behavior and its benefit (no repeat compaction).
- Version-tagged `(v2.1.309)`.
- Existing code example and candidate-directories line are preserved.
