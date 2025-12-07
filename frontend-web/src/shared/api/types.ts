/**
 * API Response Types
 * TypeScript interfaces matching backend schemas
 */

export enum UserRole {
  ADMIN = 'ADMIN',
  SELLER = 'SELLER',
  CUSTOMER = 'CUSTOMER',
}

export enum NotificationType {
  ORDER_PLACED = 'order_placed',
  ORDER_CONFIRMED = 'order_confirmed',
  ORDER_SHIPPED = 'order_shipped',
  ORDER_DELIVERED = 'order_delivered',
  ORDER_CANCELLED = 'order_cancelled',
  PAYMENT_RECEIVED = 'payment_received',
}

// User Types
export interface User {
  id: number
  email: string
  full_name: string
  phone_number?: string
  role: UserRole
  is_active: boolean
  created_at: string
}

export interface UserCreate {
  email: string
  full_name: string
  phone_number?: string
  password: string
}

export interface Token {
  access_token: string
  token_type: string
}

export interface LoginCredentials {
  username: string
  password: string
}

// Product Types
export interface Category {
  id: number
  name: string
  description?: string
  image_url?: string
}

export interface ProductImage {
  id: number
  product_id: number
  image_url: string
  alt_text?: string
  display_order: number
  created_at: string
}

export interface SellerBasic {
  id: number
  store_name: string
  store_logo_url?: string
  rating: number
}

export interface Product {
  id: number
  name: string
  description?: string
  price: number
  sku: string
  image_url?: string
  stock_quantity: number
  weight?: number
  length?: number
  width?: number
  height?: number
  shipping_info?: string
  category_id: number
  seller_id?: number
  is_active: boolean
  is_deleted: boolean
  created_at: string
  updated_at: string
  deleted_at?: string
  category?: Category
  seller?: SellerBasic
  images: ProductImage[]
}

export interface ProductCreate {
  name: string
  description?: string
  price: number
  sku: string
  image_url?: string
  stock_quantity: number
  weight?: number
  length?: number
  width?: number
  height?: number
  shipping_info?: string
  category_id: number
  seller_id?: number
  images?: Array<{
    image_url: string
    alt_text?: string
    display_order: number
  }>
}

// Address Types
export interface Address {
  id: number
  user_id: number
  full_name: string
  address_line1: string
  address_line2?: string
  city: string
  state: string
  postal_code: string
  country: string
  is_default: boolean
}

export interface AddressCreate {
  full_name: string
  address_line1: string
  address_line2?: string
  city: string
  state: string
  postal_code: string
  country: string
  is_default?: boolean
}

// Cart Types
export interface CartItem {
  id: number
  user_id: number
  product_id: number
  quantity: number
  created_at: string
  product: Product
}

export interface CartItemCreate {
  product_id: number
  quantity: number
}

// Wishlist Types
export interface WishlistItem {
  id: number
  user_id: number
  product_id: number
  created_at: string
  product: Product
}

// Order Types
export interface OrderItem {
  id: number
  order_id: number
  product_id: number
  quantity: number
  price: number
  product: Product
}

export interface Order {
  id: number
  user_id: number
  total_amount: number
  payment_id?: string
  payment_status: string
  order_status: string
  shipping_address: string
  created_at: string
  order_items: OrderItem[]
}

export interface OrderCreate {
  shipping_address: string
}

// Review Types
export interface Review {
  id: number
  user_id: number
  product_id: number
  rating: number
  comment?: string
  created_at: string
  user: User
}

export interface ReviewCreate {
  product_id: number
  rating: number
  comment?: string
}

// Seller Types
export interface Seller {
  id: number
  user_id: number
  store_name: string
  store_description?: string
  store_logo_url?: string
  profile_picture_url?: string
  business_license?: string
  street_address?: string
  city?: string
  state?: string
  country?: string
  postal_code?: string
  account_holder_name?: string
  bank_account_number?: string
  bank_ifsc_code?: string
  gst_number?: string
  pan_number?: string
  vat_number?: string
  tax_id?: string
  store_address?: string
  is_verified: boolean
  is_active: boolean
  total_sales: number
  rating: number
  created_at: string
  updated_at: string
  user: User
}

export interface SellerRegistration {
  full_name: string
  email: string
  phone_number: string
  password: string
  store_name: string
  store_description?: string
  store_address: string
  business_license?: string
  gst_number?: string
  bank_account_number?: string
  bank_ifsc_code?: string
}

// Notification Types
export interface Notification {
  id: number
  user_id: number
  title: string
  message: string
  notification_type: NotificationType
  order_id?: number
  is_read: boolean
  created_at: string
}

// API Response wrappers
export interface ApiResponse<T = any> {
  data: T
  message?: string
  success: boolean
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  size: number
  pages: number
}