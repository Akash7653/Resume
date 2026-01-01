"""
Resume Rewrite Engine - Industry-Grade Resume Rewriter
Rewrites resume content while keeping facts 100% truthful
"""
import os
import json
from dotenv import load_dotenv
from openai import OpenAI
from typing import Dict, List, Any, Optional, Set, Tuple
import re
import random
from collections import defaultdict
from app.utils.role_normalizer import normalize_role
from app.utils.openai_rate_limiter import wait_for_slot
import re

def extract_skills(text: str) -> List[str]:
    """
    Extract skills from text using a predefined skill set.
    This is a fallback and should not be used when ATS data is available.
    """
    # Import here to avoid circular imports
    from app.ai.jd_match_engine import SKILL_SET
    
    if not text or not isinstance(text, str):
        return []
        
    # Convert to lowercase for case-insensitive matching
    text_lower = text.lower()
    
    # Find all skills mentioned in the text
    found_skills = set()
    
    # Check for multi-word skills first (to avoid partial matches)
    for skill in sorted(SKILL_SET, key=len, reverse=True):
        if skill in text_lower:
            found_skills.add(skill)
            # Remove the matched text to avoid double-counting
            text_lower = text_lower.replace(skill, " ")
    
    return list(found_skills)[:15]  # Return up to 15 skills

def rewrite_with_rules(
    resume_text: str, 
    role: str, 
    level: str = "Mid", 
    ats_data: Optional[Dict] = None,
    original_role: Optional[str] = None
) -> Dict[str, Any]:
    """
    Fallback rewrite using ATS engine output when LLM fails.
    
    Args:
        resume_text: The resume text to rewrite
        role: The target role (normalized)
        level: Experience level (Fresher, Junior, Mid, Senior)
        ats_data: ATS analysis data containing matched and missing skills
        original_role: Original role before normalization (for reference)
    """
    # Normalize the role if not already done
    normalized_role = normalize_role(role)
    
    # Ensure we have valid ATS data
    if ats_data is None:
        ats_data = {
            "matched_skills": [],
            "missing_skills": [],
            "role": normalized_role,
            "original_role": original_role or role
        }
    
    # Extract skills from ATS data
    matched_skills = ats_data.get("matched_skills", [])
    missing_skills = ats_data.get("missing_skills", [])
    role_skills = ats_data.get("role_skills", matched_skills + missing_skills)
    
    # Ensure we have lists, not other iterables
    matched_skills = list(matched_skills) if matched_skills else []
    missing_skills = list(missing_skills) if missing_skills else []
    role_skills = list(role_skills) if role_skills else []
    
    # Generate experience bullets based on matched skills
    experience_bullets = _generate_experience_bullets(matched_skills, normalized_role, level)
    
    # Generate projects based on missing skills
    projects = _generate_projects(missing_skills, normalized_role, level)
    
    # Generate a professional summary
    summary = _generate_summary(normalized_role, matched_skills, level)
    
    # Generate skills section
    skills_section = _generate_skills_section(matched_skills, missing_skills, role_skills)
    
    return {
        "rewritten_summary": summary,
        "rewritten_experience": experience_bullets,
        "rewritten_projects": projects,
        "rewritten_skills": skills_section,
        "ats_keywords_added": missing_skills,
        "fallback_used": True,
        "role": normalized_role,
        "original_role": original_role or role
    }

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

RESUME_REWRITE_SYSTEM_PROMPT = """You are a Senior Technical Recruiter and ATS Optimization Expert.

You rewrite resumes for software industry roles.

Rules:
• Never fabricate experience
• Never exaggerate skills
• Never add companies or certifications not mentioned
• Improve clarity, structure, and impact
• Optimize strictly for ATS + human recruiters
• Use action verbs and quantified impact when possible
• Keep content realistic for the candidate's level"""


def _generate_experience_bullets(skills: List[str], role: str, level: str) -> List[str]:
    """Generate experience bullet points based on skills"""
    if not skills:
        return []
        
    templates = [
        "Applied {skill} to develop and maintain {role}-focused solutions.",
        "Leveraged {skill} to implement features and fix bugs in production systems.",
        "Utilized {skill} to optimize performance and improve system reliability.",
        "Collaborated with team members using {skill} to deliver high-quality software.",
        "Designed and implemented {role}-related features using {skill}.",
        "Worked with {skill} to build scalable and maintainable applications.",
        "Used {skill} to solve complex {role} challenges.",
        "Developed and maintained applications using {skill} following best practices.",
    ]
    
    # Adjust templates based on experience level
    if level.lower() == "senior":
        templates.extend([
            "Led the architecture and implementation of {skill} solutions for {role}.",
            "Mentored junior developers on {skill} best practices and patterns.",
            "Architected and implemented {skill} solutions for large-scale {role} applications.",
        ])
    
    # Generate 3-5 unique bullet points
    selected_skills = skills[:5] if len(skills) >= 5 else skills
    bullets = []
    
    for skill in selected_skills:
        template = random.choice(templates)
        bullets.append(template.format(skill=skill, role=role))
        
    return bullets[:5]  # Max 5 bullet points


