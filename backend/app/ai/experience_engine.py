import re

SENIORITY_RULES = [
    ("Intern", "Fresher", 0.35),
    ("Junior", "Junior", 0.45),
    ("Software Engineer", "Mid", 0.60),
    ("Backend Developer", "Mid", 0.65),
    ("Senior", "Senior", 0.80),
    ("Lead", "Senior", 0.90),
    ("Manager", "Senior", 0.95),
]


def extract_years_of_experience(text: str) -> float:
    """
    Detect years like:
    - 2020 – 2024
    - 3+ years
    """
    text = text.lower()

    # Pattern: "3+ years", "5 years"
    year_matches = re.findall(r"(\d+)\+?\s+years?", text)
    if year_matches:
        return float(max(year_matches))

    # Pattern: date ranges like 2020 - 2024
    ranges = re.findall(r"(20\d{2})\s*[-–]\s*(20\d{2}|present)", text)
    if ranges:
        start, end = ranges[0]
        end = 2025 if end == "present" else int(end)
        return max(0, end - int(start))

    return 0.0


def infer_seniority(experience_text: str) -> dict:
    """
    Returns:
    - level (Fresher / Junior / Mid / Senior)
    - confidence score (0–1)
    """

    years = extract_years_of_experience(experience_text)

    # Default
    level = "Fresher"
    confidence = 0.35

    for keyword, lvl, conf in SENIORITY_RULES:
        if keyword.lower() in experience_text.lower():
            level = lvl
            confidence = conf
            break

    # Boost confidence by years
    if years >= 5:
        level = "Senior"
        confidence = max(confidence, 0.85)
    elif years >= 3:
        level = "Mid"
        confidence = max(confidence, 0.65)
    elif years >= 1:
        level = "Junior"
        confidence = max(confidence, 0.45)

    return {
        "experience_years": years,
        "seniority": level,
        "confidence": round(confidence * 100, 2)
    }
