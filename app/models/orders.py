from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, Text, ForeignKey, Enum
import enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.db.base import Base


class OrderStatus(str, enum.Enum):
    PENDING = "pending"
    CONFIRMED = "confirmed"
    PROCESSING = "processing"
    SHIPPED = "shipped"
    DELIVERED = "delivered"
    CANCELLED = "cancelled"
    RETURNED = "returned"


class PaymentStatus(str, enum.Enum):
    PENDING = "pending"
    PROCESSING = "processing"
    COMPLETED = "completed"
    FAILED = "failed"
    REFUNDED = "refunded"
    PARTIALLY_REFUNDED = "partially_refunded"


class PaymentMethod(str, enum.Enum):
    RAZORPAY = "razorpay"
    COD = "cod"
    BANK_TRANSFER = "bank_transfer"
    WALLET = "wallet"


class Order(Base):
    __tablename__ = "orders"
    
    id = Column(Integer, primary_key=True, index=True)
    order_number = Column(String, unique=True, nullable=False)  # Human-readable order number
    user_id = Column(Integer, ForeignKey("users.id"))
    
    # Pricing information
    subtotal = Column(Float, nullable=False)
    tax_amount = Column(Float, default=0.0)
    shipping_amount = Column(Float, default=0.0)
    discount_amount = Column(Float, default=0.0)
    total_amount = Column(Float, nullable=False)
    
    # Address information (snapshot at time of order)
    shipping_address = Column(Text, nullable=False)
    billing_address = Column(Text, nullable=True)
    
    # Contact information
    customer_email = Column(String, nullable=False)
    customer_phone = Column(String, nullable=True)
    
    # Payment information
    payment_id = Column(String, nullable=True)  # Razorpay payment ID
    payment_method = Column(Enum(PaymentMethod), default=PaymentMethod.RAZORPAY)
    payment_status = Column(Enum(PaymentStatus), default=PaymentStatus.PENDING)
    
    # Order status and tracking
    order_status = Column(Enum(OrderStatus), default=OrderStatus.PENDING)
    notes = Column(Text, nullable=True)  # Special instructions
    admin_notes = Column(Text, nullable=True)  # Internal notes
    
    # Timestamps
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())
    confirmed_at = Column(DateTime, nullable=True)
    shipped_at = Column(DateTime, nullable=True)
    delivered_at = Column(DateTime, nullable=True)
    cancelled_at = Column(DateTime, nullable=True)
    
    # Relationships
    user = relationship("User", back_populates="orders")
    order_items = relationship("OrderItem", back_populates="order", cascade="all, delete-orphan")
    payments = relationship("Payment", back_populates="order", cascade="all, delete-orphan")
    shipments = relationship("Shipment", back_populates="order", cascade="all, delete-orphan")


class OrderItem(Base):
    __tablename__ = "order_items"
    
    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"))
    product_id = Column(Integer, ForeignKey("products.id"))
    variant_id = Column(Integer, ForeignKey("product_variants.id"), nullable=True)
    seller_id = Column(Integer, ForeignKey("sellers.id"), nullable=True)
    
    # Product details at time of order (snapshot)
    product_name = Column(String, nullable=False)
    product_sku = Column(String, nullable=False)
    variant_name = Column(String, nullable=True)
    
    # Pricing details
    quantity = Column(Integer, nullable=False)
    unit_price = Column(Float, nullable=False)  # Price per unit at time of order
    total_price = Column(Float, nullable=False)  # quantity * unit_price
    
    # Status for multi-seller orders
    status = Column(Enum(OrderStatus), default=OrderStatus.PENDING)
    
    # Timestamps
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())
    
    # Relationships
    order = relationship("Order", back_populates="order_items")
    product = relationship("Product", back_populates="order_items")
    variant = relationship("ProductVariant")
    seller = relationship("Seller")


class Payment(Base):
    __tablename__ = "payments"
    
    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"))
    
    # Payment gateway details
    payment_gateway_id = Column(String, nullable=True)  # External payment ID
    payment_method = Column(Enum(PaymentMethod), nullable=False)
    
    # Amount details
    amount = Column(Float, nullable=False)
    currency = Column(String, default="INR")
    
    # Status and details
    status = Column(Enum(PaymentStatus), default=PaymentStatus.PENDING)
    gateway_response = Column(Text, nullable=True)  # JSON response from gateway
    failure_reason = Column(Text, nullable=True)
    
    # Timestamps
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())
    processed_at = Column(DateTime, nullable=True)
    
    # Relationships
    order = relationship("Order", back_populates="payments")


class Shipment(Base):
    __tablename__ = "shipments"
    
    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"))
    
    # Shipping details
    tracking_number = Column(String, nullable=True)
    carrier = Column(String, nullable=True)  # Shipping company
    shipping_method = Column(String, nullable=True)  # Standard, Express, etc.
    
    # Status
    status = Column(String, default="preparing")  # preparing, shipped, in_transit, delivered
    notes = Column(Text, nullable=True)
    
    # Timestamps
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())
    shipped_at = Column(DateTime, nullable=True)
    estimated_delivery = Column(DateTime, nullable=True)
    delivered_at = Column(DateTime, nullable=True)
    
    # Relationships
    order = relationship("Order", back_populates="shipments")