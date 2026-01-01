"""
Resume Rewrite API Routes
"""
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from app.core.deps import get_current_user
from app.ai.resume_rewrite_engine import generate_resume_rewrite
from app.ai.ats_engine import ats_score
from app.database.celery_db import resumes
from app.utils.role_normalizer import normalize_role
from bson import ObjectId

router = APIRouter(prefix="/resume", tags=["Resume Rewrite"])


class RewriteRequest(BaseModel):
    resume_id: str
    target_role: str
    candidate_level: str = "Mid"  # Fresher | Junior | Mid | Senior


@router.post("/rewrite")
async def rewrite_resume(
    request: RewriteRequest,
    current_user: dict = Depends(get_current_user)
):
    """
    Rewrite resume content for ATS optimization and role-specific targeting
    """
    # Get resume from database
    resume = resumes.find_one({"_id": ObjectId(request.resume_id)})
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")
    
    # Verify ownership
    if resume.get("user_email") != current_user.get("email"):
        raise HTTPException(status_code=403, detail="Not authorized to access this resume")
    
    # Extract resume text from stored data
    resume_text = resume.get("raw_text", "")
    
    if not resume_text or not resume_text.strip():
        raise HTTPException(status_code=400, detail="Resume text not available for rewriting. Please re-upload the resume.")
    
    try:
        # Normalize the target role
        normalized_role = normalize_role(request.target_role)
        
        # Get fresh ATS data with normalized role
        ats_data = ats_score(resume_text, normalized_role)
        
        # Generate rewrite with fresh ATS data and normalized role
        rewritten = generate_resume_rewrite(
            resume_text=resume_text,
            target_role=normalized_role,
            candidate_level=request.candidate_level,
            ats_data=ats_data
        )
        
        # Ensure fallback_used is set if needed
        if isinstance(rewritten, dict):
            if "error" in rewritten:
                rewritten.pop("error", None)
                rewritten["fallback_used"] = True
            elif "fallback_used" not in rewritten:
                rewritten["fallback_used"] = False
        
        return {
            "resume_id": request.resume_id,
            "target_role": normalized_role,  # Return normalized role
            "original_role": request.target_role,  # Keep original for reference
            "rewritten": rewritten
        }
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail="An error occurred while processing your resume. Please try again later."
        )

