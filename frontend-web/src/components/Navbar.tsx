import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/features/auth/AuthProvider'

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout, isSeller, isAdmin } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#667eea' }}>
      <div className="container">
        <Link className="navbar-brand" to="/">
          <i className="fas fa-shopping-bag me-2"></i>Shopease
        </Link>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products">Products</Link>
            </li>
          </ul>
          
          <ul className="navbar-nav">
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/cart">
                    <i className="fas fa-shopping-cart me-1"></i>Cart
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                    <i className="fas fa-user"></i> {user?.full_name}
                  </a>
                  <ul className="dropdown-menu">
                    {/* Customer menu items */}
                    <li><Link className="dropdown-item" to="/profile"><i className="fas fa-user-circle me-2"></i>Profile</Link></li>
                    <li><Link className="dropdown-item" to="/orders"><i className="fas fa-shopping-bag me-2"></i>My Orders</Link></li>
                    
                    {/* Seller menu items */}
                    {isSeller && (
                      <>
                        <li><hr className="dropdown-divider" /></li>
                        <li><Link className="dropdown-item" to="/seller/dashboard"><i className="fas fa-chart-pie me-2"></i>Seller Dashboard</Link></li>
                        <li><Link className="dropdown-item" to="/seller/products"><i className="fas fa-box me-2"></i>My Products</Link></li>
                        <li><Link className="dropdown-item" to="/seller/orders"><i className="fas fa-shopping-cart me-2"></i>Manage Orders</Link></li>
                        <li><Link className="dropdown-item" to="/seller/profile"><i className="fas fa-store me-2"></i>Store Profile</Link></li>
                      </>
                    )}
                    
                    {/* Admin menu items */}
                    {isAdmin && (
                      <>
                        <li><hr className="dropdown-divider" /></li>
                        <li><Link className="dropdown-item" to="/admin/dashboard"><i className="fas fa-tachometer-alt me-2"></i>Admin Dashboard</Link></li>
                      </>
                    )}
                    
                    <li><hr className="dropdown-divider" /></li>
                    <li><button className="dropdown-item" onClick={handleLogout}><i className="fas fa-sign-out-alt me-2"></i>Logout</button></li>
                  </ul>
                </li>
              </>
            ) : (
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                  <i className="fas fa-sign-in-alt me-1"></i>Login / Register
                </a>
                <ul className="dropdown-menu">
                  <li><h6 className="dropdown-header">Customer</h6></li>
                  <li><Link className="dropdown-item" to="/customer/login"><i className="fas fa-sign-in-alt me-2"></i>Customer Login</Link></li>
                  <li><Link className="dropdown-item" to="/customer/register"><i className="fas fa-user-plus me-2"></i>Customer Register</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><h6 className="dropdown-header">Seller</h6></li>
                  <li><Link className="dropdown-item" to="/seller/login"><i className="fas fa-store me-2"></i>Seller Login</Link></li>
                  <li><Link className="dropdown-item" to="/seller/register"><i className="fas fa-store me-2"></i>Become a Seller</Link></li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar