import React from "react";
import { MoveLeft } from "lucide-react";
import PurchaseDetails from "./PurchaseDetails";
import ProductsDetails from "./ProductsDetails";
import { MdOutlineClose } from "react-icons/md";

interface AddPurchaseProps {
  onClose: () => void
}

const AddPurchase = ({ onClose } : AddPurchaseProps) => {
  return (
    <div className="bg-white shadow-custom py-4 px-8 mb-12 rounded-[8px] mt-8 grid gap-y-5 ">
      <div className="flex items-center gap-4 mb-8">
        <MoveLeft onClick={onClose} className="cursor-pointer" />
        <h3 className="font-bold text-2xl font-inter">Add Purchase</h3>
      </div>
      <hr />
      <div className="grid ">
        <PurchaseDetails />
        <hr className="my-7" />
        <ProductsDetails />
        
      </div>
    </div>
  );
};

export default AddPurchase;
