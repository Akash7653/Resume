"""
JD vs Resume Matching Engine - Industry-level ATS Simulation
Compares resume with job description and calculates match score
"""
import os
import json
from dotenv import load_dotenv
from openai import OpenAI
from typing import Dict, Any, List, Set, Optional
from app.utils.openai_rate_limiter import wait_for_slot
from app.utils.role_normalizer import normalize_role
import re
from collections import Counter

# Master list of valid technical skills
SKILL_SET = {
    # Programming Languages
    "python", "javascript", "typescript", "java", "c++", "c#", "go", "rust", "kotlin", "swift",
    "php", "ruby", "scala", "r", "dart", "perl", "haskell", "elixir", "clojure", "bash", "powershell",
    
    # Web Development
    "html", "css", "sass", "less", "bootstrap", "tailwind", "react", "angular", "vue", "next.js",
    "nuxt.js", "svelte", "node.js", "express", "django", "flask", "spring", "laravel", "ruby on rails", 
    "asp.net", "graphql", "rest api", "webpack", "babel", "vite", "npm", "yarn", "jquery", "redux",
    "mobx", "jest", "mocha", "cypress", "storybook", "styled components", "material ui", "chakra ui",
    
    # Mobile Development
    "react native", "flutter", "ios", "android", "xamarin", "ionic", "swiftui", "jetpack compose",
    "kotlin multiplatform", "kmm", "flutter", "react native",
    
    # Databases
    "sql", "mysql", "postgresql", "mongodb", "redis", "oracle", "sqlite", "mariadb", "cassandra", 
    "dynamodb", "firebase", "cosmosdb", "neo4j", "elasticsearch", "bigquery", "snowflake",
    "firestore", "realm", "couchbase", "microsoft sql server", "sql server", "postgres",
    
    # DevOps & Cloud
    "docker", "kubernetes", "aws", "azure", "gcp", "terraform", "ansible", "jenkins", "github actions",
    "gitlab ci", "circleci", "argocd", "helm", "prometheus", "grafana", "istio", "linux", "nginx",
    "apache", "cloudformation", "serverless", "aws lambda", "aws ec2", "aws s3", "aws rds",
    "aws dynamodb", "aws ecs", "aws eks", "aws cloudfront", "aws api gateway", "aws iam", "aws vpc",
    "azure devops", "azure functions", "google cloud functions", "google kubernetes engine",
    
    # Data Science & AI/ML
    "pandas", "numpy", "pytorch", "tensorflow", "scikit-learn", "opencv", "nltk", "spacy", "huggingface",
    "mlflow", "kubeflow", "apache spark", "hadoop", "kafka", "airflow", "tableau", "power bi", "looker",
    "matplotlib", "seaborn", "plotly", "d3.js", "tensorboard", "keras", "fastai", "xgboost", "lightgbm",
    "catboost", "pytorch lightning", "transformers", "computer vision", "nlp", "natural language processing",
    "machine learning", "deep learning", "reinforcement learning", "time series", "data analysis",
    
    # Other Tools & Platforms
    "git", "github", "gitlab", "bitbucket", "jira", "confluence", "slack", "docker-compose", "kafka",
    "rabbitmq", "redis", "nginx", "apache", "graphql", "grpc", "oauth", "jwt", "oauth2", "openid",
    "oauth2.0", "openid connect", "jwt tokens", "restful api", "soap", "graphql api", "grpc", "protobuf",
    "web sockets", "socket.io", "websocket", "web rtc", "webrtc", "web sockets", "webassembly", "wasm",
    "electron", "pwa", "progressive web apps", "serverless", "microservices", "monorepo", "lerna",
    "yarn workspaces", "pnpm", "lerna", "nx", "turborepo", "vite", "snowpack", "esbuild", "swc", "bun"
}

def extract_keywords(text: str) -> Set[str]:
    """Extract potential keywords from text using the predefined skill set"""
    if not text or not isinstance(text, str):
        return set()
        
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
    
    return found_skills

def is_valid_skill(skill: str) -> bool:
    """
    Strict validation for skills to filter out garbage tokens.
    
    Args:
        skill: The skill string to validate
        
    Returns:
        bool: True if the skill is valid, False otherwise
    """
    skill = skill.strip().lower()

    if len(skill) < 3:
        return False

    return skill.replace(" ", "").replace(".", "").isalpha()

