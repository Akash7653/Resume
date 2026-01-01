from typing import Dict, List, Set, Optional
from app.ai.skill_engine import extract_skills
from app.utils.role_normalizer import normalize_role

# Role → expected skills
ROLE_REQUIRED_SKILLS = {
    "Backend Developer": {
        "python", "java", "node.js", "fastapi", "django",
        "spring", "sql", "mongodb", "redis", "rest api", "docker"
    },
    "Frontend Developer": {
        "html", "css", "javascript", "react", "angular",
        "vue", "typescript"
    },
    "Full Stack Developer": {
        "javascript", "react", "node.js", "python",
        "mongodb", "sql", "rest api", "docker"
    },
    "DevOps Engineer": {
        "docker", "kubernetes", "aws", "azure",
        "ci/cd", "jenkins", "terraform", "linux"
    },
    "Machine Learning Engineer": {
        "python", "machine learning", "deep learning",
        "tensorflow", "pytorch", "scikit-learn", "numpy"
    }
}


def normalize_skill(skill: str) -> str:
    """
    Normalizes equivalent skills to ATS-safe forms.
    """
    skill = skill.lower().strip()

    SQL_ALIASES = {
        "structured query language",
        "mysql",
        "postgresql",
        "postgres",
        "sqlite",
        "mssql"
    }

    if skill in SQL_ALIASES:
        return "sql"

    if skill in {"node", "nodejs"}:
        return "node.js"

    if skill in {"reactjs"}:
        return "react"

    return skill


def ats_score(resume_text: str, role: str) -> dict:
    """
    Role-aware ATS scoring engine.
    
    Args:
        resume_text: Normalized resume text (NOT raw PDF text)
        role: Target job role (will be normalized)
        
    Returns:
        Dict containing ATS score and skill analysis
    """
    # Normalize the role first
    normalized_role = normalize_role(role)
    
    # Convert resume text to lowercase for case-insensitive matching
    resume_text = resume_text.lower()
    
    # Log role normalization for debugging
    if role != normalized_role:
        print(f"Normalized role: '{role}' -> '{normalized_role}'")

    # Extract and normalize resume skills
    extracted = extract_skills(resume_text)
    resume_skills = {normalize_skill(s) for s in extracted}

    # Get skills for the normalized role
    role_skills = ROLE_REQUIRED_SKILLS.get(normalized_role, set())
    
    # If no specific skills for this role, try to find a matching role pattern
    if not role_skills:
        # Try to find a role that starts with the normalized role
        for r, skills in ROLE_REQUIRED_SKILLS.items():
            if normalized_role.lower() in r.lower() or r.lower() in normalized_role.lower():
                role_skills = skills
                print(f"Using skills from similar role: {r}")
                break
    
    # If still no skills, use a default set
    if not role_skills:
        print(f"No specific skills found for role: {normalized_role}, using default set")
        role_skills = {
            "python", "javascript", "html", "css", "sql", 
            "git", "rest api", "docker", "problem solving"
        }

    matched = resume_skills & role_skills
    missing = role_skills - matched

    match_ratio = len(matched) / len(role_skills)
    score = round(match_ratio * 100)

    # Sort skills by relevance (longer/more specific skills first)
    def sort_key(skill):
        return (-len(skill.split()), skill.lower())
    
    return {
        "score": score,
        "role": normalized_role,  # Return the normalized role
        "original_role": role,    # Keep original for reference
        "matched_skills": sorted(matched, key=sort_key),
        "missing_skills": sorted(missing, key=sort_key),
        "role_skills": sorted(role_skills, key=sort_key)
    }
