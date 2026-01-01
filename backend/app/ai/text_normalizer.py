import re


def normalize_text(text: str) -> str:
    """
    Normalizes resume text for ATS & skill matching.
    """

    if not text:
        return ""

    text = text.lower()

    # normalize whitespace
    text = re.sub(r"\s+", " ", text)

    # normalize punctuation spacing
    text = re.sub(r"[•▪●]", " ", text)

    return text.strip()
