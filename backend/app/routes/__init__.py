"""
API Routes Package

This package contains all the API route modules for the application.
"""
from fastapi import APIRouter

# Import route modules
from . import auth, resume, resume_rewrite, resume_status, jd_match, history, analytics, realtime, enhanced_resume
