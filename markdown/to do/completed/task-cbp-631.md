# CBP-631: Update `/verify` row — skills named `verify` now auto-run before commit (v2.1.286)

## Summary

v2.1.286 improved commit guidance: when a project or user skills directory includes one named `verify`, Claude is now told to run it right before committing, except for docs-only and tests-only commits. This partially reinstates automatic invocation (scoped specifically to commit time) on top of the v2.1.215 change that made `/verify` opt-in only.

## Assessment

- `src/pages/practices.html`'s Cheat Sheet slash-command table has a `/verify` row (~line 1997) documenting the v2.1.215 "no longer automatic" change. It needs a new sentence for the v2.1.286 commit-time exception.

## Plan

1. In `src/pages/practices.html`, append to the `/verify` row (~line 1997):
   `As of v2.1.286, if your project or user skills include one named <code>verify</code>, Claude is told to run it right before committing — except for docs-only and tests-only commits — reinstating automatic invocation in this one case (v2.1.286).`

## Acceptance Criteria

- The `/verify` row documents the v2.1.286 commit-time auto-run exception, scoped to a skill literally named `verify` and excluding docs-only/tests-only commits.
