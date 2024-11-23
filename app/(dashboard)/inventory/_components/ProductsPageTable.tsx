"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import ProductsTable from "./ProductsTable";
import { Plus, SlidersVertical } from "lucide-react";

import AddProducts from "./AddProductsModal";
import FilterDropdown from "./FilterDropdown";
import ImportProductsModal from "../_importProductsComponents/ImportProductsModal";

const ProductsPageTable = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showFilters, setShowFilter] = useState(false);

  return (
    <Tabs defaultValue="products" className="w-full py-44 mt-8 bg-white p-8">
      <div className="flex items-center justify-between">
        <TabsList>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="stocks">Stocks</TabsTrigger>
        </TabsList>

        {/* SearchBar */}
        <div className="flex items-center gap-4">
          <div>
            <input
              type="search"
              name="search"
              placeholder="Search for product"
              id="search"
            />
          </div>
          {/* Add products button  */}
          <div className="relative">
            <Button
              type="button"
              className="text-white relative flex items-center gap-2 rounded-[12px] font-inter w-[149px]"
              variant="secondary"
              onClick={() => {
                setShowMenu(!showMenu);
                setShowFilter(false);
              }}
            >
              <Plus />
              Add Product
            </Button>
            {showMenu && (
              <div className="bg-white absolute top-12 shadow-md hover:shadow-lg left-0 z-20 rounded-[8px]">
                <ul>
                  <li>
                    <AddProducts />
                  </li>
                  <hr />
                  <li>
                    <ImportProductsModal />
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div className="relative">
            <div className="border p-2  cursor-pointer border-main rounded-[12px]">
              <SlidersVertical
                onClick={() => {
                  setShowFilter(!showFilters);
                  setShowMenu(false);
                }}
                className="text-main"
              />
            </div>
            {showFilters && <FilterDropdown />}
          </div>
        </div>
      </div>
      <TabsContent value="products">
        <ProductsTable />
      </TabsContent>
      <TabsContent value="stocks">
        <ProductsTable />
      </TabsContent>
    </Tabs>
  );
};

export default ProductsPageTable;
