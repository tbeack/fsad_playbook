# CBP-166: Update `/resume` Cheat Sheet row — bg sessions in picker (v2.1.144)

## Summary
Claude Code v2.1.144 extended `/resume` to include background sessions (started via `claude --bg` or agent view) alongside interactive ones. Background sessions are marked with a `bg` label in the picker.

## Assessment
The `/resume` row exists at line 6229 in the Cheat Sheet (Session / Context / History table). The current text does not mention background sessions appearing in the picker.

## Plan
1. Read line 6229 context in `fsad-playbook.html`.
2. Edit the `/resume` row description to add: background sessions started via `--bg` or agent view now appear in the picker, marked with `bg`.

**Current text (line 6229):**
```
Resume conversation by ID or name (alias: /continue). Offers to summarize stale large sessions before re-reading them. Paste a GitHub, GitHub Enterprise, GitLab, or Bitbucket PR URL into the search box to jump directly to the session that created that PR.
```

**New text:**
Append: `Background sessions started via <code>--bg</code> or agent view now appear in the picker, marked with <code>bg</code>.`

## Acceptance Criteria
- `/resume` row in Cheat Sheet mentions `--bg` background sessions appearing in the picker, marked with `bg`
