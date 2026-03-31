# Claude Code Review — Practical Step-by-Step Guide

## What It Is

Claude Code Review is a **multi-agent service** that automatically reviews GitHub pull requests. A fleet of specialized agents examines your diff in parallel — each looking for different classes of issues (logic errors, security vulnerabilities, edge cases, regressions). Results are verified to filter false positives, then posted as inline comments on your PR.

**Key stats from Anthropic's internal usage:**
- Large PRs (1,000+ lines): 84% receive findings, averaging 7.5 issues
- Small PRs (<50 lines): 31% receive findings, averaging 0.5 issues
- False positive rate: less than 1%

---

## Prerequisites

- **Claude Team or Enterprise subscription** (not available on Free or Pro plans)
- **GitHub organization admin access** (to install the GitHub App)
- **Claude organization admin access** (to enable the feature)
- Not available for organizations with Zero Data Retention enabled

---

## Step 1: Enable Code Review in Claude Admin

1. Go to **claude.ai/admin-settings/claude-code**
2. Find the **Code Review** section
3. Click **Setup** to start the GitHub App installation flow

## Step 2: Install the Claude GitHub App

1. You'll be redirected to GitHub to install the **Claude GitHub App**
2. Choose your GitHub organization
3. Grant the required permissions:
   - **Contents** — read/write
   - **Issues** — read/write
   - **Pull Requests** — read/write
4. Select which repositories to enable (start with 1-2 repos to test)

## Step 3: Choose Your Review Trigger

For each repository, pick one of two modes:

| Mode | When It Runs | Best For |
|------|-------------|----------|
| **After PR creation only** | Once when a PR is opened or marked ready for review | Starting out, cost control |
| **After every push** | On every push to PR branch; auto-resolves threads when issues are fixed | Active repos needing continuous coverage |

**Recommendation:** Start with "PR creation only" and upgrade later.

## Step 4: Create a REVIEW.md File

Place a `REVIEW.md` at your repository root. This file is **read exclusively during code reviews** (unlike `CLAUDE.md` which applies to all Claude Code interactions).

```markdown
# Code Review Guidelines

## Always check
- New API endpoints have corresponding integration tests
- Database migrations are backward-compatible
- Error messages don't leak internal details to users
- No hardcoded secrets or credentials

## Style preferences
- Prefer early returns over nested conditionals
- Use structured logging, not f-string interpolation in log calls
- Prefer `match` statements over chained `isinstance` checks

## Skip
- Generated files under `src/gen/`
- Formatting-only changes in `*.lock` files
- Auto-generated migration files
```

**Tip:** Keep `REVIEW.md` focused on review-specific rules. Use `CLAUDE.md` for general project conventions — violations there will still be flagged, but as nit-level findings.

## Step 5: Open a Pull Request

Once setup is complete, reviews run **automatically** — no per-PR trigger needed.

1. Create or update a pull request
2. A check run named **Claude Code Review** appears on the PR
3. Wait ~20 minutes for the multi-agent review to complete
4. Review results appear as **inline comments** on specific lines

## Step 6: Interpret the Findings

Each finding is tagged with a severity marker:

| Marker | Meaning | Action |
|--------|---------|--------|
| Red circle | **Bug** — fix before merge | Address immediately |
| Yellow circle | **Nit** — minor issue or style suggestion | Address at your discretion |
| Purple circle | **Pre-existing** — bug not introduced by this PR | Track for future cleanup |

Each comment includes a **collapsible extended reasoning section** explaining the agent's analysis.

**Important:** Claude Code Review **does not approve or block** PRs. Your existing review workflows stay intact.

## Step 7: Monitor Spend and Usage

- Reviews average **$15–25 per review** depending on PR size and codebase complexity
- "After every push" mode multiplies cost by number of pushes
- Set a **monthly spend cap** at `claude.ai/admin-settings/usage`
- View analytics at `claude.ai/analytics/code-review` (daily PR counts, weekly spend, per-repo breakdowns)

---

## How the Multi-Agent Architecture Works

Under the hood, Claude Code Review operates in three stages:

```
┌──────────────────────────────────────────────────┐
│  Stage 1: Parallel Bug Detection                 │
│                                                  │
│  Agent A: Logic errors       ─┐                  │
│  Agent B: Security vulns      │                  │
│  Agent C: Edge cases          ├─► Candidate      │
│  Agent D: Regressions         │   Findings       │
│  Agent E: Type safety        ─┘                  │
│                                                  │
├──────────────────────────────────────────────────┤
│  Stage 2: Verification                           │
│                                                  │
│  Each candidate is checked against actual code   │
│  behavior to filter out false positives          │
│                                                  │
├──────────────────────────────────────────────────┤
│  Stage 3: Ranking & Deduplication                │
│                                                  │
│  Results consolidated, ranked by severity,       │
│  posted as inline PR comments                    │
│                                                  │
└──────────────────────────────────────────────────┘
```

---

## Alternative: Self-Hosted Code Review via GitHub Actions

If you want code review in your own infrastructure (or on a Pro plan), use the **claude-code-action** on GitHub Marketplace:

1. In Claude Code CLI, run `/install-github-app`
2. Or manually set up the GitHub Action:

```yaml
# .github/workflows/claude-review.yml
name: Claude Code Review
on:
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
          review_mode: true
```

---

## Alternative: Local Code Review with Custom Subagents

You can also create a **custom code review subagent** that runs locally before pushing:

1. Create a file at `.claude/agents/code-reviewer.md`:

```markdown
---
name: code-reviewer
description: Reviews code for bugs, logic errors, and security issues
tools:
  - Read
  - Grep
  - Glob
  - Bash
---

Review the current git diff for:
- Logic errors and potential bugs
- Security vulnerabilities (injection, auth bypass, data exposure)
- Missing error handling at system boundaries
- Regressions against existing tests

Only report findings you are confident about.
Use a structured format: file, line, severity, description.
```

2. Run it from Claude Code:

```
> Use the code-reviewer agent to review my staged changes
```

---

## Best Practices

### When to use it
- Large PRs or AI-assisted code changes
- Cross-cutting refactors spanning many files
- PRs from newer team members
- Codebases with complex architectural invariants

### When it's less useful
- Tiny diffs with only formatting changes
- When you need instant gating (reviews take ~20 minutes)
- Replacing human review entirely — it's designed to **complement**, not replace

### Tips for better results
1. **Write a good REVIEW.md** — the more specific your rules, the more targeted the findings
2. **Use CLAUDE.md for conventions** — architectural patterns, naming conventions, and testing requirements
3. **Start with one repo** — evaluate quality before rolling out broadly
4. **Review the analytics** — track false positive rates and adjust REVIEW.md accordingly
5. **Combine with human review** — use Claude for the first pass, humans for architectural and design decisions
