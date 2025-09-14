import React, { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useLogin } from '../../shared/hooks/useAuth'

const SellerLoginPage: React.FC = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '', rememberMe: false })
  const [error, setError] = useState('')
  
  const loginMutation = useLogin()
  const navigate = useNavigate()
  const location = useLocation()
  
  const from = (location.state as any)?.from?.pathname || '/seller/dashboard'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      await loginMutation.mutateAsync({ 
        username: credentials.email, 
        password: credentials.password 
      })
      navigate(from, { replace: true })
    } catch (err: any) {
      setError(err.message || 'Seller login failed. Please try again.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gradient">Seller Login</h2>
          <p className="mt-2 text-neutral-600">Access your seller dashboard</p>
        </div>

        <div className="card-elevated p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="input-field"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                required
                disabled={loginMutation.isPending}
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="input-field"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                required
                disabled={loginMutation.isPending}
                placeholder="Enter your password"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                checked={credentials.rememberMe}
                onChange={(e) => setCredentials({ ...credentials, rememberMe: e.target.checked })}
              />
              <label htmlFor="rememberMe" className="ml-2 text-sm text-neutral-700">
                Remember me
              </label>
            </div>

            <button
              type="submit"
              className="btn-accent w-full"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Accessing Dashboard...
                </>
              ) : (
                'Access Dashboard'
              )}
            </button>
          </form>

          <div className="mt-6 text-center space-y-4">
            <p className="text-neutral-600">
              Don't have a seller account?{' '}
              <Link to="/seller/register" className="text-accent-600 hover:text-accent-700 font-medium">
                Become a Seller
              </Link>
            </p>
            <div className="flex justify-center items-center space-x-4 text-sm text-neutral-500">
              <Link to="/customer/login" className="hover:text-primary-600">Customer Login</Link>
              <span>|</span>
              <Link to="/" className="hover:text-primary-600">Home</Link>
            </div>
            
            <div className="mt-4 text-xs text-neutral-400 text-center">
              Test Seller: testuser@seller.com / test123
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SellerLoginPage