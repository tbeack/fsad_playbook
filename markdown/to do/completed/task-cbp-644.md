# CBP-644 — [Claude] Add "Mods" section and rename "Skills & Hooks" to "Skills, Hooks, Mods"

## Source

User request (2026-10-04). Claude Code docs: <https://code.claude.com/docs/en/plugins/mods/overview>. Mods need Claude Code v2.1.287 or later.

## Summary

Claude Code added "mods": plugins of JavaScript/TypeScript event handlers that run inside Claude Code. A mod can draw panes and bands, restyle the UI, intercept tool calls and prompts, and add instant `/commands`. Rename the Claude Best Practices topic "Skills & Hooks" to "Skills, Hooks, Mods" and add a new "Mods" section to the topic.

## Assessment

The topic label "Skills & Hooks" (topic key `skills-hooks`) appears in 3 source locations:

- `src/playbook.tmpl.html:184`: sidebar topic header button `Skills &amp; Hooks`.
- `src/js/router-nav/03-topic-nav.js:8`: `TOPIC_LABELS['skills-hooks'] = 'Skills & Hooks'`.
- `src/pages/practices.html:32-37`: hub card. It has the `<h3>Skills &amp; Hooks</h3>`, a tagline, and chips `Building Skills` / `Hooks Deep Dive`.

The topic content is in 2 `topic-view` blocks in `src/pages/practices.html`:

- Line ~1145: `<div class="topic-view" data-topic="skills-hooks">`, which holds `#building-skills`.
- Line ~2935: the same `data-topic`, which holds `#hooks-deep-dive` and `#cloud-integrations` ("HTTP Hooks & Web Agents").

The sidebar sub-items for the topic are at `src/playbook.tmpl.html` ~187-210.

`skills/playbook-assistant/index/playbook-index.jsonl` contains "Skills & Hooks" in the `practices-hub` record. `build-dist.py` regenerates the index and the embeddings.

Keep the topic key `skills-hooks` unchanged. Deep links (`#practices/...`) and `sectionToTopicMap` depend on it.

Mods facts to cover (from the overview page):

- Definition: a plugin whose hooks module (`hooks/hooks.json` → `hooks/register.js`) registers event handlers with `on(event, handler)`. A handler can observe, rewrite, or answer an event.
- Capabilities: panes and bands, redraw of built-in UI (tool rows, spinner, question dialog), interception of tool calls and requests, instant `/commands` with no Claude turn, and state shared between hooks.
- Install: `/plugin install <name>@<marketplace>`, or `claude plugin install`. Run `/reload-plugins` after a shell install. Use `/plugin` to see the `N mods active` line.
- Trust: mods are not sandboxed and run with the user's permissions. They can approve tool calls. Run `claude plugin validate <dir>` to list the `hooks:` and `calls:` lines before you install a mod.
- Off switches: disable one mod in `/plugin`, use `--safe-mode` for a session, or set `"disableAllHooks": true`. Admins use `allowManagedModsOnly`.
- Where mods draw: the terminal and the Desktop Code tab. Hooks also run in VS Code, `claude -p`, and the SDK, but these show nothing.
- Built-in mods: `cc-plugin-diff`, `cc-plugin-agents-md`, `cc-plugin-plugin-authoring`, `cc-plugin-sec-default`, `cc-plugin-telemetry`, and `cc-plugin-you-should-know`.
- The comparison table: mod vs settings hook vs skill vs MCP server.
- Terminology: in the mods docs, "hook" means a mod handler. The settings-file kind is a "settings hook".

## Plan

1. Rename the topic label to "Skills, Hooks, Mods" in all 3 source locations. In HTML, use `Skills, Hooks, Mods`, which needs no `&amp;`.
2. Update the hub card. Add a `Mods` chip, and change the tagline to cover mods.
3. Add `<section id="mods">` to the `skills-hooks` topic view after `#hooks-deep-dive`/`#cloud-integrations`. Match the markup of the sibling sections. Include:
   - what a mod is, with the minimal `register.js` example (tool-call counter on the spinner)
   - the mod vs settings hook vs skill vs MCP comparison table
   - install, trust, and off-switch guidance, with `claude plugin validate` as a pre-install step
   - the "where mods run" limits
   - the built-in mods list, and a link to the overview docs
4. Add a sidebar sub-item `Mods` → `#practices/mods` in `src/playbook.tmpl.html` with the same pattern as `Hooks`.
5. Add a cross-link from `#hooks-deep-dive` to `#mods` that explains the "hook" vs "settings hook" term change.
6. Review the "What's New" page and the changelog modal. Add a Mods announcement entry that matches the existing entry format.
7. Run `python3 scripts/build-source.py` and `python3 scripts/build-dist.py`. Confirm the log shows `Injected PLAYBOOK_EMBEDDINGS`.

## Acceptance Criteria

All criteria verified 2026-10-04 before commit.

- [x] `grep -rn "Skills &amp; Hooks\|Skills & Hooks" src/` returns 0 matches.
- [x] `grep -rn "Skills, Hooks, Mods" src/` matches the sidebar header, `TOPIC_LABELS`, and the hub card `<h3>` (3 matches minimum).
- [x] `src/pages/practices.html` contains `<section id="mods">` inside a `data-topic="skills-hooks"` topic view.
- [x] The `#mods` section has a `register(on)` code example, a 4-column comparison table (Mod / Settings hook / Skill / MCP server), `claude plugin validate`, `disableAllHooks`, and the v2.1.287 minimum version.
- [x] `src/playbook.tmpl.html` has a nav sub-item with `href="#practices/mods"` that calls `showTopic('skills-hooks')`.
- [x] The hub card for `skills-hooks` shows a `Mods` chip.
- [x] A browser test of `#practices/mods` opens the Skills, Hooks, Mods topic and scrolls to the section.
- [x] A search for "mods" in the in-app search overlay returns the new section.
- [x] `build-dist.py` logs `Injected PLAYBOOK_EMBEDDINGS`, and `grep -c "Skills, Hooks, Mods" dist/fsad-playbook.html` is ≥ 3.

## Decisions (2026-10-04, approved before execution)

1. Renumbered from `CBP-607` to `CBP-644`, because upstream already uses `CBP-607`.
2. Keep the upstream "Claude Mods" bullet in the plugins list. Shorten it and add a link to `#mods`. Move the `agent.spawn` / `$.agent.list()` fact (v2.1.289) into the new section.
3. Copy the `register.js` example verbatim from the mods overview page.
4. Bump the patch version with the `version-bump` skill, so the changelog modal entry, `CHANGELOG.md`, the title, and the README match.
5. Add a `mods` keyword category to the What's New classifier in `src/js/init.js`.
6. Register `'mods': 'practices'` in `sectionToPageMap` (`src/js/router-nav/01-page-maps.js`). The original plan missed this step.
7. AC7 narrowed (user-approved 2026-10-04). The scroll-spy highlight part moved to `CBP-645`. The same highlight assertion also fails on the existing `#hooks-deep-dive` and `#cloud-integrations` sections, so the bug predates this task.
