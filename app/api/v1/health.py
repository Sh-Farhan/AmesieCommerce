from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text

from app.db.session import get_db
from app.core.config import settings

router = APIRouter()


@router.get("")
def health_check():
    """Basic health check endpoint."""
    return {
        "status": "healthy",
        "service": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "environment": settings.ENVIRONMENT
    }


@router.get("/db")
def database_health_check(db: Session = Depends(get_db)):
    """Database health check endpoint."""
    try:
        # Simple database query to check connection
        result = db.execute(text("SELECT 1"))
        db_status = "healthy" if result else "unhealthy"
    except Exception as e:
        db_status = "unhealthy"
        return {
            "status": "unhealthy",
            "database": db_status,
            "error": str(e)
        }
    
    return {
        "status": "healthy",
        "database": db_status,
        "service": settings.PROJECT_NAME
    }