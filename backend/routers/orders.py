import os
import razorpay
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from core.database import get_db
from db import models
from schemas import schemas
from services.auth import get_current_user  # assuming this returns None for guest (tolerant)

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
    """
    Create an order from the user's cart (authenticated) and store in DB.
    If current_user is None (guest) this endpoint should be protected or
    the client should pass user info — design choice. This code expects
    get_current_user to return None for guest fallback if configured.
    """

    # Get cart items
    if current_user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication required to create order from cart"
        )

    cart_items = db.query(models.CartItem).filter(
        models.CartItem.user_id == current_user.id
    ).all()

    if not cart_items:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cart is empty"
        )

    # Calculate total amount
    total_amount = 0.0
    for item in cart_items:
        # load product price (ensure relationship present)
        product = db.query(models.Product).filter(models.Product.id == item.product_id).first()
        if not product:
            continue
        total_amount += (product.price or 0.0) * (item.quantity or 0)

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
            payment_id=razorpay_order.get("id"),
            payment_status="pending",
            order_status="pending"
        )
        db.add(db_order)
        db.commit()
        db.refresh(db_order)

        # Create order items
        for item in cart_items:
            # read product price at time of order (safe)
            product = db.query(models.Product).filter(models.Product.id == item.product_id).first()
            price_at_order = product.price if product else 0.0

            order_item = models.OrderItem(
                order_id=db_order.id,
                product_id=item.product_id,
                quantity=item.quantity,
                price=price_at_order
            )
            db.add(order_item)

        # Clear cart
        db.query(models.CartItem).filter(
            models.CartItem.user_id == current_user.id
        ).delete()

        db.commit()

        return {
            "order_id": db_order.id,
            "razorpay_order_id": razorpay_order.get("id"),
            "amount": total_amount,
            "currency": "INR"
        }

    except Exception as e:
        db.rollback()
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
    """
    Verify payment signature and update order status.
    Expects payment_data to contain: razorpay_order_id, razorpay_payment_id, razorpay_signature
    """
    try:
        # Validate keys presence
        if not all(k in payment_data for k in ("razorpay_order_id", "razorpay_payment_id", "razorpay_signature")):
            raise HTTPException(status_code=400, detail="Invalid payment payload")

        # Verify payment signature
        razorpay_client.utility.verify_payment_signature(payment_data)

        # Update order status
        order = db.query(models.Order).filter(
            models.Order.payment_id == payment_data["razorpay_order_id"],
            models.Order.user_id == (current_user.id if current_user else None)
        ).first()

        if order:
            order.payment_status = "completed"
            order.order_status = "confirmed"
            db.commit()

        return {"message": "Payment verified successfully"}

    except Exception as e:
        # Update order status to failed if possible
        order = None
        try:
            order = db.query(models.Order).filter(
                models.Order.payment_id == payment_data.get("razorpay_order_id"),
                models.Order.user_id == (current_user.id if current_user else None)
            ).first()
            if order:
                order.payment_status = "failed"
                db.commit()
        except Exception:
            db.rollback()

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Payment verification failed"
        )


@router.get("/", response_model=List[schemas.Order])
def get_user_orders(
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Return the authenticated user's orders (recent first).
    """
    if current_user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication required")

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
    """
    Return a specific order only if it belongs to the current user.
    """
    if current_user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication required")

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
