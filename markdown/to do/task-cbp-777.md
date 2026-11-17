# CBP-777: Add `plugin.json` malformed-field warning note (v2.1.326)

## Summary
Claude Code v2.1.326 added a note in `/plugin` and `claude plugin list` when a malformed `plugin.json` field such as `author` or `homepage` is ignored.

## Assessment
`src/pages/practices.html`'s Plugins section already has a bulleted list of `plugin.json`-related warnings and behaviors (~line 2646-2650), including a "Default folder override warning" bullet (~line 2647) that is visible in the same `/doctor`, `claude plugin list`, and `/plugin` surfaces. This v2.1.326 item is a natural new bullet in that same list.

## Plan
1. Open `src/pages/practices.html`.
2. After the `engines["claude-code"]` version range bullet (~line 2648), insert a new list item:
   ```html
   <li><strong>Malformed manifest field warning (v2.1.326):</strong> <code>/plugin</code> and <code>claude plugin list</code> now note when a <code>plugin.json</code> field such as <code>author</code> or <code>homepage</code> is malformed and gets ignored, instead of silently dropping it.</li>
   ```
3. No other files require changes for this task.

## Acceptance Criteria
- The Plugins section documents the v2.1.326 malformed-field warning.
- HTML is valid (no unclosed tags).
