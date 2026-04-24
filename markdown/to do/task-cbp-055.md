# CBP-055 — Document native Glob/Grep → bfs/ugrep replacement on macOS/Linux (v2.1.117)

## Summary
Claude Code v2.1.117: "Native builds on macOS and Linux: the Glob and Grep tools are replaced by embedded bfs and ugrep available through the Bash tool — faster searches without a separate tool round-trip (Windows and npm-installed builds unchanged)."

This is a meaningful mental-model change: on native macOS/Linux builds, agents should now use Bash with bfs/ugrep rather than expecting separate Glob/Grep tool calls. This affects skill authors and anyone reading the Power Usage / Building Skills sections.

## Assessment
The playbook does not currently reference Glob or Grep as standalone tools in any section (confirmed by grep — they don't appear as documented features). The `allowed-tools` frontmatter field example mentions `Read Grep Bash(git *)` (line ~4343). The power usage section doesn't enumerate individual tools.

Since Glob/Grep aren't explicitly documented as separate tools in the playbook, this change primarily impacts the `allowed-tools` example and any guidance around search patterns in skills.

**Scope:** A targeted note in the Power Usage section (or Building Skills) explaining the change for native builds, plus optionally updating the `allowed-tools` example.

Location options:
1. Add a callout or note to the **Building Skills** frontmatter section (near `allowed-tools` row) noting that on native macOS/Linux builds, Glob and Grep are embedded in the Bash tool — use `Bash(grep:*)` or `Bash(find:*)` rather than standalone `Grep` / `Glob` in `allowed-tools`.
2. The `allowed-tools` example currently shows `Grep` — update to show `Bash(grep:*)` as the preferred form on native builds.

## Plan

### Step 1 — Add a note beneath the frontmatter `allowed-tools` row
After the frontmatter table, add a small explanatory note (similar to the string substitutions footnote at line ~4354):

"**Native macOS/Linux builds:** `Glob` and `Grep` are embedded in the `Bash` tool via `bfs`/`ugrep`. Use `Bash(grep:*)` and `Bash(find:*)` in `allowed-tools` instead of standalone `Grep`/`Glob`. Windows and npm-installed builds retain the separate tools."

### Step 2 — Update the `allowed-tools` example string
Change the frontmatter example in the `allowed-tools` row from `Read Grep Bash(git *)` to `Read Bash(grep:*) Bash(git *)` with a note "(on native macOS/Linux builds — use Bash for grep/find)".

## Acceptance Criteria
- A note explains the Glob/Grep → bfs/ugrep change for native macOS/Linux builds
- `allowed-tools` example is updated to reflect the native-build reality
- Windows/npm caveat is clearly stated
- No existing content is broken
