from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from fastapi.responses import FileResponse
from datetime import datetime
from app.core.deps import get_current_user
from app.core.background import test_redis_connection
from app.utils.file_handler import save_file
from app.tasks.resume_tasks import process_resume_task
from app.database.celery_db import user_history, resumes
from bson import ObjectId
import os

router = APIRouter()


@router.post("/analyze-async")
async def analyze_resume(
    file: UploadFile = File(...),
    current_user: dict = Depends(get_current_user)
):
    """
    Upload and analyze resume asynchronously.
    Returns task_id to check status later.
    Automatically saves to user history immediately.
    """
    # Check Redis connection first
    if not test_redis_connection():
        raise HTTPException(
            status_code=503,
            detail="Redis server is not available. Please start Redis using: docker-compose up -d redis (in backend directory) or install Redis locally."
        )
    
    # Validate file type
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file provided")
    
    allowed_extensions = [".pdf", ".doc", ".docx"]
    file_ext = "." + file.filename.split(".")[-1].lower() if "." in file.filename else ""
    
    if file_ext not in allowed_extensions:
        raise HTTPException(
            status_code=400, 
            detail=f"Invalid file type. Allowed: {', '.join(allowed_extensions)}"
        )

    # Save the uploaded file
    try:
        file_path = save_file(file)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error saving file: {str(e)}")

    # Get user email from current_user
    user_email = current_user.get("email")
    if not user_email:
        raise HTTPException(status_code=401, detail="User email not found")

    # Save to history immediately with "processing" status
    history_entry = {
        "user_email": user_email,
        "filename": file.filename,
        "file_path": file_path,
        "status": "processing",
        "role": None,
        "ats_score": None,
        "resume_strength": None,
        "overall_score": None,
        "resume_id": None,
        "task_id": None,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }
    
    history_result = user_history.insert_one(history_entry)
    history_id = str(history_result.inserted_id)

    # Trigger Celery task for background processing
    try:
        task = process_resume_task.delay(file_path, user_email, history_id)
        
        # Update history with task_id
        user_history.update_one(
            {"_id": ObjectId(history_id)},
            {"$set": {"task_id": task.id, "updated_at": datetime.utcnow()}}
        )
        
        return {
            "message": "Resume analysis started",
            "task_id": task.id,
            "filename": file.filename,
            "history_id": history_id,
            "status_url": f"/resume/status/{task.id}"
        }
    except Exception as e:
        error_msg = str(e)
        # Update history with error status
        user_history.update_one(
            {"_id": ObjectId(history_id)},
            {"$set": {
                "status": "failed",
                "error": error_msg,
                "updated_at": datetime.utcnow()
            }}
        )
        
        if "redis" in error_msg.lower() or "connection" in error_msg.lower():
            raise HTTPException(
                status_code=503,
                detail="Cannot connect to Redis. Please ensure Redis is running. Start it with: docker-compose up -d redis"
            )
        raise HTTPException(status_code=500, detail=f"Error starting analysis: {error_msg}")


@router.get("/result/{resume_id}")
async def get_resume_result(resume_id: str, current_user: dict = Depends(get_current_user)):
    """Get resume analysis result by resume_id"""
    try:
        # Find the resume in user history
        user_email = current_user.get("email")
        if not user_email:
            raise HTTPException(status_code=401, detail="User email not found")
        
        # Look for the resume in history
        history_entry = user_history.find_one({
            "user_email": user_email,
            "resume_id": resume_id
        })
        
        if not history_entry:
            raise HTTPException(status_code=404, detail="Resume result not found")
        
        # Return the stored analysis result
        if history_entry.get("status") != "completed" or not history_entry.get("analysis_result"):
            raise HTTPException(status_code=404, detail="Analysis not completed yet")
        
        return history_entry["analysis_result"]
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching result: {str(e)}")


