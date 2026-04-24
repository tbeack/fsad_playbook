# CBP-045 — Add guidance on learning from sessions via playback/rewind

## Source
Own idea — once teams are productive with Claude Code, the next lever is compounding: reviewing past sessions to refine prompts, CLAUDE.md, skills, and memory. The playbook currently documents the *mechanics* of `/rewind`, `/recap`, and session logs, but not the *practice* of using them as a learning loop.

## Summary
Add a new sub-section to Claude Best Practices → **Operations** called "Session Review & Refinement" that teaches users how to learn from their own Claude Code sessions. Covers three review modes (live rewind, in-session recap, post-hoc transcript review), a concrete refinement loop (watch → diagnose → persist as CLAUDE.md / skill / memory / hook), and a meta-review option where users feed a transcript to a fresh Claude instance for an independent critique.

## Assessment

### What already exists
- **Cheat Sheet** (line ~4747): `/rewind`, `/undo`, `/checkpoint` documented as a single row
- **Cheat Sheet** (line ~4746): `/recap` documented with the `CLAUDE_CODE_ENABLE_AWAY_SUMMARY` env var
- **Cheat Sheet** (line ~4713): `Ctrl+O` for verbose transcript toggle
- **Cheat Sheet** (line ~4744): `/resume` / `/continue` for reopening prior sessions
- **Power Usage → Session Logs** (line ~5234): location `~/.claude/projects/`, basic note that sessions are logged with timestamps
- **Memory & MEMORY.md** guidance under the Obsidian section (line ~3690) — but this is about forward-looking memory, not backward-looking review

### What's missing
- No narrative connecting these features into a **learning loop**
- No guidance on **what to look for** when reviewing a session (wasted turns, clarifying questions Claude had to ask, wrong assumptions, corrections, tool-use patterns)
- No guidance on **where learnings should land** (CLAUDE.md rules, a new skill, a hook, a memory entry, a feedback file)
- No mention of **meta-review** — piping a transcript into a fresh Claude instance and asking "what could I have prompted better?"
- No mention that **feedback memories** (see the auto memory system) should include *why* so future-you can judge edge cases

**Location:** `fsad-playbook.html` — Operations topic view, new collapsible section inserted between `#monitoring` (line ~5122) and `#best-practices` (Guidelines). Section ID: `session-review`.

## Plan

1. **Pick the insertion point**
   - In the Practices page, locate the Operations topic view: `<div class="topic-view" data-topic="operations">`
   - Insert the new `<section id="session-review">` after the Monitoring section and before the Guidelines section
   - Section heading: "Session Review & Refinement"

2. **Write the section content** (roughly 4 collapsibles + an intro)

   **Intro paragraph** — Frame the loop: "Every session is training data for *you*. Claude Code gives you three ways to watch the tape: live rewind during the run, in-session recap when you return, and post-hoc transcript review from `~/.claude/projects/`. Use them to turn one-off corrections into persistent guidance."

   **Collapsible 1 — Three review modes (table)**
   | Mode | When | How | Best for |
   |------|------|-----|----------|
   | Live rewind | Mid-session, when you spot a wrong turn | `/rewind` or `Esc` `Esc` → pick a checkpoint | Killing a bad branch before it compounds; A/B-ing two approaches from the same checkpoint |
   | In-session recap | Returning to a long-running session | `/recap` (or set `CLAUDE_CODE_ENABLE_AWAY_SUMMARY=1`) | Re-loading context after hours away; `/resume`-ing a named session |
   | Post-hoc transcript | After the session ends | Open the `.jsonl` in `~/.claude/projects/<project>/`, or re-open with `claude --resume` + `Ctrl+O` | Pattern-spotting across many sessions; extracting lessons worth persisting |

   **Collapsible 2 — What to look for (review checklist)**
   - Turns where Claude asked a clarifying question → the CLAUDE.md / skill / prompt is missing that context
   - Turns where you corrected Claude's approach → candidate for a feedback memory (include **Why** and **How to apply**)
   - Wasted tool calls (re-reading the same file, searching for known paths) → candidate for a CLAUDE.md hint or a hook
   - Long unreadable tool outputs → candidate for delegating to a subagent
   - Repeated failures in the same class (tests, linter, build) → candidate for a `PostToolUse` hook or a `/skill`
   - Destructive operations you had to approve repeatedly → candidate for a `permissions` entry in `settings.json`

   **Collapsible 3 — Where learnings should land (decision tree)**
   - **One-off nuance about this project** → `CLAUDE.md` (project-level)
   - **A repeatable procedure** → new skill under `.claude/skills/`
   - **A rule Claude should enforce on every tool call** → hook in `settings.json`
   - **A preference about how you like to work** → feedback memory (the auto memory system already does this)
   - **A noisy permission prompt** → `permissions.allow` in `settings.json`
   - **Cross-project wisdom** → user-level `~/.claude/CLAUDE.md` or a user-level skill

   **Collapsible 4 — Meta-review with a fresh Claude**
   - Open a fresh session in a scratch directory
   - Paste the transcript (or point Claude at the `.jsonl`)
   - Prompt: *"Review this transcript as a senior engineer. Where did I prompt poorly? Where did Claude make bad calls I should have caught? What one change to my CLAUDE.md would have saved the most turns?"*
   - Save the answer; apply the top 1–2 changes only (avoid churning config on every review)
   - Optional: use the `code-review` or `/review` skill style — ask for a single actionable punch list

3. **Wire the section into routing**
   - Add `'session-review': 'practices'` to `sectionToPageMap`
   - Add `'session-review': 'operations'` to `sectionToTopicMap`
   - Add a sidebar nav entry under the **Operations** topic group, between `monitoring` and `best-practices`:
     ```html
     <a class="nav-sub-item" href="#practices/session-review" onclick="event.preventDefault(); showTopic('operations'); setTimeout(()=>scrollToId('session-review'),120)">Session Review</a>
     ```

4. **Optional cross-links**
   - In the Cheat Sheet `/rewind` row, add a parenthetical: *"See Session Review for the full learning loop."*
   - In the Power Usage → Session Logs card, add a similar pointer

5. **Search index + changelog**
   - `buildSearchIndex` auto-picks up the new `<section>` — verify after
   - Bump version in `README.md` and add a CHANGELOG entry under the next version

## Acceptance Criteria
- [ ] New `#session-review` section renders under Practices → Operations, between Monitoring and Guidelines
- [ ] Section contains intro + 4 collapsibles (three review modes, review checklist, where-to-land decision tree, meta-review)
- [ ] Sidebar nav entry appears under Operations between Monitoring and Guidelines
- [ ] `sectionToPageMap` and `sectionToTopicMap` both include `session-review`
- [ ] Search finds the new content (try: "rewind", "transcript review", "meta-review", "learning loop")
- [ ] Clicking a search result for `session-review` navigates to Operations topic (not Hub) and scrolls correctly
- [ ] Cheat Sheet `/rewind` row and Power Usage Session Logs card have cross-links to the new section
- [ ] No Mermaid/Highlight.js regressions; dark and light themes both render cleanly
