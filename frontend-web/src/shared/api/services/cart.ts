/**
 * Cart API Service
 */

import { apiClient } from '../client'
import type { CartItem, CartItemCreate, WishlistItem } from '../types'

export const cartService = {
  /**
   * Get user's cart items
   */
  async getCartItems(): Promise<CartItem[]> {
    return apiClient.get<CartItem[]>('/cart')
  },

  /**
   * Add item to cart
   */
  async addToCart(item: CartItemCreate): Promise<CartItem> {
    return apiClient.post<CartItem>('/cart/add', item)
  },

  /**
   * Update cart item quantity
   */
  async updateCartItem(itemId: number, quantity: number): Promise<CartItem> {
    return apiClient.put<CartItem>(`/cart/${itemId}`, { quantity })
  },

  /**
   * Remove item from cart
   */
  async removeFromCart(itemId: number): Promise<{ message: string }> {
    return apiClient.delete<{ message: string }>(`/cart/${itemId}`)
  },

  /**
   * Clear entire cart
   */
  async clearCart(): Promise<{ message: string }> {
    return apiClient.delete<{ message: string }>('/cart/clear')
  },

  /**
   * Get cart total
   */
  async getCartTotal(): Promise<{ total: number; items_count: number }> {
    return apiClient.get<{ total: number; items_count: number }>('/cart/total')
  },

  /**
   * Get user's wishlist items
   */
  async getWishlistItems(): Promise<WishlistItem[]> {
    return apiClient.get<WishlistItem[]>('/cart/wishlist')
  },

  /**
   * Add item to wishlist
   */
  async addToWishlist(productId: number): Promise<WishlistItem> {
    return apiClient.post<WishlistItem>('/cart/wishlist/add', { product_id: productId })
  },

  /**
   * Remove item from wishlist
   */
  async removeFromWishlist(itemId: number): Promise<{ message: string }> {
    return apiClient.delete<{ message: string }>(`/cart/wishlist/${itemId}`)
  },
}