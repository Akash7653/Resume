from typing import Dict, List


def _safe_list(value, limit: int = 6) -> List[str]:
    if not isinstance(value, list):
        return []
    clean = [v.strip() for v in value if isinstance(v, str) and v.strip()]
    return clean[:limit]


def apply_final_quality_gate(result: Dict) -> Dict:
    """
    Final sanitizer before returning data to UI / user.
    """

    improvements = result.get("improvement_tips", {})

    # ---------- HARD CLEAN ----------
    improvements["strengths"] = _safe_list(improvements.get("strengths"))
    improvements["weaknesses"] = _safe_list(improvements.get("weaknesses"))
    improvements["skills_to_add"] = _safe_list(improvements.get("skills_to_add"))
    improvements["skill_phrases"] = _safe_list(improvements.get("skill_phrases"), 8)
    improvements["experience_bullets"] = _safe_list(improvements.get("experience_bullets"), 5)
    improvements["action_items"] = _safe_list(improvements.get("action_items"), 5)

    # ---------- PROJECT SAFETY ----------
    projects = improvements.get("projects", [])
    if not isinstance(projects, list):
        projects = []

    clean_projects = []
    for p in projects[:2]:
        if not isinstance(p, dict):
            continue
        clean_projects.append({
            "title": p.get("title", ""),
            "description": p.get("description", ""),
            "tech_stack": _safe_list(p.get("tech_stack"), 5),
            "impact_bullets": _safe_list(p.get("impact_bullets"), 4)
        })

    improvements["projects"] = clean_projects

    # ---------- FINAL VERDICT ----------
    ats_score = result.get("ats_score", 0)
    quality = result.get("resume_quality", {}).get("overall_score", 0)

    if ats_score >= 80 and quality >= 70:
        verdict = "Strong resume – ready to apply"
    elif ats_score >= 60:
        verdict = "Good resume – minor improvements needed"
    else:
        verdict = "Resume needs improvement"

    result["final_verdict"] = verdict
    result["improvement_tips"] = improvements

    return result
