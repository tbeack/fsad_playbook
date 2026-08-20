# CBP-410: Update cross-session `SendMessage` bullet with `notify_when_idle`

## Source
Claude Code v2.1.236 changelog: "Added `notify_when_idle` to cross-session `SendMessage`: ask another Claude Code session on this machine to send one notice when it next goes idle — opt-in, one-shot, no polling (macOS and Linux)."

## Summary
A new opt-in, one-shot `notify_when_idle` parameter for cross-session `SendMessage` lets a session ask another session to notify it once when that other session next goes idle, without polling.

## Assessment
Does content exist? The cross-session `SendMessage` bullet in Power Usage → Agent Teams (line ~11369) already tracks this feature's incremental version history in a single running bullet (v2.1.224 through v2.1.235 changes are all appended as "As of vX.X.X, ..." sentences to the same `<li>`). This is a direct continuation of that same feature — update-existing, not new-section.

## Plan
1. Open `fsad-playbook.html`, locate the Power Usage → Agent Teams collapsible, the `<li>` beginning `<strong>Cross-session <code>SendMessage</code>:</strong> as of v2.1.224, ...` (currently at line 11369).
2. Append a new sentence to the end of that `<li>` (after "...Available on macOS and Linux."), following the same "As of vX.X.X, ..." pattern:
   `As of v2.1.236, SendMessage accepts a notify_when_idle option: ask another Claude Code session on this machine to send one notice when it next goes idle — opt-in, one-shot, no polling (macOS and Linux) (v2.1.236).`
3. Keep the sentence inside the same `<li>` element — do not create a new bullet, matching the existing pattern for this feature's changelog.

## Acceptance Criteria
- [ ] The Agent Teams `SendMessage` bullet documents `notify_when_idle`, its opt-in/one-shot/no-polling behavior, and platform scope (macOS/Linux).
- [ ] Version v2.1.236 is cited.
- [ ] The edit stays within the existing `<li>` and doesn't break its closing tag.
