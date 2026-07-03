# CBP-295 — Document stacked slash-skill invocations (v2.1.199)

## Summary

In v2.1.199, stacked slash-skill invocations like `/skill-a /skill-b do XYZ` now load all leading skills (up to 5), not just the first. This is a new behavior that improves how power users can compose skills in a single prompt.

## Assessment

The "Skill Invocation" section at **line 9256–9275** has three invocation cards: Manual, Automatic, and Programmatic. The "Manual" card (line 9259–9262) describes `/skill-name [args]` syntax but doesn't mention stacking multiple skills.

This feature is not mentioned anywhere in the playbook. It belongs in the Manual invocation card, or as an additional note immediately after the card grid.

## Plan

1. Read lines 9256–9275 of `fsad-playbook.html` (the Skill Invocation section).
2. Update the "Manual" card (line 9261) to mention stacked invocations: stack multiple skill commands at the start of a prompt and all leading skills load (up to 5).

**Updated Manual card paragraph:**
```
Type <code>/skill-name [args]</code> to invoke explicitly. Arguments available via <code>$ARGUMENTS</code>, <code>$0</code>, <code>$1</code>. Stack multiple skills at the start of a prompt — <code>/skill-a /skill-b do XYZ</code> — and all leading skills load (up to 5), not just the first (v2.1.199).
```

## Acceptance Criteria

- The Manual invocation card mentions stacked slash-skill syntax.
- The description is accurate: up to 5 leading skills load from a stacked prompt.
- The version note (v2.1.199) is included.
- No other structural changes made.
