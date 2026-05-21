# CLAUDE.md

## Project Overview

{{PROJECT_NAME}} — brief description of what this project does and who it's for.

## Tech Stack

- **Language / runtime** — e.g. TypeScript, Python, Go
- **Framework** — e.g. Next.js, FastAPI, Gin
- **Data layer** — e.g. PostgreSQL, SQLite, Redis
- **Tooling** — e.g. npm, Docker, GitHub Actions

## Project Structure

```
/{{PROJECT_NAME}}
├── CLAUDE.md                 # This file
├── README.md                 # Project overview and setup
├── CHANGELOG.md              # Version history
├── .gitignore
├── planning/
│   ├── design/               # Design docs and specs
│   ├── research/             # Research notes
│   ├── plan/                 # Implementation plans
│   └── to do/                # Active and completed tasks
│       └── completed/
└── src/                      # Source code
```

## Task Management

Tasks live in `planning/to do/todo.md` with unique identifiers (`TASK-001`, `TASK-002`, etc.).

When picking up a task:
1. Read `todo.md` to identify the next open item
2. Read its task plan if one exists in `planning/plan/`
3. Implement following the plan
4. Mark complete in `todo.md`
5. Update `CHANGELOG.md` with what changed

## Development Workflow

```bash
# Add your run / build commands here
```

## Research > Plan > Implement

**Never jump straight to coding.** Always:
1. **Research** — Understand the existing codebase and patterns
2. **Plan** — Write a task plan and verify with the user
3. **Implement** — Execute the plan, then verify it works

## Working Together

- Clarity over cleverness — the simple solution is usually correct
- Match existing patterns before introducing new ones
- When stuck: stop, step back, simplify, ask
