from pydantic import BaseModel
from typing import List
from datetime import datetime

class Resume(BaseModel):
    user_email: str
    skills: List[str]
    role: str
    ats_score: int
    created_at: datetime
