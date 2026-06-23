# CBP-265 — Add Codex release checking to playbook-updater agent

## Summary

The playbook-updater agent currently only monitors Claude Code CLI releases. The `state.json` already has `lastCodexVersion` and `lastCodexChecked` fields (last set to `rust-v0.132.0` on 2026-05-20), but the agent never reads or updates them — no Codex check has fired in over a month. Codex is currently on `rust-v0.142.0` (released 2026-06-22), 10 versions behind the tracked state.

This task adds Codex release checking to the agent, mirroring the existing Claude Code pattern: check for new stable releases, gather release details from the GitHub API, assess playbook impact, create tasks, and update state.

## Assessment

The agent file lives at:
```
/Users/theobeack/Repo/fsad_playbook/.claude/agents/playbook-updater/agent.md
```

The current workflow has 7 phases, all focused on Claude Code. The changes needed:

1. **Phase 1** — extend to also check the Codex latest release and compare against `lastCodexVersion`
2. **Phase 2b** — new phase: gather Codex release details when a new version is found
3. **Phase 3** — extend to assess Codex changes against the Codex Best Practices page
4. **Phase 4** — tag Codex-sourced tasks with `[Codex]` prefix (same CBP numbering, same task file format)
5. **Phase 7** — update `lastCodexVersion` + `lastCodexChecked` in `state.json` alongside the Claude Code fields

The Codex releases API endpoint:
```bash
curl -s "https://api.github.com/repos/openai/codex/releases/latest"
```
This returns only stable (non-prerelease) releases — same behavior as the Claude Code endpoint.

Codex does not publish a CHANGELOG.md at the repo root; release details come from the `body` field of the GitHub releases API response. The agent should extract `body` from the latest release JSON rather than fetching a separate changelog file.

## Plan

### Step 1: Extend Phase 1 to check Codex

After the Claude Code version comparison block (step 4–6 in current Phase 1), add a parallel Codex check:

```
1c. Read `lastCodexVersion` and `lastCodexChecked` from state.json
2c. Fetch latest Codex release:
    curl -s "https://api.github.com/repos/openai/codex/releases/latest"
3c. Extract `tag_name` and `body` from the JSON response
4c. Compare against `lastCodexVersion`
5c. If same version: note "Codex unchanged" and continue
6c. If new version: set a flag to run Phase 2b
```

The phase should proceed past the early-stop only if EITHER Claude Code or Codex has a new version. Update the early-stop condition in Phase 1 step 5 accordingly:

> **If same version (both Claude Code AND Codex):** Update both `lastChecked` and `lastCodexChecked` in state.json with today's date, write the no-update entry to the daily log, then STOP.

### Step 2: Add Phase 2b — Gather Codex Release Details

Insert after Phase 2 (or fold into it as a sub-section). Only runs if a new Codex version was found.

```
Phase 2b: Gather Codex Release Details

1. Use the `body` field from the releases/latest API response (already fetched in Phase 1)
2. If multiple versions were skipped (lastCodexVersion is several behind), fetch the releases
   list to get bodies for all intermediate versions:
   curl -s "https://api.github.com/repos/openai/codex/releases?per_page=20"
   Filter to stable releases between lastCodexVersion and the new version.
3. Append a Codex section to the daily update file (markdown/updates/YYYY-MM-DD.md):

   ## Codex rust-vX.Y.Z (new)
   
   ### New Features
   - [Feature] → **Affects:** [section or "No playbook impact"]
   
   ### Changed
   - [Change] → **Affects:** [section or "No playbook impact"]
   
   ### Fixed / Removed
   - [item] → **Affects:** [section or "No playbook impact"]
   
   ### Codex Playbook Action Items
   - [ ] [task description] — [section to update]
```

### Step 3: Extend Phase 3 to assess Codex changes

When assessing impact, Codex changes map to the **Codex Best Practices** page (`page-codex`). The agent should:

- Search `fsad-playbook.html` for relevant Codex keywords before creating a task
- Tag any Codex-sourced tasks as `[Codex]` in todo.md (matching the `[Claude]` prefix pattern already in use)
- Focus on the Codex Cheat Sheet, CLI flags tables, and workflow collapsibles on page-codex

### Step 4: Update Phase 7 state file update

Change the state.json update step to always write all four fields:

```json
{
  "lastVersion": "vX.Y.Z",
  "lastChecked": "YYYY-MM-DD",
  "lastCodexVersion": "rust-vX.Y.Z",
  "lastCodexChecked": "YYYY-MM-DD"
}
```

When only one tool has a new release, update both checked dates but only update the version for the tool that had a new release.

### Step 5: Update agent description

Update the `description` frontmatter field to reflect that the agent now monitors both tools:

```
description: Daily monitor for Claude Code CLI and Codex CLI updates. Fetches latest releases, assesses relevance to the FSAD Playbook, creates tasks, executes plans, and commits changes.
```

All criteria verified 2026-06-22 before commit.

## Acceptance Criteria

- [x] Phase 1 checks both `https://api.github.com/repos/anthropics/claude-code/releases/latest` and `https://api.github.com/repos/openai/codex/releases/latest`
- [x] Early-stop only fires when BOTH are unchanged
- [x] Phase 2b exists and runs when Codex has a new version
- [x] Codex tasks in todo.md are tagged `[Codex]` (matching the `[Claude]` prefix pattern)
- [x] `state.json` `lastCodexVersion` and `lastCodexChecked` are updated every run
- [x] Agent description mentions both Claude Code and Codex
- [x] After the agent runs, `lastCodexChecked` reflects today's date (not the stale 2026-05-20)