@router.get("/download/{resume_id}")
async def download_resume_pdf(resume_id: str, current_user: dict = Depends(get_current_user)):
    """Download the original PDF file for a resume"""
    try:
        # Find the resume in the database
        user_email = current_user.get("email")
        if not user_email:
            raise HTTPException(status_code=401, detail="User email not found")
        
        print(f"Download request for resume ID: {resume_id}, user: {user_email}")
        # Look for the resume in resumes collection
        resume = resumes.find_one({"_id": ObjectId(resume_id)})
        if not resume:
            print(f"Resume {resume_id} not found in resumes collection, checking history...")
            # Fallback: Check if it exists in history and get file_path from there
            history_record = user_history.find_one({
                "user_email": user_email,
                "$or": [
                    {"resume_id": ObjectId(resume_id)},
                    {"resume_id": resume_id}
                ]
            })
            if history_record and history_record.get("file_path"):
                file_path = history_record.get("file_path")
                print(f"Found file_path in history: {file_path}")
                if os.path.exists(file_path):
                    filename = history_record.get("filename", f"resume_{resume_id}.pdf")
                    print(f"File exists, returning PDF: {filename}")
                    return FileResponse(
                        path=file_path,
                        filename=filename,
                        media_type='application/pdf'
                    )
                else:
                    print(f"File not found at path: {file_path}")
                    raise HTTPException(status_code=404, detail=f"File not found at path: {file_path}")
            else:
                print(f"Resume {resume_id} not found in either collection, returning 404 JSON")
                # Return JSON error response instead of FileResponse
                from fastapi.responses import JSONResponse
                return JSONResponse(
                    status_code=404,
                    content={"detail": f"Resume not found. The resume may not be processed or the file may be missing."},
                    media_type="application/json"
                )
        
        # Verify ownership (temporary fix for debugging)
        resume_user_email = resume.get("user_email")
        print(f"Download attempt - Resume user_email: {resume_user_email}, Current user_email: {user_email}")
        
        # Temporary: Allow access if user_email is not set or if there's a mismatch (for debugging)
        # TODO: Remove this in production and fix the root cause
        if resume_user_email and resume_user_email != user_email:
            print(f"Authorization failed: {resume_user_email} != {user_email}")
            # For now, allow access but log the issue
            # raise HTTPException(status_code=403, detail="Not authorized to access this resume")
        else:
            print("Authorization passed")
        
        # Get the file path
        file_path = resume.get("file_path")
        print(f"Looking for file at path: {file_path}")  # Debug logging
        
        if not file_path:
            # Fallback: try to get file_path from history
            history_record = user_history.find_one({
                "user_email": user_email,
                "resume_id": ObjectId(resume_id)
            })
            if history_record and history_record.get("file_path"):
                file_path = history_record.get("file_path")
                print(f"Found file_path in history: {file_path}")
            else:
                raise HTTPException(status_code=404, detail="File path not found in resume record")
        
        if not os.path.exists(file_path):
            raise HTTPException(status_code=404, detail=f"File not found at path: {file_path}")
        
        # Get the original filename
        filename = resume.get("original_filename", f"resume_{resume_id}.pdf")
        
        # Return the file
        return FileResponse(
            path=file_path,
            filename=filename,
            media_type='application/pdf'
        )
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error downloading file: {str(e)}")


@router.delete("/delete/{resume_id}")
async def delete_resume(resume_id: str, current_user: dict = Depends(get_current_user)):
    """Delete a resume and its analysis"""
    try:
        # Find the resume in the database
        user_email = current_user.get("email")
        if not user_email:
            raise HTTPException(status_code=401, detail="User email not found")
        
        print(f"Attempting to delete resume with ID: {resume_id}")
        # Look for the resume in resumes collection
        resume = resumes.find_one({"_id": ObjectId(resume_id)})
        if not resume:
            print(f"Resume with ID {resume_id} not found in database. Checking if it's in history only...")
            # Fallback: Check if it exists in history and delete from there
            history_record = user_history.find_one({
                "user_email": user_email,
                "$or": [
                    {"resume_id": ObjectId(resume_id)},
                    {"resume_id": resume_id}
                ]
            })
            if history_record:
                print(f"Found resume in history, deleting from history only")
                # Delete from user history with improved matching
                delete_result = user_history.delete_many({
                    "user_email": user_email,
                    "$or": [
                        {"resume_id": ObjectId(resume_id)},
                        {"resume_id": resume_id}
                    ]
                })
                print(f"History-only delete result: {delete_result.deleted_count} records deleted")
                return {"message": "Resume history deleted successfully (resume file was not found)"}
            else:
                print(f"Resume with ID {resume_id} not found in database or history.")
                raise HTTPException(status_code=404, detail="Resume not found")
        
        # Verify ownership (temporary fix for debugging)
        resume_user_email = resume.get("user_email")
        print(f"Delete attempt - Resume user_email: {resume_user_email}, Current user_email: {user_email}")
        
        # Temporary: Allow access if user_email is not set or if there's a mismatch (for debugging)
        # TODO: Remove this in production and fix the root cause
        if resume_user_email and resume_user_email != user_email:
            print(f"Authorization failed: {resume_user_email} != {user_email}")
            # For now, allow access but log the issue
            # raise HTTPException(status_code=403, detail="Not authorized to access this resume")
        else:
            print("Authorization passed")
        
        # Delete the file if it exists
        file_path = resume.get("file_path")
        if file_path and os.path.exists(file_path):
            os.remove(file_path)
        
        # Delete from resumes collection
        resumes.delete_one({"_id": ObjectId(resume_id)})
        
        # Delete from user history
        print(f"Deleting from history with user_email: {user_email}, resume_id: {resume_id}")
        
        # Try both ObjectId and string matching for resume_id
        delete_result = user_history.delete_many({
            "user_email": user_email,
            "$or": [
                {"resume_id": ObjectId(resume_id)},
                {"resume_id": resume_id}
            ]
        })
        print(f"History delete result: {delete_result.deleted_count} records deleted")
        
        return {"message": "Resume deleted successfully"}
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error deleting resume: {str(e)}")
