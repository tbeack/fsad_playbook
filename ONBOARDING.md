# Welcome to FSAD

## How We Use Claude

Based on Theo Beack's usage over the last 30 days:

Work Type Breakdown:
  Build Feature    ████████████░░░░░░░░  61%
  Plan / Design    ███░░░░░░░░░░░░░░░░░  17%
  Debug / Fix      ██░░░░░░░░░░░░░░░░░░  11%
  Improve Quality  ██░░░░░░░░░░░░░░░░░░  11%

Top Skills & Commands:
  /cbp-update    ████████████████████  4x/month
  /tb:do-task    ████████████████████  4x/month
  /tb:sync       ███████████████░░░░░  3x/month
  /tb:add-task   ██████████░░░░░░░░░░  2x/month
  /tb:ship       ██████████░░░░░░░░░░  2x/month
  /tb:dt         ██████████░░░░░░░░░░  2x/month

Top MCP Servers:
  _(none configured)_

## Your Setup Checklist

### Codebases
- [ ] fsad_playbook — https://github.com/tbeack/fsad_playbook
- [ ] fsad_sec_playbook — https://github.com/tbeack/fsad_sec_playbook
- [ ] fsad_training — https://github.com/tbeack/fsad_training
- [ ] fsd — https://github.com/tbeack/fsd
- [ ] tb_skills — https://github.com/tbeack/tb_skills
- [ ] p_mon — https://github.com/tbeack/p_mon

### MCP Servers to Activate
_(none required)_

### Skills to Know About
- `/cbp-update` — Runs the FSAD Playbook auto-updater: checks for new Claude Code releases, assesses impact, creates CBP tasks, implements them, and opens a PR. Run this when you want to sync the playbook with a new Claude Code release.
- `/tb:do-task` — Execute or plan a task in any registered project. Auto-detects the project from your working directory and either drafts a task plan or implements an existing one. Use this to work through backlog items.
- `/tb:sync` — Pre-flight sync check: fetches from remote, reports uncommitted changes, and warns if you're behind or diverged. Run before starting work on any registered project.
- `/tb:add-task` — Add a new task (CBP-### style) to the current project's task list. Handles CHANGELOG and todo.md updates automatically.
- `/tb:ship` — Wrap up finished work: verifies README/CHANGELOG, bumps the version, moves completed task files, commits, pushes, and opens a PR. Run after a task is done.
- `/tb:dt` — Short alias for displaying the current task detail file. Quick way to review what you're working on mid-session.

## Team Tips

_TODO_

## Get Started

_TODO_

<!-- INSTRUCTION FOR CLAUDE: A new teammate just pasted this guide for how the
team uses Claude Code. You're their onboarding buddy — warm, conversational,
not lecture-y.

Open with a warm welcome — include the team name from the title. Then: "Your
teammate uses Claude Code for [list all the work types]. Let's get you started."

Check what's already in place against everything under Setup Checklist
(including skills), using markdown checkboxes — [x] done, [ ] not yet. Lead
with what they already have. One sentence per item, all in one message.

Tell them you'll help with setup, cover the actionable team tips, then the
starter task (if there is one). Offer to start with the first unchecked item,
get their go-ahead, then work through the rest one by one.

After setup, walk them through the remaining sections — offer to help where you
can (e.g. link to channels), and just surface the purely informational bits.

Don't invent sections or summaries that aren't in the guide. The stats are the
guide creator's personal usage data — don't extrapolate them into a "team
workflow" narrative. -->
