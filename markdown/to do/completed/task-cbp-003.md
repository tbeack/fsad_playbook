# Task CBP-003: Add Skill Creator Step-by-Step Guide

**Status:** Complete
**File:** `fsad-playbook - v7.html`
**Section:** Building Skills (`id="building-skills"`)

## Objective

Add a step-by-step guide showing engineers how to use Claude's built-in skill creator (`/skill-creator`) to generate custom skills interactively, rather than writing them from scratch.

## Plan

### Step 1 — Insert point
- **After:** The "Example Skills" collapsibles (Code Review Skill is the last one, ends ~line 2673)
- **Before:** The "Best Practice" callout at ~line 2675
- This positions the skill creator guide as a natural follow-up: "here are examples, and here's how to create your own"

### Step 2 — Add a new subsection heading + step cards
Add a heading "Creating Skills with the Skill Creator" followed by step cards matching the existing `step-card` pattern used in Getting Started.

**Steps to document:**
1. **Run the skill creator** — `/skill-creator` in Claude Code
2. **Describe what you want** — Tell Claude what workflow to encode (e.g., "a deployment checklist for our staging environment")
3. **Iterate on the draft** — Claude generates a skill file; review and refine through conversation
4. **Save and test** — Skill is saved to `.claude/skills/`; invoke it with `/skill-name`
5. **Share with team** — Commit to repo for project-level, or keep in `~/.claude/skills/` for personal use

### Step 3 — Add a callout tip
Include a tip about using existing tribal knowledge (runbooks, checklists, wiki pages) as input to the skill creator for best results.

### Step 4 — Verify
- Open `fsad-playbook - v7.html` in browser
- Navigate to Best Practices → Building Skills
- Confirm step cards render correctly with step numbers
- Confirm layout matches existing step cards in Getting Started
- Confirm no regressions in surrounding collapsibles

## Acceptance Criteria
- [x] "Creating Skills with the Skill Creator" subsection appears after Example Skills
- [x] 5 step cards with numbered steps matching existing step-card styling
- [x] Tip callout about using existing documentation as input
- [x] No regressions in surrounding sections
