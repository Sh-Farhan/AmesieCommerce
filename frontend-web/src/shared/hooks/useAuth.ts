/**
 * Authentication Hook with React Query
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { authService, setAuthToken, clearAuthToken, getAuthToken } from '../api'
import type { User, LoginCredentials, UserCreate, SellerRegistration } from '../api/types'

// Query keys
export const authKeys = {
  all: ['auth'] as const,
  user: () => [...authKeys.all, 'user'] as const,
}

/**
 * Hook for current user data
 */
export const useUser = () => {
  return useQuery({
    queryKey: authKeys.user(),
    queryFn: authService.getCurrentUser,
    enabled: !!getAuthToken(),
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

/**
 * Hook for customer login
 */
export const useLogin = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const tokenResponse = await authService.login(credentials)
      setAuthToken(tokenResponse.access_token)
      return tokenResponse
    },
    onSuccess: () => {
      // Invalidate user query to refetch user data
      queryClient.invalidateQueries({ queryKey: authKeys.user() })
    },
    onError: () => {
      clearAuthToken()
    },
  })
}

/**
 * Hook for customer registration
 */
export const useRegisterCustomer = () => {
  return useMutation({
    mutationFn: authService.registerCustomer,
  })
}

/**
 * Hook for seller registration
 */
export const useRegisterSeller = () => {
  return useMutation({
    mutationFn: authService.registerSeller,
  })
}

/**
 * Hook for logout
 */
export const useLogout = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      authService.logout()
      clearAuthToken()
    },
    onSuccess: () => {
      // Clear all queries
      queryClient.clear()
    },
  })
}

/**
 * Check if user is authenticated
 */
export const useIsAuthenticated = () => {
  const token = getAuthToken()
  const { data: user, isLoading } = useUser()

  return {
    isAuthenticated: !!token && !!user,
    isLoading,
    user,
  }
}