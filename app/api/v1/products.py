from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.db.crud.products import product_crud, category_crud, review_crud
from app.deps import get_current_active_user, get_optional_current_user
from app.models.users import User
from app.models.products import ProductStatus

router = APIRouter()


@router.get("/categories")
def get_categories(db: Session = Depends(get_db)):
    """Get all active categories."""
    categories = category_crud.get_all(db)
    return {
        "categories": [
            {
                "id": cat.id,
                "name": cat.name,
                "slug": cat.slug,
                "description": cat.description,
                "image_url": cat.image_url
            }
            for cat in categories
        ]
    }


@router.get("")
def get_products(
    db: Session = Depends(get_db),
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    category_id: Optional[int] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    sort_by: str = Query("created_at", regex="^(name|price|created_at|rating)$"),
    sort_order: str = Query("desc", regex="^(asc|desc)$"),
    search: Optional[str] = None
):
    """Get products with filtering and search."""
    if search:
        products = product_crud.search(db, query=search, limit=limit, category_id=category_id)
    else:
        products = product_crud.get_multi(
            db,
            skip=skip,
            limit=limit,
            category_id=category_id,
            status=ProductStatus.ACTIVE,
            min_price=min_price,
            max_price=max_price,
            sort_by=sort_by,
            sort_order=sort_order
        )
    
    return {
        "products": [
            {
                "id": product.id,
                "name": product.name,
                "description": product.description,
                "price": product.price,
                "sku": product.sku,
                "stock_quantity": product.stock_quantity,
                "category": {
                    "id": product.category.id,
                    "name": product.category.name
                } if product.category else None,
                "images": [
                    {
                        "id": img.id,
                        "image_url": img.image_url,
                        "alt_text": img.alt_text,
                        "is_primary": img.is_primary
                    }
                    for img in product.images
                ]
            }
            for product in products
        ]
    }


@router.get("/{product_id}")
def get_product(
    product_id: int,
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(get_optional_current_user)
):
    """Get product by ID."""
    product = product_crud.get(db, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    # Get product reviews and rating summary
    rating_summary = review_crud.get_product_rating_summary(db, product_id)
    
    return {
        "id": product.id,
        "name": product.name,
        "description": product.description,
        "short_description": product.short_description,
        "price": product.price,
        "compare_price": product.compare_price,
        "sku": product.sku,
        "stock_quantity": product.stock_quantity,
        "weight": product.weight,
        "length": product.length,
        "width": product.width,
        "height": product.height,
        "status": product.status,
        "is_featured": product.is_featured,
        "category": {
            "id": product.category.id,
            "name": product.category.name,
            "slug": product.category.slug
        } if product.category else None,
        "seller": {
            "id": product.seller.id,
            "store_name": product.seller.store_name,
            "average_rating": product.seller.average_rating
        } if product.seller else None,
        "images": [
            {
                "id": img.id,
                "image_url": img.image_url,
                "alt_text": img.alt_text,
                "display_order": img.display_order,
                "is_primary": img.is_primary
            }
            for img in sorted(product.images, key=lambda x: x.display_order)
        ],
        "variants": [
            {
                "id": variant.id,
                "name": variant.name,
                "sku": variant.sku,
                "price": variant.price,
                "stock_quantity": variant.stock_quantity
            }
            for variant in product.variants if variant.is_active
        ],
        "rating_summary": rating_summary,
        "created_at": product.created_at
    }


@router.get("/{product_id}/reviews")
def get_product_reviews(
    product_id: int,
    db: Session = Depends(get_db),
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100)
):
    """Get reviews for a product."""
    product = product_crud.get(db, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    reviews = review_crud.get_product_reviews(db, product_id, skip=skip, limit=limit)
    
    return {
        "reviews": [
            {
                "id": review.id,
                "user": {
                    "id": review.user.id,
                    "full_name": review.user.full_name
                },
                "rating": review.rating,
                "title": review.title,
                "comment": review.comment,
                "is_verified_purchase": review.is_verified_purchase,
                "helpful_count": review.helpful_count,
                "created_at": review.created_at
            }
            for review in reviews
        ]
    }


@router.post("/{product_id}/reviews")
def create_product_review(
    product_id: int,
    review_data: dict,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Create a review for a product."""
    product = product_crud.get(db, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    # Check if user already reviewed this product
    existing_review = db.query(Review).filter(
        Review.user_id == current_user.id,
        Review.product_id == product_id
    ).first()
    
    if existing_review:
        raise HTTPException(
            status_code=400, 
            detail="You have already reviewed this product"
        )
    
    review_data.update({
        "user_id": current_user.id,
        "product_id": product_id
    })
    
    review = review_crud.create(db, review_data)
    
    return {
        "message": "Review created successfully",
        "review": {
            "id": review.id,
            "rating": review.rating,
            "title": review.title,
            "comment": review.comment,
            "created_at": review.created_at
        }
    }


@router.get("/featured")
def get_featured_products(
    db: Session = Depends(get_db),
    limit: int = Query(10, ge=1, le=50)
):
    """Get featured products."""
    products = product_crud.get_featured(db, limit=limit)
    
    return {
        "products": [
            {
                "id": product.id,
                "name": product.name,
                "price": product.price,
                "compare_price": product.compare_price,
                "images": [
                    {
                        "image_url": img.image_url,
                        "alt_text": img.alt_text
                    }
                    for img in product.images if img.is_primary
                ][:1]  # Only primary image
            }
            for product in products
        ]
    }