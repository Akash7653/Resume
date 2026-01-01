def score_section(text: str, section_name: str) -> dict:
    """
    Scores individual resume sections.
    Returns score (0–100) + feedback.
    """

    if not text or len(text.strip()) < 20:
        return {
            "score": 0,
            "status": "missing",
            "feedback": f"{section_name.title()} section is missing or too short."
        }

    length_score = min(len(text.split()) * 2, 60)

    keyword_bonus = 0
    if section_name == "experience":
        keywords = ["developed", "implemented", "built", "optimized", "designed"]
        keyword_bonus = sum(5 for k in keywords if k in text)

    if section_name == "projects":
        keywords = ["project", "tech stack", "implemented", "deployed"]
        keyword_bonus = sum(5 for k in keywords if k in text)

    final_score = min(length_score + keyword_bonus, 100)

    return {
        "score": final_score,
        "status": "good" if final_score >= 60 else "average",
        "feedback": f"{section_name.title()} section looks acceptable."
    }
