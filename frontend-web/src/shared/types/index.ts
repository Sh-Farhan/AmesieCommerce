/**
 * Shared TypeScript Interfaces and Types
 * Comprehensive type definitions for the e-commerce platform
 */

// Base types
export type ID = string | number

export interface BaseEntity {
  id: ID
  createdAt: string
  updatedAt: string
}

// User types
export interface User extends BaseEntity {
  email: string
  firstName: string
  lastName: string
  phone?: string
  avatar?: string
  role: 'customer' | 'seller' | 'admin'
  isVerified: boolean
  preferences: UserPreferences
}

export interface UserPreferences {
  currency: string
  language: string
  notifications: {
    email: boolean
    sms: boolean
    push: boolean
  }
  theme: 'light' | 'dark' | 'auto'
}

// Address types
export interface Address extends BaseEntity {
  type: 'home' | 'work' | 'other'
  firstName: string
  lastName: string
  company?: string
  address1: string
  address2?: string
  city: string
  state: string
  zipCode: string
  country: string
  phone?: string
  isDefault: boolean
}

// Product types
export interface Product extends BaseEntity {
  slug: string
  title: string
  description: string
  shortDescription?: string
  sku: string
  price: number
  comparePrice?: number
  cost?: number
  images: ProductImage[]
  category: Category
  brand?: string
  tags: string[]
  variants: ProductVariant[]
  attributes: ProductAttribute[]
  inventory: Inventory
  seo: SEOData
  rating: ProductRating
  reviews: Review[]
  isActive: boolean
  isFeatured: boolean
  seller: Seller
}

export interface ProductImage {
  id: ID
  url: string
  alt: string
  position: number
  isDefault: boolean
}

export interface ProductVariant {
  id: ID
  title: string
  price?: number
  sku?: string
  inventory: Inventory
  attributes: Record<string, string> // e.g., { color: 'red', size: 'L' }
  image?: ProductImage
}

export interface ProductAttribute {
  name: string
  value: string
  type: 'text' | 'number' | 'boolean' | 'select'
  isFilterable: boolean
  position: number
}

export interface Inventory {
  quantity: number
  lowStockThreshold: number
  allowBackorder: boolean
  trackQuantity: boolean
}

export interface ProductRating {
  average: number
  count: number
  distribution: {
    5: number
    4: number
    3: number
    2: number
    1: number
  }
}

// Category types
export interface Category extends BaseEntity {
  name: string
  slug: string
  description?: string
  image?: string
  parentId?: ID
  children?: Category[]
  level: number
  position: number
  isActive: boolean
  seo: SEOData
  facets: CategoryFacet[]
}

export interface CategoryFacet {
  name: string
  type: 'checkbox' | 'radio' | 'range' | 'color'
  options: FacetOption[]
  position: number
}

export interface FacetOption {
  value: string
  label: string
  count: number
}

// Cart types
export interface Cart {
  id: ID
  items: CartItem[]
  totals: CartTotals
  discounts: CartDiscount[]
  couponCode?: string
  createdAt: string
  updatedAt: string
}

export interface CartItem {
  id: ID
  product: Product
  variant?: ProductVariant
  quantity: number
  price: number
  subtotal: number
}

export interface CartTotals {
  subtotal: number
  discount: number
  shipping: number
  tax: number
  total: number
}

export interface CartDiscount {
  type: 'coupon' | 'promotion' | 'loyalty'
  code?: string
  title: string
  amount: number
  percentage?: number
}

// Order types
export interface Order extends BaseEntity {
  number: string
  status: OrderStatus
  paymentStatus: PaymentStatus
  customer: User
  items: OrderItem[]
  totals: OrderTotals
  shippingAddress: Address
  billingAddress: Address
  shipping: ShippingMethod
  payment: PaymentMethod
  notes?: string
  trackingNumber?: string
  timeline: OrderEvent[]
}

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded'

export type PaymentStatus = 
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'cancelled'
  | 'refunded'

export interface OrderItem {
  id: ID
  product: Product
  variant?: ProductVariant
  quantity: number
  price: number
  subtotal: number
}

