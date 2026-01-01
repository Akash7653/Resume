import os
import re
from PyPDF2 import PdfReader

def extract_text(file_path: str) -> str:
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"File not found: {file_path}")

    if file_path.lower().endswith(".pdf"):
        reader = PdfReader(file_path)
        return "\n".join(
            page.extract_text() or "" for page in reader.pages
        )

    raise ValueError("Unsupported file type")


def fix_broken_headers(text: str) -> str:
    """
    Normalize and fix broken section headers in resume text.
    Converts various header formats into standard section names.
    
    Args:
        text: The input text potentially containing broken headers
        
    Returns:
        str: Text with normalized section headers
    """
    HEADER_MAP = {
        "aboutme": "SUMMARY",
        "careerobjective": "SUMMARY",
        "skills": "SKILLS",
        "education": "EDUCATION",
        "experience": "EXPERIENCE",
        "portfolioexperience": "EXPERIENCE",   # Handles "PortfolioEXPERIENCE" case
        "projects": "PROJECTS",
        "certifications": "CERTIFICATIONS",
        "links": "CONTACT",
        "achievements": "AWARDS"
    }

    seen_headers = set()
    fixed_lines = []

    for line in text.splitlines():
        # Remove all non-alphabetic characters and convert to lowercase
        compact = re.sub(r"[^a-zA-Z]", "", line).lower()

        # Replace if it matches any known header
        if compact in HEADER_MAP:
            header = HEADER_MAP[compact]
            if header not in seen_headers:
                seen_headers.add(header)
                fixed_lines.append(header)
        else:
            fixed_lines.append(line)

    return "\n".join(fixed_lines)
