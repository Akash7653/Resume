from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from passlib.context import CryptContext
from pydantic import BaseModel, EmailStr
from typing import Optional
import hashlib

from app.core.security import create_access_token
from app.core.deps import get_current_user
from app.database.db import users
from app.database.user_model import User

router = APIRouter()

# Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# -------------------- MODELS --------------------

class ProfileUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    theme: Optional[str] = None


class PasswordUpdate(BaseModel):
    current_password: str
    new_password: str


# -------------------- PASSWORD UTILS (FIXED) --------------------

def _prehash(password: str) -> str:
    """
    Pre-hash password using SHA-256 to avoid bcrypt 72-byte limit
    """
    return hashlib.sha256(password.encode("utf-8")).hexdigest()


def hash_password(password: str) -> str:
    return pwd_context.hash(_prehash(password))


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(_prehash(plain_password), hashed_password)


# -------------------- AUTH ROUTES --------------------

@router.post("/register")
async def register(user: User):
    existing_user = users.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")

    hashed_password = hash_password(user.password)

    user_dict = {
        "name": user.name,
        "email": user.email,
        "password": hashed_password,
        "theme": "light"
    }

    users.insert_one(user_dict)

    token = create_access_token(email=user.email)

    return {
        "message": "User registered successfully",
        "access_token": token,
        "token_type": "bearer"
    }


@router.post("/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = users.find_one({"email": form_data.username})

    if not user or not verify_password(form_data.password, user["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )

    token = create_access_token(email=user["email"])

    return {
        "access_token": token,
        "token_type": "bearer"
    }


@router.get("/me")
async def get_current_user_info(user: dict = Depends(get_current_user)):
    return {
        "id": str(user["_id"]),
        "email": user["email"],
        "name": user.get("name", ""),
        "theme": user.get("theme", "light")
    }


@router.put("/profile")
async def update_profile(
    profile_data: ProfileUpdate,
    current_user: dict = Depends(get_current_user)
):
    user_id = current_user["_id"]

    update_data = {}

    if profile_data.name is not None:
        update_data["name"] = profile_data.name

    if profile_data.email is not None:
        existing_user = users.find_one({
            "email": profile_data.email,
            "_id": {"$ne": user_id}
        })
        if existing_user:
            raise HTTPException(status_code=400, detail="Email already taken")
        update_data["email"] = profile_data.email

    if profile_data.theme in ["light", "dark"]:
        update_data["theme"] = profile_data.theme

    if not update_data:
        raise HTTPException(status_code=400, detail="No fields to update")

    users.update_one({"_id": user_id}, {"$set": update_data})

    updated_user = users.find_one({"_id": user_id})

    return {
        "message": "Profile updated successfully",
        "user": {
            "id": str(updated_user["_id"]),
            "email": updated_user["email"],
            "name": updated_user.get("name", ""),
            "theme": updated_user.get("theme", "light")
        }
    }


@router.put("/password")
async def update_password(
    password_data: PasswordUpdate,
    current_user: dict = Depends(get_current_user)
):
    user_id = current_user["_id"]

    user = users.find_one({"_id": user_id})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if not verify_password(password_data.current_password, user["password"]):
        raise HTTPException(status_code=400, detail="Current password is incorrect")

    if len(password_data.new_password) < 8:
        raise HTTPException(
            status_code=400,
            detail="New password must be at least 8 characters"
        )

    hashed_password = hash_password(password_data.new_password)

    users.update_one(
        {"_id": user_id},
        {"$set": {"password": hashed_password}}
    )

    return {"message": "Password updated successfully"}
