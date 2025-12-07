// User and Authentication Types
export interface User {
  id: number
  email: string
  full_name: string
  phone_number?: string
  role: 'CUSTOMER' | 'SELLER' | 'ADMIN'
  is_active: boolean
  created_at: string
}

export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  access_token: string
  token_type: string
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

export interface DashboardStats {
  total_products: number
  total_orders: number
  pending_orders: number
  low_stock_products: number
  total_sales: number
  store_rating: number
}

// Product Types
export interface Category {
  id: number
  name: string
  description?: string
}

export interface Product {
  id: number
  name: string
  description: string
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
  seller_id: number
  is_active: boolean
  is_deleted: boolean
  created_at: string
  updated_at: string
  category?: Category
}

export interface ProductCreate {
  name: string
  description: string
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
}

// Order Types
export interface Order {
  id: number
  user_id: number
  total_amount: number
  order_status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
  payment_status: 'pending' | 'completed' | 'failed' | 'refunded'
  created_at: string
  updated_at: string
}

// API Response Types
export interface ApiError {
  detail: string
}

export interface ImageUploadResponse {
  image_url: string
  message: string
}