# CBP-178 — [Codex] Add `codex exec resume` with `--output-schema` to Session Management and CI/CD collapsibles (v0.132.0)

## Summary

Codex v0.132.0 added a `codex exec resume` subcommand that resumes an existing automation session in headless mode. The key addition is that `--output-schema` can now be combined with `exec resume`, allowing resumed sessions to keep their prior context while enforcing structured JSON output. Previously `--output-schema` was only documented for fresh `codex exec` runs.

## Assessment

The playbook currently covers:
- `codex resume` and `codex resume --last` in the **Session Management** collapsible (line 9256–9269)
- `codex exec --output-schema schema.json` in the **CI/CD Integration** collapsible (line 9290)

Neither collapsible mentions `codex exec resume`. This is a new subcommand pattern that combines two existing workflows (resume + headless exec), so it warrants explicit documentation in both sections.

## Plan

### Step 1 — Session Management collapsible (line 9256–9269)

Add a `codex exec resume` example after `codex resume --last`. The new example shows resuming the last session in headless mode with schema output.

Current code block content includes:
```
# Show session picker (redesigned resume/fork picker in v0.129.0)
codex resume

# Resume the most recent session
codex resume --last

# Run a throwaway session (no persistence)
codex exec --ephemeral "quick fix: update version in package.json"
```

Add after `codex resume --last`:
```
# Resume in headless exec mode — keeps session context, enforces JSON output
codex exec resume --output-schema schema.json "continue analyzing endpoints"
```

### Step 2 — CI/CD Integration collapsible (line 9289–9290)

Update the existing `--output-schema` example to clarify it works with both fresh runs and resumed sessions. Add a `codex exec resume` example.

After the existing `codex exec --output-schema schema.json "list all API endpoints"` line, add:
```
# Resume a session in headless mode — preserves context, enforces schema
codex exec resume --output-schema schema.json "continue from last checkpoint"
```

## Acceptance Criteria

- Session Management collapsible contains `codex exec resume --output-schema` example
- CI/CD Integration collapsible contains `codex exec resume` example
- No HTML structure broken
- Both code blocks render correctly in browser
