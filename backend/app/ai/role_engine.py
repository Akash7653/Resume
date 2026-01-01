from app.ai.section_parser import ResumeParser
from app.ai.skill_engine import extract_skills

# Role → required skills mapping
ROLE_SKILL_MAP = {
    "Backend Developer": {
        "python", "java", "node.js", "fastapi", "django",
        "spring", "sql", "mongodb", "redis", "rest api"
    },
    "Frontend Developer": {
        "html", "css", "javascript", "react", "angular", "vue"
    },
    "Full Stack Developer": {
        "javascript", "react", "node.js", "python",
        "mongodb", "sql", "rest api"
    },
    "DevOps Engineer": {
        "docker", "kubernetes", "aws", "azure", "gcp",
        "ci/cd", "jenkins", "terraform"
    },
    "Machine Learning Engineer": {
        "python", "machine learning", "deep learning",
        "tensorflow", "pytorch", "scikit-learn"
    },
    "Data Engineer": {
        "python", "sql", "spark", "airflow",
        "kafka", "etl"
    },
    "QA Engineer": {
        "selenium", "cypress", "postman",
        "junit", "testing"
    }
}

def predict_role_advanced(resume_text: str) -> dict:
    """
    Predict best job role using skills + experience.
    Deterministic, stable, non-LLM.
    """
    from app.ai.section_parser import SectionType
    
    # Parse the resume text into sections
    sections = ResumeParser().parse_sections(resume_text)
    
    # Convert Section objects to their content strings
    section_content = {}
    for section_type, section in sections.items():
        section_content[section_type.value] = section.content
    
    # Only trusted sections
    combined_text = (
        section_content.get(SectionType.SKILLS.value, "") + " " +
        section_content.get(SectionType.EXPERIENCE.value, "") + " " +
        section_content.get(SectionType.PROJECTS.value, "")
    )

    extracted_skills = set(extract_skills(combined_text))

    best_role = "Unknown"
    best_score = 0

    for role, required_skills in ROLE_SKILL_MAP.items():
        matched = extracted_skills.intersection(required_skills)
        score = len(matched)

        if score > best_score:
            best_role = role
            best_score = score

    confidence = round((best_score / 10) * 100, 2) if best_score else 0.0

    return {
        "job_role": best_role,
        "confidence": confidence,
        "matched_skills": sorted(extracted_skills)
    }
