import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import React from "react";

interface AddCategoryModalProps {
  onClose: () => void;
}

const AddCategoryModal = ({ onClose }: AddCategoryModalProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
        <div className="flex items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold  font-inter">Add Category</h2>
          <X onClick={onClose} className="cursor-pointer" />
        </div>

        <hr />

        <form>
          <div className="grid gap-y-2 mt-3">
            <label
              htmlFor=""
              className="text-[#323539] font-inter font-medium text-sm"
            >
              Category Name
            </label>
            <input
              type="text"
              name="hieght"
              placeholder="Enter category name"
              id=""
              className="rounded-[4px] py-3 px-2 border border-[#E5E5E7] text-[#858C95] text-sm font-normal"
            />
          </div>

          <div className="flex justify-end mt-4">
            <Button
              type="button"
              className="text-white relative flex items-center gap-2 rounded-[4px] font-inter w-[170px]"
              variant="secondary"
            >
              Add Category
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryModal;
