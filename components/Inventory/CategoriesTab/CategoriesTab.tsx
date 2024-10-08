import React from 'react'
import CategoriesTabStats from './CategoriesTabStats'
import CategoriesTabProducts from './CategoriesTabProducts'

const CategoriesTab = () => {
  return (
    <div className="container mx-auto px-12">
      <CategoriesTabStats />
      <CategoriesTabProducts />
    </div>
  )
}

export default CategoriesTab