/**
 * Authentication API Service
 */

import { apiClient } from '../client'
import type { User, UserCreate, Token, LoginCredentials, SellerRegistration } from '../types'

export const authService = {
  /**
   * Customer Registration
   */
  async registerCustomer(userData: UserCreate): Promise<User> {
    return apiClient.post<User>('/auth/register', userData)
  },

  /**
   * Seller Registration (uses FormData as per backend)
   */
  async registerSeller(sellerData: SellerRegistration): Promise<{ message: string; user_id: number }> {
    const formData = new FormData()
    formData.append('full_name', sellerData.full_name)
    formData.append('email', sellerData.email)
    formData.append('phone_number', sellerData.phone_number)
    formData.append('password', sellerData.password)
    formData.append('store_name', sellerData.store_name)
    formData.append('store_address', sellerData.store_address)
    
    if (sellerData.store_description) {
      formData.append('store_description', sellerData.store_description)
    }
    if (sellerData.business_license) {
      formData.append('business_license', sellerData.business_license)
    }
    if (sellerData.gst_number) {
      formData.append('gst_number', sellerData.gst_number)
    }
    if (sellerData.bank_account_number) {
      formData.append('bank_account_number', sellerData.bank_account_number)
    }
    if (sellerData.bank_ifsc_code) {
      formData.append('bank_ifsc_code', sellerData.bank_ifsc_code)
    }

    return apiClient.requestForm<{ message: string; user_id: number }>('/auth/register/seller', formData)
  },

  /**
   * Login (uses OAuth2PasswordRequestForm format)
   */
  async login(credentials: LoginCredentials): Promise<Token> {
    const formData = new FormData()
    formData.append('username', credentials.username)
    formData.append('password', credentials.password)

    return apiClient.requestForm<Token>('/auth/login', formData)
  },

  /**
   * Get Current User Profile
   */
  async getCurrentUser(): Promise<User> {
    return apiClient.get<User>('/auth/me')
  },

  /**
   * Logout (client-side only - clear tokens)
   */
  logout(): void {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user')
  },
}