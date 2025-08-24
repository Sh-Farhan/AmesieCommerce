import os
import razorpay
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from database import get_db
import models
import schemas
from auth import get_current_user

router = APIRouter()

# Initialize Razorpay client
razorpay_client = razorpay.Client(
    auth=(
        os.getenv("RAZORPAY_KEY_ID", "rzp_test_key"),
        os.getenv("RAZORPAY_KEY_SECRET", "rzp_test_secret")
    )
)

@router.post("/create", response_model=dict)
def create_order(
    order_data: schemas.OrderCreate,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Get cart items
    cart_items = db.query(models.CartItem).filter(
        models.CartItem.user_id == current_user.id
    ).all()
    
    if not cart_items:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cart is empty"
        )
    
    # Calculate total amount
    total_amount = 0
    for item in cart_items:
        total_amount += item.product.price * item.quantity
    
    # Create Razorpay order
    try:
        razorpay_order = razorpay_client.order.create({
            "amount": int(total_amount * 100),  # Amount in paise
            "currency": "INR",
            "payment_capture": 1
        })
        
        # Create order in database
        db_order = models.Order(
            user_id=current_user.id,
            total_amount=total_amount,
            shipping_address=order_data.shipping_address,
            payment_id=razorpay_order["id"],
            payment_status="pending",
            order_status="pending"
        )
        db.add(db_order)
        db.commit()
        db.refresh(db_order)
        
        # Create order items
        for item in cart_items:
            order_item = models.OrderItem(
                order_id=db_order.id,
                product_id=item.product_id,
                quantity=item.quantity,
                price=item.product.price
            )
            db.add(order_item)
        
        # Clear cart
        db.query(models.CartItem).filter(
            models.CartItem.user_id == current_user.id
        ).delete()
        
        db.commit()
        
        return {
            "order_id": db_order.id,
            "razorpay_order_id": razorpay_order["id"],
            "amount": total_amount,
            "currency": "INR"
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create order: {str(e)}"
        )

@router.post("/verify-payment")
def verify_payment(
    payment_data: dict,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    try:
        # Verify payment signature
        razorpay_client.utility.verify_payment_signature(payment_data)
        
        # Update order status
        order = db.query(models.Order).filter(
            models.Order.payment_id == payment_data["razorpay_order_id"],
            models.Order.user_id == current_user.id
        ).first()
        
        if order:
            db.query(models.Order).filter(models.Order.id == order.id).update({
                "payment_status": "completed",
                "order_status": "confirmed"
            })
            db.commit()
            
        return {"message": "Payment verified successfully"}
        
    except Exception as e:
        # Update order status to failed
        order = db.query(models.Order).filter(
            models.Order.payment_id == payment_data.get("razorpay_order_id"),
            models.Order.user_id == current_user.id
        ).first()
        
        if order:
            db.query(models.Order).filter(models.Order.id == order.id).update({
                "payment_status": "failed"
            })
            db.commit()
        
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Payment verification failed"
        )

@router.get("/", response_model=List[schemas.Order])
def get_user_orders(
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    orders = db.query(models.Order).filter(
        models.Order.user_id == current_user.id
    ).order_by(models.Order.created_at.desc()).all()
    return orders

@router.get("/{order_id}", response_model=schemas.Order)
def get_order(
    order_id: int,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    order = db.query(models.Order).filter(
        models.Order.id == order_id,
        models.Order.user_id == current_user.id
    ).first()
    
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found"
        )
    
    return order
