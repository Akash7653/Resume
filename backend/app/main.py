from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import auth, resume, history, analytics, realtime, resume_status, resume_rewrite, jd_match, payments

app = FastAPI(title="ResumeIQ – Enterprise AI Resume Backend")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173", 
        "http://127.0.0.1:5173", 
        "http://localhost:5174", 
        "http://127.0.0.1:5174",
        "http://localhost:3000", 
        "http://127.0.0.1:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"status": "ResumeIQ backend running 🚀"}

app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(resume.router, prefix="/resume", tags=["Resume"])
app.include_router(resume_status.router, prefix="/resume", tags=["Resume Status"])
app.include_router(resume_rewrite.router, tags=["Resume Rewrite"])
app.include_router(jd_match.router, tags=["JD Matching"])
app.include_router(history.router, prefix="/history", tags=["History"])
app.include_router(analytics.router, prefix="/analytics", tags=["Analytics"])
app.include_router(realtime.router, prefix="/realtime", tags=["Realtime"])
app.include_router(payments.router, prefix="/api/payments", tags=["Payments"])
