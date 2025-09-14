import React from 'react'

const HomePage: React.FC = () => {
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12">
          <div className="jumbotron bg-primary text-white rounded p-5 mb-4">
            <h1 className="display-4">Welcome to Shopease</h1>
            <p className="lead">Your one-stop destination for all your shopping needs.</p>
            <a className="btn btn-light btn-lg" href="/products" role="button">
              <i className="fas fa-shopping-cart me-2"></i>
              Shop Now
            </a>
          </div>
        </div>
      </div>
      
      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body text-center">
              <i className="fas fa-truck text-primary" style={{ fontSize: '3rem' }}></i>
              <h5 className="card-title mt-3">Fast Delivery</h5>
              <p className="card-text">Get your orders delivered quickly and safely.</p>
            </div>
          </div>
        </div>
        
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body text-center">
              <i className="fas fa-shield-alt text-primary" style={{ fontSize: '3rem' }}></i>
              <h5 className="card-title mt-3">Secure Shopping</h5>
              <p className="card-text">Shop with confidence with our secure payment system.</p>
            </div>
          </div>
        </div>
        
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body text-center">
              <i className="fas fa-star text-primary" style={{ fontSize: '3rem' }}></i>
              <h5 className="card-title mt-3">Quality Products</h5>
              <p className="card-text">Find the best products from trusted sellers.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage