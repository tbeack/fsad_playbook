#!/usr/bin/env bash
# resync-skills.sh — bring the skills/ forks up to the tb_skills version (CBP-658).
#
# usage: scripts/resync-skills.sh <path to tb_skills checkout>
#
# For each shared skill it copies every file from tb_skills/skills/<name>/ into
# skills/<name>/ and applies the fixed rewrites:
#   tb:<skill>                        -> fsad-harness:<skill>
#   ~/.claude/commands/tb/*.yaml      -> ${CLAUDE_PLUGIN_ROOT}/skills/add-task/add-task-projects.yaml
#   ~/.claude/skills/<this skill>/    -> (skill-relative path)
#   "Theo's "                         -> "your "
#   /Users/theobeack                  -> ~
# Never deletes, never writes outside skills/. Files with no tb_skills source stay as they are.
# Skipped on purpose (kept as the fsad fork): add-task/add-task-projects.yaml, sync/projects.yaml,
# prd/roles/ (the fsad prd embeds the Analyst and PM briefs in SKILL.md),
# sec-review-team/docs/tradeoffs.md (fsad wording points at the playbook's design doc).
# After a run, hand-edit the tb-only machinery out (see task-cbp-658.md) and run check-frontmatter.sh.

set -euo pipefail

src_root=${1:?usage: resync-skills.sh <tb_skills path>}
src_root=$(cd "$src_root" && pwd)
repo=$(cd "$(dirname "$0")/.." && pwd)
dest_root="$repo/skills"

shared=(ac add-task code-review-team do-task estimate init next plan plan-review prd
  prompt-improver sec-review-team set-context ship ship-it spec-review sync)

for name in "${shared[@]}"; do
  src="$src_root/skills/$name"
  [ -d "$src" ] || { echo "skip $name: no tb_skills source" >&2; continue; }
  while IFS= read -r -d '' f; do
    rel=${f#"$src"/}
    case "$name/$rel" in
      add-task/add-task-projects.yaml|sync/projects.yaml|prd/roles/*|sec-review-team/docs/tradeoffs.md) continue ;;
      *__pycache__*) continue ;;
    esac
    out="$dest_root/$name/$rel"
    mkdir -p "$(dirname "$out")"
    tmp=$(mktemp)
    case "$rel" in
      fixtures/*) cp "$f" "$tmp" ;;
      *.md|*.py|*.txt|*.json|*.yaml|*.sh)
        NAME="$name" perl -pe '
          s{(?<![A-Za-z0-9_-])tb:}{fsad-harness:}g;
          s{~/\.claude/commands/tb/(?:add-task-)?projects\.yaml}{\${CLAUDE_PLUGIN_ROOT}/skills/add-task/add-task-projects.yaml}g;
          s{~/\.claude/skills/\Q$ENV{NAME}\E/}{}g;
          s{Theo\x27s }{your }g;
          s{/Users/theobeack}{~}g;
        ' "$f" > "$tmp" ;;
      *) cp "$f" "$tmp" ;;
    esac
    if [ -f "$out" ] && cmp -s "$tmp" "$out"; then
      rm -f "$tmp"; continue
    fi
    if [ -f "$out" ]; then
      echo "== $name/$rel: $(diff "$out" "$tmp" | grep -c '^[<>]') changed lines"
    else
      echo "== $name/$rel: new file"
    fi
    mv "$tmp" "$out"
  done < <(find "$src" -type f -print0 | sort -z)
done
