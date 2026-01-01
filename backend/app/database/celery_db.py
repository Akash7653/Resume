from pymongo import MongoClient
from app.config import MONGO_URI, DB_NAME

client = MongoClient(MONGO_URI)
db = client[DB_NAME]

# ✅ ALL collections exported
users = db.users
resumes = db.resumes
resume_cache = db.resume_cache
user_history = db.history
history = db.history
analytics = db.analytics