def rule_based_jd_match(resume_text: str, jd_text: str, target_role: Optional[str] = None) -> Dict[str, Any]:
    """
    Fallback rule-based JD matcher when LLM fails
    
    Args:
        resume_text: The resume text
        jd_text: The job description text
        target_role: Optional target role for context
        
    Returns:
        Dict with match analysis
    """
    # Normalize the role if provided
    normalized_role = normalize_role(target_role) if target_role else None
    
    # Extract skills using our predefined skill set
    resume_skills = extract_keywords(resume_text)
    jd_skills = extract_keywords(jd_text)
    
    # Get role-specific skills if role is provided
    role_skills = set()
    if normalized_role and normalized_role in ROLE_REQUIRED_SKILLS:
        role_skills = ROLE_REQUIRED_SKILLS[normalized_role]
    
    # Calculate matches and missing skills
    matched_skills = [
        skill for skill in SKILL_SET
        if skill in resume_skills and skill in jd_skills
    ]
    
    missing_skills = [
        skill for skill in SKILL_SET
        if skill in jd_skills and skill not in resume_skills
    ]
    
    # If we have role-specific skills, prioritize them
    if role_skills:
        matched_skills = sorted(
            matched_skills,
            key=lambda x: (x not in role_skills, x)  # Role skills first
        )
        missing_skills = sorted(
            missing_skills,
            key=lambda x: (x not in role_skills, x)  # Role skills first
        )
    
    # Calculate match score (0-100)
    total_required = len(set(jd_skills) & SKILL_SET)
    if total_required > 0:
        match_score = min(100, int((len(matched_skills) / total_required) * 100))
    else:
        match_score = 0
    
    # Determine role fit based on score
    if match_score >= 75:
        role_fit = "Strong"
    elif match_score >= 50:
        role_fit = "Moderate"
    elif match_score >= 25:
        role_fit = "Weak"
    else:
        role_fit = "Poor"
    
    # Generate improvement suggestions
    suggestions = []
    if missing_skills:
        # Suggest top 3 missing skills to learn/mention
        top_missing = missing_skills[:3]
        suggestions = [
            f"Gain experience with {skill} through projects or courses." 
            for skill in top_missing
        ]
    
    # Final cleanup of skills before returning
    matched_skills = list({s.strip().lower() for s in matched_skills})
    missing_skills = list({s.strip().lower() for s in missing_skills})
    
    # Apply final validation filter
    matched_skills = [s for s in matched_skills if is_valid_skill(s)][:20]  # Limit to top 20
    missing_skills = [s for s in missing_skills if is_valid_skill(s)][:10]  # Limit to top 10
    
    # Sort skills alphabetically for consistency
    matched_skills.sort()
    missing_skills.sort()
    
    return {
        "ats_match_score": match_score,
        "role_fit": role_fit,
        "role": normalized_role if normalized_role else "Not specified",
        "matched_skills": matched_skills,
        "missing_skills": missing_skills,
        "ats_improvement_suggestions": suggestions[:3],  # Max 3 suggestions
        "fallback_used": True
    }
    
    # Calculate simple score (percentage of matched keywords)
    score = int(len(matched) / max(len(jd_keywords), 1) * 100)
    
    # Determine role fit based on score
    if score > 75:
        role_fit = "Strong"
    elif score > 50:
        role_fit = "Moderate"
    elif score > 25:
        role_fit = "Weak"
    else:
        role_fit = "Poor"
    
    # Generate some basic improvement suggestions
    suggestions = []
    if score < 80:
        suggestions = [f"Add experience with {kw}" for kw in list(missing)[:3]]
    
    return {
        "ats_match_score": min(score, 95),  # Cap at 95% for rule-based matching
        "role_fit": role_fit,
        "matched_skills": list(matched)[:10],
        "missing_skills": list(missing)[:10],
        "matched_responsibilities": [],
        "missing_responsibilities": [],
        "keyword_gap_analysis": {
            "present_keywords": list(matched)[:10],
            "missing_keywords": list(missing)[:10]
        },
        "ats_improvement_suggestions": suggestions[:3],
        "fallback_used": True
    }

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

JD_MATCH_SYSTEM_PROMPT = """You are an ATS (Applicant Tracking System) used by large software companies.

Your task:
• Compare a resume with a job description
• Identify skill, tool, and responsibility overlap
• Score match realistically (do not inflate)
• Highlight missing but critical requirements
• Provide recruiter-style feedback

Rules:
• Do not fabricate skills
• Do not assume experience not stated
• Be strict but fair
• Think like an enterprise ATS"""


def compare_resume_with_jd(
    resume_text: str,
    job_description: str,
    target_role: Optional[str] = None
) -> Dict[str, Any]:
    """
    Compares resume with job description and calculates ATS match score
    
    Args:
        resume_text: Full resume text
        job_description: Job description text
    
    Returns:
        Dict with match analysis
    """
    wait_for_slot()

    user_prompt = f"""Compare the following resume with the given Job Description.

Instructions:
1. Calculate ATS match percentage (0–100)
2. Identify matched skills
3. Identify missing critical skills
4. Identify partially matched responsibilities
5. Determine role fit (Strong / Moderate / Weak)
6. Suggest exact improvements to increase ATS score

Resume:
\"\"\"{resume_text}\"\"\"

Job Description:
\"\"\"{job_description}\"\"\"

Return ONLY structured JSON with this exact format:
{{
  "ats_match_score": 78,
  "role_fit": "Moderate",
  "matched_skills": ["python", "react", "node.js"],
  "missing_skills": ["docker", "aws"],
  "matched_responsibilities": ["Built REST APIs", "Frontend-backend integration"],
  "missing_responsibilities": ["CI/CD pipelines", "Cloud deployment"],
  "keyword_gap_analysis": {{
    "present_keywords": ["api", "database", "frontend"],
    "missing_keywords": ["microservices", "cloud"]
  }},
  "ats_improvement_suggestions": [
    "Add Docker usage in projects",
    "Mention cloud deployment experience",
    "Include CI/CD tools if applicable"
  ]
}}"""

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            temperature=0.2,
            messages=[
                {"role": "system", "content": JD_MATCH_SYSTEM_PROMPT},
                {"role": "user", "content": user_prompt}
            ],
            response_format={"type": "json_object"}
        )

        result = json.loads(response.choices[0].message.content)
        
        # Post-process the result to ensure it matches our expected format
        if not isinstance(result, dict):
            raise ValueError("Invalid response format from LLM")
            
        # Ensure all required fields are present
        result.setdefault("ats_match_score", 0)
        result.setdefault("role_fit", "Unknown")
        result.setdefault("matched_skills", [])
        result.setdefault("missing_skills", [])
        result.setdefault("ats_improvement_suggestions", [])
        result["fallback_used"] = False
        
        return result
        
    except Exception as e:
        print(f"Error in LLM-based JD matching: {str(e)}")
        # Fall back to rule-based matching with the target role
        return rule_based_jd_match(resume_text, job_description, target_role)

