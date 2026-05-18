# CBP-161 — Add OpenAI developers changelog URL to auto-update agent Codex fetch

## Source

User instruction — add `https://developers.openai.com/codex/changelog` as an additional reference when checking for Codex CLI updates.

## Summary

The `playbook-updater` agent currently only fetches Codex CLI release notes from `https://raw.githubusercontent.com/openai/codex/main/CHANGELOG.md` (with a GitHub API fallback). The OpenAI developers changelog at `https://developers.openai.com/codex/changelog` is a separate, authoritative source that may contain release notes not present in the GitHub repo CHANGELOG. Add it as a third fetch step so the agent can cross-reference both sources when assessing Codex changes.

## Assessment

The agent is defined in two identical files that must be kept in sync:
- `~/.claude/agents/playbook-updater.md` — global agent (used by the harness)
- `~/.claude/plugins/local/fsad-playbook/agents/playbook-updater.md` — plugin-local copy

The relevant section is **Phase 2: Gather Release Details → Codex CLI (if new version)**:

```
1. Run: `curl -s "https://raw.githubusercontent.com/openai/codex/main/CHANGELOG.md"` to get detailed notes
2. If the CHANGELOG path returns a 404, fall back to the release body from the GitHub API response
3. Extract all changes between `codexVersion` and `lastCodexVersion`
```

The new URL should be fetched as an additional step (step 2a or a new step 3) so the agent can cross-reference it. Because the developers changelog is a rendered HTML page (not plain text), the agent should use `WebFetch` rather than `curl` to retrieve its contents.

**Location:** `~/.claude/agents/playbook-updater.md` — lines 54–57 (Phase 2 Codex block)

## Plan

1. Edit `~/.claude/agents/playbook-updater.md`: in the **Phase 2 → Codex CLI** block, add a step after step 1 to also fetch `https://developers.openai.com/codex/changelog` using `WebFetch` and incorporate those notes when extracting changes. The updated block should read:

   ```
   **Codex CLI (if new version):**
   1. Run: `curl -s "https://raw.githubusercontent.com/openai/codex/main/CHANGELOG.md"` to get detailed notes
   2. If the CHANGELOG path returns a 404, fall back to the release body from the GitHub API response
   3. Also fetch `https://developers.openai.com/codex/changelog` (use WebFetch) for additional release notes — cross-reference with the GitHub source and include any changes not already captured
   4. Extract all changes between `codexVersion` and `lastCodexVersion`
   ```

2. Apply the identical edit to `~/.claude/plugins/local/fsad-playbook/agents/playbook-updater.md`.

3. Verify both files are byte-for-byte identical in the modified section.

All criteria verified 2026-05-18 before commit.

## Acceptance Criteria

- [x] `~/.claude/agents/playbook-updater.md` Phase 2 Codex block contains a step that explicitly fetches `https://developers.openai.com/codex/changelog` via WebFetch
- [x] `~/.claude/plugins/local/fsad-playbook/agents/playbook-updater.md` contains the identical change
- [x] The existing GitHub raw CHANGELOG fetch (step 1) and API fallback (step 2) are preserved unchanged
- [x] Step numbering is sequential with no gaps
- [x] No other sections of either file are modified
