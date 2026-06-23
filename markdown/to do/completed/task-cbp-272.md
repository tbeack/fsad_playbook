# CBP-272 — [Codex] Update Session Management collapsible to cover archive and delete

**Todoist ID:** 6gwXMG8CGC6hQF4p

## Source

Codex CLI releases v0.136.0 (`/archive`, `codex archive/unarchive`) and v0.140.0 (`/delete`, `codex delete`). The Session Management collapsible currently only covers resume/fork/exec workflows and makes no mention of session archiving or deletion.

## Summary

The Session Management collapsible in the Codex Power Usage section is missing archive and delete workflows introduced in v0.136.0–v0.140.0. Expand the prose and code block to cover these two complementary session lifecycle actions: archiving (reversible, protects from accidental resume) and deletion (permanent, with confirmation).

## Assessment

The Session Management collapsible is at lines 12769–12797 of `fsad-playbook.html` inside `page-codex`. Current coverage:

- `codex resume` / `codex resume --last` — resume picker and last-session shortcut
- `codex exec resume` — headless exec mode
- `codex exec --ephemeral` — throwaway session
- `codex update` — CLI update

Not covered: `codex archive`, `codex unarchive`, `/archive`, `codex delete`, `/delete`.

**Location:** `fsad-playbook.html` — lines 12769–12797

## Plan

1. Read lines 12769–12797 of `fsad-playbook.html` to confirm current content.
2. Update the prose paragraph (line 12776) to mention that sessions can also be archived or deleted — add one sentence after the existing resume/fork picker description:
   > Sessions can be archived (`/archive` or `codex archive`) to protect them from accidental resume or fork — restore with `codex unarchive`. For permanent removal, use `/delete` or `codex delete` (prompts for confirmation and cleans up subagent threads).
3. Append archive and delete commands to the code block (after `codex update`, before the closing `</code></pre>`):
   ```
   <span class="cm"># Archive a session — protected from resume/fork until unarchived</span>
   codex archive
   codex unarchive

   <span class="cm"># Permanently delete a session (prompts for confirmation)</span>
   codex delete
   ```
4. Verify the closing `</code></pre>` and `</div></div></div>` tags are intact.

## Acceptance Criteria

All criteria verified 2026-06-22 before commit.

- [x] Prose paragraph mentions archive and delete with brief explanation of the difference (reversible vs. permanent)
- [x] Code block includes `codex archive`, `codex unarchive`, and `codex delete` with comment lines
- [x] Code block comment style matches existing (`<span class="cm"># …</span>`)
- [x] Existing resume/exec/ephemeral/update entries are unchanged
- [x] HTML structure is valid — no unclosed tags
