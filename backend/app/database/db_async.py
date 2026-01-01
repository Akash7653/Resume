from motor.motor_asyncio import AsyncIOMotorClient
from app.config import MONGO_URI, DB_NAME

async_client = AsyncIOMotorClient(MONGO_URI)
async_db = async_client[DB_NAME]

users = async_db.users
resumes = async_db.resumes
analytics = async_db.analytics
