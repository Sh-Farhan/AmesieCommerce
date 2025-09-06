from typing import Generator
from sqlalchemy.orm import Session

from app.db.base import SessionLocal


def get_db() -> Generator[Session, None, None]:
    """
    Database session dependency.
    Yields a database session and ensures it's closed after use.
    """
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()


def get_db_session() -> Session:
    """
    Get a database session for use outside of FastAPI dependencies.
    Note: Make sure to close the session manually when done.
    """
    return SessionLocal()