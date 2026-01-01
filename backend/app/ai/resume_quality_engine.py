from typing import Dict
from app.ai.experience_engine import infer_seniority


def score_section(section_text: str, section_type: str = None) -> Dict:
    """
    Score a resume section with quality heuristics.
    
    Args:
        section_text: The text content of the section
        section_type: Optional type of section (e.g., 'skills', 'projects', 'experience')
        
    Returns:
        Dict containing score, status, and feedback
    """
    # Handle empty or missing sections
    if not section_text or not section_text.strip():
        return {
            "score": 0,
            "status": "missing",
            "feedback": "Section is missing."
        }
    
    # Basic metrics
    word_count = len(section_text.split())
    line_count = len([line for line in section_text.split('\n') if line.strip()])
    
    # Quality indicators
    has_metrics = any(char.isdigit() for char in section_text)
    has_action_verbs = any(verb in section_text.lower() for verb in [
        'developed', 'implemented', 'designed', 'built', 'created', 'led',
        'optimized', 'improved', 'increased', 'reduced', 'achieved'
    ])
    
    # Calculate base score (0-100)
    score = 0
    
    # Content length scoring
    if word_count < 10:
        score += 10
    elif word_count < 30:
        score += 20
    else:
        score += 30
    
    # Content quality scoring
    if has_metrics:
        score += 20
    if has_action_verbs:
        score += 20
    
    # Structure scoring (more lines = better structure)
    if line_count >= 3:
        score += 10
    
    # Apply minimum floor for certain sections
    if section_type == "skills":
        score = max(50, min(score, 100))  # Floor of 50 for skills
    elif section_type == "projects":
        score = max(50, min(score, 100))  # Floor of 50 for projects
    else:
        score = min(score, 100)  # Cap at 100
    
    # Determine status and feedback
    if score >= 80:
        status = "excellent"
        feedback = "This section is well-written and comprehensive."
    elif score >= 60:
        status = "good"
        feedback = "This section is good but could be enhanced with more details."
    elif score >= 40:
        status = "average"
        feedback = "This section needs improvement. Consider adding more details and metrics."
    else:
        status = "needs_work"
        feedback = "This section requires significant improvement. Add more content and specific details."
    
    # Add specific feedback for improvement
    if not has_metrics and status != "excellent":
        feedback += " Add quantifiable metrics to strengthen your achievements."
    if not has_action_verbs and status != "excellent":
        feedback += " Use more action verbs to describe your responsibilities and achievements."
    if word_count < 20 and status != "excellent":
        feedback += " Expand this section with more details about your experience and skills."
    
    return {
        "score": score,
        "status": status,
        "feedback": feedback.strip()
    }


def evaluate_resume_quality(sections: Dict[str, str]) -> Dict:
    skills = sections.get("skills", "")
    experience = sections.get("experience", "")
    projects = sections.get("projects", "")
    education = sections.get("education", "")

    section_scores = {
        "skills": score_section(skills, "skills"),
        "projects": score_section(projects, "projects"),
        "education": score_section(education)
    }

    # EXPERIENCE INTELLIGENCE
    if experience.strip():
        section_scores["experience"] = score_section(experience)

    elif projects.strip():
        seniority = infer_seniority(projects)

        inferred_score = 60 if seniority["seniority"] in ("Junior", "Mid") else 75

        section_scores["experience"] = {
            "score": inferred_score,
            "status": "inferred",
            "feedback": (
                f"Experience inferred from projects "
                f"({seniority['seniority']} level, "
                f"{seniority['experience_years']} yrs approx). "
                "Add a formal Experience section."
            )
        }

    else:
        section_scores["experience"] = {
            "score": 0,
            "status": "missing",
            "feedback": "Experience section is missing."
        }

    # ---------- WEIGHTED OVERALL SCORE ----------
    weights = {
        "skills": 0.25,
        "projects": 0.30,
        "experience": 0.30,
        "education": 0.15
    }

    weighted_sum = 0
    total_weight = 0

    for section, data in section_scores.items():
        if section in weights:
            weighted_sum += data["score"] * weights[section]
            total_weight += weights[section]

    overall_score = round(weighted_sum / total_weight) if total_weight > 0 else 0

    if overall_score >= 75:
        verdict = "Strong resume"
    elif overall_score >= 55:
        verdict = "Average resume with improvement scope"
    else:
        verdict = "Weak resume – needs work"

    return {
        "overall_score": overall_score,
        "section_scores": section_scores,
        "verdict": verdict
    }
