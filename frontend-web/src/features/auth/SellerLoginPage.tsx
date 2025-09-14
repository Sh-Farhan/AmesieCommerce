import React, { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useAuth } from './AuthProvider'

const SellerLoginPage: React.FC = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '', rememberMe: false })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  
  const from = (location.state as any)?.from?.pathname || '/seller/dashboard'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      await login({ username: credentials.email, password: credentials.password })
      navigate(from, { replace: true })
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Seller login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="card shadow">
              <div className="card-body">
                <div className="text-center mb-4">
                  <i className="fas fa-store text-success" style={{ fontSize: '3rem' }}></i>
                  <h2 className="mt-3">Seller Login</h2>
                  <p className="text-muted">Access your seller dashboard</p>
                </div>

                {error && (
                  <div className="alert alert-danger" role="alert">
                    <i className="fas fa-exclamation-circle me-2"></i>
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      <i className="fas fa-envelope me-2"></i>Email Address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={credentials.email}
                      onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      <i className="fas fa-lock me-2"></i>Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={credentials.password}
                      onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="rememberMe"
                      checked={credentials.rememberMe}
                      onChange={(e) => setCredentials({ ...credentials, rememberMe: e.target.checked })}
                    />
                    <label className="form-check-label" htmlFor="rememberMe">
                      Remember me
                    </label>
                  </div>

                  <div className="d-grid">
                    <button
                      type="submit"
                      className="btn btn-success btn-lg"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                          Accessing...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-sign-in-alt me-2"></i>Access Dashboard
                        </>
                      )}
                    </button>
                  </div>
                </form>

                <div className="text-center mt-4">
                  <p className="mb-2">Don't have a seller account? <Link to="/seller/register" className="text-primary">Become a Seller</Link></p>
                  <div className="d-flex justify-content-center gap-3">
                    <Link to="/customer/login" className="text-muted small">Customer Login</Link>
                    <span className="text-muted">|</span>
                    <Link to="/admin/login" className="text-muted small">Admin Login</Link>
                  </div>
                  <div className="mt-3">
                    <small className="text-muted">
                      Test Seller: testuser@seller.com / test123
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SellerLoginPage