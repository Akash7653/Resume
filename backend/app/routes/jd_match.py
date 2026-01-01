"""
JD vs Resume Matching API Routes
"""
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from app.core.deps import get_current_user
from app.ai.jd_match_engine import compare_resume_with_jd
from app.database.celery_db import resumes
from bson import ObjectId

router = APIRouter(prefix="/jd", tags=["JD Matching"])


class JDMatchRequest(BaseModel):
    resume_id: str
    job_description: str


@router.post("/match")
async def match_resume_with_jd(
    request: JDMatchRequest,
    current_user: dict = Depends(get_current_user)
):
    """
    Compare resume with job description and calculate ATS match score
    """
    # Get resume from database
    resume = resumes.find_one({"_id": ObjectId(request.resume_id)})
    if not resume:
        print(f"Resume {request.resume_id} not found in resumes collection, checking history...")
        # Fallback: Check if resume exists in history collection
        from app.database.celery_db import user_history
        history_record = user_history.find_one({
            "user_email": current_user.get("email"),
            "$or": [
                {"resume_id": ObjectId(request.resume_id)},
                {"resume_id": request.resume_id}
            ]
        })
        if history_record:
            print(f"Found resume in history, but no processed resume data available")
            raise HTTPException(status_code=404, detail="Resume analysis not completed. Please re-upload the resume for JD matching.")
        else:
            print(f"Resume {request.resume_id} not found in either collection")
            raise HTTPException(status_code=404, detail="Resume not found")
    
    # Verify ownership
    if resume.get("user_email") != current_user.get("email"):
        raise HTTPException(status_code=403, detail="Not authorized to access this resume")
    
    # Extract resume text from stored data
    resume_text = resume.get("raw_text", "")
    
    if not resume_text or not resume_text.strip():
        raise HTTPException(status_code=400, detail="Resume text not available for matching. Please re-upload the resume.")
    
    try:
        match_result = compare_resume_with_jd(
            resume_text=resume_text,
            job_description=request.job_description
        )
        
        # Remove error field if present and set fallback_used flag
        if isinstance(match_result, dict) and "error" in match_result:
            match_result.pop("error", None)
            match_result["fallback_used"] = True
        
        analysis = match_result
        analysis["role"] = resume.get("role", "Not specified")
        
        return {
            "resume_id": request.resume_id,
            "match_analysis": analysis
        }
    except Exception as e:
        # Return a basic fallback response if there's an error
        fallback_response = {
            "ats_match_score": 0,
            "role_fit": "Error",
            "matched_skills": [],
            "missing_skills": [],
            "matched_responsibilities": [],
            "missing_responsibilities": [],
            "keyword_gap_analysis": {
                "present_keywords": [],
                "missing_keywords": []
            },
            "ats_improvement_suggestions": [
                "Unable to analyze job description at this time. Please try again later."
            ],
            "fallback_used": True
        }
        
        return {
            "resume_id": request.resume_id,
            "match_analysis": fallback_response
        }

