import React, { forwardRef } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ActionDropdownProps {
  isOpen: boolean;
  onToggle: () => void;
  onAddProduct: () => void;
  onImportProducts: () => void;
}

const ActionDropdown = forwardRef<HTMLDivElement, ActionDropdownProps>(
  ({ isOpen, onToggle, onAddProduct, onImportProducts }, ref) => {
    return (
      <div className="relative w-full sm:w-auto" ref={ref}>
        <Button
          type="button"
          className="text-white flex items-center gap-2 font-semibold text-sm rounded-[12px] font-inter w-full md:w-[149px] justify-center"
          variant="secondary"
          onClick={onToggle}
        >
          <Plus /> Add Product
        </Button>

        {isOpen && (
          <div className="bg-white absolute w-full md:w-[160px] top-12 left-0 z-20 rounded-[8px] shadow-2xl animate-in fade-in slide-in-from-top-2 duration-300">
            <ul className="flex flex-col text-[#344054] items-center divide-y divide-gray-300">
              <li className="px-3 py-2 text-sm w-full hover:bg-gray-50 transition-colors">
                <button
                  type="button"
                  onClick={onAddProduct}
                  className="w-full text-left"
                >
                  Add Individually
                </button>
              </li>
              <li className="px-3 py-2 text-sm w-full hover:bg-gray-50 transition-colors">
                <button
                  type="button"
                  onClick={onImportProducts}
                  className="w-full text-left"
                >
                  Import Products
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    );
  }
);

ActionDropdown.displayName = "ActionDropdown";
export default ActionDropdown;
