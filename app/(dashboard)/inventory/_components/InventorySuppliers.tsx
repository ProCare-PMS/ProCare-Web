import React, { useState } from "react";
import { Plus, SlidersVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddProducts from "./AddProductsModal";
import ImportProductsModal from "../_importProductsComponents/ImportProductsModal";
import FilterDropdown from "./FilterDropdown";

const InventorySuppliers = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showFilters, setShowFilter] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="py-44">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-2xl font-inter text-[#202224]">
          Suppliers
        </h2>
        {/* Search and filter */}
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
                    {!!isModalOpen && (
                      <AddProducts title="" setModal={handleCloseModal} />
                    )}
                  </li>
                  <hr />
                  <li>
                    <ImportProductsModal title="" />
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
    </div>
  );
};

export default InventorySuppliers;
