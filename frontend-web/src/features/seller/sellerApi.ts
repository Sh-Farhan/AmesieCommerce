import api from '@/utils/axios'
import { Seller, DashboardStats, Product, ProductCreate, Order, ImageUploadResponse } from '@/types'

export const sellerApi = {
  // Profile
  getProfile: async (): Promise<Seller> => {
    const response = await api.get<Seller>('/api/sellers/profile')
    return response.data
  },

  updateProfile: async (data: Partial<Seller>): Promise<Seller> => {
    const response = await api.put<Seller>('/api/sellers/profile', data)
    return response.data
  },

  // Dashboard Stats
  getDashboardStats: async (): Promise<DashboardStats> => {
    const response = await api.get<DashboardStats>('/api/sellers/dashboard-stats')
    return response.data
  },

  // Products
  getProducts: async (params?: { skip?: number; limit?: number }): Promise<Product[]> => {
    const response = await api.get<Product[]>('/api/sellers/products', { params })
    return response.data
  },

  createProduct: async (product: ProductCreate): Promise<Product> => {
    const response = await api.post<Product>('/api/sellers/products', product)
    return response.data
  },

  updateProduct: async (id: number, product: Partial<ProductCreate>): Promise<Product> => {
    const response = await api.put<Product>(`/api/sellers/products/${id}`, product)
    return response.data
  },

  deleteProduct: async (id: number): Promise<void> => {
    await api.delete(`/api/sellers/products/${id}`)
  },

  // Image Upload
  uploadProductImage: async (file: File): Promise<ImageUploadResponse> => {
    const formData = new FormData()
    formData.append('file', file)
    
    const response = await api.post<ImageUploadResponse>('/api/sellers/upload-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  // Orders
  getOrders: async (): Promise<Order[]> => {
    const response = await api.get<Order[]>('/api/sellers/orders')
    return response.data
  },

  updateOrderStatus: async (orderId: number, status: string): Promise<Order> => {
    const response = await api.put<Order>(`/api/sellers/orders/${orderId}/status`, { status })
    return response.data
  },
}