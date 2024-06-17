import React from 'react'
import { ExpiryList } from './ExpiryList'
import { LowStock } from './LowStockAlert'

const DashboardTables = () => {
    return (
        <div className="flex items-center flex-col md:flex-row gap-6 mb-5">
            {/* Expiry List */}
            <div className='bg-white  p-4 shadow-custom rounded-xl'>
                <ExpiryList />
            </div>

            {/* Low Stock Alert */}
            <div className='bg-white  shadow-custom p-4 rounded-xl'>
                <LowStock />
            </div>

           
        </div>
    )
}

export default DashboardTables