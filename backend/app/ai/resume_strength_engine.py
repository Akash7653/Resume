def calculate_resume_strength(ats_score: int, resume_quality_score: int) -> dict:
    """
    Combines ATS score and resume quality score into a single UI-friendly metric
    """

    # Safety
    ats_score = max(0, min(100, int(ats_score)))
    resume_quality_score = max(0, min(100, int(resume_quality_score)))

    # Weighted score
    final_score = round((ats_score * 0.6) + (resume_quality_score * 0.4))

    if final_score < 40:
        label, color = "Weak", "red"
    elif final_score < 60:
        label, color = "Average", "orange"
    elif final_score < 80:
        label, color = "Good", "yellow"
    else:
        label, color = "Strong", "green"

    return {
        "score": final_score,
        "label": label,
        "color": color
    }
