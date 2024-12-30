import React from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

export interface AgingReportType {
  id: string;
  product_name: string;
  product: string;
  batch_id: string;
  unit: string;
  brand: string;
  item_age: string;
  expiry_status: string;
  quantity: number;
}

interface TransactionModalProps {
  title: string;
  item: AgingReportType;
  setModal: () => void;
}

const InventoryAgingReportsDetails = ({
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
            <span className="font-bold">{item.product_name}</span>
          </div>
          <div className="text-gray-500 flex flex-col">
            <span>Brand:</span>
            <span className="font-bold">{item.brand}</span>
          </div>
          <div className="text-gray-500 flex flex-col">
            <span>Batch Id:</span>
            <span className="font-bold">{item.batch_id}</span>
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
            <span>Product:</span>
            <span className="font-bold">{item.product}</span>
          </div>
          <div className="text-gray-500 flex flex-col">
            <span>Product Age:</span>
            <span className="font-bold">{item.item_age}</span>
          </div>
          <div className="text-gray-500 flex flex-col">
            <span>Expiry Status:</span>
            <span className="font-bold">{item.expiry_status}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryAgingReportsDetails;
