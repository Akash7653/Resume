import os
import json
from dotenv import load_dotenv
from openai import OpenAI
from typing import Dict, Any
from app.utils.openai_rate_limiter import wait_for_slot

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# 🚀 ResumeIQ – Enterprise Resume Intelligence MASTER PROMPT
MASTER_SYSTEM_PROMPT = """You are an Enterprise Resume Intelligence Engine used by a professional ATS and career-coaching platform.

Your task is to deeply analyze resumes at an industry level.

You must think like:
• an ATS (Applicant Tracking System)
• a technical recruiter
• a hiring manager
• a career coach
• an interview preparation expert

You must provide structured, accurate, role-aware, and actionable insights.

Follow ALL instructions strictly.
Output must be clean, structured JSON.
Do NOT hallucinate experience.
Do NOT fabricate certifications or roles.
Base analysis strictly on resume content + inferred industry standards.

IMPORTANT RULES:
- Do NOT exaggerate experience
- Do NOT invent companies or skills
- Be honest but constructive
- Use industry terminology
- Keep recommendations realistic for the candidate's current level"""


def generate_improvements_llm(
    *,
    resume_text: str,
    role: str,
    ats: Dict[str, Any]
) -> Dict[str, Any]:
    """
    Enterprise-grade resume analysis using comprehensive master prompt
    """
    wait_for_slot()

    user_prompt = f"""Analyze the following resume text in depth.

OBJECTIVES:
1. Scan the ENTIRE resume including:
   - Header / Contact details
   - Professional summary
   - Skills (technical + soft)
   - Education
   - Experience
   - Projects
   - Certifications
   - Achievements
   - Links (GitHub, LinkedIn, Portfolio)
   - Formatting and ATS compliance

2. Identify ALL SUITABLE SOFTWARE INDUSTRY ROLES for this candidate, not just one.
   Examples: Full Stack Developer, Frontend Developer, Backend Developer, Software Engineer, 
   Junior SDE, AI/ML Engineer (Entry-level), Data Analyst, DevOps Engineer, Intern/Graduate Engineer roles

3. For EACH ROLE:
   - Match skills vs industry expectations
   - Assign a role-specific ATS score (0–100)
   - Assign role confidence (%)
   - Explain why the role fits or partially fits

4. Compute OVERALL ATS SCORE using:
   - Keyword coverage
   - Skill relevance
   - Experience relevance
   - Project depth
   - Resume structure
   - ATS readability
   - Industry alignment

5. Identify:
   - Missing critical skills
   - Weak or underutilized sections
   - Overcrowded or poorly structured sections
   - Red flags (if any)

6. Provide IMPROVEMENT SUGGESTIONS:
   - Resume content improvements (bullet rewrites)
   - Skill additions (with priority levels)
   - Project improvements with real-world impact ideas
   - Experience phrasing improvements
   - Formatting & ATS optimization tips

7. Generate PROJECT SUGGESTIONS:
   - Industry-grade projects per role
   - Tech stack
   - What problem it solves
   - Impact metrics
   - Interview talking points

8. Generate INTERVIEW PREPARATION PLAN:
   - Role-wise interview topics
   - Coding topics
   - System design level (entry / junior)
   - Behavioral questions
   - Resume-based questions interviewer may ask

9. Provide REAL-TIME CAREER GUIDANCE:
   - What to learn in next 30 / 60 / 90 days
   - Certifications to consider
   - GitHub improvement suggestions
   - Portfolio improvement tips

10. Output must be structured for FRONTEND UI rendering.

Current Role Focus: {role}
ATS Analysis:
- ATS Score: {ats.get("score", 0)}
- Matched Skills: {', '.join(ats.get("matched_skills", [])[:10])}
- Missing Skills: {', '.join(ats.get("missing_skills", [])[:10])}

Resume Text:
\"\"\"{resume_text}\"\"\"

Return ONLY valid JSON with this EXACT structure:
{{
  "role_analysis": [
    {{
      "role": "Full Stack Developer",
      "ats_score": 75,
      "role_confidence": 60,
      "fit_reason": "Strong frontend + backend basics",
      "missing_skills": ["docker", "rest api"],
      "recommended_next_steps": ["Learn Docker", "Build REST API project"]
    }}
  ],
  "overall_metrics": {{
    "overall_ats_score": 78,
    "resume_quality_score": 82,
    "resume_strength": {{
      "score": 80,
      "label": "Strong",
      "color": "green"
    }}
  }},
  "section_analysis": [
    {{
      "section": "summary",
      "strengths": ["Clear objective"],
      "issues": ["Needs role-specific focus"],
      "improvements": ["Add target role", "Include key achievements"]
    }},
    {{
      "section": "skills",
      "strengths": ["python", "react"],
      "issues": ["Missing DevOps tools"],
      "improvements": ["Add Docker", "Include CI/CD tools"]
    }},
    {{
      "section": "experience",
      "strengths": ["Relevant projects"],
      "issues": ["Lack of metrics"],
      "improvements": ["Add quantified impact", "Use action verbs"]
    }},
    {{
      "section": "projects",
      "strengths": ["Good tech stack"],
      "issues": ["Missing deployment details"],
      "improvements": ["Add live links", "Mention scalability"]
    }}
  ],
  "project_recommendations": [
    {{
      "role": "Full Stack Developer",
      "projects": [
        {{
          "title": "Scalable Resume Analyzer",
          "description": "Build a resume parsing and scoring platform using AI",
          "tech_stack": ["Python", "FastAPI", "MongoDB", "Docker"],
          "impact_metrics": ["Designed REST APIs", "Improved ATS matching accuracy"],
          "interview_talking_points": ["Architecture decisions", "Scalability challenges"]
        }}
      ]
    }}
  ],
  "interview_preparation": {{
    "technical_topics": ["Data Structures", "REST API design", "Database indexing"],
    "coding_topics": ["arrays", "strings", "hashmaps"],
    "system_design_level": "Basic",
    "behavioral_questions": ["Tell me about a challenge you solved"],
    "resume_based_questions": ["Explain your AgriSmart project architecture"]
  }},
  "career_roadmap": {{
    "30_days": ["Learn Docker basics", "Build one REST API project"],
    "60_days": ["Add CI/CD to projects", "Practice system design basics"],
    "90_days": ["Deploy projects to cloud", "Complete one certification"]
  }},
  "formatting_and_ats_tips": [
    "Keep contact details concise",
    "Use strong action verbs",
    "Group skills logically",
    "Maintain consistent formatting"
  ],
  "final_action_items": [
    "Rewrite resume summary",
    "Add Docker & REST API projects",
    "Practice interview questions weekly"
  ],
  "summary": "Professional summary rewrite",
  "strengths": ["python", "react", "node.js"],
  "skills_to_add": ["docker", "rest api"],
  "experience_bullets": ["Implemented backend features", "Collaborated with team"],
  "project_suggestions": [
    {{
      "title": "Project Title",
      "description": "Description",
      "tech_stack": ["tech1"],
      "impact_bullets": ["impact1"]
    }}
  ],
  "formatting_tips": ["tip1", "tip2"],
  "action_items": ["item1", "item2"]
}}

IMPORTANT: Return ONLY the JSON object, no markdown, no code blocks, no explanations."""

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",  # Updated to gpt-4o-mini
            messages=[
                {"role": "system", "content": MASTER_SYSTEM_PROMPT},
                {"role": "user", "content": user_prompt}
            ],
            temperature=0.4,
            response_format={"type": "json_object"}  # Force JSON output
        )

        result = json.loads(response.choices[0].message.content)
        
        # Validate result doesn't contain error
        if isinstance(result, dict) and "error" in result:
            raise Exception(f"LLM returned error: {result.get('error')}")
        
        # Extract section analysis
        section_analysis_list = result.get("section_analysis", [])
        skills_section = next((s for s in section_analysis_list if s.get("section") == "skills"), {})
        experience_section = next((s for s in section_analysis_list if s.get("section") == "experience"), {})
        
        # Extract project recommendations
        project_recs = result.get("project_recommendations", [])
        all_projects = []
        for rec in project_recs:
            all_projects.extend(rec.get("projects", []))
        
        # Ensure backward compatibility - map to expected format
        return {
            "summary": result.get("summary", ""),
            "strengths": skills_section.get("strengths", []),
            "skills_to_add": skills_section.get("issues", []) + [s for s in result.get("skills_to_add", [])],
            "experience_bullets": result.get("experience_bullets", []),
            "project_suggestions": all_projects if all_projects else result.get("project_suggestions", []),
            "formatting_tips": result.get("formatting_and_ats_tips", result.get("formatting_tips", [])),
            "action_items": result.get("final_action_items", result.get("action_items", [])),
            # Extended fields for enhanced analysis
            "role_analysis": result.get("role_analysis", []),
            "overall_metrics": result.get("overall_metrics", {}),
            "section_analysis": section_analysis_list,
            "project_recommendations": project_recs,
            "interview_preparation": result.get("interview_preparation", {}),
            "career_roadmap": result.get("career_roadmap", {}),
            "formatting_and_ats_tips": result.get("formatting_and_ats_tips", [])
        }
    except Exception as e:
        error_msg = str(e)
        error_lower = error_msg.lower()
        
        # Check for specific OpenAI API errors
        if any(keyword in error_lower for keyword in ["quota", "insufficient_quota", "429", "rate limit", "billing"]):
            # Raise exception to trigger fallback - don't return error dict
            raise Exception("OpenAI API quota/rate limit exceeded")
        
        # For JSON parsing errors
        if "json" in error_lower or "parse" in error_lower:
            raise Exception("Failed to parse LLM response")
        
        # For any other errors, raise to trigger fallback
        raise Exception("LLM analysis unavailable")
