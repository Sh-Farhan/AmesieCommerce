import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '@/utils/axios'

interface RegisterData {
  full_name: string
  email: string
  phone_number: string
  password: string
  confirmPassword: string
}

const CustomerRegisterPage: React.FC = () => {
  const [formData, setFormData] = useState<RegisterData>({
    full_name: '',
    email: '',
    phone_number: '',
    password: '',
    confirmPassword: ''
  })
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }

    if (!agreeTerms) {
      setError('You must agree to the Terms & Conditions')
      setIsLoading(false)
      return
    }

    try {
      const { confirmPassword, ...userData } = formData
      await api.post('/api/auth/register', userData)
      
      setSuccess('Account created successfully! You can now sign in.')
      setTimeout(() => {
        navigate('/customer/login')
      }, 2000)
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Registration failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow">
              <div className="card-body">
                <div className="text-center mb-4">
                  <i className="fas fa-user-plus text-primary" style={{ fontSize: '3rem' }}></i>
                  <h2 className="mt-3">Create Customer Account</h2>
                  <p className="text-muted">Join Shopease to start shopping!</p>
                </div>

                {error && (
                  <div className="alert alert-danger" role="alert">
                    <i className="fas fa-exclamation-circle me-2"></i>
                    {error}
                  </div>
                )}

                {success && (
                  <div className="alert alert-success" role="alert">
                    <i className="fas fa-check-circle me-2"></i>
                    {success}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="full_name" className="form-label">
                      <i className="fas fa-user me-2"></i>Full Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="full_name"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleInputChange}
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      <i className="fas fa-envelope me-2"></i>Email Address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="phone_number" className="form-label">
                      <i className="fas fa-phone me-2"></i>Phone Number
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      id="phone_number"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleInputChange}
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
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      minLength={6}
                      disabled={isLoading}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">
                      <i className="fas fa-lock me-2"></i>Confirm Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="agreeTerms"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      required
                      disabled={isLoading}
                    />
                    <label className="form-check-label" htmlFor="agreeTerms">
                      I agree to the <Link to="#" className="text-primary">Terms & Conditions</Link>
                    </label>
                  </div>

                  <div className="d-grid">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                          Creating Account...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-user-plus me-2"></i>Create Account
                        </>
                      )}
                    </button>
                  </div>
                </form>

                <div className="text-center mt-4">
                  <p className="mb-2">Already have an account? <Link to="/customer/login" className="text-primary">Sign In</Link></p>
                  <div className="d-flex justify-content-center gap-3">
                    <Link to="/seller/register" className="text-muted small">Become a Seller</Link>
                    <span className="text-muted">|</span>
                    <Link to="/admin/register" className="text-muted small">Admin Access</Link>
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

export default CustomerRegisterPage