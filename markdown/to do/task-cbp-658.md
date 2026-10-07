# CBP-658 — Re-sync the `fsad-harness:` skill library from tb_skills, keeping fsad-only changes

## Source

User request, 2026-10-05, from tb_skills TBS-112 plan step 5 ("Tell fsad_playbook to sync its `skills/` copies"). The user chose a full re-sync over a quote-only fix.

## Summary

CBP-182 (v2.70.0) copied the tb_skills task skills into `skills/` and renamed `tb:` to `fsad-harness:`. The copies have not changed since 2026-08-31, and tb_skills has moved on (TBS-112 frontmatter fix, refuter gates, `.acs.json` status files, Audit D). Bring each fork up to the tb_skills version, keep the `fsad-harness:` names and the fsad-only content, and drop tb-only machinery that has no place in a shared plugin.

## Assessment

17 folders under `skills/` have a tb_skills source. `.claude/skills/<name>` is a symlink to `../../skills/<name>`, and the plugin `fsad-harness` (`.claude-plugin/plugin.json`) ships the same folders.

Drift after the `tb:` → `fsad-harness:` rename (lines that differ / lines only in the fsad copy), measured 2026-10-05:

| Skill | Residual | fsad-only |
|---|---|---|
| do-task | 194 | 22 |
| ac | 151 | 17 |
| prd | 115 | 102 |
| add-task | 111 | 35 |
| ship-it | 107 | 18 |
| init | 83 | 38 |
| sec-review-team | 41 | 19 |
| plan | 38 | 21 |
| next | 37 | 13 |
| code-review-team | 19 | 8 |
| sync | 18 | 9 |
| set-context | 11 | 6 |
| plan-review, spec-review | 2 each | 1 each (the `argument-hint` line) |
| estimate, prompt-improver, ship | 0 | 0 |

`skills/playbook-assistant/` and `skills/sec-review-fixes/` are fsad-only and have no tb_skills source.

**fsad-only content to keep:**
- Every `tb:` name reads `fsad-harness:` (headings, slash commands, cross-skill calls such as `fsad-harness:set-context`).
- Config path `~/.claude/commands/fsd/projects.yaml` in place of `~/.claude/commands/tb/add-task-projects.yaml` and `.../tb/projects.yaml`. Note: `~/.claude/commands/fsd/` does not exist on this machine, so the forks cannot find a config today. Step 2 decides this.
- Generic wording ("your local projects", no personal name or home path).
- `prd`: the embedded Analyst and PM role briefs (tb_skills keeps them in a separate `roles/` folder).
- `init`: the `fsad_playbook` → `FPL` prefix example.
- `ship-it`: its `allowed-tools` line.

**tb-only content to leave out or make generic:**
- `.pmon-session-task` badge writes (6 places) — p_mon is a personal monitor.
- `/tmp/tb-session-summary-*.txt` (do-task 5h.5) — a personal Stop hook.
- "Theo's" and `/Users/theobeack` paths.
- `tb:browser-verify` and `tb:log` calls — those skills are not in the plugin. Keep the step and drop the call, or mark it optional.
- `.acs.json` status files — keep. They are plain files in the project and do not need a mod.

**Frontmatter:** 13 files fail `check-frontmatter.sh` today. 12 have an unquoted backtick-leading `argument-hint` (tb_skills TBS-112). `sec-review-fixes` has an unquoted `: ` in `description` at column 426.

**Location:** `skills/*/SKILL.md` and supporting files; `README.md` "Skills" section; `.claude-plugin/plugin.json` `version`.

## Plan

1. Copy `tb_skills/scripts/check-frontmatter.sh` to `scripts/check-frontmatter.sh` and run it. Record the 13 `BAD:` lines as the baseline.
2. Decide the config path: keep `~/.claude/commands/fsd/projects.yaml` (and create it from `skills/add-task/add-task-projects.yaml`), or move to a path inside the plugin. Record the choice here before step 3.
3. Write `scripts/resync-skills.sh <tb_skills path>`. For each of the 15 shared skills, it copies `SKILL.md` and supporting files, then applies the fixed rewrites: `tb:` → `fsad-harness:`, the two tb config paths → the step 2 path, "Theo's " → "your ", `/Users/theobeack` → `~`. It prints a diff per file and never writes outside `skills/`.
4. Run the script. Then edit by hand, one skill at a time, from the largest drift down:
   - Remove the `.pmon-session-task` and `tb-session-summary` steps.
   - Make the `tb:browser-verify` and `tb:log` calls optional or remove them.
   - Restore each fsad-only item from the Assessment list.
5. Fix `sec-review-fixes/SKILL.md`: quote its `description`.
6. Run `scripts/check-frontmatter.sh` until it prints nothing.
7. Bump `.claude-plugin/plugin.json` `version` (0.1.0 → 0.2.0), update the README "Skills" table for any changed behaviour, and add a CHANGELOG entry.
8. Reinstall the plugin locally and test one skill end to end.

## Acceptance Criteria
- [ ] `scripts/check-frontmatter.sh` exits 0 for `skills/*/SKILL.md`.
- [ ] `grep -rn 'tb:' skills/*/SKILL.md` finds no `tb:` skill name. Each match, if any, is not a skill reference (for example `ftb:`), and the task file lists it.
- [ ] `grep -rnE '\.pmon-session-task|tb-session-summary|/Users/theobeack|Theo'"'"'s' skills/` finds nothing.
- [ ] Each of the 15 shared skills, put through the step 3 rewrites in reverse, differs from its tb_skills source only in lines this task file lists as fsad-only or tb-only.
- [ ] `skills/prd/SKILL.md` still holds the Analyst and PM role briefs, and `skills/init/SKILL.md` still holds the `FPL` example.
- [ ] `.claude-plugin/plugin.json` `version`, the README, and CHANGELOG all show the new plugin version.
- [ ] After a local plugin reinstall, a new session lists `fsad-harness:do-task` with its real `description`, and `/fsad-harness:next` reads the config from the step 2 path without an error.
