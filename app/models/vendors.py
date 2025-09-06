from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, Text, ForeignKey, Enum
import enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.db.base import Base


class SellerStatus(str, enum.Enum):
    PENDING = "pending"
    VERIFIED = "verified"
    SUSPENDED = "suspended"
    REJECTED = "rejected"


class VerificationStatus(str, enum.Enum):
    PENDING = "pending"
    APPROVED = "approved"
    REJECTED = "rejected"
    REQUIRES_UPDATE = "requires_update"


class Seller(Base):
    __tablename__ = "sellers"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    
    # Store information
    store_name = Column(String, nullable=False)
    store_description = Column(Text)
    store_slug = Column(String, unique=True, nullable=False)  # URL-friendly store name
    store_logo_url = Column(String)
    store_banner_url = Column(String)
    
    # Contact information
    contact_email = Column(String, nullable=True)
    contact_phone = Column(String, nullable=True)
    website_url = Column(String, nullable=True)
    
    # Business information
    business_name = Column(String, nullable=False)
    business_type = Column(String, nullable=True)  # individual, partnership, company, etc.
    business_license = Column(String, nullable=True)
    gst_number = Column(String, nullable=True)
    pan_number = Column(String, nullable=True)
    vat_number = Column(String, nullable=True)
    tax_id = Column(String, nullable=True)
    
    # Address information
    business_address_line1 = Column(String, nullable=True)
    business_address_line2 = Column(String, nullable=True)
    business_city = Column(String, nullable=True)
    business_state = Column(String, nullable=True)
    business_country = Column(String, default="India")
    business_postal_code = Column(String, nullable=True)
    
    # Warehouse/shipping address (if different)
    warehouse_address_line1 = Column(String, nullable=True)
    warehouse_address_line2 = Column(String, nullable=True)
    warehouse_city = Column(String, nullable=True)
    warehouse_state = Column(String, nullable=True)
    warehouse_country = Column(String, default="India")
    warehouse_postal_code = Column(String, nullable=True)
    
    # Banking information
    bank_account_holder_name = Column(String, nullable=True)
    bank_account_number = Column(String, nullable=True)
    bank_name = Column(String, nullable=True)
    bank_ifsc_code = Column(String, nullable=True)
    bank_branch = Column(String, nullable=True)
    
    # Status and verification
    status = Column(Enum(SellerStatus), default=SellerStatus.PENDING)
    verification_status = Column(Enum(VerificationStatus), default=VerificationStatus.PENDING)
    is_active = Column(Boolean, default=True)
    is_featured = Column(Boolean, default=False)
    
    # Performance metrics
    total_sales = Column(Float, default=0.0)
    total_orders = Column(Integer, default=0)
    average_rating = Column(Float, default=0.0)
    total_reviews = Column(Integer, default=0)
    response_rate = Column(Float, default=0.0)  # Percentage
    response_time = Column(Integer, default=0)  # Hours
    
    # Commission and fees
    commission_rate = Column(Float, default=10.0)  # Percentage
    subscription_plan = Column(String, default="basic")  # basic, premium, enterprise
    subscription_expires_at = Column(DateTime, nullable=True)
    
    # Settings and preferences
    auto_approve_orders = Column(Boolean, default=False)
    vacation_mode = Column(Boolean, default=False)
    vacation_message = Column(Text, nullable=True)
    minimum_order_amount = Column(Float, default=0.0)
    
    # Timestamps
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())
    verified_at = Column(DateTime, nullable=True)
    last_login_at = Column(DateTime, nullable=True)
    
    # Relationships
    user = relationship("User", back_populates="seller_profile")
    products = relationship("Product", back_populates="seller")
    seller_documents = relationship("SellerDocument", back_populates="seller", cascade="all, delete-orphan")
    seller_reviews = relationship("SellerReview", back_populates="seller")


class SellerDocument(Base):
    __tablename__ = "seller_documents"
    
    id = Column(Integer, primary_key=True, index=True)
    seller_id = Column(Integer, ForeignKey("sellers.id"))
    
    # Document information
    document_type = Column(String, nullable=False)  # business_license, gst_certificate, pan_card, etc.
    document_name = Column(String, nullable=False)
    file_url = Column(String, nullable=False)
    file_size = Column(Integer, nullable=True)
    mime_type = Column(String, nullable=True)
    
    # Verification status
    status = Column(Enum(VerificationStatus), default=VerificationStatus.PENDING)
    admin_notes = Column(Text, nullable=True)
    
    # Timestamps
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())
    verified_at = Column(DateTime, nullable=True)
    
    # Relationships
    seller = relationship("Seller", back_populates="seller_documents")


class SellerReview(Base):
    __tablename__ = "seller_reviews"
    
    id = Column(Integer, primary_key=True, index=True)
    seller_id = Column(Integer, ForeignKey("sellers.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    order_id = Column(Integer, ForeignKey("orders.id"), nullable=True)
    
    # Review details
    rating = Column(Integer, nullable=False)  # 1-5 stars
    title = Column(String, nullable=True)
    comment = Column(Text, nullable=True)
    
    # Review aspects (optional detailed ratings)
    communication_rating = Column(Integer, nullable=True)
    shipping_rating = Column(Integer, nullable=True)
    product_quality_rating = Column(Integer, nullable=True)
    
    # Status and metadata
    is_verified_purchase = Column(Boolean, default=False)
    is_approved = Column(Boolean, default=False)
    helpful_count = Column(Integer, default=0)
    
    # Timestamps
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())
    
    # Relationships
    seller = relationship("Seller", back_populates="seller_reviews")
    user = relationship("User")
    order = relationship("Order")