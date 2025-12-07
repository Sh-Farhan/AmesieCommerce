/**
 * Sellers API Service
 */

import { apiClient } from '../client'
import type { Seller, Product, ProductCreate, Order } from '../types'

export const sellersService = {
  /**
   * Get seller profile
   */
  async getProfile(): Promise<Seller> {
    return apiClient.get<Seller>('/sellers/profile')
  },

  /**
   * Update seller profile
   */
  async updateProfile(sellerData: Partial<Seller>): Promise<Seller> {
    return apiClient.put<Seller>('/sellers/profile', sellerData)
  },

  /**
   * Get seller products
   */
  async getProducts(): Promise<Product[]> {
    return apiClient.get<Product[]>('/sellers/products')
  },

  /**
   * Create new product
   */
  async createProduct(productData: ProductCreate): Promise<Product> {
    return apiClient.post<Product>('/sellers/products', productData)
  },

  /**
   * Update product
   */
  async updateProduct(productId: number, productData: Partial<ProductCreate>): Promise<Product> {
    return apiClient.put<Product>(`/sellers/products/${productId}`, productData)
  },

  /**
   * Delete product
   */
  async deleteProduct(productId: number): Promise<{ message: string }> {
    return apiClient.delete<{ message: string }>(`/sellers/products/${productId}`)
  },

  /**
   * Get seller orders
   */
  async getOrders(): Promise<Order[]> {
    return apiClient.get<Order[]>('/sellers/orders')
  },

  /**
   * Update order status
   */
  async updateOrderStatus(orderId: number, status: string): Promise<{ message: string }> {
    return apiClient.put<{ message: string }>(`/sellers/orders/${orderId}/status`, { status })
  },

  /**
   * Get seller dashboard stats
   */
  async getDashboardStats(): Promise<{
    total_products: number
    total_orders: number
    total_revenue: number
    pending_orders: number
  }> {
    return apiClient.get('/sellers/dashboard')
  },

  /**
   * Upload product image
   */
  async uploadImage(file: File): Promise<{ image_url: string; message: string }> {
    const formData = new FormData()
    formData.append('file', file)
    return apiClient.requestForm('/sellers/upload-image', formData)
  },
}