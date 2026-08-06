#!/usr/bin/env python3
"""Import + anonymize the engineering-skills / product-skills frameworks into skills/.

Re-run this after the private source repos change to refresh the local copies here.
Source repos are read-only inputs; nothing is ever written back to them.

See markdown/to do/task-cbp-343.md and
/Users/theobeack/Repo/imprivata/planning/plan/anonamization_plan.md for the
anonymization classes this implements (company name, branded paths, org/repo
URLs, internal domains, product names, design system, Figma links, people,
Jira conventions, internal records, CI secrets).

Usage:
    python3 scripts/import_imprivata_skills.py
"""
import re
import shutil
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
DEST_ROOT = REPO_ROOT / "skills"

SOURCES = {
    "engineering-skills": Path("/Users/theobeack/Repo/imprivata/skills/engineering-skills"),
    "product-skills": Path("/Users/theobeack/Repo/imprivata/skills/product-skills"),
}

# Paths (relative to repo root) excluded entirely from the copy.
# Classes 6/7 (design system, Figma links) and 10 (internal records) from the
# anonymization plan, plus junk/build-artifact dirs that should never ship.
EXCLUDE = {
    "engineering-skills": {
        "changes/archive",
        "context/wiki",
        "docs/start-product-backlog-intake-test-report.md",
        "dist",
    },
    "product-skills": {
        "AGENT_RUN_PLAN.md",
        "changes/archive",
        "skills/imprivata-design-guide/references",
        "skills/imprivata-product-design/references",
    },
}

ALWAYS_SKIP_DIRNAMES = {".git", "__pycache__", ".venv", "node_modules"}
ALWAYS_SKIP_FILENAMES = {".DS_Store"}
ALWAYS_SKIP_SUFFIXES = {".pyc"}

# Path component renames (class 2 — branded paths). Matched against each
# path segment (dir or file name) during copy.
PATH_RENAMES = {
    "imprivata-figma": "figma",
    "imprivata-figma.md": "figma.md",
    "imprivata-product-design": "product-design",
    "imprivata-product-design.md": "product-design.md",
    "imprivata-design-guide": "design-guide",
    "imprivata-feature-discovery": "feature-discovery",
    "imprivata-context.md": "company-context.md",
    "imprivata.yaml": "product-membership.yaml",
}

def _case_aware(title_form, slug_form=None):
    """Return a re.sub replacement fn: ALLCAPS/Title -> title_form, lowercase -> slug_form.

    Handles product-name tokens that double as both prose names ("EAM") and
    machine slugs/identifiers (`product_id: eam`, `products/eam/`).
    """
    if slug_form is None:
        slug_form = title_form.lower().replace(" ", "-")

    def repl(m):
        s = m.group(0)
        if s.islower():
            return slug_form
        return title_form

    return repl


