import React from "react";
import { X } from "lucide-react";

interface Props {
  onProductClose: () => void;
}

const AddCategoryProduct = ({ onProductClose }: Props) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-[10px] shadow-lg w-[500px]">
        <div className="flex items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold  font-inter">
            Add Product To Category
          </h2>
          <X onClick={onProductClose} className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default AddCategoryProduct;
