from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from database import get_db
import models
import schemas
from auth import get_current_user

router = APIRouter()

def get_current_seller(current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    """Ensure current user is a seller and return their seller profile"""
    if current_user.role.value != "SELLER":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied. Seller role required."
        )
    
    seller = db.query(models.Seller).filter(models.Seller.user_id == current_user.id).first()
    if not seller:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Seller profile not found"
        )
    
    return seller

@router.get("/profile", response_model=schemas.Seller)
def get_seller_profile(seller: models.Seller = Depends(get_current_seller)):
    """Get current seller's profile"""
    return seller

@router.put("/profile", response_model=schemas.Seller)
def update_seller_profile(
    seller_update: schemas.SellerUpdate,
    seller: models.Seller = Depends(get_current_seller),
    db: Session = Depends(get_db)
):
    """Update seller profile"""
    update_data = seller_update.dict(exclude_unset=True)
    
    for field, value in update_data.items():
        setattr(seller, field, value)
    
    db.commit()
    db.refresh(seller)
    return seller

@router.get("/products", response_model=List[schemas.Product])
def get_seller_products(
    skip: int = 0,
    limit: int = 20,
    seller: models.Seller = Depends(get_current_seller),
    db: Session = Depends(get_db)
):
    """Get all products for current seller"""
    products = db.query(models.Product).filter(
        models.Product.seller_id == seller.id
    ).offset(skip).limit(limit).all()
    
    return products

@router.post("/products", response_model=schemas.Product)
def create_product(
    product: schemas.ProductCreate,
    seller: models.Seller = Depends(get_current_seller),
    db: Session = Depends(get_db)
):
    """Create a new product for the seller"""
    # Verify category exists
    category = db.query(models.Category).filter(models.Category.id == product.category_id).first()
    if not category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category not found"
        )
    
    db_product = models.Product(
        name=product.name,
        description=product.description,
        price=product.price,
        image_url=product.image_url,
        stock_quantity=product.stock_quantity,
        category_id=product.category_id,
        seller_id=seller.id
    )
    
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    
    # Create notification for admin about new product
    notification = models.Notification(
        user_id=1,  # Admin user ID
        title="New Product Added",
        message=f"Seller '{seller.store_name}' added a new product: {product.name}",
        notification_type=models.NotificationType.ORDER_PLACED  # Reusing enum for now
    )
    db.add(notification)
    db.commit()
    
    return db_product

@router.put("/products/{product_id}", response_model=schemas.Product)
def update_product(
    product_id: int,
    product_update: schemas.ProductCreate,
    seller: models.Seller = Depends(get_current_seller),
    db: Session = Depends(get_db)
):
    """Update a product owned by the seller"""
    product = db.query(models.Product).filter(
        models.Product.id == product_id,
        models.Product.seller_id == seller.id
    ).first()
    
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found or access denied"
        )
    
    update_data = product_update.dict()
    for field, value in update_data.items():
        setattr(product, field, value)
    
    db.commit()
    db.refresh(product)
    return product

@router.delete("/products/{product_id}")
def delete_product(
    product_id: int,
    seller: models.Seller = Depends(get_current_seller),
    db: Session = Depends(get_db)
):
    """Delete a product owned by the seller"""
    product = db.query(models.Product).filter(
        models.Product.id == product_id,
        models.Product.seller_id == seller.id
    ).first()
    
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found or access denied"
        )
    
    db.delete(product)
    db.commit()
    return {"message": "Product deleted successfully"}

@router.get("/orders", response_model=List[schemas.Order])
def get_seller_orders(
    seller: models.Seller = Depends(get_current_seller),
    db: Session = Depends(get_db)
):
    """Get all orders containing seller's products"""
    orders = db.query(models.Order).join(models.OrderItem).join(models.Product).filter(
        models.Product.seller_id == seller.id
    ).distinct().all()
    
    return orders

@router.put("/orders/{order_id}/status")
def update_order_status(
    order_id: int,
    status_update: dict,
    seller: models.Seller = Depends(get_current_seller),
    db: Session = Depends(get_db)
):
    """Update order status for orders containing seller's products"""
    order = db.query(models.Order).join(models.OrderItem).join(models.Product).filter(
        models.Order.id == order_id,
        models.Product.seller_id == seller.id
    ).first()
    
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found or access denied"
        )
    
    new_status = status_update.get("status")
    if new_status not in ["confirmed", "shipped", "delivered"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid status. Allowed: confirmed, shipped, delivered"
        )
    
    # Update order status
    db.query(models.Order).filter(models.Order.id == order_id).update({"order_status": new_status})
    db.commit()
    
    # Create notification for customer
    if new_status == "shipped":
        notification_message = f"Your order #{order_id} has been shipped by {seller.store_name}"
        notification_type = models.NotificationType.ORDER_SHIPPED
    elif new_status == "delivered":
        notification_message = f"Your order #{order_id} has been delivered!"
        notification_type = models.NotificationType.ORDER_DELIVERED
    else:
        notification_message = f"Your order #{order_id} has been confirmed by {seller.store_name}"
        notification_type = models.NotificationType.ORDER_CONFIRMED
    
    notification = models.Notification(
        user_id=order.user_id,
        title="Order Status Update",
        message=notification_message,
        notification_type=notification_type,
        order_id=order_id
    )
    db.add(notification)
    db.commit()
    
    return {"message": f"Order status updated to {new_status}"}

@router.get("/dashboard/stats")
def get_seller_dashboard_stats(
    seller: models.Seller = Depends(get_current_seller),
    db: Session = Depends(get_db)
):
    """Get dashboard statistics for seller"""
    # Total products
    total_products = db.query(models.Product).filter(models.Product.seller_id == seller.id).count()
    
    # Total orders
    total_orders = db.query(models.Order).join(models.OrderItem).join(models.Product).filter(
        models.Product.seller_id == seller.id
    ).distinct().count()
    
    # Pending orders
    pending_orders = db.query(models.Order).join(models.OrderItem).join(models.Product).filter(
        models.Product.seller_id == seller.id,
        models.Order.order_status == "pending"
    ).distinct().count()
    
    # Low stock products (less than 10 items)
    low_stock_products = db.query(models.Product).filter(
        models.Product.seller_id == seller.id,
        models.Product.stock_quantity < 10
    ).count()
    
    return {
        "total_products": total_products,
        "total_orders": total_orders,
        "pending_orders": pending_orders,
        "low_stock_products": low_stock_products,
        "total_sales": seller.total_sales,
        "store_rating": seller.rating
    }