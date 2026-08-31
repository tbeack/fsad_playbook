# CBP-499 — Set the playbook skills up as a plugin that is titled "fsd"

## Source
Manual request (chat, 2026-08-31) — follow-up to investigating why no `fsd:`-prefixed
skills appeared in a session for this repo. Investigation found the skills currently
ship only as documentation (SKILL.md headers say `fsd:<name>` per CBP-498, and
README.md:63 claims "Install as a plugin to invoke via `/fsd:<name>`") but no actual
`.claude-plugin/plugin.json` exists anywhere in this repo — it isn't really installable.

**Naming decision:** `~/repo/fsd` is a pre-existing, unrelated, already-published plugin
literally named `fsd` (a different "Full Stack Development" meta-framework, distinct
skill set: `research`, `brainstorm`, `roadmap`, `spec`, etc.) in the `tbeack`
marketplace. To avoid colliding with it, the user chose **"FSAD Harness"** as the
display name for this repo's plugin instead of reusing `fsd`.

## Summary
Package this repo's `skills/` (19 skill dirs) and `hooks/` (2 scripts) as an actual
installable Claude Code plugin named **FSAD Harness** (manifest slug: `fsad-harness`),
so skills resolve as `/fsad-harness:<name>` once installed — replacing the aspirational,
currently-nonfunctional `fsd:` references in README.md and the SKILL.md files.

## Assessment

- `skills/` (ac, add-task, code-review-team, do-task, estimate, init, next, plan,
  plan-review, playbook-assistant, prd, prompt-improver, sec-review-fixes,
  sec-review-team, set-context, ship, ship-it, spec-review, sync) and `hooks/`
  (`context-monitor.js`, `fsd-memory-recommend.sh`) exist at repo root. No
  `.claude-plugin/` directory exists anywhere in this repo.
- `README.md:63-89` already has a "Skills (`fsd:` plugin namespace)" section claiming
  install-as-plugin behavior that isn't backed by a manifest yet — copy needs updating
  to match whatever actually ships.
