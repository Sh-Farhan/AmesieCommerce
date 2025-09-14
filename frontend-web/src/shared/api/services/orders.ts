/**
 * Orders API Service
 */

import { apiClient } from '../client'
import type { Order, OrderCreate } from '../types'

export const ordersService = {
  /**
   * Create new order from cart
   */
  async createOrder(orderData: OrderCreate): Promise<Order> {
    return apiClient.post<Order>('/orders/create', orderData)
  },

  /**
   * Get user's orders
   */
  async getOrders(): Promise<Order[]> {
    return apiClient.get<Order[]>('/orders')
  },

  /**
   * Get specific order by ID
   */
  async getOrder(orderId: number): Promise<Order> {
    return apiClient.get<Order>(`/orders/${orderId}`)
  },

  /**
   * Cancel order
   */
  async cancelOrder(orderId: number): Promise<{ message: string }> {
    return apiClient.post<{ message: string }>(`/orders/${orderId}/cancel`)
  },

  /**
   * Get order tracking information
   */
  async getOrderTracking(orderId: number): Promise<{
    order_id: number
    status: string
    tracking_number?: string
    estimated_delivery?: string
  }> {
    return apiClient.get(`/orders/${orderId}/tracking`)
  },

  /**
   * Create Razorpay payment order
   */
  async createPaymentOrder(orderId: number): Promise<{
    razorpay_order_id: string
    amount: number
    currency: string
  }> {
    return apiClient.post(`/orders/${orderId}/payment/create`)
  },

  /**
   * Verify Razorpay payment
   */
  async verifyPayment(paymentData: {
    razorpay_order_id: string
    razorpay_payment_id: string
    razorpay_signature: string
    order_id: number
  }): Promise<{ message: string; order_status: string }> {
    return apiClient.post('/orders/payment/verify', paymentData)
  },
}