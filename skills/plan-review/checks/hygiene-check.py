#!/usr/bin/env python3
"""Mechanical hygiene checks for the fsad-harness:plan-review skill files.

Two of this skill's acceptance criteria were originally phrased as "read every
occurrence and judge". That made them unfalsifiable in practice: three
independent adversarial reviewers each found real violations, each in different
places, and each round moved the line. The criteria were rewritten as the
mechanical tests below so that "does SKILL.md leak lens content" has one answer
rather than one answer per reader.

    AC-S2  (a) no command used as a lens evidence obligation in lenses.md
               reappears in SKILL.md, compared both exactly (after normalising
               placeholders/quotes/whitespace) and by SHAPE (command + operands,
               flags dropped, paths and placeholders collapsed) so that flag
               reordering and path->placeholder substitution are caught too.
           (b) SKILL.md contains no worked-example block.
    AC-R2  (a) the Path-conventions section carries a table ROW for each of
               plan location, baseline candidates, decisions sidecar, RUN_DIR.
           (b) no literal project path anywhere in SKILL.md except on lines
               listed by hash in checks/exempt-lines.txt.

Two adversarial audits shaped this file. The first returned WEAK and named ten
holes; the second confirmed six were closed by general fixes but found the
decisive one still open — every exemption was MINTABLE BY SKILL.md ITSELF, so a
single edit could create its own immunity and smuggle five violations past the
check. Exemptions now live in a separate hash-keyed file, which the file under
test cannot write to, and editing an exempted line revokes its own exemption.

KNOWN LIMITATIONS — this catches accidental drift, not a determined author:
  * Worked-example detection tests one typographic marker (`**X.`). Prose shaped
    like an example but marked differently ("**Example.**", "1. **A plan…**")
    is not detected.
  * Two-token command shapes (`ls <>`) are excluded from shape matching, so a
    restated `ls <some-doc>` obligation is caught only if verbatim. Including
    them produced false positives on every unrelated `ls` in the spine.
  * HARDCODED is an enumeration, so a convention this skill never used
    (`specs/`, `design/adr/`, a capitalised `Planning/`) is not covered.
  * MIN_LENS_COMMANDS counts command-shaped strings, including ones in prose,
    so a hollowed-out lenses.md could still clear the floor.
  * Nothing runs this automatically. It is a hand-run check until wired into a
    hook or CI.

Usage:  python3 skills/plan-review/checks/hygiene-check.py [SKILL.md] [lenses.md]
Exit 0 = clean. Exit 1 = violations, listed on stdout.
"""

import hashlib
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
SKILL_DIR = os.path.dirname(HERE)

SKILL = sys.argv[1] if len(sys.argv) > 1 else os.path.join(SKILL_DIR, 'SKILL.md')
LENSES = sys.argv[2] if len(sys.argv) > 2 else os.path.join(SKILL_DIR, 'lenses.md')

# Any of these starting a token makes the rest of the token run look like a shell
# command. Kept broad on purpose: a lens that starts using `jq` or `rg` tomorrow
# must not become invisible to this check.
CMD_WORDS = (r'git|grep|rg|ls|find|go|cat|wc|head|tail|sed|awk|jq|diff|npm|'
             r'python3?|gh|flagd')
CMD_RE = re.compile(r'\b(?:' + CMD_WORDS + r')\s+[^\s].{8,}')

# A degenerate lenses.md would make AC-S2(a) pass vacuously, so assert the file
# still carries roughly the command load it had when this floor was set.
MIN_LENS_COMMANDS = 13

failures = []


def fail(msg):
    failures.append(msg)


def detail(msg):
    failures.append('    ' + msg)


def read(path):
    if not os.path.exists(path):
        print('FAIL — file not found: %s' % path)
        sys.exit(1)
    with open(path) as fh:
        return fh.read()


skill_text = read(SKILL)
lens_text = read(LENSES)
skill_lines = list(enumerate(skill_text.split('\n'), start=1))
lens_lines = list(enumerate(lens_text.split('\n'), start=1))

if not skill_text.strip() or not lens_text.strip():
    print('FAIL — SKILL.md or lenses.md is empty')
    sys.exit(1)


