# ✅ MUST BE FIRST (Celery app must load before task registration)
from app.core.background import celery_app
from app.database.celery_db import user_history

from app.ai.response_formatter import format_resume_response
from app.ai.improvement_engine_llm import generate_improvements_llm
from app.ai.improvement_engine import generate_improvements
from app.ai.parser import extract_text, fix_broken_headers
from app.ai.role_engine import predict_role_advanced
from app.ai.ats_engine import ats_score
from app.ai.cache import make_cache_key
from app.ai.section_parser import ResumeParser, SectionType
from app.ai.resume_quality_engine import evaluate_resume_quality

from app.database.celery_db import resumes, resume_cache
from datetime import datetime
import os


@celery_app.task(bind=True, name="app.tasks.resume_tasks.process_resume_task")
def process_resume_task(self, file_path: str, user_email: str, history_id: str = None):
    """
    Main background task for resume analysis
    Updates existing history entry if history_id is provided, otherwise creates new one
    """
    from bson import ObjectId
    
    def update_history_on_error(error_msg: str):
        """Helper function to update history with error status"""
        if history_id:
            try:
                user_history.update_one(
                    {"_id": ObjectId(history_id)},
                    {"$set": {
                        "status": "failed",
                        "error": error_msg,
                        "updated_at": datetime.utcnow()
                    }}
                )
            except Exception:
                pass  # Silently fail if history update fails

    # ------------------ VALIDATION ------------------
    if not file_path or not os.path.exists(file_path):
        error_msg = "Resume file not found"
        update_history_on_error(error_msg)
        return {"state": "FAILURE", "error": error_msg}
    
    try:
        # ------------------ STEP 1: TEXT EXTRACTION ------------------
        self.update_state(state="PROGRESS", meta={"step": "Extracting resume text"})
        raw_text = extract_text(file_path)
        
        # Fix broken headers in the extracted text
        raw_text = fix_broken_headers(raw_text)

        # ------------------ STEP 2: ROLE PREDICTION ------------------
        self.update_state(state="PROGRESS", meta={"step": "Predicting job role"})
        role_result = predict_role_advanced(raw_text)
        role = role_result.get("job_role", "Unknown")
        confidence = float(role_result.get("confidence", 0))

        # ------------------ STEP 3: SECTION PARSING ------------------
        sections = ResumeParser().parse_sections(raw_text)
        
        # Create a dictionary with section names as keys and content as values
        sections_dict = {}
        normalized_parts = []
        
        # Debug: Print detected section types
        print("DETECTED SECTIONS:", [s.value for s in sections.keys()])
        
        # Process each section and build both the dictionary and normalized text
        for section_type, section in sections.items():
            if hasattr(section, 'content'):  # Make sure it's a Section object
                section_name = section_type.value
                sections_dict[section_name] = section.content
                
                # Only include specific sections in the normalized text for ATS scoring
                if section_type in [SectionType.SKILLS, SectionType.EXPERIENCE, 
                                 SectionType.PROJECTS, SectionType.EDUCATION]:
                    normalized_parts.append(section.content)
        
        # Join all relevant sections for ATS scoring
        normalized_text = " ".join(normalized_parts)

        # Fallback if sections are empty (edge-case PDFs)
        if not normalized_text.strip():
            normalized_text = raw_text
            print("Warning: Using raw text for ATS scoring as no sections were found")

        # Debug: Log detected sections
        print("Detected sections:", list(sections_dict.keys()))

        # ------------------ STEP 4: ATS SCORING ------------------
        ats = ats_score(normalized_text, role)
        ats_score_value = int(ats.get("score", 0))

        # ------------------ STEP 5: RESUME QUALITY ------------------
        resume_quality = evaluate_resume_quality(sections_dict)
        quality_score = resume_quality.get("overall_score", 0)

        # ------------------ STEP 6: FINAL RESUME STRENGTH ------------------
        final_score = int((quality_score * 0.4) + (ats_score_value * 0.6))

        if final_score >= 75:
            resume_strength = {"score": final_score, "label": "Strong", "color": "green"}
        elif final_score >= 50:
            resume_strength = {"score": final_score, "label": "Average", "color": "yellow"}
        else:
            resume_strength = {"score": final_score, "label": "Weak", "color": "red"}

        # ------------------ STEP 7: CACHE CHECK (FIXED) ------------------
        cache_key = make_cache_key(normalized_text, role)
        cached = resume_cache.find_one({"cache_key": cache_key})

        if cached:
            # 🔐 Backward-compatible cache handling
            if "ui" not in cached:
                formatted_ui = format_resume_response(
                    role=role,
                    confidence=confidence,
                    ats=ats,
                    resume_quality=resume_quality,
                    resume_strength=resume_strength,
                    improvements=cached.get("improvement_tips", [])
                )

                resume_cache.update_one(
                    {"_id": cached["_id"]},
                    {"$set": {"ui": formatted_ui}}
                )
            else:
                formatted_ui = cached["ui"]

            # Update history with cached result
            cached_resume_id = str(cached.get("resume_id"))
            if history_id:
                try:
                    cached_resume = resumes.find_one({"_id": ObjectId(cached_resume_id)})
                    if cached_resume:
                        user_history.update_one(
                            {"_id": ObjectId(history_id)},
                            {"$set": {
                                "resume_id": cached_resume_id,
                                "role": cached_resume.get("role"),
                                "ats_score": cached_resume.get("ats_score"),
                                "resume_strength": cached_resume.get("resume_strength", {}).get("label"),
                                "overall_score": cached_resume.get("resume_quality", {}).get("overall_score", 0),
                                "status": "completed",
                                "analysis_result": {
                                    "resume_id": cached_resume_id,
                                    "ui": formatted_ui,
                                    "role": cached_resume.get("role"),
                                    "ats_score": cached_resume.get("ats_score"),
                                    "resume_strength": cached_resume.get("resume_strength"),
                                    "resume_quality": cached_resume.get("resume_quality"),
                                    "improvements": cached_resume.get("improvement_tips", []),
                                    "cached": True
                                },
                                "updated_at": datetime.utcnow()
                            }}
                        )
                except Exception:
                    pass  # Silently fail if history update fails
            
            return {
                "state": "SUCCESS",
                "result": {
                    "resume_id": cached_resume_id,
                    "cached": True,
                    "ui": formatted_ui
                }
            }

        # ------------------ STEP 8: IMPROVEMENTS ------------------
        # Use full raw_text for comprehensive LLM analysis (includes all sections)
        # normalized_text is used for ATS scoring, but raw_text gives better context
        improvements = None
        
        try:
            improvements = generate_improvements_llm(
                resume_text=raw_text,  # Use full resume text for comprehensive analysis
                role=role,
                ats=ats
            )
            # Validate improvements structure - ensure no error field
            if improvements and "error" in improvements:
                raise Exception("LLM returned error in response")
            if not improvements or not isinstance(improvements, dict):
                raise Exception("LLM returned invalid response")
        except Exception as e:
            # Always fallback to rule-based improvements if LLM fails
            # This handles quota errors (429), API errors, network issues, etc.
            improvements = generate_improvements(
                normalized_text,
                role,
                ats
            )
            # Clean up any error fields from fallback
            if "_fallback_reason" in improvements:
                del improvements["_fallback_reason"]
            if "error" in improvements:
                del improvements["error"]

        # ------------------ STEP 9: SAVE TO DB ------------------
        record = {
            "user_email": user_email,
            "role": role,
            "confidence": confidence,
            "ats_score": ats_score_value,
            "matched_skills": ats.get("matched_skills", []),
            "missing_skills": ats.get("missing_skills", []),
            "resume_quality": resume_quality,
            "resume_strength": resume_strength,
            "improvement_tips": improvements,
            "raw_text": raw_text,  # Store full resume text for rewrite/JD matching
            "sections": sections_dict,  # Store parsed sections as dictionary
            "file_path": file_path,  # Store the original file path for download
            "original_filename": os.path.basename(file_path),  # Store original filename
            "created_at": datetime.utcnow()
        }

        result = resumes.insert_one(record)
        resume_id_str = str(result.inserted_id)
        
        # ------------------ STEP 10: UI FORMAT ------------------
        formatted_ui = format_resume_response(
            role=role,
            confidence=confidence,
            ats=ats,
            resume_quality=resume_quality,
            resume_strength=resume_strength,
            improvements=improvements
        )
        
        # ------------------ UPDATE OR SAVE USER HISTORY ------------------
        if history_id:
            # Update existing history entry with full analysis result
            user_history.update_one(
                {"_id": ObjectId(history_id)},
                {"$set": {
                    "resume_id": resume_id_str,
                    "role": role,
                    "ats_score": ats_score_value,
                    "resume_strength": resume_strength["label"],
                    "overall_score": resume_quality.get("overall_score", 0),
                    "status": "completed",
                    "analysis_result": {
                        "resume_id": resume_id_str,
                        "ui": formatted_ui,
                        "role": role,
                        "ats_score": ats_score_value,
                        "resume_strength": resume_strength,
                        "resume_quality": resume_quality,
                        "improvements": improvements,
                        "cached": False
                    },
                    "updated_at": datetime.utcnow()
                }}
            )
        else:
            # Create new history entry with full analysis result
            user_history.insert_one({
                "user_email": user_email,
                "resume_id": resume_id_str,
                "role": role,
                "ats_score": ats_score_value,
                "resume_strength": resume_strength["label"],
                "overall_score": resume_quality.get("overall_score", 0),
                "status": "completed",
                "analysis_result": {
                    "resume_id": resume_id_str,
                    "ui": formatted_ui,
                    "role": role,
                    "ats_score": ats_score_value,
                    "resume_strength": resume_strength,
                    "resume_quality": resume_quality,
                    "improvements": improvements,
                    "cached": False
                },
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            })

        resume_cache.insert_one({
            "cache_key": cache_key,
            "resume_id": str(result.inserted_id),
            "ui": formatted_ui,
            "created_at": datetime.utcnow().isoformat()
        })

        return {
            "state": "SUCCESS",
            "result": {
                "resume_id": str(result.inserted_id),
                "ui": formatted_ui,
                "cached": False
            }
        }
    except Exception as e:
        # Update history with error status
        error_msg = str(e)
        update_history_on_error(error_msg)
        return {"state": "FAILURE", "error": error_msg}
