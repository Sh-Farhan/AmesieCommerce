import os
import time
from fastapi import FastAPI, Request, Depends, HTTPException, status
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from sqlalchemy.orm import Session
import logging

from database import engine, SessionLocal, Base
from routers import auth, products, cart, orders, users, sellers
import models
from logging_config import setup_logging, get_logger

# Setup logging
setup_logging()
logger = get_logger('main')
logger.info("Starting Shopease E-commerce Platform")

# Create database tables
models.Base.metadata.create_all(bind=engine)
logger.info("Database tables created/verified")

app = FastAPI(title="Shopease E-commerce Platform", version="1.0.0")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Add request logging middleware
@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()
    try:
        response = await call_next(request)
        process_time = time.time() - start_time
        
        logger.info(
            f"{request.method} {request.url.path} - "
            f"Status: {response.status_code} - "
            f"Time: {process_time:.3f}s - "
            f"Client: {request.client.host}"
        )
        return response
    except Exception as e:
        process_time = time.time() - start_time
        logger.error(
            f"{request.method} {request.url.path} - "
            f"ERROR: {str(e)} - "
            f"Time: {process_time:.3f}s - "
            f"Client: {request.client.host}"
        )
        raise

# Mount static files
static_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), "frontend", "static")
app.mount("/static", StaticFiles(directory=static_dir), name="static")

# Templates
import os
template_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), "frontend", "templates")
templates = Jinja2Templates(directory=template_dir)

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["authentication"])
app.include_router(products.router, prefix="/api/products", tags=["products"])
app.include_router(cart.router, prefix="/api/cart", tags=["cart"])
app.include_router(orders.router, prefix="/api/orders", tags=["orders"])
app.include_router(users.router, prefix="/api/users", tags=["users"])
app.include_router(sellers.router, prefix="/api/sellers", tags=["sellers"])

# Dependency to get database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Frontend routes
@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    logger.info(f"Home page accessed from {request.client.host}")
    return templates.TemplateResponse("index.html", {"request": request})

# Customer authentication pages
@app.get("/login", response_class=HTMLResponse)
@app.get("/customer/login", response_class=HTMLResponse)
async def customer_login_page(request: Request):
    return templates.TemplateResponse("customer_login.html", {"request": request})

@app.get("/register", response_class=HTMLResponse)
@app.get("/customer/register", response_class=HTMLResponse)
async def customer_register_page(request: Request):
    return templates.TemplateResponse("customer_register.html", {"request": request})

# Seller authentication pages
@app.get("/seller/login", response_class=HTMLResponse)
async def seller_login_page(request: Request):
    return templates.TemplateResponse("seller_login.html", {"request": request})

@app.get("/seller/register", response_class=HTMLResponse)
async def seller_register_page(request: Request):
    return templates.TemplateResponse("seller_register.html", {"request": request})

# Admin authentication pages
@app.get("/admin/login", response_class=HTMLResponse)
async def admin_login_page(request: Request):
    return templates.TemplateResponse("admin_login.html", {"request": request})

@app.get("/admin/register", response_class=HTMLResponse)
async def admin_register_page(request: Request):
    return templates.TemplateResponse("admin_register.html", {"request": request})

@app.get("/products", response_class=HTMLResponse)
async def products_page(request: Request):
    return templates.TemplateResponse("products.html", {"request": request})

@app.get("/product/{product_id}", response_class=HTMLResponse)
async def product_detail_page(request: Request, product_id: int):
    return templates.TemplateResponse("product_detail.html", {"request": request, "product_id": product_id})

@app.get("/cart", response_class=HTMLResponse)
async def cart_page(request: Request):
    return templates.TemplateResponse("cart.html", {"request": request})

@app.get("/checkout", response_class=HTMLResponse)
async def checkout_page(request: Request):
    return templates.TemplateResponse("checkout.html", {"request": request})

@app.get("/profile", response_class=HTMLResponse)
async def profile_page(request: Request):
    return templates.TemplateResponse("profile.html", {"request": request})

@app.get("/orders", response_class=HTMLResponse)
async def orders_page(request: Request):
    return templates.TemplateResponse("orders.html", {"request": request})

@app.get("/seller/dashboard", response_class=HTMLResponse)
async def seller_dashboard_page(request: Request):
    logger.info(f"Seller dashboard accessed from {request.client.host}")
    return templates.TemplateResponse("seller_dashboard.html", {"request": request})

@app.get("/seller/products", response_class=HTMLResponse)
async def seller_products_page(request: Request):
    return templates.TemplateResponse("seller_products.html", {"request": request})

@app.get("/seller/orders", response_class=HTMLResponse)
async def seller_orders_page(request: Request):
    return templates.TemplateResponse("seller_orders.html", {"request": request})

@app.get("/seller/profile", response_class=HTMLResponse)
async def seller_profile_page(request: Request):
    return templates.TemplateResponse("seller_profile.html", {"request": request})

# Admin dashboard pages
@app.get("/admin/dashboard", response_class=HTMLResponse)
async def admin_dashboard_page(request: Request):
    return templates.TemplateResponse("admin_dashboard.html", {"request": request})

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=5000, reload=True)
