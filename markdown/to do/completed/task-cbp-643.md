# CBP-643: Add `agent.spawn` for teammates and `$.agent.list()` idle/waiting states to Claude Mods bullet

## Summary

Claude Code v2.1.289 added three related plugin/mod SDK capabilities:
1. `agent.spawn` for teammates — a mod/plugin hook can now spawn a teammate directly
2. One stable agent id across plugin hook events — the agent identity persists across hook invocations
3. Idle and waiting states in `$.agent.list()` — plugins can now see whether an agent is idle or waiting for input

## Assessment

The Plugins collapsible section (`src/pages/practices.html`, around line 2696) already has a "Claude Mods" bullet added in CBP-633:

```
<li><strong>Claude Mods</strong> — Plugins may modify deeper Claude Code behavior via the Mods category. The first built-in mod is <strong>You Should Know</strong>: a background side-agent that watches your session and flags things you or Claude might miss. Enable it with <code>/plugin enable cc-plugin-you-should-know@builtin</code> — requires a first-party session with telemetry on (v2.1.287).</li>
```

No mention of `agent.spawn`, `$.agent.list()`, or idle/waiting states anywhere in the playbook. This needs an update to that bullet to note the new agent API.

## Plan

1. Read `src/pages/practices.html` around line 2696 to locate the exact Claude Mods bullet text.
2. Append a sentence to the existing Claude Mods bullet describing `agent.spawn` for teammates, stable agent id across hook events, and `$.agent.list()` idle/waiting states (v2.1.289).

**Target text to update** (in `src/pages/practices.html`, the Claude Mods bullet, approximately line 2696):
Append after the closing period: ` As of v2.1.289, mod hooks can also call <code>agent.spawn</code> to launch a teammate, maintain a stable agent id across hook invocations, and read idle or waiting states from <code>$.agent.list()</code>.`

3. Run `python3 scripts/build-source.py` then `python3 scripts/build-dist.py`.
4. Verify the changelog modal in `src/partials/changelog-modal.html` is updated.
5. Mark task complete in `todo.md`.

## Acceptance Criteria

- The Claude Mods bullet in `src/pages/practices.html` mentions `agent.spawn`, stable agent id, and `$.agent.list()` idle/waiting states with `(v2.1.289)` attribution.
- Both build scripts run without error and the dist log confirms `Injected PLAYBOOK_EMBEDDINGS`.
