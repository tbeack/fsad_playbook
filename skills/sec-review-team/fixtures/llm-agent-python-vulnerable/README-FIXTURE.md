# llm-agent-python-vulnerable — Test Fixture

**DO NOT DEPLOY. DO NOT COPY PATTERNS FROM HERE.**

Deliberately-vulnerable Python LLM agent fixture for the `sec-review-team` regression harness. Every vulnerability is intentional. Targets `prompt-injection-auditor`.

## Planted vulnerabilities

| # | Root issue | Specialist | Severity | Location |
|---|---|---|---|---|
| 1 | `llm-output-executed-as-code` | prompt-injection-auditor | critical | `agent.py:28` |
| 2 | `tool-shell-exec-no-auth-gate` | prompt-injection-auditor | critical | `agent.py:38` |
| 3 | `secret-in-system-prompt` | prompt-injection-auditor | high | `agent.py:7-11` |
| 4 | `prompt-concat-untrusted` | prompt-injection-auditor | high | `agent.py:16` |
| 5 | `tool-arbitrary-file-write` | prompt-injection-auditor | high | `agent.py:45-46` |
| 6 | `context-poisoning-rag` | prompt-injection-auditor | high | `rag.py:7-9` |
| 7 | `prompt-concat-rag` | prompt-injection-auditor | high | `rag.py:16` |

## Stack signals triggered

- `llm-agent` — `import anthropic` in source → roster adds `prompt-injection-auditor`; `input-validation-auditor` defers prompt-injection axis to specialist

## What the harness asserts

`expected-findings.jsonl` — minimum finding set matched on `root_issue` + `severity`.

`expected-coverage.jsonl` — prompt-injection-auditor must check all 7 coverage categories; must mark `memory-skill-injection` as `checked-clean` (no memory system in this fixture).

See `../webapp-express-vulnerable/README-FIXTURE.md` for harness assertion semantics.
