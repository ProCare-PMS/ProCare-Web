import React from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

interface Product {
  name: string;
  quantity: number;
  price: string;
}

interface User {
  userName: string;
  email: string;
}

export interface BestSellingProductType {
  id: string;
  name: string;
  strength: string;
  unit: string;
  quantity: number;
  expiry_date: string;
  reorder_level: number;
  cost_price: string;
  markup_percentage: string;
  selling_price: string;
  category: string;
  supplier: string;
  brand: string;
  product_status: string;
  manufacture_date: string;
  low_stock: string;
  slug: string;
  unit_price: string;
  created_at: string;
  modified_at: string;
}

interface TransactionModalProps {
  title: string;
  item: BestSellingProductType;
  setModal: () => void;
}

const BestSellingProductDetails = ({
  title,
  item,
  setModal,
}: TransactionModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-[60%] p-6 relative">
        <div className="flex justify-between items-center border-b mb-6">
          <h2 className="text-lg font-bold mb-4">{title}</h2>
          <button
            className="text-gray-500 hover:text-gray-800"
            onClick={setModal}
          >
            <CloseOutlinedIcon />
          </button>
        </div>

        {/* Transaction Details */}
        <div className="border-b pb-4 mb-4 grid grid-cols-4 gap-4">
          <div className="text-gray-500 flex flex-col">
            <span>Name:</span>
            <span className="font-bold">{item.name}</span>
          </div>
          <div className="text-gray-500 flex flex-col">
            <span>Brand:</span>
            <span className="font-bold">{item.brand}</span>
          </div>
          <div className="text-gray-500 flex flex-col">
            <span>Expiry Date:</span>
            <span className="font-bold">
              {new Date(item.expiry_date).toDateString()}
            </span>
          </div>

          <div className="text-gray-500 flex flex-col">
            <span>Unit:</span>
            <span className="font-bold">{item.unit}</span>
          </div>
          <div className="text-gray-500 flex flex-col">
            <span>Quantity:</span>
            <span className="font-bold">{item.quantity}</span>
          </div>
          <div className="text-gray-500 flex flex-col">
            <span>Cost Price:</span>
            <span className="font-bold">₵{item.cost_price}</span>
          </div>
          <div className="text-gray-500 flex flex-col">
            <span>Selling Price:</span>
            <span className="font-bold">₵{item.selling_price}</span>
          </div>
        </div>

        {/* Close Button */}
      </div>
    </div>
  );
};

export default BestSellingProductDetails;
