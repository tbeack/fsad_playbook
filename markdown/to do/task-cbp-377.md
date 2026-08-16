# CBP-377 — Power Usage: `CLAUDE_CODE_TOOL_MEMORY_LIMIT` env var

## Source
Claude Code v2.1.233 changelog: "Added opt-in memory cgroup support for Bash tool commands on Linux (`CLAUDE_CODE_TOOL_MEMORY_LIMIT`) so a runaway build can't stall the session."

## Summary
New Linux-only env var caps memory usage of Bash tool subprocess commands via cgroups, preventing a runaway build/process from stalling the session. No existing mention anywhere in the playbook.

## Assessment
Does content exist? No — confirmed via grep, zero hits for `CLAUDE_CODE_TOOL_MEMORY_LIMIT` or "memory cgroup" anywhere in `fsad-playbook.html`. The natural home is the "Hardening env vars (shared environments & CI/CD)" table in `#power-usage` (Subprocess Sandboxing collapsible), which already documents other Linux-specific opt-in resource/behavior-control vars in the same table (e.g. `CLAUDE_CODE_SUBPROCESS_ENV_SCRUB`, `CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH`, `CLAUDE_CODE_MCP_AUTO_BACKGROUND_MS`).

## Plan
1. Read `fsad-playbook.html` L11832-11868 (Hardening env vars table) to confirm current row order and closing structure.
2. Insert a new `<tr>` row immediately after the `CLAUDE_CODE_OTEL_CONTENT_MAX_LENGTH` row (L11866) and before `</tbody>` (L11867), following the exact same `<tr><td><code>VAR</code></td><td>Effect...</td></tr>` pattern.
3. Row content: `CLAUDE_CODE_TOOL_MEMORY_LIMIT` — opt-in memory cgroup support for Bash tool commands on Linux; caps memory so a runaway build/process can't stall the session (v2.1.233). Note the value format if inferable (likely a byte/MB limit) — if unclear from the changelog, describe generically as "set a memory limit" without inventing a specific unit format.

## Acceptance Criteria
- [ ] New row added to the Hardening env vars table in `#power-usage` documenting `CLAUDE_CODE_TOOL_MEMORY_LIMIT`.
- [ ] Row follows existing table row HTML pattern exactly (same classes, structure).
- [ ] Version tag `(v2.1.233)` included, consistent with other rows' versioning convention.
- [ ] No existing rows altered; HTML remains well-formed.
