# CBP-412: Add auto mode + Monitor tool review bullet to Config Cascade

## Source
Claude Code v2.1.236 changelog: "Improved auto mode: `Monitor` allow rules are now set aside while auto mode is active, so Monitor commands are reviewed the same way Bash commands are."

## Summary
When auto mode is active, `Monitor` tool allow rules are no longer honored automatically — Monitor commands now go through the same auto-mode classifier review as Bash commands.

## Assessment
Does content exist? No. The Config Cascade section's "Notable settings.json Keys" callout (Claude Best Practices → Config Cascade, lines ~9733-9769) already tracks a running list of individual auto-mode governance bullets added incrementally over many prior CBP tasks (e.g. `settings.autoMode.hard_deny`, "Auto mode built-in safety blocks," `autoMode.classifyAllShell`, `disableAutoMode` — see existing bullets at lines 9745-9760, each citing its own CBP task in the in-app changelog around lines 14774-14893). This is the established, precedent-matching home for this exact category of change.

## Plan
1. Open `fsad-playbook.html`, locate the Config Cascade "Notable settings.json Keys" callout `<ul>`, specifically near the existing auto-mode bullets (currently lines 9745-9760, e.g. `settings.autoMode.hard_deny` at 9745, "Auto mode built-in safety blocks" at 9746, `autoMode.classifyAllShell` at 9747).
2. Insert a new `<li>` in that same list (position it near the other auto-mode bullets, e.g. immediately after the `autoMode.classifyAllShell` bullet at line 9747), following the existing bullet format:
   `<li style="margin-bottom:0.4rem;"><strong>Auto mode reviews Monitor commands like Bash</strong> — Monitor tool allow rules are now set aside while auto mode is active, so Monitor commands go through the same auto-mode classifier review as Bash commands, instead of being auto-approved by a pre-existing allow rule (v2.1.236).</li>`
3. Do not duplicate this into the Power Usage → Monitor Tool collapsible — keep this a single edit in Config Cascade's settings.json callout, matching the established pattern for auto-mode changes.

## Acceptance Criteria
- [ ] A new bullet in the Config Cascade "Notable settings.json Keys" callout documents that Monitor allow rules are set aside during auto mode.
- [ ] Version v2.1.236 is cited.
- [ ] The new `<li>` matches the existing bullet style/format and list structure remains valid.