# Text substitutions applied to every text file's contents, in order.
# Order matters: most specific/structural patterns first, generic
# word-boundary catch-alls last.
SUBSTITUTIONS = [
    # --- structural / mechanical (class 1, 3, 4) ---
    (re.compile(r"imprivata-shared-tools"), "framework-maintainers"),
    (re.compile(r"imprivata/artifact/v1"), "agentic/artifact/v1"),
    (re.compile(r"github\.com/imprivata-pas/[^\s)\]]*"), "<removed — internal-only repository>"),
    (re.compile(r"github\.com/imprivata/eam-client"), "<removed — internal-only repository>"),
    (re.compile(r"[\w.-]*joel-burleson-davis-imprivata/engineering-operating-model"), "<removed — internal-only repository>"),
    # Note: NOT "jira.example.com" — that string itself matches the leak-scan
    # gate's own jira\.[a-z-]+\.(com|net) pattern (a "jira." dot-prefixed
    # domain of any kind trips it, including a compliant example one).
    (re.compile(r"jira\.imprivata\.com"), "jira-instance.example.com"),
    # Jira issue-key / Confluence space-key uses of EAM must be degenericized
    # to a plain project-key placeholder *before* the product-name pass below,
    # or "EAM-254" becomes the nonsensical "Access Manager-254".
    (re.compile(r"\bEAM-(?=\d)"), "PROJ-"),
    (re.compile(r"/EAM/"), "/PROJ/"),
    (re.compile(r"(?:[\w-]+\.)?atlassian\.net"), "confluence.example.com"),
    (re.compile(r"pkg\.securelink\.com"), "pkg.example.com"),
    # Any imprivata.com subdomain (docs., www., bare) — preserve the subdomain
    # label so "docs.imprivata.com" reads as "docs.example.com", not a bare domain.
    (re.compile(r"\b(?:([\w-]+)\.)?imprivata\.com"), lambda m: f"{m.group(1)}.example.com" if m.group(1) and m.group(1) != "www" else "example.com"),
    (re.compile(r"\bIMPRIVATA_"), "ORG_"),  # identifier-safe env/secret name prefixes

    # --- branded skill/command cross-references (class 2) — must run before
    # the generic "imprivata-" catch-all below, or these collapse to
    # "org-figma" etc. instead of matching their renamed directories ---
    (re.compile(r"\bimprivata-figma\b"), "figma"),
    (re.compile(r"\bimprivata-product-design\b"), "product-design"),
    (re.compile(r"\bimprivata-design-guide\b"), "design-guide"),
    (re.compile(r"\bimprivata-feature-discovery\b"), "feature-discovery"),

    (re.compile(r"imprivata-"), "org-"),  # residual slug prefix (lowercase)
    (re.compile(r"-imprivata\b"), "-org"),  # residual slug suffix (lowercase)

    # --- Figma links (class 7) — catch-all beyond the stubbed references/ dirs ---
    (re.compile(r"https?://(?:www\.)?figma\.com/(?:design|files)/\S*"), "<figma-app-url>/design/:fileKey/:fileName"),

    # --- product names (class 5) — case-aware: ALLCAPS/Title in prose,
    # lowercase where the token is doing double duty as a slug/identifier ---
    (re.compile(r"\bEAM\b", re.I), _case_aware("Access Manager")),
    (re.compile(r"\bSecureLink\b", re.I), _case_aware("Remote Connect")),
    (re.compile(r"\bOneSign\b", re.I), _case_aware("SecurePass")),
    (re.compile(r"\bConfirmID\b", re.I), _case_aware("IdentityConfirm")),
    (re.compile(r"\bPatientSecure\b", re.I), _case_aware("Patient Verification")),
    (re.compile(r"\bGroundControl\b", re.I), _case_aware("Fleet Console")),
    (re.compile(r"\bEPCS\b"), "regulatory module"),
    (re.compile(r"\bFairWarning\b"), "regulatory module"),

    # --- Jira conventions (class 9) ---
    (re.compile(r"customfield_\d{5}"), "customfield_XXXXX"),

    # --- prose-leak fixes found during the Phase 3 human review pass (real
    # internal repo/product names, a real employee username in a full-name
    # dotted form, and real-looking ticket examples that carried no banned
    # string on their own, so the automated leak-scan gate above missed them)
    # see task-cbp-343.md AC: "manual read-through ... with any findings fixed".
    # Must run before the bare-surname and bare-PAS rules below, or those
    # consume the more specific patterns' input first. ---
    (re.compile(r"preston\.broderick", re.I), "user.redacted"),
    (re.compile(r"alejo\.castro", re.I), "jane.doe"),
    (re.compile(r"Alejo Castro"), "Jane Doe"),
    (re.compile(r"spaces/PAS/pages/264879148/RBA\+Integration"), "spaces/PROJ/pages/000000000/Feature+Integration"),
    (re.compile(r"\bPASTO-(\d+)\b"), r"PROJ-\1"),
    (re.compile(r"\bPAS-(\d+)\b"), r"TASK-\1"),
    (re.compile(r"\bSDK-(\d+)\b"), r"LIB-\1"),
    (re.compile(r"\bBUILD-(\d+)\b"), r"INFRA-\1"),
    (re.compile(r"CPAM"), "ACCESSCONSOLE"),  # always all-caps in source, incl. as CPAM_MODE env vars
    (re.compile(r"VPAM"), "VAULTCONSOLE"),
    (re.compile(r"\bDDI\b", re.I), _case_aware("Directory Sync")),
    (re.compile(r"\bPAS\b", re.I), _case_aware("Privileged Access")),  # after PAS-\d+/PASTO-\d+/spaces-PAS- above, or those collapse wrong
    (re.compile(r"\bEAMA\b", re.I), _case_aware("Edition A")),
    (re.compile(r"\bMAMA\b", re.I), _case_aware("Edition B")),
    (re.compile(r"\brba-client\b"), "auth-client-lib"),
    (re.compile(r"\bpas-orchestrator\b"), "access-orchestrator"),
    (re.compile(r"dockerfiles-buildbox"), "container-buildbox"),
    (re.compile(r"r\.w\.w\.a\.mx\."), "com.example.app."),
    (re.compile(r"r\.web\.api\."), "com.example.app.api."),
    (re.compile(r"digicert/-keylocker"), "a third-party CLI tool"),

    # --- people (class 8) — known contributor surnames from the anonymization
    # scan. No left word-boundary: corporate usernames concatenate a first
    # initial directly onto the surname (e.g. "pbroderick"). ---
    (re.compile(r"[a-z]?burleson-davis\b", re.I), "user-redacted"),
    (re.compile(r"[a-z]?niedelman\b", re.I), "user-redacted"),
    (re.compile(r"[a-z]?burleson\b", re.I), "user-redacted"),
    (re.compile(r"[a-z]?broderick\b", re.I), "user-redacted"),
    (re.compile(r"[a-z]?boreda\b", re.I), "user-redacted"),

    # --- company name, prose forms (class 1) — ordered specific-to-generic ---
    (re.compile(r"Imprivata's\b"), "Our"),
    (re.compile(r"\bthe Imprivata\b"), "the"),
    (re.compile(r"\bIMPRIVATA\b"), "THE ORGANIZATION"),
    (re.compile(r"\bImprivata\b"), "the organization"),
    (re.compile(r"\bimprivata\b"), "org"),
]


