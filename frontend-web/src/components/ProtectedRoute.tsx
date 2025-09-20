import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useIsAuthenticated } from '@/shared/hooks/useAuth'

interface ProtectedRouteProps {
  children: React.ReactNode
  requireRole?: 'CUSTOMER' | 'SELLER' | 'ADMIN'
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requireRole }) => {
  const { isAuthenticated, user, isLoading } = useIsAuthenticated()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="flex justify-center items-center" style={{ height: '50vh' }}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    // Redirect to appropriate login page based on the required role
    const loginPath = requireRole === 'SELLER' ? '/seller/login' : '/customer/login'
    return <Navigate to={loginPath} state={{ from: location }} replace />
  }

  if (requireRole && user?.role !== requireRole) {
    // User doesn't have the required role
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

export default ProtectedRoute