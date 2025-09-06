# Import all models to ensure they are registered with SQLAlchemy
from .users import User, Address, Notification, UserRole
from .products import (
    Product, Category, ProductImage, ProductVariant, 
    Review, WishlistItem, CartItem, ProductStatus
)
from .orders import (
    Order, OrderItem, Payment, Shipment,
    OrderStatus, PaymentStatus, PaymentMethod
)
from .vendors import (
    Seller, SellerDocument, SellerReview,
    SellerStatus, VerificationStatus
)
from .delivery import (
    DeliveryPartner, Delivery, DeliveryUpdate, DeliveryZone,
    DeliveryStatus, DeliveryPartnerStatus, VehicleType
)

__all__ = [
    # User models
    "User", "Address", "Notification", "UserRole",
    
    # Product models
    "Product", "Category", "ProductImage", "ProductVariant",
    "Review", "WishlistItem", "CartItem", "ProductStatus",
    
    # Order models
    "Order", "OrderItem", "Payment", "Shipment",
    "OrderStatus", "PaymentStatus", "PaymentMethod",
    
    # Vendor models
    "Seller", "SellerDocument", "SellerReview",
    "SellerStatus", "VerificationStatus",
    
    # Delivery models
    "DeliveryPartner", "Delivery", "DeliveryUpdate", "DeliveryZone",
    "DeliveryStatus", "DeliveryPartnerStatus", "VehicleType",
]