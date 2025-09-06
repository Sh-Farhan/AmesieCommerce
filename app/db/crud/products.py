from typing import Optional, List, Dict, Any
from sqlalchemy.orm import Session
from sqlalchemy import and_, or_, desc, asc, func

from app.models.products import (
    Product, Category, ProductImage, ProductVariant, 
    Review, WishlistItem, CartItem, ProductStatus
)


class ProductCRUD:
    def get(self, db: Session, product_id: int) -> Optional[Product]:
        """Get product by ID."""
        return db.query(Product).filter(Product.id == product_id).first()
    
    def get_by_sku(self, db: Session, sku: str) -> Optional[Product]:
        """Get product by SKU."""
        return db.query(Product).filter(Product.sku == sku).first()
    
    def get_by_slug(self, db: Session, slug: str) -> Optional[Product]:
        """Get product by slug."""
        return db.query(Product).filter(Product.slug == slug).first()
    
    def get_multi(
        self, 
        db: Session, 
        skip: int = 0, 
        limit: int = 100,
        category_id: Optional[int] = None,
        seller_id: Optional[int] = None,
        status: Optional[ProductStatus] = None,
        is_featured: Optional[bool] = None,
        min_price: Optional[float] = None,
        max_price: Optional[float] = None,
        sort_by: str = "created_at",
        sort_order: str = "desc"
    ) -> List[Product]:
        """Get multiple products with filtering and sorting."""
        query = db.query(Product)
        
        # Apply filters
        if category_id is not None:
            query = query.filter(Product.category_id == category_id)
        if seller_id is not None:
            query = query.filter(Product.seller_id == seller_id)
        if status is not None:
            query = query.filter(Product.status == status)
        if is_featured is not None:
            query = query.filter(Product.is_featured == is_featured)
        if min_price is not None:
            query = query.filter(Product.price >= min_price)
        if max_price is not None:
            query = query.filter(Product.price <= max_price)
        
        # Apply sorting
        if hasattr(Product, sort_by):
            if sort_order.lower() == "desc":
                query = query.order_by(desc(getattr(Product, sort_by)))
            else:
                query = query.order_by(asc(getattr(Product, sort_by)))
        
        return query.offset(skip).limit(limit).all()
    
    def create(self, db: Session, product_data: dict) -> Product:
        """Create a new product."""
        db_product = Product(**product_data)
        db.add(db_product)
        db.commit()
        db.refresh(db_product)
        return db_product
    
    def update(self, db: Session, db_product: Product, product_data: dict) -> Product:
        """Update an existing product."""
        for field, value in product_data.items():
            if hasattr(db_product, field):
                setattr(db_product, field, value)
        
        db.commit()
        db.refresh(db_product)
        return db_product
    
    def delete(self, db: Session, product_id: int) -> bool:
        """Soft delete a product."""
        db_product = self.get(db, product_id)
        if db_product:
            db_product.status = ProductStatus.DISCONTINUED
            db.commit()
            return True
        return False
    
    def search(
        self, 
        db: Session, 
        query: str, 
        limit: int = 20,
        category_id: Optional[int] = None
    ) -> List[Product]:
        """Search products by name, description, or SKU."""
        search_term = f"%{query}%"
        db_query = db.query(Product).filter(
            and_(
                or_(
                    Product.name.ilike(search_term),
                    Product.description.ilike(search_term),
                    Product.short_description.ilike(search_term),
                    Product.sku.ilike(search_term)
                ),
                Product.status == ProductStatus.ACTIVE
            )
        )
        
        if category_id:
            db_query = db_query.filter(Product.category_id == category_id)
        
        return db_query.limit(limit).all()
    
    def get_featured(self, db: Session, limit: int = 10) -> List[Product]:
        """Get featured products."""
        return db.query(Product).filter(
            and_(Product.is_featured == True, Product.status == ProductStatus.ACTIVE)
        ).limit(limit).all()
    
    def update_stock(self, db: Session, product_id: int, quantity_change: int) -> bool:
        """Update product stock quantity."""
        db_product = self.get(db, product_id)
        if db_product:
            new_quantity = db_product.stock_quantity + quantity_change
            if new_quantity >= 0:
                db_product.stock_quantity = new_quantity
                db.commit()
                return True
        return False
    
    def get_low_stock_products(self, db: Session, seller_id: Optional[int] = None) -> List[Product]:
        """Get products with low stock."""
        query = db.query(Product).filter(
            and_(
                Product.stock_quantity <= Product.low_stock_threshold,
                Product.status == ProductStatus.ACTIVE,
                Product.track_inventory == True
            )
        )
        
        if seller_id:
            query = query.filter(Product.seller_id == seller_id)
        
        return query.all()


