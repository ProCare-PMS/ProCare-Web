import React from "react";
import { UserPlus, ArrowLeft } from "lucide-react";

interface CustomerListProps {
  onClose: () => void;
}

const CustomerList = ({ onClose }: CustomerListProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
        <div className="flex items-center gap-4 mb-6">
          <ArrowLeft onClick={onClose} className="cursor-pointer" />
          <h3 className="text-base font-semibold text-[#1E1E1E] font-inter">
            Customer List
          </h3>
        </div>
        <hr className="my-4" />

        <div className="grid gap-y-4">
          <div className="flex gap-4">
            <UserPlus />
            <div className="grid">
              <span className="text-base font-normal text-[#1E1E1E] font-inter">
                Krunch
              </span>
              <span className="text-[#757575] text-sm font-normal">#97883</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerList;
