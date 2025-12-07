/**
 * Products API Service
 */

import { apiClient } from '../client'
import type { Product, Category, Review, ReviewCreate } from '../types'

export const productsService = {
  /**
   * Get all categories
   */
  async getCategories(): Promise<Category[]> {
    return apiClient.get<Category[]>('/products/categories')
  },

  /**
   * Get all products with optional filters
   */
  async getProducts(params?: {
    category_id?: number
    search?: string
    min_price?: number
    max_price?: number
    limit?: number
    skip?: number
  }): Promise<Product[]> {
    const searchParams = new URLSearchParams()
    
    if (params?.category_id) searchParams.append('category_id', params.category_id.toString())
    if (params?.search) searchParams.append('search', params.search)
    if (params?.min_price) searchParams.append('min_price', params.min_price.toString())
    if (params?.max_price) searchParams.append('max_price', params.max_price.toString())
    if (params?.limit) searchParams.append('limit', params.limit.toString())
    if (params?.skip) searchParams.append('skip', params.skip.toString())

    const query = searchParams.toString()
    const endpoint = query ? `/products?${query}` : '/products'
    
    return apiClient.get<Product[]>(endpoint)
  },

  /**
   * Get single product by ID
   */
  async getProduct(productId: number): Promise<Product> {
    return apiClient.get<Product>(`/products/${productId}`)
  },

  /**
   * Search products
   */
  async searchProducts(query: string, filters?: {
    category_id?: number
    min_price?: number
    max_price?: number
  }): Promise<Product[]> {
    return this.getProducts({
      search: query,
      ...filters,
    })
  },

  /**
   * Get products by category
   */
  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    return this.getProducts({ category_id: categoryId })
  },

  /**
   * Get product reviews
   */
  async getProductReviews(productId: number): Promise<Review[]> {
    return apiClient.get<Review[]>(`/products/${productId}/reviews`)
  },

  /**
   * Create product review (authenticated)
   */
  async createReview(reviewData: ReviewCreate): Promise<Review> {
    return apiClient.post<Review>('/products/reviews', reviewData)
  },
}