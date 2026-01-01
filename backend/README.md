# ResumeIQ – Enterprise AI Resume Analyzer Backend 🚀

ResumeIQ is a **production-grade AI-powered resume analysis backend** built using **FastAPI**.  
It analyzes resumes for **ATS compatibility**, performs **Job Description (JD) matching**, and generates **role-specific resume rewrites** with intelligent AI + fallback logic.

This backend follows **real SaaS architecture principles** and is suitable for **internships, full-stack roles, AI projects, and final-year submissions**.

---

## ✨ Features

### 📄 Resume Analysis (Async)
- PDF resume upload
- Asynchronous background processing
- ATS score calculation
- Resume quality scoring
- Skill gap detection
- Project & experience recommendations

### ✍️ Resume Rewrite (ATS Optimized)
- Role-specific rewrite (Fresher / Mid / Senior)
- Clean, structured output
- AI-powered rewriting
- Smart fallback when AI quota is unavailable
- Never returns empty or broken data

### 📊 Job Description (JD) Matching
- Resume vs JD ATS match score
- Matched & missing skills
- Keyword gap analysis
- Role fit classification (Weak / Moderate / Strong)
- Garbage token filtering (`r`, `a`, `s`, etc.)

### 🧠 Smart AI Handling
- Uses LLM when available
- Automatic heuristic fallback when quota is exceeded
- Stable outputs under all conditions
- No crashes, no invalid responses

### 📜 History & Analytics
- Resume analysis history per user
- Usage analytics
- JWT-secured endpoints

---

## 🏗️ Project Structure

```text
backend/
├── app/
│   ├── api/                     # API routes
│   │   ├── resume.py
│   │   ├── resume_status.py
│   │   ├── resume_rewrite.py
│   │   └── jd_match.py
│   ├── ai/                      # AI engines
│   │   ├── resume_rewrite_engine.py
│   │   └── jd_match_engine.py
│   ├── tasks/                   # Background tasks
│   │   └── resume_tasks.py
│   ├── utils/
│   │   └── config.py
│   └── main.py                  # FastAPI entry point
├── uploads/                     # Uploaded resumes
├── Dockerfile
├── docker-compose.yml
├── requirements.txt
├── README.md
└── .env


Resume Processing Flow:

Upload Resume
   ↓
Async Background Processing
   ↓
Text Extraction & Cleanup
   ↓
Section Detection (Summary, Skills, Projects)
   ↓
ATS & Quality Scoring
   ↓
Optional Resume Rewrite
   ↓
JD Matching & Skill Gap Analysis
   ↓
History Saved