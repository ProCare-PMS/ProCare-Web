import EmptyState from "../_purchasesComponents/EmptyState";
import React, { useState } from "react";
import { Plus, SlidersVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddProducts from "./AddProductsModal";
import ImportProductsModal from "../_importProductsComponents/ImportProductsModal";
import FilterDropdown from "./FilterDropdown";
import { Search } from "lucide-react";

const productsItems = [];

const Purchases = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showFilters, setShowFilter] = useState(false);

  return (
    <div>
      {/* Empty State */}
      {productsItems.length == 0 && <EmptyState />}
      <div className="py-44">
        {/* Filled State */}
        {productsItems.length > 0 && (
          <div className="px-16 py-8">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-2xl font-inter text-[#202224]">
                Purchase
              </h2>
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-white gap-4 rounded-[12px] border border-[#EAEBF0] py-4 px-6">
                  <Search width={16} className="text-[#637381]" />
                  <input
                    type="search"
                    name="search"
                    placeholder="Search for product"
                    id="search"
                    className="font-inter focus:outline-none text-base font-normal text-[#637381]"
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

            {/* Table comes here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Purchases;
