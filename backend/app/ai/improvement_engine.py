"""
Simple, deterministic improvement engine for offline use.

Generates structured guidance from resume text, predicted role, and ATS output.

Returns a dict with sections:
- role
- ats_score
- summary
- strengths
- weaknesses
- skills_to_add
- skill_phrases
- experience_bullets
- projects
- formatting_tips
- action_items
- improvements
"""

import re
from collections import Counter
from typing import List, Dict


# -------------------- CONSTANTS --------------------

_STOPWORDS = {
    "and", "or", "the", "a", "an", "of", "in", "on", "for", "to", "with",
    "as", "by", "at", "from", "that", "this", "is", "are", "was", "were",
    "be", "have", "has", "had", "experience", "years", "year"
}

_ACTION_VERBS = re.compile(
    r"\b("
    r"built|developed|implemented|designed|created|optimized|"
    r"worked|led|managed|deployed|integrated|maintained|"
    r"engineered|collaborated|automated"
    r")\b",
    re.I
)

_TECH_CONTEXT = re.compile(
    r"\b("
    r"api|backend|frontend|service|application|system|"
    r"database|pipeline|feature|module|platform|tool|"
    r"react|node|python|java|sql|mongodb|docker"
    r")\b",
    re.I
)

_NOISE_PATTERNS = re.compile(
    r"(@|\+?\d{10,}|\b(gpa|cgpa|percentage|marks)\b|"
    r"\b20\d{2}\b|linkedin|github|email|phone|"
    r"certificat|course|nxtwave|highly motivated|quick learner)",
    re.I
)

_EXPERIENCE_START_KEYS = (
    "experience",
    "work experience",
    "professional experience",
    "internship",
    "employment",
    "projects"
)

_EXPERIENCE_STOP_KEYS = (
    "education",
    "skills",
    "certifications",
    "achievements",
    "summary",
    "contact"
)


# -------------------- HELPERS --------------------

def _normalize_token(t: str) -> str:
    return re.sub(r"[^a-z0-9\-\.]", "", t.lower()).strip()


def top_keywords(text: str, n: int = 12) -> List[str]:
    tokens = re.findall(r"[A-Za-z0-9\.\-]+", text.lower())
    tokens = [_normalize_token(t) for t in tokens if t and t not in _STOPWORDS]
    counts = Counter(tokens)
    return [w for w, _ in counts.most_common(n)]


def _make_summary(text: str, role: str, kws: List[str]) -> str:
    lines = [l.strip() for l in text.splitlines() if l.strip()]
    if lines:
        first = re.sub(_NOISE_PATTERNS, "", lines[0]).strip()
        if len(first.split()) > 6:
            return first[:280]
    return (
        f"{role} with experience in {', '.join(kws[:6])}. "
        "Demonstrates practical knowledge across relevant tools and frameworks."
    )


# -------------------- EXPERIENCE EXTRACTION --------------------

def _extract_experience_section(text: str) -> str:
    lines = text.splitlines()
    capture = False
    collected = []

    for line in lines:
        l = line.lower().strip()

        if any(k in l for k in _EXPERIENCE_START_KEYS):
            capture = True
            continue

        if capture and any(k in l for k in _EXPERIENCE_STOP_KEYS):
            break

        if capture:
            collected.append(line)

    return "\n".join(collected)


def _extract_experience_candidates(text: str, limit: int = 6) -> List[str]:
    lines = [l.strip() for l in text.splitlines() if l.strip()]
    bullets = []

    for ln in lines:
        if _NOISE_PATTERNS.search(ln):
            continue
        if len(ln.split()) < 6:
            continue
        if not _ACTION_VERBS.search(ln):
            continue
        if not _TECH_CONTEXT.search(ln):
            continue

        bullets.append(ln)

        if len(bullets) >= limit:
            break

    return bullets


# -------------------- PROJECT SUGGESTIONS --------------------

def _make_project_suggestions(role: str, missing_skills: List[str], n: int = 2) -> List[Dict]:
    projects = []
    base_stack = ", ".join(missing_skills[:3]) if missing_skills else "relevant technologies"

    for i in range(n):
        projects.append({
            "title": f"{role} — Sample Project #{i + 1}",
            "description": (
                f"Build a {role.lower()} project showcasing {base_stack}. "
                "Focus on real-world features, scalability, and clean architecture."
            ),
            "tech_stack": missing_skills[:5] or ["JavaScript", "React", "Node.js"],
            "impact_bullets": [
                "Designed and implemented RESTful APIs",
                "Optimized performance and reduced response times",
                "Added authentication, validation, and error handling"
            ]
        })

    return projects


# -------------------- SKILL PHRASES --------------------

def _skill_phrases(skills: List[str]) -> List[str]:
    phrases = []
    seen = set()

    for s in skills:
        if s in seen:
            continue
        seen.add(s)
        phrases.append(f"Proficient in {s}")
        phrases.append(f"Hands-on experience with {s}")
        if len(phrases) >= 8:
            break

    return phrases


# -------------------- MAIN ENGINE --------------------

def generate_improvements(text: str, role: str, ats: Dict) -> Dict:

    if not isinstance(ats, dict):
        ats = {}

    matched = ats.get("matched_skills", [])
    missing = ats.get("missing_skills", [])

    kws = top_keywords(text, 20)
    summary = _make_summary(text, role, kws)

    strengths = matched[:8] or kws[:5]
    weaknesses = missing[:8]

    # ✅ CLEAN EXPERIENCE ONLY
    exp_section = _extract_experience_section(text)
    candidates = _extract_experience_candidates(exp_section)

    experience_bullets = []
    for cand in candidates:
        bullet = re.sub(r"\s+", " ", cand).strip()
        bullet = re.sub(_NOISE_PATTERNS, "", bullet).strip()

        if not _ACTION_VERBS.search(bullet):
            bullet = "Implemented " + bullet[0].lower() + bullet[1:]

        if not bullet.endswith("."):
            bullet += "."

        experience_bullets.append(bullet)

    if not experience_bullets:
        experience_bullets = [
            f"Implemented backend and frontend features for {role} applications using relevant technologies.",
            "Collaborated with team members to deliver scalable and maintainable solutions."
        ]

    projects = _make_project_suggestions(role, weaknesses)
    skill_phr = _skill_phrases(matched + weaknesses)

    formatting_tips = [
        "Keep contact details concise and professional.",
        "Use strong action verbs and quantify impact where possible.",
        "Group skills logically (Languages, Frameworks, Tools).",
        "Maintain consistent formatting and reverse-chronological order.",
        "Limit resume length to 1–2 pages."
    ]

    action_items = [f"Add hands-on experience with {s}." for s in weaknesses[:5]]
    action_items += [
        "Add 2–3 real-world projects with measurable outcomes.",
        "Refine the professional summary for the target role."
    ]

    improvements = [
        f"Summary suggestion: {summary}",
        f"Strengths: {', '.join(strengths)}" if strengths else "No strong skills detected",
        f"Skills to add: {', '.join(weaknesses)}" if weaknesses else "Skill coverage looks good",
        "Improve experience bullets by adding metrics and measurable impact."
    ]

    return {
        "role": role,
        "ats_score": int(ats.get("score", 0)),
        "summary": summary,
        "strengths": strengths,
        "weaknesses": weaknesses,
        "skills_to_add": weaknesses,
        "skill_phrases": skill_phr,
        "experience_bullets": experience_bullets,
        "projects": projects,
        "formatting_tips": formatting_tips,
        "action_items": action_items,
        "improvements": improvements
    }
