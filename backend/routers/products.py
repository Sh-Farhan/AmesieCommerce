from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from sqlalchemy import or_

import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from core.database import get_db
from db import models
from schemas import schemas
from services.auth import get_current_user

router = APIRouter()

@router.get("/categories", response_model=List[schemas.Category])
def get_categories(db: Session = Depends(get_db)):
    categories = db.query(models.Category).all()
    return categories

@router.get("/", response_model=List[schemas.Product])
def get_products(
    skip: int = 0,
    limit: int = 20,
    category_id: Optional[int] = None,
    search: Optional[str] = None,
    seller_id: Optional[int] = None,
    db: Session = Depends(get_db)
):
    # Only show active, non-deleted products
    query = db.query(models.Product).filter(
        models.Product.is_active == True,
        models.Product.is_deleted == False
    )
    
    if category_id:
        query = query.filter(models.Product.category_id == category_id)
    
    if seller_id:
        query = query.filter(models.Product.seller_id == seller_id)
    
    if search:
        query = query.filter(
            or_(
                models.Product.name.ilike(f"%{search}%"),
                models.Product.description.ilike(f"%{search}%"),
                models.Product.sku.ilike(f"%{search}%")
            )
        )
    
    products = query.offset(skip).limit(limit).all()
    return products

@router.get("/{product_id}", response_model=schemas.Product)
def get_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(models.Product).filter(
        models.Product.id == product_id,
        models.Product.is_active == True,
        models.Product.is_deleted == False
    ).first()
    
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found"
        )
    
    return product

@router.get("/sku/{sku}", response_model=schemas.Product)
def get_product_by_sku(sku: str, db: Session = Depends(get_db)):
    """Get product by SKU"""
    product = db.query(models.Product).filter(
        models.Product.sku == sku,
        models.Product.is_active == True,
        models.Product.is_deleted == False
    ).first()
    
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found"
        )
    
    return product

@router.get("/{product_id}/images", response_model=List[schemas.ProductImage])
def get_product_images(product_id: int, db: Session = Depends(get_db)):
    """Get all images for a product"""
    # Verify product exists and is active
    product = db.query(models.Product).filter(
        models.Product.id == product_id,
        models.Product.is_active == True,
        models.Product.is_deleted == False
    ).first()
    
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found"
        )
    
    images = db.query(models.ProductImage).filter(
        models.ProductImage.product_id == product_id
    ).order_by(models.ProductImage.display_order).all()
    
    return images

@router.get("/{product_id}/reviews", response_model=List[schemas.Review])
def get_product_reviews(product_id: int, db: Session = Depends(get_db)):
    reviews = db.query(models.Review).filter(
        models.Review.product_id == product_id
    ).all()
    return reviews

@router.post("/{product_id}/reviews", response_model=schemas.Review)
def create_product_review(
    product_id: int,
    review: schemas.ReviewCreate,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Check if product exists
    product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found"
        )
    
    # Check if user already reviewed this product
    existing_review = db.query(models.Review).filter(
        models.Review.user_id == current_user.id,
        models.Review.product_id == product_id
    ).first()
    
    if existing_review:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You have already reviewed this product"
        )
    
    # Create review
    db_review = models.Review(
        user_id=current_user.id,
        product_id=product_id,
        rating=review.rating,
        comment=review.comment
    )
    db.add(db_review)
    db.commit()
    db.refresh(db_review)
    return db_review
