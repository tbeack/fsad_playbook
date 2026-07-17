# CBP-301 — Add autoMode location note: not read from settings.local.json

## Summary
Claude Code v2.1.207 changed auto mode to no longer read the `autoMode` setting from `.claude/settings.local.json` (the repo-resident, gitignored project-local file). Users who configured auto mode in settings.local.json will no longer have it take effect. They must move it to `~/.claude/settings.json` (user level).

## Assessment
The Notable settings.json Keys callout (lines 8670–8687) documents autoMode-related settings (`autoMode.hard_deny`, `autoMode.classifyAllShell`) but does not say which settings layer to use for them. A new bullet should document this behavioral change — `autoMode` is no longer read from `.claude/settings.local.json`; use `~/.claude/settings.json` instead.

## Plan
1. After the `disableAutoMode` bullet added by CBP-299, this would be a new last item
2. OR add it as an additional bullet specifically in the autoMode section of the Notable keys callout
3. Best approach: add a brief note under the autoMode-related bullets (after `autoMode.classifyAllShell` at line 8676, or as a separate bullet) clarifying that autoMode settings should live in `~/.claude/settings.json` not `.claude/settings.local.json`

Actually, the cleanest approach is to add a note as a new bullet in the Notable keys section explaining this location constraint. Add it after the existing `autoMode.classifyAllShell` bullet (line 8676), or as part of CBP-299's new bullet about `disableAutoMode`.

To keep CBP-299 and CBP-301 separate, add a standalone note bullet after the autoMode classifyAllShell bullet explaining the settings.local.json exclusion.

## Plan (revised)
1. Read lines 8675–8677 to see autoMode.classifyAllShell in context
2. After `autoMode.classifyAllShell` bullet (line 8676), insert a new bullet: "autoMode settings location — autoMode configuration (including classifyAllShell, hard_deny, and disableAutoMode) is not read from `.claude/settings.local.json`. Configure autoMode settings in `~/.claude/settings.json` (user level) or `.claude/settings.json` (project level, checked in) (v2.1.207)."

## Acceptance Criteria
- A note in the Notable settings.json Keys callout clarifies that `autoMode` settings are not read from `.claude/settings.local.json`
- Directs users to `~/.claude/settings.json` instead
- References v2.1.207
