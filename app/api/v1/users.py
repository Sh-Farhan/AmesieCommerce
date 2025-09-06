from typing import List
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.db.crud.users import user_crud, address_crud, notification_crud
from app.deps import get_current_active_user, get_current_admin_user
from app.models.users import User

router = APIRouter()


@router.get("/me/addresses")
def get_my_addresses(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Get current user's addresses."""
    addresses = address_crud.get_user_addresses(db, current_user.id)
    
    return {
        "addresses": [
            {
                "id": addr.id,
                "full_name": addr.full_name,
                "address_line1": addr.address_line1,
                "address_line2": addr.address_line2,
                "city": addr.city,
                "state": addr.state,
                "postal_code": addr.postal_code,
                "country": addr.country,
                "phone_number": addr.phone_number,
                "is_default": addr.is_default,
                "address_type": addr.address_type
            }
            for addr in addresses
        ]
    }


@router.post("/me/addresses")
def create_address(
    address_data: dict,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Create a new address for current user."""
    address = address_crud.create(db, address_data, current_user.id)
    
    return {
        "message": "Address created successfully",
        "address": {
            "id": address.id,
            "full_name": address.full_name,
            "address_line1": address.address_line1,
            "city": address.city,
            "state": address.state,
            "postal_code": address.postal_code,
            "is_default": address.is_default
        }
    }


@router.put("/me/addresses/{address_id}")
def update_address(
    address_id: int,
    address_data: dict,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Update an address."""
    address = address_crud.get(db, address_id)
    if not address or address.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Address not found")
    
    address = address_crud.update(db, address, address_data)
    
    return {
        "message": "Address updated successfully",
        "address": {
            "id": address.id,
            "full_name": address.full_name,
            "address_line1": address.address_line1,
            "city": address.city,
            "state": address.state,
            "postal_code": address.postal_code,
            "is_default": address.is_default
        }
    }


@router.delete("/me/addresses/{address_id}")
def delete_address(
    address_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Delete an address."""
    address = address_crud.get(db, address_id)
    if not address or address.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Address not found")
    
    success = address_crud.delete(db, address_id)
    
    if success:
        return {"message": "Address deleted successfully"}
    else:
        raise HTTPException(status_code=400, detail="Failed to delete address")


@router.get("/me/notifications")
def get_my_notifications(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    unread_only: bool = Query(False)
):
    """Get current user's notifications."""
    notifications = notification_crud.get_user_notifications(
        db, current_user.id, skip=skip, limit=limit, unread_only=unread_only
    )
    
    unread_count = notification_crud.get_unread_count(db, current_user.id)
    
    return {
        "notifications": [
            {
                "id": notif.id,
                "title": notif.title,
                "message": notif.message,
                "type": notif.type,
                "is_read": notif.is_read,
                "created_at": notif.created_at,
                "data": notif.data
            }
            for notif in notifications
        ],
        "unread_count": unread_count
    }


@router.put("/me/notifications/{notification_id}/read")
def mark_notification_read(
    notification_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Mark a notification as read."""
    notification = notification_crud.get(db, notification_id)
    if not notification or notification.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Notification not found")
    
    success = notification_crud.mark_as_read(db, notification_id)
    
    if success:
        return {"message": "Notification marked as read"}
    else:
        raise HTTPException(status_code=400, detail="Failed to mark notification as read")


@router.put("/me/notifications/read-all")
def mark_all_notifications_read(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Mark all notifications as read."""
    count = notification_crud.mark_all_as_read(db, current_user.id)
    
    return {
        "message": f"Marked {count} notifications as read"
    }


# Admin endpoints
@router.get("")
def get_users(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user),
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100)
):
    """Get all users (admin only)."""
    users = user_crud.get_multi(db, skip=skip, limit=limit)
    
    return {
        "users": [
            {
                "id": user.id,
                "email": user.email,
                "full_name": user.full_name,
                "phone_number": user.phone_number,
                "role": user.role,
                "is_active": user.is_active,
                "created_at": user.created_at
            }
            for user in users
        ]
    }


@router.get("/{user_id}")
def get_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    """Get user by ID (admin only)."""
    user = user_crud.get(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return {
        "id": user.id,
        "email": user.email,
        "full_name": user.full_name,
        "phone_number": user.phone_number,
        "role": user.role,
        "is_active": user.is_active,
        "created_at": user.created_at,
        "updated_at": user.updated_at
    }