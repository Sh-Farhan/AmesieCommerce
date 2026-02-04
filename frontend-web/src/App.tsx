/**
 * Main App Component  
 * Simplified structure to fix React hooks issues
 */

import { Routes, Route, Navigate, Link } from 'react-router-dom'

// Import existing auth components
import CustomerLoginPage from './features/auth/CustomerLoginPage'
import SellerLoginPage from './features/auth/SellerLoginPage'
import CustomerRegisterPage from './features/auth/CustomerRegisterPage'
import SellerRegisterPage from './features/auth/SellerRegisterPage'

/**
 * Main App Component with routing
 */
function App() {
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <Routes>
        {/* Authentication routes */}
        <Route path="/customer/login" element={<CustomerLoginPage />} />
        <Route path="/seller/login" element={<SellerLoginPage />} />
        <Route path="/customer/register" element={<CustomerRegisterPage />} />
        <Route path="/seller/register" element={<SellerRegisterPage />} />
        
        {/* Legacy login redirect */}
        <Route path="/login" element={<Navigate to="/customer/login" replace />} />
        
        {/* Foundation Demo Home Page */}
        <Route path="/" element={
          <div className="container-custom py-20 text-center">
            <h1 className="text-4xl font-bold text-gradient mb-6">
              🎉 ShopEase Foundation Complete!
            </h1>
            <p className="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto">
              Industry-standard e-commerce platform with beautiful design system, GSAP animations, and modern architecture
            </p>
            
            {/* Demo our new design system */}
            <div className="flex justify-center space-x-4 mb-12">
              <Link to="/customer/login" className="btn-primary">
                Customer Login
              </Link>
              <Link to="/seller/login" className="btn-secondary">
                Seller Login
              </Link>
              <Link to="/customer/register" className="btn-accent">
                Get Started
              </Link>
            </div>
            
            {/* Features showcase */}
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-16">
              <div className="card animate-fade-in">
                <h3 className="text-lg font-semibold mb-3 text-primary-600">🎨 Design System</h3>
                <p className="text-neutral-600">Professional Tailwind CSS components with beautiful color schemes and animations</p>
              </div>
              <div className="card animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <h3 className="text-lg font-semibold mb-3 text-accent-600">⚡ Performance</h3>
                <p className="text-neutral-600">React Query for server state, Zustand for local state, optimized for speed</p>
              </div>
              <div className="card animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <h3 className="text-lg font-semibold mb-3 text-warning-600">🚀 Scalable</h3>
                <p className="text-neutral-600">Feature-Sliced Architecture for enterprise-grade maintainability</p>
              </div>
            </div>
            
            <div className="mt-12 text-sm text-neutral-500">
              ✅ Foundation Task Complete - Ready for comprehensive e-commerce features!
            </div>
          </div>
        } />
        
        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App