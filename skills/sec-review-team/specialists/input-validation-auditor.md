---
name: input-validation-auditor
preferred_subagent_type: pr-review-toolkit:code-reviewer
fallback_subagent_type: general-purpose
relevant_for_stacks: [all]
effort: high
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
> If this run passed you a pass number (`This is pass <i> of up to MAX_PASSES...`), you are one pass of a loop-until-dry consensus fan-out (Step 3a, 2-8 passes) — write your findings to `input-validation-auditor.pass<i>.findings.jsonl` / `.pass<i>.status.json` instead of the canonical files; the orchestrator tallies across passes once the loop stops (a dry round with no new `root_issue`s, or the 8-pass cap).
>
> **Output contract:** see [`docs/output-contract.md`](../docs/output-contract.md) — identical for every specialist in this library.
>
> **Hard rules:** flag everything you notice, even low-confidence hunches — use `confidence: possible` or `unverified` for speculative findings rather than omitting them, the Step 4.5 validator step decides keep or drop, not you. Otherwise per the shared output contract.
>
> Report: absolute paths of the four outputs + one-line severity count.

## Output files
- `input-validation-auditor.{md, findings.jsonl, coverage.jsonl, status.json}`

## Allowed tools
Per the shared [output-format contract](../docs/output-contract.md). `Write` — **scoped** to `input-validation-auditor.{md,findings.jsonl,coverage.jsonl,status.json}` (canonical) and `input-validation-auditor.pass<i>.{findings.jsonl,status.json}` (per-pass, Step 3a) only — the pass-scoped paths this specialist is instructed to write under the loop-until-dry consensus fan-out above must be in scope, not just the four canonical filenames.

## Coverage categories this specialist owns
- `sql-injection`, `fts5-syntax-injection`, `command-injection`, `path-traversal`, `zip-slip`, `xss`, `deserialization`, `ipc-payload-validation`, `ssrf`, `open-redirect`
- If `prompt-injection-auditor` is not in roster: also `prompt-injection`

## Scanner integration
- `semgrep --config auto` — pattern-based catches. Triage scanner hits + find what rules miss.
- `bandit -r` (Python) — SAST for Python.
- `brakeman` (Ruby on Rails).
