# CBP-354 — [Claude] Add `crossSessionInbound` and `dialogExpiry` to Notable settings.json Keys callout

## Source
Claude Code v2.1.224

## Summary
v2.1.224 added `crossSessionInbound` and `dialogExpiry` settings: cross-session messages sent to a session running with bypassed permissions are held for approval; messages to other sessions auto-deliver.

## Assessment
`fsad-playbook.html`, Config Cascade section → "Notable `settings.json` Keys" callout, lines 9733–9765. The `<ul>` currently ends with the `workflowSizeGuideline` bullet (v2.1.219) at line 9763, `margin-bottom:0`.

## Plan

### Step 1 — Change the current last bullet's margin and add two new bullets after it
Change line 9763 from `margin-bottom:0;` to `margin-bottom:0.4rem;`, then append:
```html
<li style="margin-bottom:0.4rem;"><code>crossSessionInbound</code> — Controls whether cross-session messages sent to a session running with bypassed permissions are held for your approval before delivery. Pairs with the v2.1.224 cross-session <code>SendMessage</code>/<code>ListAgents</code> capability (see Power Usage → Agent Teams).</li>
<li style="margin-bottom:0;"><code>dialogExpiry</code> — Sets how long a held cross-session message approval dialog stays pending before expiring. Messages to sessions without bypassed permissions auto-deliver regardless (v2.1.224).</li>
```

## Acceptance Criteria
- `crossSessionInbound` and `dialogExpiry` bullets present in the Notable settings.json Keys callout
- Only the new last bullet uses `margin-bottom:0;`; the bullet before it uses `margin-bottom:0.4rem;`
- Cross-references the Agent Teams cross-session SendMessage content (CBP-348)
- HTML is valid
