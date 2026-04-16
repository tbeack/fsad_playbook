# CBP-038 — Showcase `cbp-add-task` as an Example Skill (with playground artifact)

## Source
Own idea — arose while building `cbp-add-task-playground.html` as a visual walkthrough of the skill.

## Summary
Add a new entry under **Best Practices → Building Skills → Example Skills** that showcases this project's own `cbp-add-task` skill as a worked example of a project-specific, workflow-encoding skill. Use the interactive `cbp-add-task-playground.html` artifact as the visual example so readers can see the skill's 6-step workflow, inputs, and generated artifacts side-by-side before trying it themselves.

## Assessment
- **Existing coverage:** `fsad-playbook.html:4011` opens the "Example Skills" section with collapsibles for Documentation Skill, Code Review Skill, etc. No entry yet features a *project-specific* skill that produces planning artifacts, and none link to an interactive artifact.
- **Artifact exists:** `cbp-add-task-playground.html` (repo root) already visualizes the skill's 6 workflow steps, lets users fill sample inputs, and live-previews the generated `todo.md` line + `task-cbp-NNN.md` file.
- **Skill definition:** `.claude/skills/cbp-add-task/SKILL.md` is the canonical source for the frontmatter and process steps shown in the example.

**Location:** `fsad-playbook.html` — Best Practices › Building Skills › Example Skills (insert new collapsible at ~line 4013, as the first or last Example Skills entry).

## Plan

1. Read existing Example Skills collapsibles (`fsad-playbook.html:4011–4213`) to match markup, heading size, and code-block styling.
2. Add a new `<div class="collapsible">` entry titled **"CBP Add Task Skill (project-specific)"** with:
   - One-line description: helps contributors add a new numbered task to the FSAD Playbook's tracker.
   - Copy of the SKILL.md frontmatter (name, description, argument-hint).
   - Condensed 6-step process summary (mirror SKILL.md headings, one line each).
   - A short "Why this is a good example" note: encodes tribal knowledge (numbering convention, file template, one-question-at-a-time interview) so any contributor gets identical output.
3. Embed the playground artifact as the visual example:
   - Add a small card/link block under the step list pointing to `cbp-add-task-playground.html` with a thumbnail-style description.
   - Decide host mechanism — either (a) relative link opens the standalone file, or (b) inline `<iframe src="cbp-add-task-playground.html">` sized ~600px tall inside the collapsible body. Prefer (a) to keep the single-file playbook self-contained; mention (b) as a future enhancement.
4. Register the new subsection ID (e.g., `example-skill-cbp-add-task`) in the scroll-spy map if needed, and verify sidebar deep-linking.
5. Verify in browser: collapsible opens/closes, code blocks highlight, link to playground works, no regressions in adjacent Example Skills entries, dark + light themes.

## Acceptance Criteria
- [ ] New "CBP Add Task Skill" collapsible appears under Example Skills, styled identically to existing entries.
- [ ] Frontmatter + 6-step process summary accurately mirror `.claude/skills/cbp-add-task/SKILL.md`.
- [ ] A clearly labelled link (or embed) to `cbp-add-task-playground.html` appears inside the collapsible, framed as "Interactive example".
- [ ] "Why this is a good example" note explains the tribal-knowledge-encoding value.
- [ ] No regressions in other Example Skills collapsibles; scroll spy + sidebar still work.
- [ ] Renders correctly in both dark and light themes.
