import React from 'react'
import CategoriesTabStats from './CategoriesTabStats'
import CategoriesTabProducts from './CategoriesTabProducts'
import AddCategory from './AddCategory'

const CategoriesTab = () => {
  return (
    <div className="">
      <CategoriesTabStats />
      <AddCategory />
      <CategoriesTabProducts />
    </div>
  )
}

export default CategoriesTab