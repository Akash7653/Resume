import hashlib

def make_cache_key(text: str, role: str) -> str:
    """
    Generate a stable cache key for resume + role combination.
    
    Args:
        text: The resume text content
        role: The target job role
        
    Returns:
        A unique, deterministic hash string
    """
    # Bumped version to force cache invalidation after major updates
    VERSION = "v4.0"  # ⬅ bumped for role normalization and skill matching updates
    
    # Normalize the role to ensure consistent caching
    from app.utils.role_normalizer import normalize_role
    normalized_role = normalize_role(role)
    
    # Include both original and normalized role in cache key for debugging
    raw = f"{VERSION}::{text}::{role}::{normalized_role}"
    return hashlib.sha256(raw.encode("utf-8")).hexdigest()
