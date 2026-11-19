# CBP-786: Update `/code-review` row — scope narrowed to bugs/CLAUDE.md, severity labels, suggested fix (v2.1.328)

## Summary
Claude Code v2.1.328 changed `/code-review` on most models to report only bugs and CLAUDE.md violations — reuse, simplification, and efficiency cleanups are now exclusive to `/simplify`. It also changed `/code-review` to mark each finding `Important`, `Pre-existing`, or `Nit` on most models, and to end each summary with a suggested fix; a clean review's list now reads "Code review found no issues."

## Assessment
`src/pages/practices.html`'s cheat-sheet `/code-review` row (~line 1918) documents `--fix` as applying "findings (reuse, simplification, efficiency)" — this is now inaccurate for most models, since those cleanup categories moved exclusively to `/simplify`. The row needs both a correction to the `--fix` description and a new version-tagged sentence for the severity-label/suggested-fix/clean-review-message behavior.

## Plan
1. Open `src/pages/practices.html`.
2. In the `/code-review` row (~line 1918), replace:
   ```
   Pass <code>--fix</code> to automatically apply findings (reuse, simplification, efficiency) to your working tree after review. <code>/simplify</code> runs a cleanup-only review (reuse, simplification, efficiency, altitude) and applies the fixes directly — a lighter alternative to <code>--fix</code>.
   ```
   with:
   ```
   Pass <code>--fix</code> to automatically apply findings to your working tree after review. As of v2.1.328, on most models <code>/code-review</code> reports only bugs and CLAUDE.md violations — reuse, simplification, and efficiency cleanups are exclusive to <code>/simplify</code>, which runs a cleanup-only review (reuse, simplification, efficiency, altitude) and applies the fixes directly.
   ```
3. At the end of the same row, before the closing `</td></tr>`, append:
   ```
    As of v2.1.328, on most models each finding is marked <code>Important</code>, <code>Pre-existing</code>, or <code>Nit</code>, and every summary ends with a suggested fix; a clean review's list now reads "Code review found no issues."
   ```
4. No other files require changes for this task.

## Acceptance Criteria
- The `/code-review` row no longer claims `--fix` applies reuse/simplification/efficiency findings on most models.
- The row documents the new severity labels, end-of-summary suggested fix, and clean-review message (v2.1.328).
- HTML is valid (no unclosed tags).
