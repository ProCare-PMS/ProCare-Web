import React from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

// API Response interface
interface StockAdjustment {
  id: string;
  product: string;
  quantity_before: number;
  quantity_after: number;
  adjustment_type: "increase" | "decrease";
  reason: string;
  employee: string;
  created_at: string;
  modified_at: string;
  pharmacy: string;
}

// Modal display interface (keeping your existing structure for compatibility)
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
  stockAdjustment: StockAdjustment; // Changed to accept API data directly
  setModal: () => void;
}

// Helper function to transform API data to modal format
const transformStockAdjustmentData = (apiData: StockAdjustment): StockAdjustMentTypes => {
  const date = new Date(apiData.created_at);
  
  return {
    adjustmentId: `ADJ-${apiData.id.slice(0, 8).toUpperCase()}`,
    date: date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit'
    }),
    time: date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }),
    personnel: `EMP-${apiData.employee.slice(0, 8).toUpperCase()}`,
    details: [{
      productName: apiData.product, // You might want to fetch the actual product name
      previousStock: apiData.quantity_before,
      updatedStock: apiData.quantity_after,
      itemsAdjusted: Math.abs(apiData.quantity_after - apiData.quantity_before),
      reasons: apiData.reason || 'No reason provided'
    }]
  };
};

const StockAdjustMentDetails = ({
  title,
  stockAdjustment,
  setModal,
}: StockAdjustMentModalProps) => {
  // Transform the API data to the expected format
  const details = transformStockAdjustmentData(stockAdjustment);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-[60%] max-w-4xl p-6 relative max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h2 className="text-lg font-bold">{title}</h2>
          <button
            className="text-gray-500 hover:text-gray-800 transition-colors"
            onClick={setModal}
          >
            <CloseOutlinedIcon />
          </button>
        </div>

        {/* Adjustment Summary */}
        <div className="mb-6 bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-800 mb-3">Adjustment Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <span className="block text-gray-500 text-sm">Adjustment ID</span>
              <span className="block font-medium">{details.adjustmentId}</span>
            </div>
            <div>
              <span className="block text-gray-500 text-sm">Date</span>
              <span className="block font-medium">{details.date}</span>
            </div>
            <div>
              <span className="block text-gray-500 text-sm">Time</span>
              <span className="block font-medium">{details.time}</span>
            </div>
            <div>
              <span className="block text-gray-500 text-sm">Personnel</span>
              <span className="block font-medium">{details.personnel}</span>
            </div>
          </div>
        </div>

        {/* Stock Adjustment Details */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-800">Item Details</h3>
          {details.details.map((item: Details, index: number) => (
            <div key={index} className="border rounded-lg p-4 bg-white">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                  <span className="block text-gray-500 text-sm font-medium">Product Name</span>
                  <span className="block mt-1 font-medium">{item.productName}</span>
                </div>
                <div>
                  <span className="block text-gray-500 text-sm font-medium">Previous Stock</span>
                  <span className="block mt-1 font-medium">{item.previousStock.toLocaleString()}</span>
                </div>
                <div>
                  <span className="block text-gray-500 text-sm font-medium">Updated Stock</span>
                  <span className="block mt-1 font-medium">{item.updatedStock.toLocaleString()}</span>
                </div>
                <div>
                  <span className="block text-gray-500 text-sm font-medium">Items Adjusted</span>
                  <span className={`block mt-1 font-medium ${
                    stockAdjustment.adjustment_type === 'increase' 
                      ? 'text-green-600' 
                      : 'text-red-600'
                  }`}>
                    {stockAdjustment.adjustment_type === 'increase' ? '+' : '-'}{item.itemsAdjusted.toLocaleString()}
                  </span>
                </div>
              </div>
              
              <div>
                <span className="block text-gray-500 text-sm font-medium">Reason</span>
                <div className="mt-1 p-3 bg-gray-50 rounded border">
                  <span className="text-gray-800">{item.reasons}</span>
                </div>
              </div>

              {/* Adjustment Type Badge */}
              <div className="mt-3">
                <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                  stockAdjustment.adjustment_type === 'increase' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {stockAdjustment.adjustment_type === 'increase' ? 'Stock Increase' : 'Stock Decrease'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-6 pt-4 border-t">
          <div className="text-sm text-gray-500">
            <p>Last modified: {new Date(stockAdjustment.modified_at).toLocaleString()}</p>
            <p>Pharmacy ID: {stockAdjustment.pharmacy}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockAdjustMentDetails;