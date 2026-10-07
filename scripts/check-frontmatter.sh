#!/usr/bin/env bash
# check-frontmatter.sh — fail when a SKILL.md frontmatter block is not valid YAML.
# A bad block (e.g. an unquoted value that starts with a backtick) makes Claude Code
# drop every frontmatter field, so the skill loses its description silently.
#
# usage: scripts/check-frontmatter.sh [file ...]
#   no args → every skills/*/SKILL.md in this repo
# exit: 0 all parse, 1 at least one BAD file, 2 ruby missing
# Uses Ruby's YAML (ships with macOS) because PyYAML is not installed.

command -v ruby >/dev/null || { echo "check-frontmatter: ruby not found" >&2; exit 2; }

if [ "$#" -eq 0 ]; then
  root=$(cd "$(dirname "$0")/.." && pwd)
  set -- "$root"/skills/*/SKILL.md
fi

bad=0
for f in "$@"; do
  [ -f "$f" ] || { echo "BAD: $f — file not found"; bad=1; continue; }
  if ! err=$(awk 'NR==1&&/^---$/{f=1;next} f&&/^---$/{exit} f' "$f" \
    | ruby -ryaml -e 'YAML.safe_load(STDIN.read)' 2>&1 >/dev/null); then
    echo "BAD: $f — $(printf '%s\n' "$err" | grep -o '(<unknown>).*' | head -1)"
    bad=1
  fi
done
exit "$bad"
