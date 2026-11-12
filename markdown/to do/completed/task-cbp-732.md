# CBP-732: Document PreCompact hook output limit of 10,000 characters (v2.1.314)

## Summary
Claude Code v2.1.314 fixed a bug where a PreCompact hook with very large output could make compaction fail or repeat. The fix caps each hook's output at 10,000 characters.

## Assessment
The playbook documents PreCompact hooks at `src/pages/practices.html` around line 3149, under the "PreCompact blocking" heading. There is no mention of an output size limit. Authors who write verbose PreCompact hooks need to know that output past 10,000 characters is cut.

## Plan
1. Open `src/pages/practices.html`.
2. Find the "PreCompact blocking" paragraph at line 3149.
3. After the closing `</div>` of the PreCompact blocking table (line 3158), insert a new note paragraph:
   ```html
   <p style="font-size:0.85rem; color:var(--text-secondary); margin-top:0.75rem;"><strong>Output limit</strong> — A PreCompact hook's stdout is cut at 10,000 characters. Output past that limit is dropped. Keep hook output concise to avoid silent truncation (v2.1.314).</p>
   ```

## Acceptance Criteria
- Searching `10,000` or `PreCompact` in the built playbook returns the new note.
- The note appears directly below the PreCompact blocking table.
- HTML is valid.
