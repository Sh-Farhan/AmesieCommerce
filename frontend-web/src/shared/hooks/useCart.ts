/**
 * Cart Management Hook with React Query
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { cartService } from '../api'
import type { CartItem, CartItemCreate, WishlistItem } from '../api/types'
import { useIsAuthenticated } from './useAuth'

// Query keys
export const cartKeys = {
  all: ['cart'] as const,
  items: () => [...cartKeys.all, 'items'] as const,
  total: () => [...cartKeys.all, 'total'] as const,
  wishlist: () => [...cartKeys.all, 'wishlist'] as const,
}

/**
 * Hook for cart items
 */
export const useCartItems = () => {
  const { isAuthenticated } = useIsAuthenticated()

  return useQuery({
    queryKey: cartKeys.items(),
    queryFn: cartService.getCartItems,
    enabled: isAuthenticated,
    staleTime: 1 * 60 * 1000, // 1 minute
  })
}

/**
 * Hook for cart total
 */
export const useCartTotal = () => {
  const { isAuthenticated } = useIsAuthenticated()

  return useQuery({
    queryKey: cartKeys.total(),
    queryFn: cartService.getCartTotal,
    enabled: isAuthenticated,
    staleTime: 1 * 60 * 1000, // 1 minute
  })
}

/**
 * Hook for adding to cart
 */
export const useAddToCart = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: cartService.addToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.items() })
      queryClient.invalidateQueries({ queryKey: cartKeys.total() })
    },
  })
}

/**
 * Hook for updating cart item
 */
export const useUpdateCartItem = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ itemId, quantity }: { itemId: number; quantity: number }) =>
      cartService.updateCartItem(itemId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.items() })
      queryClient.invalidateQueries({ queryKey: cartKeys.total() })
    },
  })
}

/**
 * Hook for removing from cart
 */
export const useRemoveFromCart = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: cartService.removeFromCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.items() })
      queryClient.invalidateQueries({ queryKey: cartKeys.total() })
    },
  })
}

/**
 * Hook for clearing cart
 */
export const useClearCart = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: cartService.clearCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.items() })
      queryClient.invalidateQueries({ queryKey: cartKeys.total() })
    },
  })
}

/**
 * Hook for wishlist items
 */
export const useWishlistItems = () => {
  const { isAuthenticated } = useIsAuthenticated()

  return useQuery({
    queryKey: cartKeys.wishlist(),
    queryFn: cartService.getWishlistItems,
    enabled: isAuthenticated,
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

/**
 * Hook for adding to wishlist
 */
export const useAddToWishlist = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: cartService.addToWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.wishlist() })
    },
  })
}

/**
 * Hook for removing from wishlist
 */
export const useRemoveFromWishlist = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: cartService.removeFromWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.wishlist() })
    },
  })
}