# CBP-214: Update Dynamic Workflows section — trigger keyword renamed to `ultracode` (v2.1.160)

## Summary

Claude Code v2.1.157 added a `/config` setting ("Workflow keyword trigger") to disable the automatic dynamic-workflow trigger. In v2.1.160 the trigger keyword was **renamed from `workflow` to `ultracode`** — the word "workflow" alone no longer triggers a dynamic workflow run. Asking for one in your own words still works. The trigger keyword is highlighted violet in the prompt input. Users can also press `Alt+W` (or `Backspace` immediately after the keyword appears) to dismiss an accidental workflow trigger.

## Assessment

The playbook's Dynamic Workflows section (CBP-199, line ~9879) already shows `/effort ultracode` as the trigger, but does not document:
- That `ultracode` (not `workflow`) is the typed trigger keyword that activates automatic workflow orchestration
- The `/config` opt-out ("Workflow keyword trigger") to disable it
- The `Alt+W` / `Backspace` dismissal shortcut

These three items are useful to teams that use the word "workflow" naturally in prompts (meta-prompts, planning discussions, docs authoring) and need to understand the new `ultracode` keyword model.

**Location:** Dynamic Workflows collapsible, after the Token Cost callout.

## Plan

1. Read the Dynamic Workflows section of `fsad-playbook.html` (lines ~9879–9910).
2. After the Token Cost callout warning, add a tip callout:
   ```html
   <div class="callout callout-tip" style="margin-top:0.5rem; margin-bottom:0;">
     <div class="callout-title">Trigger keyword: <code>ultracode</code></div>
     <p>Type the word <strong>ultracode</strong> in the prompt input (it highlights violet) to let Claude decide when to run a full dynamic workflow automatically. The word "workflow" no longer triggers this — asking for one in plain language still works. Press <kbd>Alt+W</kbd> or <kbd>Backspace</kbd> immediately after the keyword appears to dismiss an accidental trigger. To disable the keyword entirely, go to <code>/config</code> → <em>Workflow keyword trigger</em>.</p>
   </div>
   ```
3. Mark task complete in `todo.md`.

## Acceptance Criteria

- The Dynamic Workflows section documents `ultracode` as the trigger keyword
- The `/config` opt-out is mentioned
- The `Alt+W` / `Backspace` dismissal tip is included
- The note is a tip callout placed after the Token Cost callout
- No existing content is removed
