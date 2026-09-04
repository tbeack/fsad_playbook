# CBP-513 — Add `codex plugin list` and Remote Marketplace CLI Note

## Source
Codex rust-v0.153.0

## Summary
Codex rust-v0.153.0 adds the ability to list, install, and remove plugins from remote marketplaces via the plugin CLI. Specifically: `codex plugin list` is now available to list plugins (from local, personal, workspace, and remote sources). This rounds out the plugin CLI with the missing list subcommand.

## Assessment
The Codex page (`src/pages/codex.html`) plugin section (line 1413–1426) has `codex plugin install`, `codex plugin remove`, `codex plugin share`, `codex plugin publish`, and `codex plugin sync`. `codex plugin list` is NOT present. This is a new addition.

## Plan
1. Read `src/pages/codex.html` around line 1413–1426
2. Add `codex plugin list` command before `codex plugin install`:
   ```html
   <span class="cm"># List installed and available plugins</span>
   codex plugin list

   ```
3. Update the paragraph at line 1434 to append: `As of rust-v0.153.0, the plugin CLI can list, install, and remove plugins from remote marketplaces directly — complementing the TUI <code>/plugins</code> view for scripting and automation.`

## Acceptance Criteria
- `codex plugin list` appears in the plugin code block
- The note about remote marketplace CLI support is added to the paragraph
- HTML is valid
