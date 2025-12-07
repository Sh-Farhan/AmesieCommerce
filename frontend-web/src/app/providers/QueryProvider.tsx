/**
 * React Query Provider
 * Configures React Query for server state management with optimistic updates
 * and intelligent caching strategies for e-commerce data
 */

import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// TODO: Add React Query DevTools when upgrading to v5

// Create a client with optimized settings for e-commerce
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Stale time - how long data is considered fresh
      staleTime: 5 * 60 * 1000, // 5 minutes for most data
      
      // Cache time - how long inactive data stays in cache
      cacheTime: 10 * 60 * 1000, // 10 minutes
      
      // Retry configuration
      retry: (failureCount, error: any) => {
        // Don't retry on 404s or auth errors
        if (error?.status === 404 || error?.status === 401 || error?.status === 403) {
          return false
        }
        // Retry up to 3 times for other errors
        return failureCount < 3
      },
      
      // Retry delay with exponential backoff
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      
      // Refetch on window focus for critical data
      refetchOnWindowFocus: true,
      
      // Refetch on reconnect
      refetchOnReconnect: true,
      
      // Don't refetch on mount if data is fresh
      refetchOnMount: true,
    },
    mutations: {
      // Retry mutations once on network errors
      retry: (failureCount, error: any) => {
        if (error?.status >= 400 && error?.status < 500) {
          return false // Don't retry client errors
        }
        return failureCount < 1 // Retry server errors once
      },
      
      // Show error notifications for failed mutations
      onError: (error: any) => {
        console.error('Mutation error:', error)
        // Here you can add global error handling, like showing toast notifications
      },
    },
  },
})

// Query key factories for consistent cache keys
export const queryKeys = {
  // Products
  products: {
    all: ['products'] as const,
    lists: () => [...queryKeys.products.all, 'list'] as const,
    list: (filters: Record<string, any>) => 
      [...queryKeys.products.lists(), filters] as const,
    details: () => [...queryKeys.products.all, 'detail'] as const,
    detail: (slug: string) => [...queryKeys.products.details(), slug] as const,
    search: (query: string, filters: Record<string, any>) => 
      [...queryKeys.products.all, 'search', query, filters] as const,
    reviews: (productId: string) => 
      [...queryKeys.products.all, productId, 'reviews'] as const,
    recommendations: (productId: string) => 
      [...queryKeys.products.all, productId, 'recommendations'] as const,
  },
  
  // Categories
  categories: {
    all: ['categories'] as const,
    lists: () => [...queryKeys.categories.all, 'list'] as const,
    list: (filters?: Record<string, any>) => 
      [...queryKeys.categories.lists(), filters] as const,
    details: () => [...queryKeys.categories.all, 'detail'] as const,
    detail: (slug: string) => [...queryKeys.categories.details(), slug] as const,
    tree: () => [...queryKeys.categories.all, 'tree'] as const,
  },
  
  // Cart
  cart: {
    all: ['cart'] as const,
    current: () => [...queryKeys.cart.all, 'current'] as const,
  },
  
  // Orders
  orders: {
    all: ['orders'] as const,
    lists: () => [...queryKeys.orders.all, 'list'] as const,
    list: (filters?: Record<string, any>) => 
      [...queryKeys.orders.lists(), filters] as const,
    details: () => [...queryKeys.orders.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.orders.details(), id] as const,
  },
  
  // User
  user: {
    all: ['user'] as const,
    profile: () => [...queryKeys.user.all, 'profile'] as const,
    addresses: () => [...queryKeys.user.all, 'addresses'] as const,
    wishlist: () => [...queryKeys.user.all, 'wishlist'] as const,
    paymentMethods: () => [...queryKeys.user.all, 'payment-methods'] as const,
  },
  
  // Seller
  seller: {
    all: ['seller'] as const,
    dashboard: () => [...queryKeys.seller.all, 'dashboard'] as const,
    products: (filters?: Record<string, any>) => 
      [...queryKeys.seller.all, 'products', filters] as const,
    orders: (filters?: Record<string, any>) => 
      [...queryKeys.seller.all, 'orders', filters] as const,
    analytics: (period: string) => 
      [...queryKeys.seller.all, 'analytics', period] as const,
  },
}

// Prefetch strategies for common user flows
export const prefetchStrategies = {
  // Prefetch product details when hovering over product cards
  prefetchProductDetails: (slug: string) => {
    queryClient.prefetchQuery({
      queryKey: queryKeys.products.detail(slug),
      queryFn: () => {
        // This will be replaced with actual API call
        return fetch(`/api/products/${slug}`).then(res => res.json())
      },
      staleTime: 2 * 60 * 1000, // 2 minutes
    })
  },
  
  // Prefetch next page of products
  prefetchNextProductPage: (currentFilters: Record<string, any>, currentPage: number) => {
    const nextPageFilters = { ...currentFilters, page: (currentPage + 1).toString() }
    queryClient.prefetchQuery({
      queryKey: queryKeys.products.list(nextPageFilters),
      queryFn: () => {
        const params = new URLSearchParams(nextPageFilters)
        return fetch(`/api/products?${params}`).then(res => res.json())
      },
      staleTime: 5 * 60 * 1000,
    })
  },
  
  // Prefetch user data after login
  prefetchUserData: () => {
    // Prefetch profile
    queryClient.prefetchQuery({
      queryKey: queryKeys.user.profile(),
      queryFn: () => fetch('/api/user/profile').then(res => res.json()),
    })
    
    // Prefetch cart
    queryClient.prefetchQuery({
      queryKey: queryKeys.cart.current(),
      queryFn: () => fetch('/api/cart').then(res => res.json()),
    })
    
    // Prefetch wishlist
    queryClient.prefetchQuery({
      queryKey: queryKeys.user.wishlist(),
      queryFn: () => fetch('/api/user/wishlist').then(res => res.json()),
    })
  },
}

interface QueryProviderProps {
  children: React.ReactNode
}

/**
 * Query Provider component that wraps the app with React Query
 * 
 * @example
 * <QueryProvider>
 *   <App />
 * </QueryProvider>
 */
export function QueryProvider({ children }: QueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* TODO: Add React Query DevTools when upgrading to v5 */}
    </QueryClientProvider>
  )
}

export { queryClient }