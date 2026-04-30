#!/usr/bin/env bash
# sec-review-team harness runner. Compares the skill's actual output against
# expected-findings.jsonl / expected-coverage.jsonl for each fixture.
#
# Usage: ./run-harness.sh [fixture-name|all]
#
# Exit codes:
#   0 — all expected findings detected
#   1 — at least one expected finding missing (regression)
#   2 — at least one expected coverage category missing or marked not-checked
#   3 — invocation / setup error
#
# Requires: jq. Requires that `/sec-review-team` can be invoked from the CLI
# (or that the harness knows how to drive it via the SDK — see SKILL.md).

set -euo pipefail

FIXTURES_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TARGET="${1:-all}"

# Check tooling
command -v jq >/dev/null 2>&1 || { echo "ERROR: jq not installed" >&2; exit 3; }

run_fixture() {
  local fixture_dir="$1"
  local name
  name="$(basename "$fixture_dir")"
  echo "=== Fixture: $name ==="

  [[ -f "$fixture_dir/expected-findings.jsonl" ]] || { echo "  SKIP: no expected-findings.jsonl"; return 0; }

  # Invoke the skill. Replace this line with the real invocation in your CI.
  # In CI: assume a helper script `sec-review-team-invoke <path> <scope>` is on PATH
  # that drives the skill and waits for REPORT.md to land.
  if [[ -n "${SEC_REVIEW_INVOKE:-}" ]]; then
    "$SEC_REVIEW_INVOKE" "$fixture_dir" all
  else
    echo "  WARN: SEC_REVIEW_INVOKE not set — skipping live run; comparing against whatever is already in $fixture_dir/.planning/security-review/"
  fi

  local results_dir="$fixture_dir/.planning/security-review"
  [[ -d "$results_dir" ]] || { echo "  FAIL: no results at $results_dir" >&2; return 1; }

  # Aggregate all findings.jsonl into a single stream for matching
  local actual_findings
  actual_findings="$(cat "$results_dir"/*.findings.jsonl 2>/dev/null || true)"

  local actual_coverage
  actual_coverage="$(cat "$results_dir"/*.coverage.jsonl 2>/dev/null || true)"

  # Check each expected finding: match on root_issue present in actual output
  local missing_findings=0
  while IFS= read -r line; do
    [[ -z "$line" ]] && continue
    local expected_root expected_severity
    expected_root="$(echo "$line" | jq -r '.root_issue')"
    expected_severity="$(echo "$line" | jq -r '.severity')"

    if ! echo "$actual_findings" | jq -e --arg r "$expected_root" --arg s "$expected_severity" 'select(.root_issue == $r and .severity == $s)' >/dev/null 2>&1; then
      echo "  MISSING finding: $expected_root ($expected_severity)"
      missing_findings=$((missing_findings + 1))
    fi
  done < "$fixture_dir/expected-findings.jsonl"

  # Check each expected coverage entry
  local missing_coverage=0
  if [[ -f "$fixture_dir/expected-coverage.jsonl" ]]; then
    while IFS= read -r line; do
      [[ -z "$line" ]] && continue
      local cat specialist
      cat="$(echo "$line" | jq -r '.category')"
      specialist="$(echo "$line" | jq -r '.specialist')"

      if ! echo "$actual_coverage" | jq -e --arg c "$cat" --arg s "$specialist" 'select(.category == $c and .specialist == $s and (.status == "checked-clean" or .status == "checked-issues-found"))' >/dev/null 2>&1; then
        echo "  MISSING coverage: $cat by $specialist"
        missing_coverage=$((missing_coverage + 1))
      fi
    done < "$fixture_dir/expected-coverage.jsonl"
  fi

  if (( missing_findings > 0 )); then
    echo "  FAIL: $missing_findings expected finding(s) not detected"
    return 1
  fi
  if (( missing_coverage > 0 )); then
    echo "  FAIL: $missing_coverage expected coverage entr(y|ies) missing"
    return 2
  fi
  echo "  PASS"
  return 0
}

exit_code=0
if [[ "$TARGET" == "all" ]]; then
  for fixture_dir in "$FIXTURES_DIR"/*/; do
    fixture_dir="${fixture_dir%/}"
    [[ "$(basename "$fixture_dir")" == "README.md" ]] && continue
    [[ -d "$fixture_dir" ]] || continue
    run_fixture "$fixture_dir" || exit_code=$?
  done
else
  run_fixture "$FIXTURES_DIR/$TARGET" || exit_code=$?
fi

echo ""
if (( exit_code == 0 )); then
  echo "=== HARNESS PASS ==="
else
  echo "=== HARNESS FAIL (exit $exit_code) ==="
fi
exit "$exit_code"
