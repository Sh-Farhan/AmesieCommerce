import axios from 'axios'

// Use empty baseURL in development (relies on Vite proxy)
// Require explicit VITE_API_BASE_URL for production builds
const API_BASE_URL = import.meta.env.PROD 
  ? import.meta.env.VITE_API_BASE_URL || (() => {
      throw new Error('VITE_API_BASE_URL is required for production builds')
    })()
  : '' // Use proxy in development

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid, redirect to login
      localStorage.removeItem('authToken')
      localStorage.removeItem('user')
      // Use router navigation instead of window.location for better SPA UX
      // Note: This will be improved when we migrate to httpOnly cookies
      if (typeof window !== 'undefined') {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export default api