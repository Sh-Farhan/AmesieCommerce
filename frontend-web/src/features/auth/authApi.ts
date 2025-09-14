import api from '@/utils/axios'
import { LoginRequest, LoginResponse, User } from '@/types'

export const authApi = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const formData = new FormData()
    formData.append('username', credentials.username)
    formData.append('password', credentials.password)
    
    const response = await api.post<LoginResponse>('/api/auth/login', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    return response.data
  },

  getProfile: async (): Promise<User> => {
    const response = await api.get<User>('/api/auth/me')
    return response.data
  },

  logout: async (): Promise<void> => {
    // Clear local storage
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    
    // Optional: Call logout endpoint if available
    try {
      await api.post('/api/auth/logout')
    } catch (error) {
      // Ignore logout errors
      console.warn('Logout error:', error)
    }
  },
}