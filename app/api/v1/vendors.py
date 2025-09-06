from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, UploadFile, File
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.deps import get_current_active_user, get_current_seller_user, get_current_admin_user
from app.models.users import User, UserRole
from app.models.vendors import Seller, SellerStatus

router = APIRouter()


@router.get("/me")
def get_my_seller_profile(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_seller_user)
):
    """Get current user's seller profile."""
    seller = db.query(Seller).filter(Seller.user_id == current_user.id).first()
    if not seller:
        raise HTTPException(status_code=404, detail="Seller profile not found")
    
    return {
        "id": seller.id,
        "store_name": seller.store_name,
        "store_description": seller.store_description,
        "store_slug": seller.store_slug,
        "business_name": seller.business_name,
        "contact_email": seller.contact_email,
        "contact_phone": seller.contact_phone,
        "status": seller.status,
        "verification_status": seller.verification_status,
        "is_active": seller.is_active,
        "total_sales": seller.total_sales,
        "total_orders": seller.total_orders,
        "average_rating": seller.average_rating,
        "created_at": seller.created_at,
        "verified_at": seller.verified_at
    }


@router.post("/register")
def register_seller(
    seller_data: dict,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Register as a seller."""
    # Check if user already has a seller profile
    existing_seller = db.query(Seller).filter(Seller.user_id == current_user.id).first()
    if existing_seller:
        raise HTTPException(
            status_code=400, 
            detail="You already have a seller profile"
        )
    
    # Update user role to seller
    if current_user.role == UserRole.CUSTOMER:
        current_user.role = UserRole.SELLER
        db.commit()
    
    # Create seller profile
    seller_data["user_id"] = current_user.id
    seller = Seller(**seller_data)
    db.add(seller)
    db.commit()
    db.refresh(seller)
    
    return {
        "message": "Seller registration successful",
        "seller": {
            "id": seller.id,
            "store_name": seller.store_name,
            "status": seller.status,
            "verification_status": seller.verification_status
        }
    }


@router.put("/me")
def update_seller_profile(
    seller_data: dict,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_seller_user)
):
    """Update seller profile."""
    seller = db.query(Seller).filter(Seller.user_id == current_user.id).first()
    if not seller:
        raise HTTPException(status_code=404, detail="Seller profile not found")
    
    # Update seller fields
    for field, value in seller_data.items():
        if hasattr(seller, field) and field not in ["id", "user_id", "created_at"]:
            setattr(seller, field, value)
    
    db.commit()
    db.refresh(seller)
    
    return {
        "message": "Seller profile updated successfully",
        "seller": {
            "id": seller.id,
            "store_name": seller.store_name,
            "business_name": seller.business_name,
            "status": seller.status
        }
    }


@router.get("/me/dashboard-stats")
def get_seller_dashboard_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_seller_user)
):
    """Get seller dashboard statistics."""
    seller = db.query(Seller).filter(Seller.user_id == current_user.id).first()
    if not seller:
        raise HTTPException(status_code=404, detail="Seller profile not found")
    
    # Get product count
    product_count = db.query(Product).filter(Product.seller_id == seller.id).count()
    
    # Get active product count
    active_product_count = db.query(Product).filter(
        Product.seller_id == seller.id,
        Product.status == ProductStatus.ACTIVE
    ).count()
    
    # Get recent orders (last 30 days)
    from datetime import datetime, timedelta
    thirty_days_ago = datetime.utcnow() - timedelta(days=30)
    
    recent_orders = db.query(OrderItem).join(Order).filter(
        OrderItem.seller_id == seller.id,
        Order.created_at >= thirty_days_ago
    ).count()
    
    # Calculate recent revenue
    recent_revenue = db.query(func.sum(OrderItem.total_price)).join(Order).filter(
        OrderItem.seller_id == seller.id,
        Order.created_at >= thirty_days_ago,
        Order.payment_status == PaymentStatus.COMPLETED
    ).scalar() or 0.0
    
    return {
        "seller_info": {
            "store_name": seller.store_name,
            "status": seller.status,
            "verification_status": seller.verification_status,
            "average_rating": seller.average_rating
        },
        "stats": {
            "total_products": product_count,
            "active_products": active_product_count,
            "total_orders": seller.total_orders,
            "total_sales": seller.total_sales,
            "recent_orders_30d": recent_orders,
            "recent_revenue_30d": recent_revenue
        }
    }


@router.get("")
def get_sellers(
    db: Session = Depends(get_db),
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    status: Optional[SellerStatus] = None,
    is_active: Optional[bool] = None
):
    """Get all sellers (public endpoint)."""
    query = db.query(Seller)
    
    if status:
        query = query.filter(Seller.status == status)
    if is_active is not None:
        query = query.filter(Seller.is_active == is_active)
    
    sellers = query.offset(skip).limit(limit).all()
    
    return {
        "sellers": [
            {
                "id": seller.id,
                "store_name": seller.store_name,
                "store_description": seller.store_description,
                "store_slug": seller.store_slug,
                "store_logo_url": seller.store_logo_url,
                "average_rating": seller.average_rating,
                "total_reviews": seller.total_reviews,
                "is_featured": seller.is_featured,
                "created_at": seller.created_at
            }
            for seller in sellers
        ]
    }


@router.get("/{seller_id}")
def get_seller_public_profile(
    seller_id: int,
    db: Session = Depends(get_db)
):
    """Get public seller profile."""
    seller = db.query(Seller).filter(
        Seller.id == seller_id,
        Seller.is_active == True,
        Seller.status == SellerStatus.VERIFIED
    ).first()
    
    if not seller:
        raise HTTPException(status_code=404, detail="Seller not found")
    
    # Get seller's products
    products = db.query(Product).filter(
        Product.seller_id == seller.id,
        Product.status == ProductStatus.ACTIVE
    ).limit(10).all()
    
    return {
        "id": seller.id,
        "store_name": seller.store_name,
        "store_description": seller.store_description,
        "store_logo_url": seller.store_logo_url,
        "store_banner_url": seller.store_banner_url,
        "contact_email": seller.contact_email,
        "website_url": seller.website_url,
        "average_rating": seller.average_rating,
        "total_reviews": seller.total_reviews,
        "total_sales": seller.total_sales,
        "created_at": seller.created_at,
        "recent_products": [
            {
                "id": product.id,
                "name": product.name,
                "price": product.price,
                "images": [img.image_url for img in product.images if img.is_primary][:1]
            }
            for product in products
        ]
    }


# Admin endpoints
@router.get("/admin/all")
def get_all_sellers_admin(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user),
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100)
):
    """Get all sellers for admin panel."""
    sellers = db.query(Seller).offset(skip).limit(limit).all()
    
    return {
        "sellers": [
            {
                "id": seller.id,
                "user": {
                    "id": seller.user.id,
                    "email": seller.user.email,
                    "full_name": seller.user.full_name
                },
                "store_name": seller.store_name,
                "business_name": seller.business_name,
                "status": seller.status,
                "verification_status": seller.verification_status,
                "is_active": seller.is_active,
                "total_sales": seller.total_sales,
                "created_at": seller.created_at
            }
            for seller in sellers
        ]
    }


@router.put("/admin/{seller_id}/verify")
def verify_seller(
    seller_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    """Verify a seller (admin only)."""
    seller = db.query(Seller).filter(Seller.id == seller_id).first()
    if not seller:
        raise HTTPException(status_code=404, detail="Seller not found")
    
    seller.status = SellerStatus.VERIFIED
    seller.verification_status = VerificationStatus.APPROVED
    seller.verified_at = datetime.utcnow()
    
    db.commit()
    
    return {
        "message": "Seller verified successfully",
        "seller": {
            "id": seller.id,
            "store_name": seller.store_name,
            "status": seller.status
        }
    }