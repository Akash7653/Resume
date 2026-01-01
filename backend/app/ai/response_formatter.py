from typing import Dict


def format_resume_response(
    *,
    role: str,
    confidence: float,
    ats: Dict,
    resume_quality: Dict,
    resume_strength: Dict,   # ✅ ADDED
    improvements: Dict
) -> Dict:
    """
    Converts raw AI + analysis output into frontend-ready structure
    """

    critical_gaps = improvements.get("skills_to_add", [])[:5]
    strong_skills = improvements.get("strengths", [])[:5]

    section_scores = resume_quality.get("section_scores", {})

    experience_health = section_scores.get("experience", {}).get("status", "missing")
    projects_health = section_scores.get("projects", {}).get("status", "missing")

    ui_metrics = {
        "ats_score": ats.get("score", 0),
        "resume_quality_score": resume_quality.get("overall_score", 0),
        "resume_strength": resume_strength,   # ✅ INCLUDED
        "role_confidence": round(confidence, 2)
    }

    highlights = {
        "needs_projects": projects_health in ("missing", "average"),
        "needs_experience": experience_health in ("missing", "inferred"),
        "missing_critical_skills": bool(critical_gaps)
    }

    sections = [
        {
            "id": "summary",
            "title": "Professional Summary",
            "content": improvements.get("summary", "")
        },
        {
            "id": "skills",
            "title": "Skills Analysis",
            "strengths": strong_skills,
            "missing": critical_gaps
        },
        {
            "id": "experience",
            "title": "Experience Suggestions",
            "bullets": improvements.get("experience_bullets", [])[:5]
        },
        {
            "id": "projects",
            "title": "Recommended Projects",
            "items": improvements.get("projects", [])
        }
    ]

    return {
        "role": role,
        "metrics": ui_metrics,
        "highlights": highlights,
        "sections": sections,
        "formatting_tips": improvements.get("formatting_tips", []),
        "action_items": improvements.get("action_items", [])
    }
