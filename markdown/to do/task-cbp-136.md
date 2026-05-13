# CBP-136 — Change the versioning scheme from vNN to vNN.N.N

## Source
Own idea.

## Summary
The playbook currently uses a simple integer version scheme (v57, v58…). Transitioning to a three-part semantic scheme (v2.57.0) communicates major generation, cumulative release number, and patch level — making it easier to reason about the scope of a release and align with conventional versioning expectations. The major version (2) marks the current generation of the playbook; the current integer (57) becomes the minor component; patch starts at 0.

## Assessment
The current version scheme is `integer` (v57). Version strings appear in three places:

- **`fsad-playbook.html`** — `<title>` tag (e.g. `FSAD Playbook v57`) and any in-page version references
- **`README.md`** — version table rows (e.g. `| v57 | … |`)
- **`CHANGELOG.md`** — release headers (e.g. `## v57`)
- **`~/.claude/commands/tb/projects.yaml`** — `version_scheme: integer` and the `notes` block describe the old scheme

**Location:** `fsad-playbook.html` — `<title>` tag and version badge near top of page; `README.md` — version history table; `projects.yaml` — `fsad_playbook` entry.

## Plan

1. Decide the canonical starting version: **v2.57.0** (major = 2, minor = 57, patch = 0).
2. Update `fsad-playbook.html`:
   - Replace the `<title>` tag version string from `v57` → `v2.57.0`.
   - Search for any other hardcoded version references in the file (version badge, footer, JS constants) and update them all.
3. Update `README.md`:
   - Update the current-version line / badge to `v2.57.0`.
   - Update the most-recent row in the version history table to reflect the new format.
   - Add a brief note in the version history explaining the scheme change.
4. Update `CHANGELOG.md`:
   - Rename the most-recent release header from `## v57` → `## v2.57.0`.
   - Add a note that the scheme changed from integer to semver-style.
5. Update `~/.claude/commands/tb/projects.yaml` (`fsad_playbook` entry):
   - Change `version_scheme: integer` → `version_scheme: semver`.
   - Update the `notes` block: replace "Version is integer (v36, v37…) — bump by 1 each release" with "Version is semver (v2.57.0…) — bump minor for content releases, patch for fixes, major for generational redesigns."

## Acceptance Criteria
- [ ] `<title>` tag in `fsad-playbook.html` reads `v2.57.0` (no other `v57` references remain)
- [ ] `README.md` version badge / table reflects `v2.57.0`
- [ ] `CHANGELOG.md` most-recent header reads `## v2.57.0`
- [ ] `projects.yaml` `fsad_playbook` entry uses `version_scheme: semver` and updated notes
- [ ] `tb:ship-it` / `cbp-update` agent correctly applies the new scheme on the next release