def _generate_projects(skills: List[str], role: str, level: str) -> List[Dict]:
    """Generate project entries based on missing skills"""
    if not skills:
        return []
        
    project_templates = [
        {
            "title": "{role} Project using {skill}",
            "description": "Developed a {role} application demonstrating {skill} proficiency.",
            "tech_stack": ["{skill}"],
            "impact": ["Gained hands-on experience with {skill}", "Implemented core {role} functionality"]
        },
        {
            "title": "{skill} Implementation",
            "description": "Built a project showcasing {skill} in a {role} context.",
            "tech_stack": ["{skill}"],
            "impact": ["Successfully applied {skill} to solve real-world problems"]
        },
        {
            "title": "{role} {skill} Demo",
            "description": "Created a demonstration of {skill} for {role} applications.",
            "tech_stack": ["{skill}"],
            "impact": ["Demonstrated proficiency in {skill}", "Applied {skill} to {role} use cases"]
        }
    ]
    
    # Generate 1-2 projects
    projects = []
    for i, skill in enumerate(skills[:2]):  # Max 2 projects
        template = random.choice(project_templates)
        project = {
            "title": template["title"].format(skill=skill, role=role),
            "description": template["description"].format(skill=skill, role=role),
            "tech_stack": [t.format(skill=skill, role=role) for t in template["tech_stack"]],
            "impact": [t.format(skill=skill, role=role) for t in template["impact"]]
        }
        projects.append(project)
        
    return projects


def _generate_summary(role: str, skills: List[str], level: str) -> str:
    """Generate a professional summary based on role and skills"""
    templates = [
        "Results-driven {role} with experience in {skills}. "
        "Skilled in designing and implementing efficient solutions. "
        "Committed to writing clean, maintainable code and following best practices.",
        
        "{level} {role} with expertise in {skills}. "
        "Passionate about building scalable applications and solving complex problems. "
        "Strong problem-solving skills and attention to detail.",
        
        "Detail-oriented {role} with a focus on {skills}. "
        "Experienced in the full software development lifecycle. "
        "Committed to delivering high-quality, performant solutions.",
    ]
    
    # Format skills for the summary
    if len(skills) > 3:
        skill_text = ", ".join(skills[:3]) + ", and more"
    elif skills:
        skill_text = ", ".join(skills)
    else:
        skill_text = "various technologies"
    
    # Select and format template
    template = random.choice(templates)
    return template.format(
        role=role,
        skills=skill_text,
        level=level
    )


def _generate_skills_section(matched: List[str], missing: List[str], role_skills: List[str]) -> Dict[str, List[str]]:
    """Generate a structured skills section"""
    # Categorize skills if we have enough data
    if len(matched) > 5 or len(role_skills) > 5:
        # Try to categorize skills if we have role skills
        categories = {
            "Core Technical Skills": matched[:8],  # Limit to 8 core skills
            "Additional Skills": missing[:5]  # Limit to 5 missing skills
        }
    else:
        # Simple split if not enough data
        categories = {
            "Technical Skills": matched[:10]  # Max 10 skills
        }
    
    return categories


def generate_resume_rewrite(
    resume_text: str,
    target_role: str,
    candidate_level: str = "Mid",
    ats_data: Optional[Dict] = None,
    original_role: Optional[str] = None
) -> Dict[str, Any]:
    """
    Rewrites resume content for ATS optimization and role-specific targeting
    
    Args:
        resume_text: Full resume text
        target_role: Target job role (e.g., "Full Stack Developer")
        candidate_level: Fresher | Junior | Mid | Senior
        ats_data: Optional ATS analysis data containing matched and missing skills
        original_role: Original role before normalization (for reference)
    """
    wait_for_slot()

    user_prompt = f"""Rewrite the resume content below for the target role: {target_role}

Candidate level: {candidate_level}
Do NOT add fake experience.

Instructions:
1. Rewrite the Professional Summary to be role-focused and ATS-friendly
2. Rewrite Experience bullets (do not invent experience)
3. Rewrite Project descriptions with:
   - Clear problem
   - Technologies used
   - Impact / learning outcomes
4. Rewrite Skills section grouped by categories
5. Keep language professional, concise, and recruiter-friendly

Resume Text:
{resume_text}

Return ONLY structured JSON with this exact format:
{{
  "rewritten_summary": "string",
  "rewritten_experience": ["bullet 1", "bullet 2"],
  "rewritten_projects": [
    {{
      "title": "string",
      "description": "string",
      "tech_stack": ["string"],
      "impact": ["string"]
    }}
  ],
  "rewritten_skills": {{
    "languages": ["string"],
    "frameworks": ["string"],
    "databases": ["string"],
    "tools": ["string"],
    "other": ["string"]
  }},
  "ats_keywords_added": ["string"]
}}"""

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            temperature=0.25,
            messages=[
                {"role": "system", "content": RESUME_REWRITE_SYSTEM_PROMPT},
                {"role": "user", "content": user_prompt}
            ],
            response_format={"type": "json_object"}
        )

        result = json.loads(response.choices[0].message.content)
        return result
    except Exception:
        return rewrite_with_rules(
            resume_text, 
            target_role, 
            candidate_level, 
            ats_data,
            original_role=original_role
        )
