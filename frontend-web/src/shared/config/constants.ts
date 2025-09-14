/**
 * Application Constants
 * Centralized configuration for the e-commerce platform
 */

// API Configuration
export const API_CONFIG = {
  BASE_URL: '/api',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
} as const

// Pseudo API Endpoints for Development
// These will be easily replaceable with real backend endpoints
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    PROFILE: '/auth/profile',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  
  // Products
  PRODUCTS: {
    LIST: '/products',
    DETAIL: '/products/{slug}',
    SEARCH: '/products/search',
    FEATURED: '/products/featured',
    RECOMMENDATIONS: '/products/{id}/recommendations',
    REVIEWS: '/products/{id}/reviews',
  },
  
  // Categories
  CATEGORIES: {
    LIST: '/categories',
    DETAIL: '/categories/{slug}',
    TREE: '/categories/tree',
  },
  
  // Cart
  CART: {
    GET: '/cart',
    ADD_ITEM: '/cart/items',
    UPDATE_ITEM: '/cart/items/{id}',
    REMOVE_ITEM: '/cart/items/{id}',
    CLEAR: '/cart/clear',
    APPLY_COUPON: '/cart/coupon',
  },
  
  // Orders
  ORDERS: {
    CREATE: '/orders',
    LIST: '/orders',
    DETAIL: '/orders/{id}',
    CANCEL: '/orders/{id}/cancel',
    TRACK: '/orders/{id}/track',
  },
  
  // User Account
  ACCOUNT: {
    PROFILE: '/account/profile',
    ADDRESSES: '/account/addresses',
    PAYMENT_METHODS: '/account/payment-methods',
    WISHLIST: '/account/wishlist',
    ORDER_HISTORY: '/account/orders',
  },
  
  // Seller
  SELLER: {
    DASHBOARD: '/seller/dashboard',
    PRODUCTS: '/seller/products',
    ORDERS: '/seller/orders',
    ANALYTICS: '/seller/analytics',
    PROFILE: '/seller/profile',
  },
  
  // Miscellaneous
  MISC: {
    COUNTRIES: '/misc/countries',
    SHIPPING_RATES: '/misc/shipping-rates',
    PAYMENT_METHODS: '/misc/payment-methods',
  },
} as const

// Application Settings
export const APP_CONFIG = {
  NAME: 'ShopEase',
  DESCRIPTION: 'Premium E-commerce Platform',
  VERSION: '1.0.0',
  SUPPORT_EMAIL: 'support@shopease.com',
  COPYRIGHT: '© 2024 ShopEase. All rights reserved.',
} as const

// UI Configuration
export const UI_CONFIG = {
  // Pagination
  ITEMS_PER_PAGE: 24,
  PRODUCTS_PER_ROW: {
    MOBILE: 2,
    TABLET: 3,
    DESKTOP: 4,
    LARGE: 5,
  },
  
  // Animation durations (in milliseconds)
  ANIMATION_DURATION: {
    FAST: 200,
    NORMAL: 300,
    SLOW: 500,
  },
  
  // Breakpoints (matches Tailwind defaults)
  BREAKPOINTS: {
    SM: 640,
    MD: 768,
    LG: 1024,
    XL: 1280,
    '2XL': 1536,
  },
  
  // Toast notification duration
  TOAST_DURATION: 5000,
  
  // Image loading placeholder
  PLACEHOLDER_IMAGE: '/images/placeholder-product.jpg',
} as const

// Business Rules
export const BUSINESS_RULES = {
  // Cart
  MAX_CART_ITEMS: 99,
  MIN_ORDER_AMOUNT: 10,
  FREE_SHIPPING_THRESHOLD: 100,
  
  // Products
  MAX_PRODUCT_IMAGES: 10,
  MAX_PRODUCT_VARIANTS: 50,
  
  // Reviews
  MAX_REVIEW_LENGTH: 1000,
  MIN_REVIEW_LENGTH: 10,
  
  // User
  MAX_ADDRESSES: 5,
  MAX_PAYMENT_METHODS: 3,
  
  // Seller
  MAX_PRODUCTS_PER_SELLER: 10000,
  MIN_PRODUCT_PRICE: 0.01,
  MAX_PRODUCT_PRICE: 999999.99,
} as const

// Status Constants
export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
  REFUNDED: 'refunded',
} as const

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
  REFUNDED: 'refunded',
} as const

export const USER_ROLES = {
  CUSTOMER: 'customer',
  SELLER: 'seller',
  ADMIN: 'admin',
} as const

// Error Messages
export const ERROR_MESSAGES = {
  GENERIC: 'Something went wrong. Please try again.',
  NETWORK: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You need to log in to continue.',
  FORBIDDEN: 'You don\'t have permission to access this resource.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION: 'Please check your input and try again.',
  OUT_OF_STOCK: 'This item is currently out of stock.',
  CART_LIMIT: 'You\'ve reached the maximum items for this product.',
  PAYMENT_FAILED: 'Payment processing failed. Please try again.',
} as const

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN: 'Welcome back! You\'ve been successfully logged in.',
  REGISTER: 'Account created successfully! Welcome to ShopEase.',
  LOGOUT: 'You\'ve been logged out successfully.',
  CART_ADDED: 'Item added to your cart!',
  CART_UPDATED: 'Cart updated successfully.',
  ORDER_PLACED: 'Order placed successfully! You\'ll receive a confirmation email.',
  PROFILE_UPDATED: 'Your profile has been updated successfully.',
  REVIEW_SUBMITTED: 'Thank you for your review!',
} as const

// Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  CART_ITEMS: 'cart_items',
  RECENT_SEARCHES: 'recent_searches',
  WISHLIST: 'wishlist',
  USER_PREFERENCES: 'user_preferences',
} as const

// Product Categories (for demo purposes)
export const PRODUCT_CATEGORIES = [
  { id: 'electronics', name: 'Electronics', slug: 'electronics' },
  { id: 'fashion', name: 'Fashion', slug: 'fashion' },
  { id: 'home', name: 'Home & Garden', slug: 'home-garden' },
  { id: 'sports', name: 'Sports & Outdoors', slug: 'sports-outdoors' },
  { id: 'beauty', name: 'Beauty & Personal Care', slug: 'beauty-personal-care' },
  { id: 'books', name: 'Books', slug: 'books' },
  { id: 'toys', name: 'Toys & Games', slug: 'toys-games' },
  { id: 'automotive', name: 'Automotive', slug: 'automotive' },
] as const

// Filter Options
export const FILTER_OPTIONS = {
  SORT_BY: [
    { value: 'relevance', label: 'Relevance' },
    { value: 'price_low_high', label: 'Price: Low to High' },
    { value: 'price_high_low', label: 'Price: High to Low' },
    { value: 'rating', label: 'Customer Rating' },
    { value: 'newest', label: 'Newest Arrivals' },
    { value: 'best_seller', label: 'Best Sellers' },
  ],
  
  PRICE_RANGES: [
    { min: 0, max: 25, label: 'Under $25' },
    { min: 25, max: 50, label: '$25 - $50' },
    { min: 50, max: 100, label: '$50 - $100' },
    { min: 100, max: 200, label: '$100 - $200' },
    { min: 200, max: null, label: '$200 & Above' },
  ],
  
  RATINGS: [
    { value: 4, label: '4 Stars & Up' },
    { value: 3, label: '3 Stars & Up' },
    { value: 2, label: '2 Stars & Up' },
    { value: 1, label: '1 Star & Up' },
  ],
} as const