class CategoryCRUD:
    def get(self, db: Session, category_id: int) -> Optional[Category]:
        """Get category by ID."""
        return db.query(Category).filter(Category.id == category_id).first()
    
    def get_by_slug(self, db: Session, slug: str) -> Optional[Category]:
        """Get category by slug."""
        return db.query(Category).filter(Category.slug == slug).first()
    
    def get_all(self, db: Session, is_active: bool = True) -> List[Category]:
        """Get all categories."""
        query = db.query(Category)
        if is_active:
            query = query.filter(Category.is_active == True)
        return query.order_by(Category.sort_order, Category.name).all()
    
    def get_root_categories(self, db: Session) -> List[Category]:
        """Get root categories (no parent)."""
        return db.query(Category).filter(
            and_(Category.parent_id.is_(None), Category.is_active == True)
        ).order_by(Category.sort_order, Category.name).all()
    
    def get_subcategories(self, db: Session, parent_id: int) -> List[Category]:
        """Get subcategories of a parent category."""
        return db.query(Category).filter(
            and_(Category.parent_id == parent_id, Category.is_active == True)
        ).order_by(Category.sort_order, Category.name).all()
    
    def create(self, db: Session, category_data: dict) -> Category:
        """Create a new category."""
        db_category = Category(**category_data)
        db.add(db_category)
        db.commit()
        db.refresh(db_category)
        return db_category
    
    def update(self, db: Session, db_category: Category, category_data: dict) -> Category:
        """Update an existing category."""
        for field, value in category_data.items():
            if hasattr(db_category, field):
                setattr(db_category, field, value)
        
        db.commit()
        db.refresh(db_category)
        return db_category
    
    def delete(self, db: Session, category_id: int) -> bool:
        """Soft delete a category."""
        db_category = self.get(db, category_id)
        if db_category:
            db_category.is_active = False
            db.commit()
            return True
        return False


class ReviewCRUD:
    def get(self, db: Session, review_id: int) -> Optional[Review]:
        """Get review by ID."""
        return db.query(Review).filter(Review.id == review_id).first()
    
    def get_product_reviews(
        self, 
        db: Session, 
        product_id: int, 
        skip: int = 0, 
        limit: int = 20,
        approved_only: bool = True
    ) -> List[Review]:
        """Get reviews for a product."""
        query = db.query(Review).filter(Review.product_id == product_id)
        
        if approved_only:
            query = query.filter(Review.is_approved == True)
        
        return query.order_by(desc(Review.created_at)).offset(skip).limit(limit).all()
    
    def get_user_reviews(self, db: Session, user_id: int, skip: int = 0, limit: int = 20) -> List[Review]:
        """Get reviews by a user."""
        return db.query(Review).filter(Review.user_id == user_id).order_by(
            desc(Review.created_at)
        ).offset(skip).limit(limit).all()
    
    def create(self, db: Session, review_data: dict) -> Review:
        """Create a new review."""
        db_review = Review(**review_data)
        db.add(db_review)
        db.commit()
        db.refresh(db_review)
        return db_review
    
    def update(self, db: Session, db_review: Review, review_data: dict) -> Review:
        """Update an existing review."""
        for field, value in review_data.items():
            if hasattr(db_review, field):
                setattr(db_review, field, value)
        
        db.commit()
        db.refresh(db_review)
        return db_review
    
    def approve(self, db: Session, review_id: int) -> bool:
        """Approve a review."""
        db_review = self.get(db, review_id)
        if db_review:
            db_review.is_approved = True
            db.commit()
            return True
        return False
    
    def get_product_rating_summary(self, db: Session, product_id: int) -> Dict[str, Any]:
        """Get rating summary for a product."""
        reviews = db.query(Review).filter(
            and_(Review.product_id == product_id, Review.is_approved == True)
        ).all()
        
        if not reviews:
            return {
                "average_rating": 0.0,
                "total_reviews": 0,
                "rating_distribution": {1: 0, 2: 0, 3: 0, 4: 0, 5: 0}
            }
        
        total_rating = sum(review.rating for review in reviews)
        average_rating = total_rating / len(reviews)
        
        rating_distribution = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0}
        for review in reviews:
            rating_distribution[review.rating] += 1
        
        return {
            "average_rating": round(average_rating, 2),
            "total_reviews": len(reviews),
            "rating_distribution": rating_distribution
        }


class CartCRUD:
    def get_user_cart(self, db: Session, user_id: int) -> List[CartItem]:
        """Get all cart items for a user."""
        return db.query(CartItem).filter(CartItem.user_id == user_id).all()
    
    def add_to_cart(
        self, 
        db: Session, 
        user_id: int, 
        product_id: int, 
        quantity: int = 1,
        variant_id: Optional[int] = None
    ) -> CartItem:
        """Add item to cart or update quantity if exists."""
        # Check if item already exists in cart
        existing_item = db.query(CartItem).filter(
            and_(
                CartItem.user_id == user_id,
                CartItem.product_id == product_id,
                CartItem.variant_id == variant_id
            )
        ).first()
        
        if existing_item:
            existing_item.quantity += quantity
            db.commit()
            db.refresh(existing_item)
            return existing_item
        else:
            cart_item = CartItem(
                user_id=user_id,
                product_id=product_id,
                variant_id=variant_id,
                quantity=quantity
            )
            db.add(cart_item)
            db.commit()
            db.refresh(cart_item)
            return cart_item
    
    def update_quantity(self, db: Session, cart_item_id: int, quantity: int) -> bool:
        """Update cart item quantity."""
        cart_item = db.query(CartItem).filter(CartItem.id == cart_item_id).first()
        if cart_item:
            if quantity <= 0:
                db.delete(cart_item)
            else:
                cart_item.quantity = quantity
            db.commit()
            return True
        return False
    
    def remove_from_cart(self, db: Session, cart_item_id: int) -> bool:
        """Remove item from cart."""
        cart_item = db.query(CartItem).filter(CartItem.id == cart_item_id).first()
        if cart_item:
            db.delete(cart_item)
            db.commit()
            return True
        return False
    
    def clear_cart(self, db: Session, user_id: int) -> bool:
        """Clear all items from user's cart."""
        db.query(CartItem).filter(CartItem.user_id == user_id).delete()
        db.commit()
        return True


# Create instances
product_crud = ProductCRUD()
category_crud = CategoryCRUD()
review_crud = ReviewCRUD()
cart_crud = CartCRUD()