# CBP-293 — Update `/doctor` row to add CLAUDE.md trimming check (v2.1.206)

## Summary
Claude Code v2.1.206 added a new `/doctor` check that proposes trimming checked-in CLAUDE.md files by cutting content Claude could already derive from the codebase. This expands `/doctor`'s diagnostic repertoire beyond environment issues.

## Assessment
The `/doctor` Cheat Sheet row is at line 9938 of `fsad-playbook.html`:
```
<tr><td><code>/doctor</code></td><td>Full setup checkup — diagnoses <em>and fixes</em> environment issues. Shows an exec-form example hint when a command hook is missing the <code>command</code> field; lists installed skills and components. Alias: <code>/checkup</code> (v2.1.205).</td></tr>
```
The new CLAUDE.md trimming check is a meaningful new capability: it proactively suggests reducing CLAUDE.md bloat. This is directly relevant to teams authoring CLAUDE.md files. **Update existing** — append the new check description.

## Plan
1. Read line 9938 in `fsad-playbook.html`
2. Append the CLAUDE.md trimming check to the existing description, before the closing `</td></tr>`

**New text to append (before closing `</td></tr>`):**
```
 Also checks for CLAUDE.md content that Claude could derive from the codebase and proposes trimming it (v2.1.206).
```

## Acceptance Criteria
- [ ] `/doctor` row now mentions the CLAUDE.md trim check with v2.1.206 attribution
- [ ] Existing description (exec-form hint, skills listing, `/checkup` alias) is preserved
