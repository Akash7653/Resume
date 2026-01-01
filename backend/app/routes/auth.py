from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from passlib.context import CryptContext
from pydantic import BaseModel, EmailStr
from typing import Optional
from app.core.security import create_access_token
from app.core.deps import get_current_user
from app.database.db import users
from app.database.user_model import User

router = APIRouter()

# Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# Pydantic models for profile updates
class ProfileUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    theme: Optional[str] = None


class PasswordUpdate(BaseModel):
    current_password: str
    new_password: str


def hash_password(password: str) -> str:
    """Hash a password using bcrypt"""
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against its hash"""
    return pwd_context.verify(plain_password, hashed_password)


@router.post("/register")
async def register(user: User):
    """Register a new user with password hashing and auto-login"""
    # Check if user already exists
    existing_user = users.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")

    # Hash the password before storing
    hashed_password = hash_password(user.password)
    
    # Create user document
    user_dict = {
        "name": user.name,
        "email": user.email,
        "password": hashed_password  # Store hashed password, not plain text
    }
    
    users.insert_one(user_dict)
    
    # Auto-login by generating token
    token = create_access_token(email=user.email)
    return {
        "message": "User registered successfully",
        "access_token": token,
        "token_type": "bearer"
    }


@router.post("/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    """Login user and return JWT token"""
    user = users.find_one({"email": form_data.username})

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
        )

    # Verify password using hashed comparison
    if not verify_password(form_data.password, user["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
        )

    token = create_access_token(email=user["email"])
    return {
        "access_token": token,
        "token_type": "bearer"
    }


@router.get("/me")
async def get_current_user_info(user: dict = Depends(get_current_user)):
    """Get current user information"""
    return {
        "email": user["email"],
        "name": user.get("name", ""),
        "id": user["_id"]
    }


@router.put("/profile")
async def update_profile(
    profile_data: ProfileUpdate,
    current_user: dict = Depends(get_current_user)
):
    """Update user profile information"""
    print(f"Profile update request: {profile_data}")
    print(f"Current user: {current_user}")
    
    user_id = current_user["_id"]
    
    # Build update dictionary with only provided fields
    update_data = {}
    if profile_data.name is not None:
        update_data["name"] = profile_data.name
    if profile_data.email is not None:
        # Check if email is already taken by another user
        existing_user = users.find_one({
            "email": profile_data.email,
            "_id": {"$ne": user_id}
        })
        if existing_user:
            raise HTTPException(
                status_code=400,
                detail="Email already taken by another user"
            )
        update_data["email"] = profile_data.email
    if profile_data.theme is not None and profile_data.theme in ["light", "dark"]:
        update_data["theme"] = profile_data.theme
    
    print(f"Update data: {update_data}")
    
    if not update_data:
        raise HTTPException(
            status_code=400,
            detail="No fields to update"
        )
    
    # Update user in database
    result = users.update_one(
        {"_id": user_id},
        {"$set": update_data}
    )
    
    print(f"Update result: {result}")
    
    if result.matched_count == 0:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )
    
    # Return updated user info
    updated_user = users.find_one({"_id": user_id})
    return {
        "message": "Profile updated successfully",
        "user": {
            "email": updated_user["email"],
            "name": updated_user.get("name", ""),
            "theme": updated_user.get("theme", "light"),
            "id": updated_user["_id"]
        }
    }


@router.put("/password")
async def update_password(
    password_data: PasswordUpdate,
    current_user: dict = Depends(get_current_user)
):
    """Update user password"""
    user_id = current_user["_id"]
    
    # Get current user data with password
    user = users.find_one({"_id": user_id})
    
    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )
    
    # Verify current password
    if not verify_password(password_data.current_password, user["password"]):
        raise HTTPException(
            status_code=400,
            detail="Current password is incorrect"
        )
    
    # Validate new password
    if len(password_data.new_password) < 8:
        raise HTTPException(
            status_code=400,
            detail="New password must be at least 8 characters long"
        )
    
    # Hash new password
    hashed_password = hash_password(password_data.new_password)
    
    # Update password in database
    result = users.update_one(
        {"_id": user_id},
        {"$set": {"password": hashed_password}}
    )
    
    if result.matched_count == 0:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )
    
    return {
        "message": "Password updated successfully"
    }
