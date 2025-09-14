import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '@/utils/axios'

interface SellerRegisterData {
  // Personal Information
  full_name: string
  email: string
  phone_number: string
  password: string
  confirmPassword: string
  
  // Store Information
  store_name: string
  store_description: string
  store_address: string
  business_license: string
  gst_number: string
  bank_account_number: string
  bank_ifsc_code: string
}

const SellerRegisterPage: React.FC = () => {
  const [formData, setFormData] = useState<SellerRegisterData>({
    full_name: '',
    email: '',
    phone_number: '',
    password: '',
    confirmPassword: '',
    store_name: '',
    store_description: '',
    store_address: '',
    business_license: '',
    gst_number: '',
    bank_account_number: '',
    bank_ifsc_code: ''
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
      const { confirmPassword, ...submissionData } = formData
      await api.post('/api/auth/register/seller', submissionData)
      
      setSuccess('Seller registration successful! Please login to continue.')
      setTimeout(() => {
        navigate('/seller/login')
      }, 2000)
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Registration failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow">
              <div className="card-body">
                <div className="text-center mb-4">
                  <i className="fas fa-store text-success" style={{ fontSize: '3rem' }}></i>
                  <h2 className="mt-3">Become a Seller</h2>
                  <p className="text-muted">Start your online business with Shopease</p>
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
                  <div className="row">
                    <div className="col-md-6">
                      <h5 className="mb-3"><i className="fas fa-user me-2"></i>Personal Information</h5>
                      
                      <div className="mb-3">
                        <label htmlFor="full_name" className="form-label">Full Name</label>
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
                        <label htmlFor="email" className="form-label">Email Address</label>
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
                        <label htmlFor="phone_number" className="form-label">Phone Number</label>
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
                        <label htmlFor="password" className="form-label">Password</label>
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
                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
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
                    </div>
                    
                    <div className="col-md-6">
                      <h5 className="mb-3"><i className="fas fa-store me-2"></i>Store Information</h5>
                      
                      <div className="mb-3">
                        <label htmlFor="store_name" className="form-label">Store Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="store_name"
                          name="store_name"
                          value={formData.store_name}
                          onChange={handleInputChange}
                          required
                          disabled={isLoading}
                        />
                      </div>
                      
                      <div className="mb-3">
                        <label htmlFor="store_description" className="form-label">Store Description</label>
                        <textarea
                          className="form-control"
                          id="store_description"
                          name="store_description"
                          rows={3}
                          value={formData.store_description}
                          onChange={handleInputChange}
                          disabled={isLoading}
                        />
                      </div>
                      
                      <div className="mb-3">
                        <label htmlFor="store_address" className="form-label">Store Address</label>
                        <textarea
                          className="form-control"
                          id="store_address"
                          name="store_address"
                          rows={2}
                          value={formData.store_address}
                          onChange={handleInputChange}
                          required
                          disabled={isLoading}
                        />
                      </div>
                      
                      <div className="mb-3">
                        <label htmlFor="business_license" className="form-label">Business License Number</label>
                        <input
                          type="text"
                          className="form-control"
                          id="business_license"
                          name="business_license"
                          value={formData.business_license}
                          onChange={handleInputChange}
                          disabled={isLoading}
                        />
                      </div>
                      
                      <div className="mb-3">
                        <label htmlFor="gst_number" className="form-label">GST Number</label>
                        <input
                          type="text"
                          className="form-control"
                          id="gst_number"
                          name="gst_number"
                          value={formData.gst_number}
                          onChange={handleInputChange}
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="bank_account_number" className="form-label">Bank Account Number</label>
                        <input
                          type="text"
                          className="form-control"
                          id="bank_account_number"
                          name="bank_account_number"
                          value={formData.bank_account_number}
                          onChange={handleInputChange}
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="bank_ifsc_code" className="form-label">Bank IFSC Code</label>
                        <input
                          type="text"
                          className="form-control"
                          id="bank_ifsc_code"
                          name="bank_ifsc_code"
                          value={formData.bank_ifsc_code}
                          onChange={handleInputChange}
                          disabled={isLoading}
                        />
                      </div>
                    </div>
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
                      I agree to the <Link to="#" className="text-primary">Seller Terms & Conditions</Link> and <Link to="#" className="text-primary">Commission Structure</Link>
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
                          Creating Account...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-store me-2"></i>Create Seller Account
                        </>
                      )}
                    </button>
                  </div>
                </form>
                
                <div className="text-center mt-4">
                  <p className="mb-2">Already have a seller account? <Link to="/seller/login" className="text-primary">Sign In</Link></p>
                  <div className="d-flex justify-content-center gap-3">
                    <Link to="/customer/register" className="text-muted small">Customer Registration</Link>
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

export default SellerRegisterPage