def rename_path_parts(rel_path: Path) -> Path:
    parts = []
    for part in rel_path.parts:
        parts.append(PATH_RENAMES.get(part, part))
    return Path(*parts)


def is_excluded(rel_path_str: str, exclude_set: set) -> bool:
    for ex in exclude_set:
        if rel_path_str == ex or rel_path_str.startswith(ex + "/"):
            return True
    return False


def transform_text(text: str) -> str:
    for pattern, replacement in SUBSTITUTIONS:
        text = pattern.sub(replacement, text)
    return text


def copy_repo(name: str, src_root: Path, dest_root: Path):
    exclude_set = EXCLUDE.get(name, set())
    if dest_root.exists():
        shutil.rmtree(dest_root)

    for path in sorted(src_root.rglob("*")):
        rel = path.relative_to(src_root)
        rel_str = str(rel)

        if any(part in ALWAYS_SKIP_DIRNAMES for part in rel.parts):
            continue
        if is_excluded(rel_str, exclude_set):
            continue
        if path.is_dir():
            continue
        if path.name in ALWAYS_SKIP_FILENAMES:
            continue
        if path.suffix in ALWAYS_SKIP_SUFFIXES:
            continue

        dest_rel = rename_path_parts(rel)
        dest_path = dest_root / dest_rel
        dest_path.parent.mkdir(parents=True, exist_ok=True)

        try:
            text = path.read_text(encoding="utf-8")
        except (UnicodeDecodeError, ValueError):
            shutil.copyfile(path, dest_path)
            continue

        dest_path.write_text(transform_text(text), encoding="utf-8")

    print(f"[{name}] copied {src_root} -> {dest_root}")


# --- Stub content written after the main copy, replacing excised class-6/10 content ---

DESIGN_REFERENCES_STUB = {
    "README.md": """# References (stub)

This directory ships empty. The original design-system reference material
(visual foundations, content & messaging guidelines, source registry, intake
questions, creation approaches) is specific to one organization's internal
design system and was not carried over.

To use this skill, populate this directory with your own design system's
equivalents:

- `visual-foundations.md` — color, type, spacing, and component tokens
- `content-and-messaging.md` — voice, tone, and terminology guidelines
- `source-registry.md` — a registry pattern mapping design source links
  (e.g. Figma files) to the artifacts they inform
- `intake-questions.md` — the questions this skill asks before generating
  design work
- `creation-approaches.md` — the approaches this skill can take when
  generating design work
""",
}

CHANGES_README = """# changes/ (convention doc)

Each in-flight change gets a directory here (`<date>-<type>-<slug>-<id>/`)
holding its requirements, acceptance criteria, and verification notes. On
completion, the skill that finalizes changes moves the directory into
`archive/`.

This export ships with an empty `archive/` — the original archived change
records were internal-only and were not carried over.
"""

WIKI_README = """# context/wiki/ (ships empty)

This directory holds an LLM-maintained knowledge base about the adopting
product/repo (architecture, conventions, decisions, personas, etc.). See
`templates/wiki-schema.md` for the page format and the `wiki` skill for how
pages are created, queried, and pruned.

The original wiki pages here described one organization's internal product
and were not carried over — run the wiki skill's seed/inspect operation
against your own codebase to populate this directory.
"""

COMPANY_CONTEXT_STUB = """# Company context

(blank — populate with your organization's context before use)
"""


def write_stub(path: Path, content: str):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")


def apply_stubs():
    eng = DEST_ROOT / "engineering-skills"
    prod = DEST_ROOT / "product-skills"

    write_stub(eng / "changes" / "README.md", CHANGES_README)
    write_stub(eng / "changes" / "archive" / ".gitkeep", "")

    write_stub(eng / "context" / "wiki" / "README.md", WIKI_README)

    write_stub(eng / "memory" / "company-context.md", COMPANY_CONTEXT_STUB)

    write_stub(prod / "changes" / "README.md", CHANGES_README)
    write_stub(prod / "changes" / "archive" / ".gitkeep", "")

    for skill_dir in ("design-guide", "product-design"):
        for fname, content in DESIGN_REFERENCES_STUB.items():
            write_stub(prod / "skills" / skill_dir / "references" / fname, content)


def main():
    for name, src in SOURCES.items():
        if not src.exists():
            print(f"source repo not found, skipping: {src}", file=sys.stderr)
            continue
        copy_repo(name, src, DEST_ROOT / name)

    apply_stubs()
    print("Done. Run the leak-scan (see task-cbp-343.md Phase 3) to verify.")


if __name__ == "__main__":
    main()
