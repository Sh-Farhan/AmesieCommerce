import os
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from core.database import engine
from core.config import settings
from routers import auth, api
from db import models

app = FastAPI(
    title="Amesie Mobile API",
    description="API for Amesie React Native mobile application",
    version="1.0.0"
)

# Create database tables on startup
@app.on_event("startup")
async def startup_event():
    models.Base.metadata.create_all(bind=engine)

# CORS middleware for mobile app
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["authentication"])
app.include_router(api.router, prefix="/api", tags=["mobile-api"])

@app.get("/")
async def root():
    return {"message": "Amesie Mobile API is running!", "version": "1.0.0"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "amesie-mobile-api"}

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )