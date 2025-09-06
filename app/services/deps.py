from typing import Optional
from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.db.crud.users import user_crud
from app.models.users import User
from app.models.vendors import Seller


def get_seller_by_user(
    db: Session = Depends(get_db),
    current_user: User = None
) -> Optional[Seller]:
    """Get seller profile for the current user."""
    if not current_user:
        return None
    
    return db.query(Seller).filter(Seller.user_id == current_user.id).first()


def require_seller_profile(
    db: Session = Depends(get_db),
    current_user: User = None
) -> Seller:
    """Require user to have a seller profile."""
    seller = get_seller_by_user(db, current_user)
    if not seller:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Seller profile not found. Please complete seller registration first."
        )
    return seller


def require_verified_seller(
    seller: Seller = Depends(require_seller_profile)
) -> Seller:
    """Require seller to be verified."""
    if seller.verification_status != "approved":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Seller account is not verified. Please complete verification process."
        )
    return seller