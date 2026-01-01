from fastapi import APIRouter, Depends, HTTPException
from datetime import datetime
from bson import ObjectId

from app.database.celery_db import user_history, resumes
from app.core.deps import get_current_user

router = APIRouter(tags=["History"])


@router.post("/save")
def save_history(resume_id: str, user=Depends(get_current_user)):
    """
    Manually save resume to history (optional - history is auto-saved on upload)
    Checks if entry already exists to prevent duplicates
    """
    resume = resumes.find_one({"_id": ObjectId(resume_id)})
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")

    # Check if history entry already exists for this resume_id and user
    existing = user_history.find_one({
        "user_email": user["email"],
        "resume_id": ObjectId(resume_id)
    })

    if existing:
        # Update existing entry instead of creating duplicate
        user_history.update_one(
            {"_id": existing["_id"]},
            {"$set": {
                "role": resume.get("role"),
                "ats_score": resume.get("ats_score"),
                "resume_strength": resume.get("resume_strength", {}).get("label"),
                "overall_score": resume.get("resume_quality", {}).get("overall_score"),
                "updated_at": datetime.utcnow()
            }}
        )
        return {"message": "History updated", "history_id": str(existing["_id"])}
    else:
        # Create new entry only if it doesn't exist
        result = user_history.insert_one({
            "user_email": user["email"],
            "resume_id": ObjectId(resume_id),
            "role": resume.get("role"),
            "ats_score": resume.get("ats_score"),
            "resume_strength": resume.get("resume_strength", {}).get("label"),
            "overall_score": resume.get("resume_quality", {}).get("overall_score"),
            "status": "completed",
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        })
        return {"message": "History saved", "history_id": str(result.inserted_id)}


@router.get("/my")
def my_history(user=Depends(get_current_user)):
    user_email = user["email"]
    print(f"Fetching history for user: {user_email}")
    
    records = user_history.find(
        {"user_email": user_email}
    ).sort("created_at", -1)

    history_list = []
    for r in records:
        history_item = {
            "id": str(r["_id"]),
            "resume_id": str(r.get("resume_id")) if r.get("resume_id") else None,
            "filename": r.get("filename"),
            "status": r.get("status", "completed"),  # processing, completed, failed
            "role": r.get("role"),
            "ats_score": r.get("ats_score"),
            "resume_strength": r.get("resume_strength"),
            "overall_score": r.get("overall_score"),
            "task_id": r.get("task_id"),
            "error": r.get("error"),
            "created_at": r.get("created_at"),
            "updated_at": r.get("updated_at"),
            "file_path": r.get("file_path")  # Add file_path to response
        }
        history_list.append(history_item)
    
    # Debug: Print first few items with dates
    print(f"History items (first 3):")
    for i, item in enumerate(history_list[:3]):
        print(f"  {i}: {item.get('filename')} - {item.get('created_at')} - resume_id: {item.get('resume_id')} - file_path: {item.get('file_path')}")
    
    print(f"Found {len(history_list)} history records for user {user_email}")
    return history_list