# --------------------------------------------------------------- extraction
def commands_in(text):
    """Every command-looking string in `text`, from every place they hide.

    Inline backticks are the obvious case. Worked examples bury commands in a
    `ref: "..."` field. And the most natural way to leak a command into a spine
    document is to paste it into a fenced block — invisible to a backtick-only
    scan, which is how an earlier draft of this check missed them.
    """
    found = set()
    raw = []
    raw += re.findall(r'`([^`\n]+)`', text)
    raw += re.findall(r'ref:\s*"([^"]+)"', text)
    raw += re.findall(r"ref:\s*'([^']+)'", text)
    for block in re.findall(r'```[a-zA-Z]*\n(.*?)```', text, re.S):
        raw += block.split('\n')
    raw += text.split('\n')          # bare prose commands
    for span in raw:
        for m in CMD_RE.finditer(span.strip()):
            frag = m.group(0).strip().rstrip(',.;)|`"\'')
            if len(frag) > 12:
                found.add(frag)
    return found


def norm(s):
    """Exact-ish: placeholder names, quote style and whitespace do not matter."""
    s = re.sub(r'<[^>]*>', '<>', s)
    s = s.replace('"', "'")
    return re.sub(r'\s+', ' ', s).strip().lower()


def shape(s):
    """Aggressive: command + operand count, flags dropped, operands collapsed.

    Catches the two realistic drift shapes the audit found slipping through an
    exact comparison — reordered/extra flags, and a concrete path restated as a
    <placeholder> (or vice versa), which `norm` alone cannot see.
    """
    s = re.sub(r'<[^>]*>', '<>', s)
    s = s.replace('"', "'")
    toks = [t for t in re.split(r'\s+', s.strip()) if t]
    out = []
    for t in toks:
        if t.startswith('-'):
            continue                              # flag
        if '/' in t or t == '<>' or re.search(r'\.\w{1,5}$', t):
            t = '<>'                              # path / placeholder / filename
        out.append(t.lower())
    return ' '.join(out)


lens_cmds = commands_in(lens_text)
if len(lens_cmds) < MIN_LENS_COMMANDS:
    fail('AC-S2(a): lenses.md yields only %d commands (floor is %d) — the check '
         'would pass vacuously. Is lenses.md intact?' % (len(lens_cmds), MIN_LENS_COMMANDS))

lens_by_norm = {norm(c): c for c in lens_cmds}

# Shape matching is deliberately not applied to two-token shapes. `ls <>` is the
# shape of every `ls` of anything, so matching on it flags `ls <RUN_DIR>/...` as
# a restatement of `ls proposals/ledger-testing.md` — a false positive that says
# nothing about lens content leaking. Three tokens (command + subcommand/operand
# + operand) is where a shape starts being distinctive.
lens_by_shape = {}
for c in lens_cmds:
    sh = shape(c)
    if len(sh.split()) >= 3:
        lens_by_shape.setdefault(sh, c)


# ------------------------------------------------------------- exemptions
# Exemptions live in a SEPARATE file, keyed by SHA-256 of the exempted line.
#
# Every in-file exemption mechanism this script has tried (a line window around
# a marker, a marker sentence, a fenced block) was shown by audit to be MINTABLE
# BY SKILL.md ITSELF — an edit could create its own immunity and then smuggle
# violations into it. A hash list in a second file cannot be minted by editing
# the file under test, and editing an exempted line changes its hash, which
# revokes the exemption automatically.
EXEMPT_FILE = os.path.join(HERE, 'exempt-lines.txt')

exempt_hashes = {}
if os.path.exists(EXEMPT_FILE):
    for raw in open(EXEMPT_FILE):
        raw = raw.strip()
        if not raw or raw.startswith('#'):
            continue
        digest = raw.split()[0]
        reason = raw.split('#', 1)[1].strip() if '#' in raw else ''
        exempt_hashes[digest] = reason


def line_hash(ln):
    return hashlib.sha256(ln.strip().encode()).hexdigest()


def exempt(ln):
    return line_hash(ln) in exempt_hashes


