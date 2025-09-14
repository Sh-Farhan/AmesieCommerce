import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { sellerApi } from './sellerApi'

const DashboardPage: React.FC = () => {
  const { data: stats, isLoading, error } = useQuery({
    queryKey: ['seller', 'dashboard-stats'],
    queryFn: sellerApi.getDashboardStats,
  })

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="alert alert-danger">
        <i className="fas fa-exclamation-triangle me-2"></i>
        Error loading dashboard stats. Please try again.
      </div>
    )
  }

  return (
    <div>
      <h2 className="mb-4">Dashboard</h2>
      
      <div className="row">
        <div className="col-lg-3 col-md-6 mb-4">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h4>{stats?.total_products || 0}</h4>
                  <p>Total Products</p>
                </div>
                <div>
                  <i className="fas fa-box fa-2x opacity-75"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 mb-4">
          <div className="card bg-success text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h4>{stats?.total_orders || 0}</h4>
                  <p>Total Orders</p>
                </div>
                <div>
                  <i className="fas fa-shopping-cart fa-2x opacity-75"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 mb-4">
          <div className="card bg-warning text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h4>{stats?.pending_orders || 0}</h4>
                  <p>Pending Orders</p>
                </div>
                <div>
                  <i className="fas fa-clock fa-2x opacity-75"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 mb-4">
          <div className="card bg-info text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h4>₹{stats?.total_sales?.toLocaleString() || 0}</h4>
                  <p>Total Sales</p>
                </div>
                <div>
                  <i className="fas fa-chart-line fa-2x opacity-75"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Quick Actions</h5>
            </div>
            <div className="card-body">
              <div className="d-grid gap-2">
                <a href="/seller/products" className="btn btn-primary">
                  <i className="fas fa-plus me-2"></i>Add New Product
                </a>
                <a href="/seller/orders" className="btn btn-outline-primary">
                  <i className="fas fa-list me-2"></i>View Orders
                </a>
                <a href="/seller/profile" className="btn btn-outline-secondary">
                  <i className="fas fa-edit me-2"></i>Edit Profile
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Store Performance</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label">Store Rating</label>
                <div className="d-flex align-items-center">
                  <span className="text-warning me-2">★★★★☆</span>
                  <span>{stats?.store_rating || 0}/5</span>
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Low Stock Alert</label>
                <div className="text-danger">
                  <i className="fas fa-exclamation-triangle me-2"></i>
                  {stats?.low_stock_products || 0} products low in stock
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage