#!/usr/bin/env bash
# Stop hook — fires at the end of EVERY session (unlike tb-log-summary.sh,
# which only fires when a task is active). Skips trivial sessions cheaply,
# then launches a detached, non-blocking headless Claude call that reads the
# ending session's transcript and writes memory recommendations to
# ~/Repo/memories/. Never blocks session exit — always exits 0 immediately,
# whether or not the background analysis was launched.
set -euo pipefail

INPUT=$(cat)
SESSION_ID=$(echo "$INPUT" | jq -r '.session_id // ""')
TRANSCRIPT=$(echo "$INPUT" | jq -r '.transcript_path // ""')

[[ -n "$SESSION_ID" && -f "$TRANSCRIPT" ]] || exit 0

# Triviality filter — skip sessions unlikely to contain anything worth
# recommending, before spending an API call. Cheap grep, no LLM needed.
MIN_USER_TURNS="${TB_MEMORY_MIN_USER_TURNS:-4}"
USER_TURNS=$(grep -c '"type":"user"' "$TRANSCRIPT" 2>/dev/null || echo 0)
(( USER_TURNS >= MIN_USER_TURNS )) || exit 0

GIT_COMMON=$(git rev-parse --git-common-dir 2>/dev/null)
if [[ "$GIT_COMMON" = /* ]]; then REPO=$(basename "$(dirname "$GIT_COMMON")");
else REPO=$(basename "$(git rev-parse --show-toplevel 2>/dev/null || pwd)"); fi
[[ -n "$REPO" ]] || REPO="no-repo"

MEMORIES_DIR="${TB_MEMORIES_DIR:-$HOME/Repo/memories}"
mkdir -p "$MEMORIES_DIR"

DATE=$(date +%F)
# Full session UUID (not truncated) guarantees uniqueness — see task-tbs-075.md.
OUTPUT_FILE="${MEMORIES_DIR}/${DATE}_${REPO}_${SESSION_ID}.md"
LOG_FILE="/tmp/tb-memory-recommend-${SESSION_ID}.log"
PERMS_FILE="/tmp/tb-memory-recommend-perms-${SESSION_ID}.json"

# --add-dir does NOT confine Write (it only widens access), and
# --permission-mode bypassPermissions skips directory-boundary checks
# entirely (Write can then reach anywhere) — verified empirically against
# a real headless invocation while implementing this hook. True confinement
# needs --permission-mode dontAsk (denies, does not hang, on anything not
# explicitly allowed) plus an explicit per-path allowlist: Read on the exact
# transcript file, Edit (not Write — Edit(path) is the rule name that
# actually matches file-write permission checks) on the memories dir only.
cat > "$PERMS_FILE" <<PERMSEOF
{
  "permissions": {
    "allow": [
      "Read(//${TRANSCRIPT#/})",
      "Edit(//${MEMORIES_DIR#/}/**)"
    ]
  }
}
PERMSEOF

PROMPT=$(cat <<PROMPTEOF
You are running non-interactively with no human available to answer questions. Do not ask for clarification, do not stop to request a summary, and do not wait for input. Read the file yourself and write your best analysis directly. If the transcript is large, read it in chunks (e.g. using the Read tool offset and limit parameters) rather than giving up or asking for a summary. If something is genuinely uncertain, note the uncertainty inside the output file itself rather than asking a question.

Read our entire conversation. Pull out every correction I made, every preference I stated, and anything you would do differently next time. Then tell me exactly where in my context files to save it so my next session starts sharper.

The full transcript of this conversation is a JSONL file (one JSON event per line) at:
${TRANSCRIPT}

Read it, then write your findings to this exact file path using the Write tool (it does not exist yet, create it):
${OUTPUT_FILE}

Format the file as markdown. Start with a header naming the session (repo: ${REPO}, date: ${DATE}, session id: ${SESSION_ID}), then one entry per correction, preference, or lesson. For each entry, give the concrete recommendation (what to save) and exactly where to save it (which file, e.g. a CLAUDE.md or a project memory file, and why there). If the conversation has nothing substantive to extract, write a short file saying so rather than inventing content. You must end this session by calling Write on the output path above — that is the only acceptable way this task finishes.
PROMPTEOF
)

# Detached background call — the hook process must not wait on this.
# --tools "Read,Write" excludes Bash/Edit/Glob/every other tool from ever
# being exposed. --permission-mode dontAsk + --settings "$PERMS_FILE" hard-
# confines the exposed Read/Write to exactly the transcript file (read) and
# the memories dir (write) — anything else is denied, not prompted, so this
# stays fully unattended.
nohup claude -p "$PROMPT" \
  --model haiku \
  --output-format text \
  --permission-mode dontAsk \
  --tools "Read,Write" \
  --settings "$PERMS_FILE" \
  --max-budget-usd 0.50 \
  --no-session-persistence \
  > "$LOG_FILE" 2>&1 &
disown

exit 0
