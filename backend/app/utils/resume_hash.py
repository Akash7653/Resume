import hashlib

def generate_resume_hash(resume_text: str, role: str) -> str:
    content = f"{resume_text}_{role}"
    return hashlib.sha256(content.encode("utf-8")).hexdigest()
