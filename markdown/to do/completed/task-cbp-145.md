# CBP-145 — Update `claude agents` Cheat Sheet row with `--cwd <path>` flag

## Summary
Claude Code v2.1.141 added `claude agents --cwd <path>` — a flag that scopes the agent session list to a specific directory. Without it, `claude agents` shows all sessions globally. With `--cwd`, only sessions whose working directory matches the given path are shown — useful in monorepos or when running multiple projects simultaneously.

## Assessment
The Cheat Sheet already has a `claude agents` row in the CLI subcommands table. This row needs updating to mention `--cwd`. Currently: **row exists but `--cwd` flag is not mentioned**.

## Plan
1. Locate the `claude agents` row in the Cheat Sheet.
2. Update the description to include the `--cwd <path>` flag.
3. Mark CBP-145 complete in todo.md.

## Acceptance Criteria
- The `claude agents` row in the Cheat Sheet documents `--cwd <path>`.
- The description remains concise and accurate.
- No HTML is broken.
