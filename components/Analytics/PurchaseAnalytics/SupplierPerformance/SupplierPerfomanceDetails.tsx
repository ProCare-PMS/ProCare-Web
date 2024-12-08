import React from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

export interface AnaliticSupplierPerfromanceType {
  id: string;
  name: string;
  strength: string;
  unit: string;
  quantity: number;
  expiry_date: string; // ISO 8601 date string
  reorder_level: number;
  cost_price: string; // Assuming this is a string representation of a price
  markup_percentage: string; // Assuming this is a string representation of a percentage
  selling_price: string; // Assuming this is a string representation of a price
  category: string; // UUID of the category
  supplier: string; // UUID of the supplier
  brand: string;
  product_status: string; // Assuming these are possible statuses
  manufacture_date: string; // ISO 8601 date string
  low_stock: string; // Assuming this is a string for low stock representation
  slug: string; // Slug for the product URL
  unit_price: string; // Assuming this is a string representation of a price
  created_at: string; // ISO 8601 date string
  modified_at: string;
}

interface TransactionModalProps {
  title: string;
  item: AnaliticSupplierPerfromanceType; // Change from `AnaliticSupplierPerfromanceType[]` to `AnaliticSupplierPerfromanceType`
  setModal: () => void;
}

const SupplierPerfomanceDetails = ({
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

export default SupplierPerfomanceDetails;
