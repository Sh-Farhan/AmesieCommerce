import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from urllib.parse import urlparse, parse_qsl, urlencode

# Default to local sqlite for quick dev if DATABASE_URL isn't set
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./dev_local.db")

def _engine_for_database(url: str):
    url_lower = url.lower()

    # SQLite: use check_same_thread and no postgres-specific args
    if url_lower.startswith("sqlite"):
        return create_engine(
            url,
            connect_args={"check_same_thread": False},
            future=True,
        )

    # For non-sqlite (eg postgres), allow optional DB_SSLMODE override via env.
    # If the DATABASE_URL already contains sslmode in its query, keep it.
    sslmode_env = os.getenv("DB_SSLMODE", None)

    parsed = urlparse(url)
    query = dict(parse_qsl(parsed.query))

    # If DB_SSLMODE is set and sslmode not already present, add it
    if sslmode_env:
        query.setdefault("sslmode", sslmode_env)

    if query:
        new_query = urlencode(query)
        url = parsed._replace(query=new_query).geturl()

    # create engine for Postgres / other SQL servers
    return create_engine(url, pool_pre_ping=True, future=True)

engine = _engine_for_database(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False, future=True)
Base = declarative_base()
# Dependency for FastAPI routes
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
