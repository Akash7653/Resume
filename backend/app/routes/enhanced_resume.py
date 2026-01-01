"""
Enhanced Resume Analysis API Endpoints

This module provides API endpoints for the enhanced resume analysis features.
"""
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, status
from typing import Dict, Any, Optional
import os
import tempfile
from pathlib import Path
from bson import ObjectId
from datetime import datetime

from app.ai.enhanced_resume_analyzer import analyze_resume
from app.ai.parser import extract_text
from app.core.security import get_current_user
from app.database.db import db  # MongoDB database instance

router = APIRouter()

@router.post("/analyze", response_model=Dict[str, Any])
async def analyze_resume_endpoint(
    file: UploadFile = File(...),
    current_user: Dict = Depends(get_current_user)
):
    """
    Analyze a resume with enhanced parsing and return detailed insights.
    """
    try:
        # Save uploaded file temporarily
        with tempfile.NamedTemporaryFile(delete=False, suffix=Path(file.filename).suffix) as temp_file:
            content = await file.read()
            temp_file.write(content)
            temp_file_path = temp_file.name

        try:
            # Extract text from the uploaded file
            raw_text = extract_text(temp_file_path)
            
            if not raw_text.strip():
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Could not extract text from the uploaded file"
                )
            
            # Perform enhanced resume analysis
            analysis_result = analyze_resume(raw_text)
            
            # Save the analysis to MongoDB
            resume_data = {
                "user_id": ObjectId(current_user["id"]),
                "email": current_user.get("email"),
                "original_filename": file.filename,
                "file_type": file.content_type,
                "file_size": len(content),
                "analysis": analysis_result,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            }
            
            # Insert into MongoDB
            result = db.resumes.insert_one(resume_data)
            
            # Add the ID to the response
            analysis_result["id"] = str(result.inserted_id)
            
            return analysis_result
            
        except HTTPException:
            raise
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Error analyzing resume: {str(e)}"
            )
        finally:
            # Clean up the temporary file
            try:
                os.unlink(temp_file_path)
            except:
                pass
                
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error processing resume: {str(e)}"
        )

@router.get("/analysis/{resume_id}", response_model=Dict[str, Any])
async def get_resume_analysis(
    resume_id: str,
    current_user: Dict = Depends(get_current_user)
):
    """
    Retrieve a previously generated resume analysis by ID.
    """
    try:
        # Validate resume_id format
        try:
            resume_oid = ObjectId(resume_id)
        except:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid resume ID format"
            )
        
        # Find the resume in MongoDB
        resume = db.resumes.find_one({
            "_id": resume_oid,
            "user_id": ObjectId(current_user["id"])
        })
        
        if not resume:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Resume analysis not found"
            )
            
        # Convert ObjectId to string for JSON serialization
        resume["_id"] = str(resume["_id"])
        resume["user_id"] = str(resume["user_id"])
        
        return resume
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error retrieving resume analysis: {str(e)}"
        )