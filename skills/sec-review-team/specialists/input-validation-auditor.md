---
name: input-validation-auditor
preferred_subagent_type: pr-review-toolkit:code-reviewer
fallback_subagent_type: general-purpose
relevant_for_stacks: [all]
---

# input-validation-auditor

## Primary scope
Injection vectors — tracing every external input to its sink.

- **SQL injection** — string-interpolated SQL, template literals, FTS5 `MATCH` syntax (parameterization alone doesn't save you from FTS5 query-syntax injection).
- **Command / path traversal** — `fs::*`, `Command::*`, `exec`, `os.system`, dialog APIs, archive extraction (zip-slip).
- **XSS** — `dangerouslySetInnerHTML`, `innerHTML`/`outerHTML`, Markdown→HTML serializers, template engines with auto-escape disabled.
- **Deserialization** — JSON/YAML/bincode/pickle boundaries; prototype pollution via `Object.assign(target, JSON.parse(...))`.
- **IPC payload validation** — do backends validate incoming args via typed structs or trust the caller?
- **Open-redirect / SSRF** — URL parameters reaching `fetch`/`reqwest`/`curl` without host allowlist.

## Overlap with other specialists
- **Primary owner of:** SQLi, XSS, command/path traversal, deserialization, IPC payload validation, SSRF.
- **Cross-cuts with:**
  - `prompt-injection-auditor` — when present in the roster, prompt injection belongs to that specialist; defer via `coverage.status=deferred-to-other-specialist`.
  - `secrets-crypto-auditor` — credentials reaching logs from validation bypasses are their scope.
  - `auth-authz-auditor` — authentication of input sources is theirs; validation of input content is yours.

## Brief (passed to the Agent)

> Review injection vectors in `<TARGET>` (scope: `<SCOPE>`). Stack: `<STACK CONTEXT>`. Trace every external input to its sink. Axes: SQL injection (including FTS5 query-syntax), command/path traversal (zip-slip included), XSS, deserialization, IPC payload validation, SSRF/open-redirect. If `prompt-injection-auditor` is in the run's roster, prompt injection is theirs — defer.
>
> **Output contract (four files in `<TARGET>/.planning/security-review/`):** `input-validation-auditor.{md, findings.jsonl, coverage.jsonl, status.json}`. Conform to `.claude/skills/sec-review-team/schema/{finding,coverage}.schema.json`. See the `auth-authz-auditor` brief for full file-format details — identical contract.
>
> **Prose format:** `[SEVERITY] <file>:<line> — <issue>\nExploit / Fix / Evidence`. Group by severity.
>
> **Confidence required on every finding** (`certain|likely|possible|unverified`). Negative findings (clean/N/A) require searches + search_limits in `coverage.jsonl`.
>
> **Hard rules:** read-only (tools are allowlisted); cite evidence; no speculation; emit coverage for every category in your scope.
>
> Report: absolute paths of the four outputs + one-line severity count.

## Output files
- `input-validation-auditor.{md, findings.jsonl, coverage.jsonl, status.json}`

## Allowed tools
Same as `auth-authz-auditor.md` allowed-tools section. `Write` scoped to this specialist's four output file paths only.

## Coverage categories this specialist owns
- `sql-injection`, `fts5-syntax-injection`, `command-injection`, `path-traversal`, `zip-slip`, `xss`, `deserialization`, `ipc-payload-validation`, `ssrf`, `open-redirect`
- If `prompt-injection-auditor` is not in roster: also `prompt-injection`

## Scanner integration
- `semgrep --config auto` — pattern-based catches. Triage scanner hits + find what rules miss.
- `bandit -r` (Python) — SAST for Python.
- `brakeman` (Ruby on Rails).
