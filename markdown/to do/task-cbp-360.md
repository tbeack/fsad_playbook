# CBP-360 — [Codex] Update Plugins collapsible: portable Agent Plugin install + local/personal/workspace/remote catalog search

## Source
Codex CLI rust-v0.147.0

## Summary
rust-v0.147.0: "Install portable Agent Plugins and search across local, personal, workspace, and remote plugin catalogs." This extends the Agent Plugin manifests content added for rust-v0.146.0 (CBP-337).

## Assessment
`fsad-playbook.html` line 14228, Power Usage → Plugins collapsible, description paragraph. Currently ends with the rust-v0.146.0 sentence about Agent Plugin manifests and Amazon Bedrock/Claude Code marketplace sources. The existing "Plugin scoping" list (lines 14223–14227) only has Global/Project/Workspace-shared — no "personal" catalog tier, and no mention of portable installation format.

## Plan

### Step 1 — Append a new sentence to the description paragraph (line 14228)
```html
 As of rust-v0.147.0, Agent Plugins can be installed in a <strong>portable</strong> format and searched across <strong>local, personal, workspace, and remote</strong> plugin catalogs — broadening discovery beyond the Global/Project/Workspace-shared scopes below.
```

## Acceptance Criteria
- Plugins collapsible documents portable Agent Plugin installation (rust-v0.147.0)
- Paragraph documents catalog search across local/personal/workspace/remote sources
- HTML is valid