# Section bounds are still needed to assert AC-R2(a) (the rows exist), but they
# no longer grant exemption to anything, so an unterminated or demoted heading
# can only cause a missing-row failure, never a silent immunity.
def section_rows(heading_prefix):
    rows, inside = [], False
    for n, ln in skill_lines:
        if ln.startswith(heading_prefix):
            inside = True
            continue
        # Stop at the next PEER heading only. '###' subheadings are part of this
        # section — Path conventions splits into "Read paths" / "Write paths" —
        # and breaking on them would miss the very tables being asserted.
        if inside and re.match(r'^##\s', ln):
            break
        if inside and ln.lstrip().startswith('|'):
            rows.append(ln)
    return rows


# ---------------------------------------------------------------- AC-S2 (a)
leaked = []
for n, ln in skill_lines:
    if exempt(ln):
        continue
    for cand in commands_in(ln):
        if norm(cand) in lens_by_norm:
            leaked.append((n, cand, lens_by_norm[norm(cand)], 'exact/paraphrase'))
        elif shape(cand) in lens_by_shape:
            leaked.append((n, cand, lens_by_shape[shape(cand)], 'same shape'))

if leaked:
    fail('AC-S2(a): lens evidence commands reproduced in SKILL.md')
    for n, got, src, how in leaked:
        detail('SKILL.md:%d  `%s`' % (n, got))
        detail('    %s of lenses.md `%s`' % (how, src))


# ---------------------------------------------------------------- AC-S2 (b)
EXAMPLE_RE = re.compile(r'^\s*(?:[-*+]\s*)?\*\*[0-9A-Za-z]\.\s')
examples = [(n, ln.strip()[:70]) for n, ln in skill_lines if EXAMPLE_RE.match(ln)]
if examples:
    fail('AC-S2(b): worked-example blocks present in SKILL.md')
    for n, ln in examples:
        detail('SKILL.md:%d  %s' % (n, ln))


# ---------------------------------------------------------------- AC-R2 (a)
rows = section_rows('## Path conventions')
if not rows:
    fail('AC-R2(a): no \'## Path conventions\' section with table rows in SKILL.md')
else:
    for label, needle in (('plan location', 'Plan location'),
                          ('baseline / spec+ADR dirs', 'Baseline candidates'),
                          ('decisions sidecar', 'Decisions sidecar'),
                          ('run directory', 'RUN_DIR')):
        if not any(needle in r for r in rows):
            fail('AC-R2(a): no table row for %s (looked for "%s" in a "|" row)'
                 % (label, needle))


# ---------------------------------------------------------------- AC-R2 (b)
# Bare `planning` is NOT listed: "planning document" and "a planning doc" are
# ordinary English this skill has to be able to write. What must not appear is a
# path — a directory name with a separator, or this skill's own artefact dir.
HARDCODED = [r'planning/', r'docs/adrs?\b', r'docs/rfcs?\b', r'\.plan-review']
offenders = []
for n, ln in skill_lines:
    if exempt(ln):
        continue
    for pat in HARDCODED:
        if re.search(pat, ln):
            offenders.append((n, pat, ln.strip()[:88]))
            break

if offenders:
    fail('AC-R2(b): literal project path on a line not listed in checks/exempt-lines.txt')
    for n, pat, ln in offenders:
        detail('SKILL.md:%d  [%s]  %s' % (n, pat, ln))


# ---------------------------------------------------------------------------
groups = [f for f in failures if not f.startswith('    ')]
if groups:
    print('FAIL — %d issue group(s):\n' % len(groups))
    for f in failures:
        print(f)
    sys.exit(1)

print('PASS')
print('  lens commands scanned : %d (floor %d)' % (len(lens_cmds), MIN_LENS_COMMANDS))
print('  SKILL.md lines        : %d' % len(skill_lines))
print('  path-convention rows  : %d' % len(rows))
print('  exempt lines          : %d, all by hash from %s'
      % (len(exempt_hashes), os.path.relpath(EXEMPT_FILE, SKILL_DIR)))
unused = [d for d in exempt_hashes
          if not any(line_hash(ln) == d for _, ln in skill_lines)]
if unused:
    print('  NOTE: %d exemption(s) match no line in SKILL.md — stale, remove them:' % len(unused))
    for d in unused:
        print('        %s  # %s' % (d[:16], exempt_hashes[d]))
sys.exit(0)
