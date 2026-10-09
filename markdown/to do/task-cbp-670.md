# CBP-670 — Add `$.ui.notify` to Mods API Section (v2.1.295)

## Summary

Claude Code v2.1.295 added `$.ui.notify` for mods. A mod hook can call `$.ui.notify` to raise a native OS notification through the user's existing notification setting. The notification is tagged with the channel (plugin) that sent it.

## Assessment

The mods API paragraph at line 3695 of `src/pages/practices.html` already mentions `$.ui.invalidate`, `agent.spawn`, and `$.agent.list()`. The new `$.ui.notify` is a peer API call that completes the picture of what a mod can do via `$`. It belongs in that same paragraph.

## Plan

1. Read `src/pages/practices.html` line 3695 for context.
2. Append `$.ui.notify` to the existing mods API description sentence. The current text ends with "and `$.agent.list()` reports idle and waiting states." — add a new clause: "As of v2.1.295, `$.ui.notify` raises a native OS notification through the user's notification setting, tagged with the mod's channel."

## Edit location

- `src/pages/practices.html` line 3695 — append to the existing mods API `<p>` tag

## Acceptance Criteria

- `$.ui.notify` appears in the mods section with a brief description
- Version tag v2.1.295 is included
