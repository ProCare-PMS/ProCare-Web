import React from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

interface Details {
  productName: string;
  previousStock: number;
  updatedStock: number;
  itemsAdjusted: number;
  reasons: string;
}

export interface StockAdjustMentTypes {
  adjustmentId: string;
  date: string;
  time: string;
  personnel: string;
  details: Details[];
}

interface StockAdjustMentModalProps {
  title: string;
  details: StockAdjustMentTypes; // Change from `StockAdjustMentTypes[]` to `StockAdjustMentTypes`
  setModal: () => void;
}

const StockAdjustMentDetails = ({
  title,
  details,
  setModal,
}: StockAdjustMentModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-[60%] p-6 relative">
        <div className="flex justify-between items-center border-b mb-2">
          <h2 className="text-lg font-bold mb-4">{title}</h2>
          <button
            className="text-gray-500 hover:text-gray-800"
            onClick={setModal}
          >
            <CloseOutlinedIcon />
          </button>
        </div>

        {/* Stock Adjustment Details */}
        <div className="divide-y divide-solid p-3">
          {details.details.map((items: Details, index: number) => (
            <div key={index}>
              <div className="flex justify-between items-center mb-2 py-2">
                <div className="flex flex-col gap-2">
                  <span className="block capitalize text-gray-400 font-thin">
                    Product Name:
                  </span>
                  <span className="block">{items.productName}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="block capitalize text-gray-400 font-thin">
                    Previous Stock
                  </span>
                  <span className="block">{items.previousStock}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="block capitalize text-gray-400 font-thin">
                    Updated Stock
                  </span>
                  <span className="block">{items.updatedStock}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="block capitalize text-gray-400 font-thin">
                    Items Adjusted
                  </span>
                  <span className="block">{items.itemsAdjusted}</span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <span className="block capitalize text-gray-400 font-thin">
                  Reasons
                </span>
                <span className="block">{items.reasons}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Close Button */}
      </div>
    </div>
  );
};

export default StockAdjustMentDetails;
