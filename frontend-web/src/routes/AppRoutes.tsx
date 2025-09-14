import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'
import SellerLayout from '@/layouts/SellerLayout'
import ProtectedRoute from '@/components/ProtectedRoute'
import LoginPage from '@/features/auth/LoginPage'
import HomePage from '@/features/catalog/HomePage'
import SellerDashboard from '@/features/seller/DashboardPage'
import SellerProducts from '@/features/seller/ProductsPage'
import SellerOrders from '@/features/seller/OrdersPage'
import SellerProfile from '@/features/seller/ProfilePage'

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<LoginPage />} />
      
      {/* Main application routes */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="products" element={<div>Products Page</div>} />
        <Route path="cart" element={<div>Cart Page</div>} />
      </Route>

      {/* Seller routes */}
      <Route path="/seller" element={
        <ProtectedRoute requireRole="SELLER">
          <SellerLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="/seller/dashboard" replace />} />
        <Route path="dashboard" element={<SellerDashboard />} />
        <Route path="products" element={<SellerProducts />} />
        <Route path="orders" element={<SellerOrders />} />
        <Route path="profile" element={<SellerProfile />} />
      </Route>

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default AppRoutes