export interface OrderTotals extends CartTotals {
  refunded?: number
}

export interface OrderEvent {
  type: 'created' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
  title: string
  description?: string
  timestamp: string
}

// Shipping types
export interface ShippingMethod {
  id: ID
  name: string
  description?: string
  price: number
  estimatedDays: number
  carrier?: string
}

// Payment types
export interface PaymentMethod {
  id: ID
  type: 'credit_card' | 'debit_card' | 'paypal' | 'apple_pay' | 'google_pay'
  title: string
  lastFour?: string
  expiryMonth?: number
  expiryYear?: number
  brand?: string // visa, mastercard, etc.
  isDefault: boolean
}

// Review types
export interface Review extends BaseEntity {
  product: Product
  customer: User
  rating: number
  title: string
  content: string
  images?: string[]
  isVerified: boolean
  isHelpful: number
  replies: ReviewReply[]
}

export interface ReviewReply extends BaseEntity {
  review: Review
  author: User
  content: string
}

// Seller types
export interface Seller extends BaseEntity {
  user: User
  businessName: string
  businessType: string
  description?: string
  logo?: string
  banner?: string
  address: Address
  contact: {
    email: string
    phone: string
    website?: string
  }
  verification: {
    isVerified: boolean
    documents: VerificationDocument[]
  }
  stats: SellerStats
  settings: SellerSettings
}

export interface VerificationDocument {
  type: 'business_license' | 'tax_id' | 'bank_statement'
  url: string
  status: 'pending' | 'approved' | 'rejected'
  uploadedAt: string
}

export interface SellerStats {
  totalProducts: number
  totalOrders: number
  totalRevenue: number
  averageRating: number
  responseTime: number // in hours
}

export interface SellerSettings {
  autoAcceptOrders: boolean
  processingTime: number // in days
  returnPolicy: string
  shippingPolicy: string
}

// SEO types
export interface SEOData {
  title?: string
  description?: string
  keywords?: string[]
  ogImage?: string
  canonical?: string
}

// API types
export interface ApiResponse<T = any> {
  data: T
  message?: string
  success: boolean
}

export interface ApiError {
  message: string
  code?: string
  field?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

// Search types
export interface SearchFilters {
  query?: string
  category?: string
  brand?: string[]
  priceMin?: number
  priceMax?: number
  rating?: number
  inStock?: boolean
  sortBy?: 'relevance' | 'price_low_high' | 'price_high_low' | 'rating' | 'newest'
  page?: number
  limit?: number
}

export interface SearchResult {
  products: Product[]
  facets: SearchFacet[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
  query: string
  suggestions?: string[]
}

export interface SearchFacet {
  name: string
  type: 'checkbox' | 'range' | 'rating'
  options: FacetOption[]
}

// Form types
export interface LoginForm {
  email: string
  password: string
  rememberMe?: boolean
}

export interface RegisterForm {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  phone?: string
  acceptTerms: boolean
  marketingEmails?: boolean
}

export interface CheckoutForm {
  shippingAddress: Omit<Address, 'id' | 'createdAt' | 'updatedAt'>
  billingAddress?: Omit<Address, 'id' | 'createdAt' | 'updatedAt'>
  shippingMethod: string
  paymentMethod: string
  saveAddress?: boolean
  savePaymentMethod?: boolean
  notes?: string
}

// UI State types
export interface UIState {
  isSidebarOpen: boolean
  isCartDrawerOpen: boolean
  isSearchOpen: boolean
  currentModal?: string
  notifications: Notification[]
  loading: Record<string, boolean>
}

export interface Notification {
  id: ID
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message?: string
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

// Component props types
export interface ComponentProps {
  className?: string
  children?: React.ReactNode
}

export interface ButtonProps extends ComponentProps {
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
}

export interface InputProps extends ComponentProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel'
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  error?: string
  disabled?: boolean
  required?: boolean
}

// Utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
export type RequiredBy<T, K extends keyof T> = T & Required<Pick<T, K>>
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}