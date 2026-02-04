/**
 * Zustand Store Configuration
 * Global state management for UI state, cart, and user preferences
 */

import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import type { Cart, User, Notification } from '../types'
import { STORAGE_KEYS } from '../config/constants'

// UI State slice
interface UIState {
  // Navigation & Modals
  isSidebarOpen: boolean
  isCartDrawerOpen: boolean
  isSearchOpen: boolean
  currentModal: string | null
  
  // Loading states
  loading: Record<string, boolean>
  
  // Notifications
  notifications: Notification[]
  
  // Theme
  theme: 'light' | 'dark' | 'auto'
  
  // Actions
  setSidebarOpen: (open: boolean) => void
  setCartDrawerOpen: (open: boolean) => void
  setSearchOpen: (open: boolean) => void
  setCurrentModal: (modal: string | null) => void
  setLoading: (key: string, loading: boolean) => void
  addNotification: (notification: Omit<Notification, 'id'>) => void
  removeNotification: (id: string) => void
  setTheme: (theme: 'light' | 'dark' | 'auto') => void
}

// Cart State slice
interface CartState {
  cart: Cart | null
  isLoading: boolean
  
  // Actions
  setCart: (cart: Cart | null) => void
  setCartLoading: (loading: boolean) => void
  clearCart: () => void
}

// Auth State slice
interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  
  // Actions
  setUser: (user: User | null) => void
  setAuthLoading: (loading: boolean) => void
  logout: () => void
}

// Search State slice
interface SearchState {
  recentSearches: string[]
  searchFilters: Record<string, any>
  
  // Actions
  addRecentSearch: (query: string) => void
  clearRecentSearches: () => void
  setSearchFilters: (filters: Record<string, any>) => void
  clearSearchFilters: () => void
}

// Combined store interface
interface AppStore extends UIState, CartState, AuthState, SearchState {}

/**
 * Main application store using Zustand
 * Combines multiple slices for different concerns
 */
export const useAppStore = create<AppStore>()(
  devtools(
    persist(
      immer((set) => ({
        // UI State
        isSidebarOpen: false,
        isCartDrawerOpen: false,
        isSearchOpen: false,
        currentModal: null,
        loading: {},
        notifications: [],
        theme: 'auto',
        
        setSidebarOpen: (open) =>
          set((state) => {
            state.isSidebarOpen = open
          }),
        
        setCartDrawerOpen: (open) =>
          set((state) => {
            state.isCartDrawerOpen = open
          }),
        
        setSearchOpen: (open) =>
          set((state) => {
            state.isSearchOpen = open
          }),
        
        setCurrentModal: (modal) =>
          set((state) => {
            state.currentModal = modal
          }),
        
        setLoading: (key, loading) =>
          set((state) => {
            state.loading[key] = loading
          }),
        
        addNotification: (notification) =>
          set((state) => {
            const id = Date.now().toString()
            state.notifications.push({ ...notification, id })
          }),
        
        removeNotification: (id) =>
          set((state) => {
            state.notifications = state.notifications.filter((n: Notification) => n.id !== id)
          }),
        
        setTheme: (theme) =>
          set((state) => {
            state.theme = theme
          }),

        // Cart State
        cart: null,
        isLoading: false,
        
        setCart: (cart) =>
          set((state) => {
            state.cart = cart
          }),
        
        setCartLoading: (loading) =>
          set((state) => {
            state.isLoading = loading
          }),
        
        clearCart: () =>
          set((state) => {
            state.cart = null
          }),

        // Auth State
        user: null,
        isAuthenticated: false,
        
        setUser: (user) =>
          set((state) => {
            state.user = user
            state.isAuthenticated = !!user
          }),
        
        setAuthLoading: (loading) =>
          set((state) => {
            state.isLoading = loading
          }),
        
        logout: () =>
          set((state) => {
            state.user = null
            state.isAuthenticated = false
            state.cart = null
            // Clear sensitive data from localStorage
            localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN)
            localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN)
          }),

        // Search State
        recentSearches: [],
        searchFilters: {},
        
        addRecentSearch: (query) =>
          set((state) => {
            const trimmedQuery = query.trim()
            if (trimmedQuery && !state.recentSearches.includes(trimmedQuery)) {
              state.recentSearches.unshift(trimmedQuery)
              // Keep only the 10 most recent searches
              state.recentSearches = state.recentSearches.slice(0, 10)
            }
          }),
        
        clearRecentSearches: () =>
          set((state) => {
            state.recentSearches = []
          }),
        
        setSearchFilters: (filters) =>
          set((state) => {
            state.searchFilters = filters
          }),
        
        clearSearchFilters: () =>
          set((state) => {
            state.searchFilters = {}
          }),
      })),
      {
        name: 'shopease-store',
        partialize: (state) => ({
          // Only persist specific parts of the state
          theme: state.theme,
          recentSearches: state.recentSearches,
          cart: state.cart,
          user: state.user,
          isAuthenticated: state.isAuthenticated,
        }),
        storage: {
          getItem: (name) => {
            const str = localStorage.getItem(name)
            if (!str) return null
            try {
              return JSON.parse(str)
            } catch {
              return null
            }
          },
          setItem: (name, value) => {
            localStorage.setItem(name, JSON.stringify(value))
          },
          removeItem: (name) => {
            localStorage.removeItem(name)
          },
        },
      }
    ),
    {
      name: 'shopease-store',
    }
  )
)

// Selector hooks for optimized subscriptions
export const useUI = () => useAppStore((state) => ({
  isSidebarOpen: state.isSidebarOpen,
  isCartDrawerOpen: state.isCartDrawerOpen,
  isSearchOpen: state.isSearchOpen,
  currentModal: state.currentModal,
  loading: state.loading,
  notifications: state.notifications,
  theme: state.theme,
  setSidebarOpen: state.setSidebarOpen,
  setCartDrawerOpen: state.setCartDrawerOpen,
  setSearchOpen: state.setSearchOpen,
  setCurrentModal: state.setCurrentModal,
  setLoading: state.setLoading,
  addNotification: state.addNotification,
  removeNotification: state.removeNotification,
  setTheme: state.setTheme,
}))

export const useCart = () => useAppStore((state) => ({
  cart: state.cart,
  isLoading: state.isLoading,
  setCart: state.setCart,
  setCartLoading: state.setCartLoading,
  clearCart: state.clearCart,
}))

export const useAuth = () => useAppStore((state) => ({
  user: state.user,
  isAuthenticated: state.isAuthenticated,
  isLoading: state.isLoading,
  setUser: state.setUser,
  setAuthLoading: state.setAuthLoading,
  logout: state.logout,
}))

export const useSearch = () => useAppStore((state) => ({
  recentSearches: state.recentSearches,
  searchFilters: state.searchFilters,
  addRecentSearch: state.addRecentSearch,
  clearRecentSearches: state.clearRecentSearches,
  setSearchFilters: state.setSearchFilters,
  clearSearchFilters: state.clearSearchFilters,
}))