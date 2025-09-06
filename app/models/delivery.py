from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, Text, ForeignKey, Enum, JSON
import enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.db.base import Base


class DeliveryStatus(str, enum.Enum):
    PENDING = "pending"
    ASSIGNED = "assigned"
    PICKED_UP = "picked_up"
    IN_TRANSIT = "in_transit"
    OUT_FOR_DELIVERY = "out_for_delivery"
    DELIVERED = "delivered"
    FAILED = "failed"
    RETURNED = "returned"


class DeliveryPartnerStatus(str, enum.Enum):
    ACTIVE = "active"
    INACTIVE = "inactive"
    SUSPENDED = "suspended"
    ON_BREAK = "on_break"


class VehicleType(str, enum.Enum):
    BIKE = "bike"
    SCOOTER = "scooter"
    CAR = "car"
    VAN = "van"
    TRUCK = "truck"


class DeliveryPartner(Base):
    __tablename__ = "delivery_partners"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    
    # Personal information
    employee_id = Column(String, unique=True, nullable=False)
    license_number = Column(String, unique=True, nullable=False)
    emergency_contact_name = Column(String, nullable=True)
    emergency_contact_phone = Column(String, nullable=True)
    
    # Vehicle information
    vehicle_type = Column(Enum(VehicleType), nullable=False)
    vehicle_number = Column(String, nullable=False)
    vehicle_model = Column(String, nullable=True)
    vehicle_color = Column(String, nullable=True)
    
    # Service area
    service_area = Column(Text, nullable=True)  # JSON string of area codes/regions
    max_delivery_distance = Column(Float, default=50.0)  # km
    
    # Status and availability
    status = Column(Enum(DeliveryPartnerStatus), default=DeliveryPartnerStatus.ACTIVE)
    is_available = Column(Boolean, default=True)
    current_location_lat = Column(Float, nullable=True)
    current_location_lng = Column(Float, nullable=True)
    last_location_update = Column(DateTime, nullable=True)
    
    # Performance metrics
    total_deliveries = Column(Integer, default=0)
    successful_deliveries = Column(Integer, default=0)
    average_rating = Column(Float, default=0.0)
    total_distance_covered = Column(Float, default=0.0)  # km
    
    # Financial information
    base_salary = Column(Float, default=0.0)
    commission_per_delivery = Column(Float, default=0.0)
    fuel_allowance = Column(Float, default=0.0)
    
    # Timestamps
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())
    last_active_at = Column(DateTime, nullable=True)
    
    # Relationships
    user = relationship("User")
    deliveries = relationship("Delivery", back_populates="delivery_partner")


class Delivery(Base):
    __tablename__ = "deliveries"
    
    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"))
    delivery_partner_id = Column(Integer, ForeignKey("delivery_partners.id"), nullable=True)
    
    # Delivery details
    tracking_number = Column(String, unique=True, nullable=False)
    delivery_type = Column(String, default="standard")  # standard, express, same_day
    
    # Address information
    pickup_address = Column(Text, nullable=False)
    pickup_lat = Column(Float, nullable=True)
    pickup_lng = Column(Float, nullable=True)
    pickup_contact_name = Column(String, nullable=True)
    pickup_contact_phone = Column(String, nullable=True)
    
    delivery_address = Column(Text, nullable=False)
    delivery_lat = Column(Float, nullable=True)
    delivery_lng = Column(Float, nullable=True)
    delivery_contact_name = Column(String, nullable=False)
    delivery_contact_phone = Column(String, nullable=False)
    
    # Status and tracking
    status = Column(Enum(DeliveryStatus), default=DeliveryStatus.PENDING)
    estimated_distance = Column(Float, nullable=True)  # km
    actual_distance = Column(Float, nullable=True)  # km
    
    # Pricing
    delivery_fee = Column(Float, default=0.0)
    cod_amount = Column(Float, default=0.0)  # Cash on delivery amount
    
    # Instructions and notes
    pickup_instructions = Column(Text, nullable=True)
    delivery_instructions = Column(Text, nullable=True)
    internal_notes = Column(Text, nullable=True)
    
    # Timestamps
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())
    assigned_at = Column(DateTime, nullable=True)
    picked_up_at = Column(DateTime, nullable=True)
    out_for_delivery_at = Column(DateTime, nullable=True)
    delivered_at = Column(DateTime, nullable=True)
    estimated_delivery_time = Column(DateTime, nullable=True)
    
    # Relationships
    order = relationship("Order")
    delivery_partner = relationship("DeliveryPartner", back_populates="deliveries")
    delivery_updates = relationship("DeliveryUpdate", back_populates="delivery", cascade="all, delete-orphan")


class DeliveryUpdate(Base):
    __tablename__ = "delivery_updates"
    
    id = Column(Integer, primary_key=True, index=True)
    delivery_id = Column(Integer, ForeignKey("deliveries.id"))
    
    # Update details
    status = Column(Enum(DeliveryStatus), nullable=False)
    message = Column(Text, nullable=False)
    location_lat = Column(Float, nullable=True)
    location_lng = Column(Float, nullable=True)
    
    # Metadata
    updated_by = Column(String, nullable=True)  # system, delivery_partner, admin
    photo_url = Column(String, nullable=True)  # Proof of delivery photo
    signature_url = Column(String, nullable=True)  # Digital signature
    
    # Timestamps
    created_at = Column(DateTime, server_default=func.now())
    
    # Relationships
    delivery = relationship("Delivery", back_populates="delivery_updates")


class DeliveryZone(Base):
    __tablename__ = "delivery_zones"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    code = Column(String, unique=True, nullable=False)
    
    # Geographic boundaries (simplified polygon as JSON)
    boundaries = Column(JSON, nullable=True)  # Array of lat/lng coordinates
    
    # Service details
    is_active = Column(Boolean, default=True)
    delivery_fee = Column(Float, default=0.0)
    free_delivery_threshold = Column(Float, default=500.0)
    max_cod_amount = Column(Float, default=5000.0)
    
    # Delivery time estimates
    standard_delivery_time = Column(Integer, default=24)  # hours
    express_delivery_time = Column(Integer, default=4)   # hours
    same_day_available = Column(Boolean, default=False)
    
    # Restrictions
    weight_limit = Column(Float, default=10.0)  # kg
    size_limit = Column(Text, nullable=True)    # JSON with dimensions
    
    # Timestamps
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())