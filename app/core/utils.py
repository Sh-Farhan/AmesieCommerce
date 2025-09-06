import os
import uuid
import hashlib
from typing import Optional, List, Dict, Any
from datetime import datetime
from fastapi import UploadFile, HTTPException
from pathlib import Path

from app.core.config import settings


def generate_unique_filename(original_filename: str) -> str:
    """Generate a unique filename while preserving the extension."""
    file_extension = Path(original_filename).suffix
    unique_id = str(uuid.uuid4())
    return f"{unique_id}{file_extension}"


def validate_file_extension(filename: str) -> bool:
    """Validate if file extension is allowed."""
    file_extension = Path(filename).suffix.lower().lstrip('.')
    return file_extension in settings.ALLOWED_EXTENSIONS


def validate_file_size(file_size: int) -> bool:
    """Validate if file size is within limits."""
    return file_size <= settings.MAX_FILE_SIZE


async def save_upload_file(
    upload_file: UploadFile, 
    subdirectory: str = ""
) -> str:
    """
    Save uploaded file to the designated upload directory.
    Returns the relative path to the saved file.
    """
    if not validate_file_extension(upload_file.filename):
        raise HTTPException(
            status_code=400,
            detail=f"File type not allowed. Allowed types: {', '.join(settings.ALLOWED_EXTENSIONS)}"
        )
    
    # Read file content to check size
    content = await upload_file.read()
    if not validate_file_size(len(content)):
        raise HTTPException(
            status_code=400,
            detail=f"File too large. Maximum size: {settings.MAX_FILE_SIZE} bytes"
        )
    
    # Generate unique filename
    filename = generate_unique_filename(upload_file.filename)
    
    # Create directory path
    upload_path = Path(settings.UPLOAD_DIR)
    if subdirectory:
        upload_path = upload_path / subdirectory
    upload_path.mkdir(parents=True, exist_ok=True)
    
    # Save file
    file_path = upload_path / filename
    with open(file_path, "wb") as f:
        f.write(content)
    
    # Return relative path
    if subdirectory:
        return f"{settings.UPLOAD_DIR}/{subdirectory}/{filename}"
    return f"{settings.UPLOAD_DIR}/{filename}"


def delete_file(file_path: str) -> bool:
    """Delete a file from the filesystem."""
    try:
        if os.path.exists(file_path):
            os.remove(file_path)
            return True
        return False
    except Exception:
        return False


def generate_hash(text: str) -> str:
    """Generate SHA256 hash of text."""
    return hashlib.sha256(text.encode()).hexdigest()


def format_currency(amount: float, currency: str = "INR") -> str:
    """Format currency amount."""
    if currency == "INR":
        return f"₹{amount:,.2f}"
    elif currency == "USD":
        return f"${amount:,.2f}"
    else:
        return f"{amount:,.2f} {currency}"


def paginate_query(
    query, 
    page: int = 1, 
    per_page: int = 20,
    max_per_page: int = 100
) -> Dict[str, Any]:
    """
    Paginate a SQLAlchemy query.
    Returns pagination metadata along with results.
    """
    if per_page > max_per_page:
        per_page = max_per_page
    
    total = query.count()
    items = query.offset((page - 1) * per_page).limit(per_page).all()
    
    return {
        "items": items,
        "page": page,
        "per_page": per_page,
        "total": total,
        "pages": (total + per_page - 1) // per_page if total > 0 else 0,
        "has_prev": page > 1,
        "has_next": page * per_page < total
    }


def sanitize_filename(filename: str) -> str:
    """Sanitize filename by removing/replacing unsafe characters."""
    # Remove unsafe characters
    unsafe_chars = ['<', '>', ':', '"', '/', '\\', '|', '?', '*']
    for char in unsafe_chars:
        filename = filename.replace(char, '_')
    
    # Remove leading/trailing dots and spaces
    filename = filename.strip('. ')
    
    # Ensure filename is not empty
    if not filename:
        filename = "unnamed_file"
    
    return filename


def get_client_ip(request) -> str:
    """Get client IP address from request."""
    forwarded = request.headers.get("X-Forwarded-For")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.client.host if request.client else "unknown"


def validate_indian_phone(phone: str) -> bool:
    """Validate Indian phone number format."""
    import re
    pattern = r'^[\+]?[91]?[0-9]{10}$'
    return bool(re.match(pattern, phone.replace(" ", "").replace("-", "")))


def format_datetime(dt: datetime, format_str: str = "%Y-%m-%d %H:%M:%S") -> str:
    """Format datetime to string."""
    return dt.strftime(format_str) if dt else ""


def calculate_discount_amount(original_price: float, discount_percent: float) -> float:
    """Calculate discount amount."""
    return (original_price * discount_percent) / 100


def calculate_final_price(original_price: float, discount_percent: float = 0) -> float:
    """Calculate final price after discount."""
    discount_amount = calculate_discount_amount(original_price, discount_percent)
    return original_price - discount_amount