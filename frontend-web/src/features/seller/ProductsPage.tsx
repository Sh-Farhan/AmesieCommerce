import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { sellerApi } from './sellerApi'
import { Product } from '@/types'

const ProductsPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false)
  const queryClient = useQueryClient()

  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ['seller', 'products'],
    queryFn: () => sellerApi.getProducts(),
  })

  const deleteProductMutation = useMutation({
    mutationFn: sellerApi.deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(['seller', 'products'])
    },
  })

  const handleDeleteProduct = async (productId: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await deleteProductMutation.mutateAsync(productId)
    }
  }

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
        Error loading products. Please try again.
      </div>
    )
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>My Products</h2>
        <button 
          className="btn btn-primary" 
          onClick={() => setShowModal(true)}
        >
          <i className="fas fa-plus me-2"></i>Add New Product
        </button>
      </div>
      
      <div className="card">
        <div className="card-body">
          {products.length === 0 ? (
            <div className="text-center py-5">
              <i className="fas fa-box fa-3x text-muted mb-3"></i>
              <h5 className="text-muted">No products found</h5>
              <p className="text-muted">Start by adding your first product!</p>
              <button 
                className="btn btn-primary"
                onClick={() => setShowModal(true)}
              >
                <i className="fas fa-plus me-2"></i>Add Product
              </button>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>SKU</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product: Product) => (
                    <tr key={product.id}>
                      <td>
                        <div className="d-flex align-items-center">
                          {product.image_url && (
                            <img 
                              src={product.image_url} 
                              alt={product.name}
                              className="me-3"
                              style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                            />
                          )}
                          <div>
                            <h6 className="mb-0">{product.name}</h6>
                            <small className="text-muted">{product.category?.name}</small>
                          </div>
                        </div>
                      </td>
                      <td>{product.sku}</td>
                      <td>₹{product.price.toLocaleString()}</td>
                      <td>
                        <span className={`badge ${product.stock_quantity > 10 ? 'bg-success' : product.stock_quantity > 0 ? 'bg-warning' : 'bg-danger'}`}>
                          {product.stock_quantity}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${product.is_active ? 'bg-success' : 'bg-secondary'}`}>
                          {product.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td>
                        <div className="btn-group" role="group">
                          <button className="btn btn-sm btn-outline-primary">
                            <i className="fas fa-edit"></i>
                          </button>
                          <button 
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDeleteProduct(product.id)}
                            disabled={deleteProductMutation.isLoading}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Add Product Modal - Basic placeholder */}
      {showModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Product</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Product creation form will be implemented in the next task.</p>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductsPage