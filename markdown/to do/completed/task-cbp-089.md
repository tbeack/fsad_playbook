# CBP-089 — Replace embedded skill file blocks with git install command

## Summary
The "Install the Skill" subsection currently embeds the entire `sec-review-team` directory as 20+ nested collapsibles of raw markdown (~1,700 lines of HTML). This is hard to maintain — every skill update requires manually re-pasting file contents into the playbook. The task strips those embedded file collapsibles and replaces the directory structure block with a `git sparse-checkout` command pointing at the canonical source in the FSAD Playbook repo.

## Assessment
`<section id="security-review">` spans lines 4245–7208 of `fsad-playbook.html`. The "Install the Skill" subsection begins at line 5440:
- **Line 5440** — `<h3>Install the Skill</h3>` heading
- **Line 5441** — intro paragraph ("The full skill is embedded below…")
- **Lines 5443–5471** — "Directory structure" heading + code block (the file tree)
- **Lines 5473–7207** — the embedded file collapsibles to remove:
  - `sec-install--skill-md` (SKILL.md content, ~374 lines)
  - `sec-install--stack-signals` (stack-signals.md content)
  - `sec-install--specialists` (parent + 13 nested specialist file collapsibles)
  - `sec-install--docs` (parent + 3 nested docs file collapsibles)
  - `sec-install--schemas` (parent + 2 nested schema file collapsibles)

**Location:** `fsad-playbook.html` — lines 5440–7207

## Plan

1. **Replace the intro paragraph (line 5441)** — update the text from "The full skill is embedded below. Drop the directory under…" to something like "Install directly from the FSAD Playbook repo using a git sparse-checkout. Drop the resulting directory under…"

2. **Replace the "Directory structure" heading + code block (lines 5443–5471)** with a "Install via git" heading and a `<div class="code-block">` containing a `language-bash` fenced block with the sparse-checkout command:

```bash
# Install sec-review-team from the FSAD Playbook repo
git clone --depth=1 --filter=blob:none --sparse \
  https://github.com/tbeack/fsad_playbook.git /tmp/fsad-playbook
cd /tmp/fsad-playbook
git sparse-checkout set .claude/skills/sec-review-team

# Copy to your project (team-wide):
cp -r .claude/skills/sec-review-team /path/to/project/.claude/skills/
# or globally (personal use):
cp -r .claude/skills/sec-review-team ~/.claude/skills/

rm -rf /tmp/fsad-playbook
```

3. **Remove all embedded file collapsibles (lines 5473–7207)** — delete from `<div class="collapsible" id="sec-install--skill-md"` through the final closing `</div>` before `</section>` at line 7208. The `</section>` tag itself stays.

4. **Bump version v38 → v39** in:
   - `fsad-playbook.html` `<title>` tag (line 6)
   - `fsad-playbook.html` sidebar brand link (currently `· v38`)
   - `README.md` version table
   - `CHANGELOG.md` (new entry at top)
   - in-app changelog modal (new `<section>` block at top of `.changelog-body`)

All criteria verified 2026-04-30 before commit.

## Acceptance Criteria
- [x] The "Install the Skill" subsection shows a git sparse-checkout code block instead of embedded file contents
- [x] The 20+ embedded file collapsibles (`sec-install--skill-md`, `sec-install--stack-signals`, `sec-install--specialists`, `sec-install--docs`, `sec-install--schemas` and all their children) are gone from the HTML
- [x] The `</section>` closing tag for `#security-review` is intact and the section renders without broken HTML
- [x] The Specialist Definitions collapsibles above are untouched (13 `sec-spec--` IDs confirmed present)
- [x] Version bumped to v39 in `<title>`, sidebar badge, README, CHANGELOG, and in-app modal
