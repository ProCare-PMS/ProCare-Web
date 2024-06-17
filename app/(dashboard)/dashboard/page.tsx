import React from 'react'
import DashboardNote from './_components/DashboardNote'
import DashboardSalesStats from './_components/DashboardSalesStats'
import DashboardTables from './_components/DashboardTables'
import { DashboardMainTable } from './_components/DashboardMainTable'

const DashbaordHomePage = () => {
  return (
    <div className='container px-16'>
        <div className="hidden md:block"
      >
        <DashboardNote />
      </div>
      <DashboardSalesStats />
      <DashboardTables />
      <DashboardMainTable />

    </div>
  )
}

export default DashbaordHomePage