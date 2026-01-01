"""
Analytics API Routes

This module provides analytics endpoints for the application.
"""
from fastapi import APIRouter, Depends, HTTPException
from app.database.celery_db import resumes, user_history
from app.core.deps import get_current_user
from datetime import datetime, timedelta

router = APIRouter()


@router.get("/count")
def get_analytics():
    """Get total number of resumes in the system"""
    total_resumes = resumes.count_documents({})
    
    return {
        "total_resumes": total_resumes
    }


@router.get("/dashboard")
def get_dashboard_analytics(current_user: dict = Depends(get_current_user)):
    """Get dashboard analytics for current user"""
    try:
        user_email = current_user.get("email")
        if not user_email:
            raise HTTPException(status_code=401, detail="User email not found")
        
        # Get user's resume history
        user_resumes = list(user_history.find(
            {"user_email": user_email, "status": "completed"},
            {"_id": 0, "resume_id": 1, "role": 1, "ats_score": 1, 
             "resume_strength": 1, "overall_score": 1, "created_at": 1}
        ).sort("created_at", -1))
        
        # Calculate analytics
        total_resumes = len(user_resumes)
        avg_ats_score = sum(r.get("ats_score", 0) for r in user_resumes) / total_resumes if total_resumes > 0 else 0
        avg_overall_score = sum(r.get("overall_score", 0) for r in user_resumes) / total_resumes if total_resumes > 0 else 0
        
        # Role distribution
        role_counts = {}
        for resume in user_resumes:
            role = resume.get("role", "Unknown")
            role_counts[role] = role_counts.get(role, 0) + 1
        
        # Recent activity (last 7 days)
        seven_days_ago = datetime.utcnow() - timedelta(days=7)
        recent_activity = len([
            r for r in user_resumes 
            if r.get("created_at") and r["created_at"] > seven_days_ago
        ])
        
        return {
            "total_resumes": total_resumes,
            "avg_ats_score": round(avg_ats_score, 1),
            "avg_overall_score": round(avg_overall_score, 1),
            "role_distribution": role_counts,
            "recent_activity": recent_activity,
            "recent_resumes": user_resumes[:5]  # Last 5 resumes
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching analytics: {str(e)}")
