import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/features/auth/AuthProvider'

interface ProtectedRouteProps {
  children: React.ReactNode
  requireRole?: 'CUSTOMER' | 'SELLER' | 'ADMIN'
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requireRole }) => {
  const { isAuthenticated, user, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    // Redirect to login page with return url
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (requireRole && user?.role !== requireRole) {
    // User doesn't have the required role
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

export default ProtectedRoute