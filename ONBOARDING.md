# Welcome to FSAD Playbook

## How We Use Claude

Based on Theo Beack's usage over the last 30 days across 40 sessions:

Work Type Breakdown:
```
  Build Feature    ████████████░░░░░░░░  63%
  Plan / Design    ██░░░░░░░░░░░░░░░░░░  12%
  Debug / Fix      ██░░░░░░░░░░░░░░░░░░  10%
  Improve Quality  █░░░░░░░░░░░░░░░░░░░   8%
  Prototype        █░░░░░░░░░░░░░░░░░░░   5%
  Write Docs       ░░░░░░░░░░░░░░░░░░░░   2%
```

Top Skills & Commands:
```
  /tb:do-task      █████████████░░░░░░░  17x/month
  /tb:ship         ██████░░░░░░░░░░░░░░  10x/month
  /rename          ████░░░░░░░░░░░░░░░░   7x/month
  /exit            ███░░░░░░░░░░░░░░░░░   5x/month
  /cbp-update      ██░░░░░░░░░░░░░░░░░░   4x/month
  /tb:sync         █░░░░░░░░░░░░░░░░░░░   3x/month
  /clear           █░░░░░░░░░░░░░░░░░░░   3x/month
  /tb:timesheet    █░░░░░░░░░░░░░░░░░░░   3x/month
```

Top MCP Servers:
  _(None configured in the scanned window)_

## Your Setup Checklist

### Codebases
- [ ] fsad_playbook — https://github.com/tbeack/fsad_playbook
- [ ] fsad_sec_playbook — https://github.com/tbeack/fsad_sec_playbook
- [ ] fsad_training — https://github.com/tbeack/fsad_training
- [ ] fsd — https://github.com/tbeack/fsd
- [ ] tb_skills — https://github.com/tbeack/tb_skills
- [ ] p_mon — https://github.com/tbeack/p_mon

### MCP Servers to Activate
  _(None were active in the scanned window — check with Theo if any are in use for your project)_

### Skills to Know About
- `/tb:do-task` — picks up the next open task from `todo.md` and executes it; the primary day-to-day driver for feature work
- `/tb:ship` — wraps up finished work, cuts a version, commits, pushes, and opens a PR; run after `do-task` is done
- `/tb:sync` — pre-flight sync check: fetches from remote, reports uncommitted changes, warns if behind or diverged; run before starting work
- `/tb:add-task` — adds a new task with a CBP-### identifier to the current project's task list
- `/cbp-update` — runs the playbook-updater agent to detect and apply Claude Code CLI updates to the playbook
- `/tb:dt` — displays the current task detail file; quick way to review what you're working on mid-session
- `/tb:timesheet` — generates a monthly timesheet from calendar screenshots
- `/tb:code-review-team` — launches a multi-agent code review team against current changes
- `/clear` — clears the conversation context when it gets noisy; good habit between distinct tasks
- `/compact` — compresses context without losing thread; use in long sessions before context fills up

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
