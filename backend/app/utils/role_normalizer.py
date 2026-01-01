"""
Role Normalization Utility

Provides consistent role naming across the application by normalizing different variations
of job titles to a standard format.
"""
from typing import Dict, Optional

# Map of common role variations to their normalized forms
ROLE_ALIASES: Dict[str, str] = {
    # Full Stack Developer variations
    "fullstackdeveloper": "Full Stack Developer",
    "full-stack-developer": "Full Stack Developer",
    "fullstackdevelper": "Full Stack Developer",
    "fullstackdev": "Full Stack Developer",
    "fsd": "Full Stack Developer",
    "fullstack": "Full Stack Developer",
    "full stack": "Full Stack Developer",
    "full-stack": "Full Stack Developer",
    
    # Frontend variations
    "frontend": "Frontend Developer",
    "front-end": "Frontend Developer",
    "frontenddeveloper": "Frontend Developer",
    "front-end-developer": "Frontend Developer",
    "frontenddev": "Frontend Developer",
    "fronend": "Frontend Developer",  # Common typo
    "ui developer": "Frontend Developer",
    "web developer": "Frontend Developer",
    
    # Backend variations
    "backend": "Backend Developer",
    "back-end": "Backend Developer",
    "backenddeveloper": "Backend Developer",
    "back-end-developer": "Backend Developer",
    "backenddev": "Backend Developer",
    "server developer": "Backend Developer",
    "api developer": "Backend Developer",
    
    # DevOps variations
    "devops": "DevOps Engineer",
    "devop": "DevOps Engineer",
    "devopsengineer": "DevOps Engineer",
    "devops engineer": "DevOps Engineer",
    "cloud engineer": "DevOps Engineer",
    "site reliability engineer": "DevOps Engineer",
    "sre": "DevOps Engineer",
    
    # Data Science variations
    "datascientist": "Data Scientist",
    "data-scientist": "Data Scientist",
    "data scientist": "Data Scientist",
    "machine learning engineer": "Machine Learning Engineer",
    "ml engineer": "Machine Learning Engineer",
    "mlengineer": "Machine Learning Engineer",
    "ai engineer": "Machine Learning Engineer",
    "data engineer": "Data Engineer",
    "dataengineer": "Data Engineer",
    "data-engineer": "Data Engineer",
    
    # QA/Test variations
    "qa engineer": "QA Engineer",
    "qa": "QA Engineer",
    "quality assurance": "QA Engineer",
    "test engineer": "QA Engineer",
    "sdet": "SDET",
    "software development engineer in test": "SDET",
}

def normalize_role(role: Optional[str]) -> str:
    """
    Normalize a job role to a standard form using the ROLE_ALIASES mapping.
    
    Args:
        role: The input role string to normalize
        
    Returns:
        The normalized role string, or the original string if no match found
    """
    if not role or not isinstance(role, str) or not role.strip():
        return "Software Engineer"  # Default role
        
    # Clean and prepare the role string
    normalized = role.strip().lower()
    
    # Remove common prefixes/suffixes
    normalized = normalized.replace("senior ", "").replace("junior ", "")
    normalized = normalized.replace("sr ", "").replace("jr ", "")
    
    # Try exact match first
    if normalized in ROLE_ALIASES:
        return ROLE_ALIASES[normalized]
    
    # Try with spaces removed
    no_spaces = normalized.replace(" ", "")
    if no_spaces in ROLE_ALIASES:
        return ROLE_ALIASES[no_spaces]
    
    # Try with common separators replaced
    for sep in ["-", "_", "."]:
        with_sep = normalized.replace(sep, "")
        if with_sep in ROLE_ALIASES:
            return ROLE_ALIASES[with_sep]
    
    # If no match found, try to find a partial match
    for key, value in ROLE_ALIASES.items():
        if key in normalized or normalized in key:
            return value
    
    # If still no match, capitalize the first letter of each word
    return role.title()
