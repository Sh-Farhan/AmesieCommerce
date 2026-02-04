/**
 * Users API Service
 */

import { apiClient } from '../client'
import type { User, Address, AddressCreate, Notification } from '../types'

export const usersService = {
  /**
   * Get user profile
   */
  async getProfile(): Promise<User> {
    return apiClient.get<User>('/users/profile')
  },

  /**
   * Update user profile
   */
  async updateProfile(userData: Partial<User>): Promise<User> {
    return apiClient.put<User>('/users/profile', userData)
  },

  /**
   * Get user addresses
   */
  async getAddresses(): Promise<Address[]> {
    return apiClient.get<Address[]>('/users/addresses')
  },

  /**
   * Create new address
   */
  async createAddress(addressData: AddressCreate): Promise<Address> {
    return apiClient.post<Address>('/users/addresses', addressData)
  },

  /**
   * Update address
   */
  async updateAddress(addressId: number, addressData: Partial<AddressCreate>): Promise<Address> {
    return apiClient.put<Address>(`/users/addresses/${addressId}`, addressData)
  },

  /**
   * Delete address
   */
  async deleteAddress(addressId: number): Promise<{ message: string }> {
    return apiClient.delete<{ message: string }>(`/users/addresses/${addressId}`)
  },

  /**
   * Set default address
   */
  async setDefaultAddress(addressId: number): Promise<{ message: string }> {
    return apiClient.post<{ message: string }>(`/users/addresses/${addressId}/set-default`)
  },

  /**
   * Get user notifications
   */
  async getNotifications(): Promise<Notification[]> {
    return apiClient.get<Notification[]>('/users/notifications')
  },

  /**
   * Mark notification as read
   */
  async markNotificationRead(notificationId: number): Promise<{ message: string }> {
    return apiClient.post<{ message: string }>(`/users/notifications/${notificationId}/read`)
  },

  /**
   * Mark all notifications as read
   */
  async markAllNotificationsRead(): Promise<{ message: string }> {
    return apiClient.post<{ message: string }>('/users/notifications/mark-all-read')
  },
}