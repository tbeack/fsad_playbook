# Task CBP-016 — Review & Update Building Skills Section

## Summary

Audit the "Building Skills" section (section 11, lines 3198–3464) against the current Claude Code skills system (April 2026). Fix inaccuracies, add missing features, and modernize the guidance.

---

## Current State Audit

### Skill File Anatomy (lines 3209–3232) — Issues Found

| Current | Issue | Fix |
|---|---|---|
| File path shown as `.claude/skills/skill-name.md` | Wrong — skills are now **directories** with `SKILL.md` inside | Change to `.claude/skills/skill-name/SKILL.md` |
| Frontmatter only shows `name` and `description` | Missing 12+ frontmatter fields | Add key fields: `argument-hint`, `disable-model-invocation`, `user-invocable`, `allowed-tools`, `model`, `effort`, `context`, `agent`, `hooks`, `paths` |
| No mention of string substitutions | `$ARGUMENTS`, `$0`, `$1`, `${CLAUDE_SKILL_DIR}`, `${CLAUDE_SESSION_ID}` not shown | Add to anatomy |
| No mention of shell injection | Skills can run live shell commands with `` !`command` `` syntax | Add to anatomy |

### "What are Skills?" Card (lines 3203–3206) — Issues Found

| Current | Issue |
|---|---|
| "Skills are markdown instructions stored in `.claude/skills/`" | Should mention they are **directories** containing `SKILL.md` plus optional supporting files |
| No mention of auto-invocation | Claude auto-loads skills based on description matching — key feature not explained |
| No mention of plugin skills | Plugin-bundled skills with namespace (`/plugin:skill`) not covered |

### Project-Level vs Global Cards (lines 3234–3243) — Issues Found

| Current | Issue |
|---|---|
| Path shows `skill-name.md` | Should be `skill-name/SKILL.md` (directory structure) |
| Only 2 levels shown | Missing: Plugin skills (`/plugin:skill`) and managed/enterprise skills |

### Example Skills (4 collapsibles) — Assessment

| Skill | Status |
|---|---|
| Documentation Skill | Fine — useful example, but uses flat file path |
| Story Point Estimation | Fine — good example |
| Epic to Stories | Fine — good example |
| Code Review Skill | Fine — good example |

All 4 example skills use the old flat-file format (`skill-name.md` not `skill-name/SKILL.md`). The frontmatter is minimal (only `name` and `description`). None demonstrate the powerful new fields.

### Skill Creator Section (lines 3396–3458) — Issues Found

| Current | Issue |
|---|---|
| Step 4 says "List all available skills" with `/help` | Should be `/skills` |
| No mention of `/reload-plugins` for testing changes | Useful for iterating on skills |
| No mention of skill evals or testing | The skill-creator skill supports evals and benchmarking |

---

## Gaps — Missing Features (Not Covered)

| Feature | Description | Priority |
|---|---|---|
| **Directory-based skills** | Skills are directories with `SKILL.md` + supporting files (templates, scripts, examples) | Critical |
| **Auto-invocation** | Claude auto-loads skills by matching task to description. Controlled by `disable-model-invocation` | Critical |
| **Advanced frontmatter** | 12+ fields: `argument-hint`, `disable-model-invocation`, `user-invocable`, `allowed-tools`, `model`, `effort`, `context`, `agent`, `hooks`, `paths` | High |
| **String substitutions** | `$ARGUMENTS`, `$0`, `$1`, `${CLAUDE_SKILL_DIR}`, `${CLAUDE_SESSION_ID}` | High |
| **Shell injection** | `` !`command` `` syntax for embedding live data in skills | High |
| **Skill content types** | Reference content vs. task content vs. decision/advice content — different patterns | High |
| **Plugin skills** | Plugin-bundled skills with namespace, plugin marketplace, `/plugin` command | Medium |
| **Context fork** | `context: fork` + `agent` field to run skills in isolated subagent context | Medium |
| **Tool pre-approval** | `allowed-tools` field to skip permission prompts for expected operations | Medium |
| **Skills vs commands vs agents** | Clarify the current distinction — commands are legacy, skills replaced them | Medium |
| **Extended thinking** | "ultrathink" keyword in skill content enables extended thinking | Low |
| **Compaction behavior** | Skills re-attach after compaction (top 5,000 tokens each, 25,000 combined budget) | Low |

---

## Implementation Plan

### Step 1: Update "What are Skills?" card
- Fix to mention directory-based structure (`skill-name/SKILL.md`)
- Add that Claude auto-loads skills by matching descriptions to tasks
- Mention skills can include supporting files (templates, scripts, reference docs)

### Step 2: Rewrite Skill File Anatomy
Replace the current simple example with a comprehensive anatomy showing:
- Directory structure (SKILL.md + supporting files)
- Full frontmatter with key fields (name, description, argument-hint, disable-model-invocation, user-invocable, allowed-tools, model, effort, context, agent)
- String substitutions ($ARGUMENTS, $0, ${CLAUDE_SKILL_DIR})
- Shell injection syntax

### Step 3: Update Project-Level vs Global cards
- Fix paths to directory format
- Add a third card for Plugin skills with namespace explanation
- Mention skill priority: managed > user > project > plugin

### Step 4: Add "Skill Invocation" sub-section (new)
Explain the 3 ways skills are invoked:
- Manual: `/skill-name [args]`
- Automatic: Claude matches description to task
- Programmatic: Skill tool in agents/API
- How to control with `disable-model-invocation` and `user-invocable`

### Step 5: Add "Advanced Skill Patterns" collapsible (new)
Cover:
- Context fork (`context: fork` + `agent: Explore`)
- Shell injection for dynamic data (`` !`gh pr diff` ``)
- Tool pre-approval (`allowed-tools: Bash(git *) Read Write`)
- Extended thinking ("ultrathink")
- Supporting files organization

### Step 6: Add "Skills vs Commands vs Agents" card or callout (new)
Clarify:
- Skills = reusable on-demand content (replaced legacy commands)
- Agents = isolated workers with separate context
- Skills can run in agent context with `context: fork`

### Step 7: Update example skills
- Fix file paths from `skill-name.md` to `skill-name/SKILL.md` format
- Add at least one example that demonstrates advanced frontmatter (e.g., allowed-tools, argument-hint, disable-model-invocation)

### Step 8: Update Skill Creator section
- Fix `/help` → `/skills` for listing skills
- Add mention of `/reload-plugins` for iterating
- Mention skill evals for testing quality

### Step 9: Verify in browser
Open and confirm section renders correctly, all collapsibles work, code blocks display properly.
