# CBP-604: Add `/doctor prompt-audit` / `/checkup prompt-audit` note to Cheat Sheet (v2.1.283)

## Summary

v2.1.283 added `/doctor prompt-audit` (also `/checkup prompt-audit`) to audit a project's CLAUDE.md files, skills, agents, and commands for prompting patterns written for older models — surfacing workarounds (e.g. excessive emphasis, repetition, over-specified formatting) that a newer model no longer needs.

## Assessment

- The Cheat Sheet's `/doctor` row (`src/pages/practices.html`, ~line 1948) already accumulates version-specific notes for `/doctor`/`/checkup` (v2.1.205/206 alias + fix behavior, v2.1.282 telemetry-notice pointer). This new subcommand is a natural continuation of that row.
- No dedicated collapsible exists for prompt-audit; a one-sentence addition to the existing row is proportionate — this mirrors how `/skill-doctor` (a related maintenance command) gets a single row rather than its own section.

## Plan

1. In `src/pages/practices.html`, append a clause to the end of the `/doctor` Cheat Sheet row:

```html
As of v2.1.283, <code>/doctor prompt-audit</code> (also <code>/checkup prompt-audit</code>) audits your CLAUDE.md files, skills, agents, and commands for prompting patterns written for older models — useful after a model upgrade to find instructions that no longer need workarounds.
```

## Acceptance Criteria

- The `/doctor` Cheat Sheet row documents the new `prompt-audit` subcommand and its `/checkup` alias, version-tagged v2.1.283.