- Per CBP-498's completed audit, `skills/*/SKILL.md` files already self-reference
  `fsd:<name>` in H1s/descriptions (where `tb_skills`' own convention prefixes them) —
  these need updating to `fsad-harness:<name>` for consistency with the new plugin name.
- `src/pages/skills.html` (the Skills Library catalog page) also documents skills under
  the `/fsd:<name>` form per CBP-498 — needs the same decision applied.
- Reference structure for schema/conventions: `~/repo/fsd/plugin/.claude-plugin/plugin.json`,
  `~/repo/fsd/.claude-plugin/marketplace.json`, and `~/repo/fsd/plugin/hooks/hooks.json`
  (uses `${CLAUDE_PLUGIN_ROOT}` for hook script paths; `hooks.<Event>[].matcher` +
  `.hooks[].type: "command"` shape). Do not copy its `plugin/` subdirectory split —
  this repo only ever ships one plugin, so the manifest can live at repo root directly
  alongside the existing `skills/`/`hooks/` dirs.
- Hook event bindings, per each script's own header comment:
  - `hooks/context-monitor.js` → `PostToolUse`
  - `hooks/fsd-memory-recommend.sh` → `Stop`

**Location:** repo root (new `.claude-plugin/plugin.json`, new `hooks/hooks.json`),
`README.md:63-89`, `skills/*/SKILL.md`, `src/pages/skills.html`.

## Plan

1. Create `.claude-plugin/plugin.json` at the repo root:
   - `name: "fsad-harness"` (slug — must be a valid identifier; drives the
     `/fsad-harness:<skill>` invocation prefix)
   - `description`: reflects this is the FSAD Playbook / methodology skill set
   - `version: "0.1.0"` (independent of the HTML playbook's own semver — confirm with
     user if they'd rather it track the playbook version instead)
   - `author`/`license` modeled on `~/repo/fsd/.claude-plugin/plugin.json`
2. Create `hooks/hooks.json` wiring:
   - `PostToolUse` → `node '${CLAUDE_PLUGIN_ROOT}/hooks/context-monitor.js'`
   - `Stop` → `bash '${CLAUDE_PLUGIN_ROOT}/hooks/fsd-memory-recommend.sh'`
3. Confirm with user whether a `.claude-plugin/marketplace.json` is wanted now (for
   git-based install) or if local `--plugin-dir` testing is sufficient for this pass.
4. Update `README.md`:
   - Heading `## Skills (`fsd:` plugin namespace)` → `## Skills (`fsad-harness:` plugin namespace)`
   - Line 65 wording → "Install as a plugin to invoke via `/fsad-harness:<name>`"
   - Every in-table `fsd:<skill>` cross-reference (e.g. `fsd:ship-it`, `fsd:do-task`) →
     `fsad-harness:<skill>`
   - Line 89's suggested config path (`~/.claude/commands/fsd/projects.yaml`) — this is
     a user-chosen local config path, independent of the plugin's technical `name`;
     default to leaving it as-is unless the user wants it renamed for consistency.
5. Sweep `skills/*/SKILL.md` for self-referencing `fsd:` (H1s/descriptions per CBP-498's
   audit) and update the prefixed ones to `fsad-harness:`. Leave intentionally-unprefixed
   skills (`estimate`, `init`, `code-review-team`, `sec-review-team`, `prompt-improver`,
   `sec-review-fixes`) alone, matching CBP-498's established parity rule.
6. Update `src/pages/skills.html` the same way if it documents the `/fsd:<name>`
   invocation form. If touched, this is a `src/` change — re-run
   `python3 scripts/build-source.py` then `python3 scripts/build-dist.py` per this
   repo's build+commit requirement, and confirm the dist build logs
   "Injected PLAYBOOK_EMBEDDINGS".
7. Validate the manifest (`claude plugin validate .` if available; otherwise manually
   diff schema fields against `~/repo/fsd/.claude-plugin/plugin.json`).
8. Local install test via `--plugin-dir` (or the project's own registered marketplace,
   if step 3 adds one) — actually invoke `/fsad-harness:ac` (or another skill) and
   confirm it resolves, rather than only inspecting files.
9. Confirm with user whether this warrants a CHANGELOG.md entry (likely yes — it
   changes install/usage for anyone consuming this repo as a plugin) and a version bump
   per the `version-bump` skill's checklist.

## Acceptance Criteria

All criteria verified 2026-08-31 before commit.

- [x] `.claude-plugin/plugin.json` exists at repo root with `name: "fsad-harness"` and
      validates against Claude Code's plugin manifest schema
- [x] `hooks/hooks.json` exists, correctly wiring `context-monitor.js` → `PostToolUse`
      and `fsd-memory-recommend.sh` → `Stop`, using `${CLAUDE_PLUGIN_ROOT}`
- [x] Installing the repo as a plugin makes `/fsad-harness:<skill>` resolve for at
      least one skill (e.g. `ac`) — verified by actually invoking it, not just
      inspecting files
- [x] README.md's Skills section heading and every in-table `fsd:` cross-reference are
      updated to `fsad-harness:`
- [x] Every `skills/*/SKILL.md` that self-referenced `fsd:` (per CBP-498's audit) now
      references `fsad-harness:` instead — `grep -rln "fsd:" skills/` triaged to zero
      unintended stray hits
- [x] No collision with the pre-existing `~/repo/fsd` plugin — confirmed the two
      plugins have distinct `name` fields and (if both published) distinct
      marketplace entries
- [x] If `src/pages/skills.html` was updated, `scripts/build-source.py` and
      `scripts/build-dist.py` were both re-run and `dist/fsad-playbook.html` is in
      sync (logs "Injected PLAYBOOK_EMBEDDINGS")
