import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '@/features/auth/AuthProvider'

const SellerSidebar: React.FC = () => {
  const { user } = useAuth()
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  return (
    <div>
      <div className="card">
        <div className="card-body text-center">
          <div className="mb-3">
            <i className="fas fa-store" style={{ fontSize: '4rem', color: '#667eea' }}></i>
          </div>
          <h5 id="store-name">{user?.full_name}'s Store</h5>
          <p className="text-muted" id="seller-email">{user?.email}</p>
          <div className="d-flex justify-content-center align-items-center mb-2">
            <span className="text-warning me-2">★★★★☆</span>
            <span id="store-rating">4.5</span>
          </div>
        </div>
      </div>
      
      <div className="list-group mt-4">
        <Link 
          to="/seller/dashboard" 
          className={`list-group-item list-group-item-action ${isActive('/seller/dashboard') ? 'active' : ''}`}
        >
          <i className="fas fa-chart-pie me-2"></i>Dashboard
        </Link>
        <Link 
          to="/seller/products" 
          className={`list-group-item list-group-item-action ${isActive('/seller/products') ? 'active' : ''}`}
        >
          <i className="fas fa-box me-2"></i>My Products
        </Link>
        <Link 
          to="/seller/orders" 
          className={`list-group-item list-group-item-action ${isActive('/seller/orders') ? 'active' : ''}`}
        >
          <i className="fas fa-shopping-bag me-2"></i>Orders
        </Link>
        <Link 
          to="/seller/profile" 
          className={`list-group-item list-group-item-action ${isActive('/seller/profile') ? 'active' : ''}`}
        >
          <i className="fas fa-user me-2"></i>Store Profile
        </Link>
        <Link 
          to="/" 
          className="list-group-item list-group-item-action"
        >
          <i className="fas fa-home me-2"></i>Back to Store
        </Link>
      </div>
    </div>
  )
}

export default SellerSidebar