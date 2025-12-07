import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import SellerSidebar from '@/features/seller/SellerSidebar'

const SellerLayout: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-lg-3">
            <SellerSidebar />
          </div>
          <div className="col-lg-9">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SellerLayout