import re

KNOWN_SKILLS = {
    "python", "java", "javascript", "react", "node.js",
    "mongodb", "sql", "docker", "rest api",
    "html", "css"
}


def extract_skills(text: str) -> list:
    text = text.lower()

    found = set()

    # Word-boundary safe match
    for skill in KNOWN_SKILLS:
        pattern = rf"\b{re.escape(skill)}\b"
        if re.search(pattern, text):
            found.add(skill)

    # 🔥 HARD FIX FOR SQL IN UPPERCASE BLOCKS
    if re.search(r"\bsql\b", text):
        found.add("sql")

    return sorted(found)
