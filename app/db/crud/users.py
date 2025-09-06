from typing import Optional, List
from sqlalchemy.orm import Session
from sqlalchemy import and_, or_

from app.models.users import User, Address, Notification, UserRole
from app.core.security import get_password_hash, verify_password


class UserCRUD:
    def get(self, db: Session, user_id: int) -> Optional[User]:
        """Get user by ID."""
        return db.query(User).filter(User.id == user_id).first()
    
    def get_by_email(self, db: Session, email: str) -> Optional[User]:
        """Get user by email."""
        return db.query(User).filter(User.email == email).first()
    
    def get_by_phone(self, db: Session, phone: str) -> Optional[User]:
        """Get user by phone number."""
        return db.query(User).filter(User.phone_number == phone).first()
    
    def get_multi(
        self, 
        db: Session, 
        skip: int = 0, 
        limit: int = 100,
        role: Optional[UserRole] = None,
        is_active: Optional[bool] = None
    ) -> List[User]:
        """Get multiple users with optional filtering."""
        query = db.query(User)
        
        if role is not None:
            query = query.filter(User.role == role)
        if is_active is not None:
            query = query.filter(User.is_active == is_active)
            
        return query.offset(skip).limit(limit).all()
    
    def create(self, db: Session, user_data: dict) -> User:
        """Create a new user."""
        # Hash password if provided
        if "password" in user_data:
            user_data["hashed_password"] = get_password_hash(user_data.pop("password"))
        
        db_user = User(**user_data)
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user
    
    def update(self, db: Session, db_user: User, user_data: dict) -> User:
        """Update an existing user."""
        # Hash password if being updated
        if "password" in user_data:
            user_data["hashed_password"] = get_password_hash(user_data.pop("password"))
        
        for field, value in user_data.items():
            if hasattr(db_user, field):
                setattr(db_user, field, value)
        
        db.commit()
        db.refresh(db_user)
        return db_user
    
    def delete(self, db: Session, user_id: int) -> bool:
        """Soft delete a user (set inactive)."""
        db_user = self.get(db, user_id)
        if db_user:
            db_user.is_active = False
            db.commit()
            return True
        return False
    
    def authenticate(self, db: Session, email: str, password: str) -> Optional[User]:
        """Authenticate user with email and password."""
        user = self.get_by_email(db, email)
        if not user:
            return None
        if not verify_password(password, user.hashed_password):
            return None
        return user
    
    def is_active(self, user: User) -> bool:
        """Check if user is active."""
        return user.is_active
    
    def is_superuser(self, user: User) -> bool:
        """Check if user is admin/superuser."""
        return user.role == UserRole.ADMIN
    
    def search(self, db: Session, query: str, limit: int = 20) -> List[User]:
        """Search users by name, email, or phone."""
        search_term = f"%{query}%"
        return db.query(User).filter(
            or_(
                User.full_name.ilike(search_term),
                User.email.ilike(search_term),
                User.phone_number.ilike(search_term)
            )
        ).filter(User.is_active == True).limit(limit).all()


class AddressCRUD:
    def get(self, db: Session, address_id: int) -> Optional[Address]:
        """Get address by ID."""
        return db.query(Address).filter(Address.id == address_id).first()
    
    def get_user_addresses(self, db: Session, user_id: int) -> List[Address]:
        """Get all addresses for a user."""
        return db.query(Address).filter(Address.user_id == user_id).all()
    
    def get_default_address(self, db: Session, user_id: int) -> Optional[Address]:
        """Get user's default address."""
        return db.query(Address).filter(
            and_(Address.user_id == user_id, Address.is_default == True)
        ).first()
    
    def create(self, db: Session, address_data: dict, user_id: int) -> Address:
        """Create a new address for a user."""
        # If this is set as default, unset other default addresses
        if address_data.get("is_default", False):
            self.unset_default_addresses(db, user_id)
        
        address_data["user_id"] = user_id
        db_address = Address(**address_data)
        db.add(db_address)
        db.commit()
        db.refresh(db_address)
        return db_address
    
    def update(self, db: Session, db_address: Address, address_data: dict) -> Address:
        """Update an existing address."""
        # If this is set as default, unset other default addresses
        if address_data.get("is_default", False):
            self.unset_default_addresses(db, db_address.user_id)
        
        for field, value in address_data.items():
            if hasattr(db_address, field):
                setattr(db_address, field, value)
        
        db.commit()
        db.refresh(db_address)
        return db_address
    
    def delete(self, db: Session, address_id: int) -> bool:
        """Delete an address."""
        db_address = self.get(db, address_id)
        if db_address:
            db.delete(db_address)
            db.commit()
            return True
        return False
    
    def unset_default_addresses(self, db: Session, user_id: int) -> None:
        """Unset all default addresses for a user."""
        db.query(Address).filter(
            and_(Address.user_id == user_id, Address.is_default == True)
        ).update({Address.is_default: False})
        db.commit()


class NotificationCRUD:
    def get(self, db: Session, notification_id: int) -> Optional[Notification]:
        """Get notification by ID."""
        return db.query(Notification).filter(Notification.id == notification_id).first()
    
    def get_user_notifications(
        self, 
        db: Session, 
        user_id: int, 
        skip: int = 0, 
        limit: int = 20,
        unread_only: bool = False
    ) -> List[Notification]:
        """Get notifications for a user."""
        query = db.query(Notification).filter(Notification.user_id == user_id)
        
        if unread_only:
            query = query.filter(Notification.is_read == False)
        
        return query.order_by(Notification.created_at.desc()).offset(skip).limit(limit).all()
    
    def create(self, db: Session, notification_data: dict) -> Notification:
        """Create a new notification."""
        db_notification = Notification(**notification_data)
        db.add(db_notification)
        db.commit()
        db.refresh(db_notification)
        return db_notification
    
    def mark_as_read(self, db: Session, notification_id: int) -> bool:
        """Mark notification as read."""
        db_notification = self.get(db, notification_id)
        if db_notification:
            db_notification.is_read = True
            db.commit()
            return True
        return False
    
    def mark_all_as_read(self, db: Session, user_id: int) -> int:
        """Mark all notifications as read for a user."""
        count = db.query(Notification).filter(
            and_(Notification.user_id == user_id, Notification.is_read == False)
        ).update({Notification.is_read: True})
        db.commit()
        return count
    
    def delete(self, db: Session, notification_id: int) -> bool:
        """Delete a notification."""
        db_notification = self.get(db, notification_id)
        if db_notification:
            db.delete(db_notification)
            db.commit()
            return True
        return False
    
    def get_unread_count(self, db: Session, user_id: int) -> int:
        """Get count of unread notifications for a user."""
        return db.query(Notification).filter(
            and_(Notification.user_id == user_id, Notification.is_read == False)
        ).count()


# Create instances
user_crud = UserCRUD()
address_crud = AddressCRUD()
notification_crud = NotificationCRUD()