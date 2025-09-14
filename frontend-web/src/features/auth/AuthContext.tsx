import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { User, LoginRequest } from '@/types'
import { authApi } from './authApi'

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (credentials: LoginRequest) => Promise<void>
  logout: () => void
  isSeller: boolean
  isAdmin: boolean
  isCustomer: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const queryClient = useQueryClient()

  // Check if there's a stored token
  const hasToken = !!localStorage.getItem('authToken')

  // Fetch user profile if token exists
  const { isLoading } = useQuery({
    queryKey: ['auth', 'profile'],
    queryFn: authApi.getProfile,
    enabled: hasToken,
    onSuccess: (userData) => {
      setUser(userData)
      localStorage.setItem('user', JSON.stringify(userData))
    },
    onError: () => {
      // Token is invalid, clear storage
      localStorage.removeItem('authToken')
      localStorage.removeItem('user')
      setUser(null)
    },
    retry: false,
  })

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (response) => {
      localStorage.setItem('authToken', response.access_token)
      // Refetch user profile after successful login
      queryClient.invalidateQueries(['auth', 'profile'])
    },
  })

  const login = async (credentials: LoginRequest) => {
    await loginMutation.mutateAsync(credentials)
  }

  const logout = () => {
    authApi.logout()
    setUser(null)
    queryClient.clear()
  }

  // Load user from localStorage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser && !user) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        localStorage.removeItem('user')
      }
    }
  }, [user])

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading: isLoading && hasToken,
    login,
    logout,
    isSeller: user?.role === 'SELLER',
    isAdmin: user?.role === 'ADMIN',
    isCustomer: user?.role === 'CUSTOMER',
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}