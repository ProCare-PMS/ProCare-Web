import React from 'react'
import DashboardNote from './DashboardNote'
import DashboardSalesStats from './DashboardSalesStats'
import DashboardTables from './DashboardTables'
import { DashboardMainTable } from './DashboardMainTable'

const DashboardHomePage = () => {
  return (
    <div>
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

export default DashboardHomePage


