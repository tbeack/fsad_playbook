# CBP-257 — Update workflow trigger keyword callout: explicit phrases required

## Summary

Claude Code v2.1.178 changed the workflow prompt keyword behavior: the keyword (previously associated with triggering dynamic workflows) now uses a purple shimmer highlight and only triggers on explicit phrases like "run a workflow" or "workflow:", not on any casual mention of the word. This is a UX change to reduce accidental triggers.

## Assessment

The playbook currently documents the ultracode keyword trigger in the Dynamic Workflows collapsible (around line 10353):

> "Type the word ultracode in the prompt input (it highlights violet) to let Claude decide when to run a full dynamic workflow automatically. The word 'workflow' no longer triggers this — asking for one in plain language still works. Press Alt+W or Backspace immediately after the keyword appears to dismiss an accidental trigger. To disable the keyword entirely, go to /config → Workflow keyword trigger. (v2.1.160)"

The v2.1.178 change modifies how the workflow keyword triggers — now specifically the prompt keyword (which the changelog says uses a "purple shimmer highlight") only fires on phrases like "run a workflow" or "workflow:". This updates the existing behavior description.

Note: The `ultracode` keyword previously documented (v2.1.160) is a separate feature. The v2.1.178 change appears to affect the built-in workflow keyword that triggers the workflow executor, not the `ultracode` keyword. The callout should be updated to reflect this change.

## Plan

1. Read lines 10347–10356 of `fsad-playbook.html` to see the current trigger keyword callout
2. Update the callout text to reflect that the workflow trigger keyword now:
   - Uses a purple shimmer highlight
   - Only fires on explicit phrases like "run a workflow" or "workflow:"
   - No longer fires on casual mentions of "workflow"
3. Add `(v2.1.178)` version tag

## Acceptance Criteria

- The trigger keyword callout accurately describes the explicit-phrase requirement
- The purple shimmer highlight detail is mentioned
- Version tag `(v2.1.178)` is added
- The existing ultracode content is preserved or integrated cleanly
