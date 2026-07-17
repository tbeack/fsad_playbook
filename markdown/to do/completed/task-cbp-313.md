# CBP-313 — Update /resume cheat sheet row — picker includes deleted sessions, resumes as background (v2.1.212)

## Summary
Claude Code v2.1.212 enhanced `/resume` in the agent view: typing it now opens a picker that includes sessions previously deleted from the list, not just active/visible ones. Selected sessions resume as background sessions. The current row does not mention deleted sessions.

## Source
Claude Code v2.1.212 changelog entry:
> Typing `/resume` in the agent view now opens a picker of past sessions — including sessions deleted from the list — and resumes your pick as a background session

## Assessment
- The `/resume` row is at line 9883 of fsad-playbook.html.
- Current text ends with: "Background sessions started via `--bg` or agent view now appear in the picker, marked with `bg`."
- Need to append the note about deleted sessions and background resume behavior.

## Plan
1. Read fsad-playbook.html line 9883.
2. Update the row to append: "In the agent view, typing `/resume` opens the picker even for sessions deleted from the list — deleted sessions remain accessible; the selected session resumes as a background session (v2.1.212)."

### Target: current text (line 9883)
```
Resume conversation by ID or name (alias: <code>/continue</code>). Offers to summarize stale large sessions before re-reading them. Paste a GitHub, GitHub Enterprise, GitLab, or Bitbucket PR URL into the search box to jump directly to the session that created that PR. Background sessions started via <code>--bg</code> or agent view now appear in the picker, marked with <code>bg</code>.
```

### Replace with:
```
Resume conversation by ID or name (alias: <code>/continue</code>). Offers to summarize stale large sessions before re-reading them. Paste a GitHub, GitHub Enterprise, GitLab, or Bitbucket PR URL into the search box to jump directly to the session that created that PR. Background sessions started via <code>--bg</code> or agent view now appear in the picker, marked with <code>bg</code>. In the agent view, typing <code>/resume</code> opens a picker that includes sessions previously deleted from the list — deleted sessions remain accessible and resume as a background session (v2.1.212).
```

## Acceptance Criteria
- `/resume` row includes mention of deleted-session access
- Mention of background session resume behavior is present
- HTML renders correctly in browser
