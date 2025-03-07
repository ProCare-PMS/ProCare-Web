import React, { useEffect, useState } from "react";
import { X, Trash2 } from "lucide-react";
import { RequestsTransfers, requestsTransfers } from "./Data";

type ModalProps = {
  setModal: (value: boolean) => void;
  item: RequestsTransfers;
};

type TransferItem = {
  name: string;
  quantity: number;
  price: number;
};

const StockRequestViewModal = ({ item, setModal }: ModalProps) => {
  const [transferItems, setTransferItems] = useState<TransferItem[]>(
    (item.items || []).map(transfer => ({
      ...transfer,
      price: typeof transfer.price === 'string' 
        ? parseFloat(transfer.price.replace(/[^0-9.-]+/g, '')) 
        : transfer.price
    }))
  );

  useEffect(() => {
    // Disable scrolling when the modal is open
    document.body.style.overflow = "hidden";

    // Re-enable scrolling when the modal is closed
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleRemoveItem = (indexToRemove: number) => {
    setTransferItems(prevItems => 
      prevItems.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <div className="w-screen h-screen z-20 oveflow-y-auto bg-opacity-30 bg-slate-500 top-0 right-0 fixed flex items-center justify-center">
      <div className="bg-white w-[830px] h-[600px] overflow-y-auto p-8 rounded-[14px] text-black shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[#202224] font-bold text-xl">Transfer Details</h2>

          <X 
            className="cursor-pointer text-gray-500 hover:text-red-500 transition-colors" 
            onClick={() => setModal(false)} 
          />
        </div>

        <hr className="border-gray-200" />

        <div
          className="grid grid-cols-4 gap-10 bg-[#F8F9FB] mt-5 border border-gray-100 py-3 px-4 rounded-[8px]"
          key={item.transfer_id}
        >
          {/* Transfer Id */}
          <div className="grid w-full gap-1">
            <span className="text-[#858C95] text-sm font-normal">
              TRANSFER ID
            </span>
            <span className="text-[#202224] text-base font-semibold">
              {item.transfer_id}
            </span>
          </div>

          {/* Reviewed by */}
          <div className="grid w-full gap-1">
            <span className="text-[#858C95] text-sm font-normal">
              REVIEWED BY
            </span>
            <span className="text-[#202224] text-base font-semibold">
              {item.requested_by}
            </span>
          </div>

          {/* Date */}
          <div className="grid w-full gap-1">
            <span className="text-[#858C95] text-sm font-normal">DATE</span>
            <span className="text-[#202224] text-base font-semibold">
              {item.date}
            </span>
          </div>
        </div>

        {/* Products */}
        <div className="mt-8 overflow-y-auto max-h-[300px] p-3 space-y-4">
          {transferItems.length === 0 ? (
            <div className="text-center text-gray-500 py-4">
              No items in the transfer
            </div>
          ) : (
            transferItems.map((transfer, index) => (
              <div 
                key={`${transfer.name}-${index}`} 
                className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm"
              >
                <div className="grid flex-grow mr-4">
                  <span className="text-[#858C95] font-normal text-sm">
                    PRODUCT NAME
                  </span>
                  <span className="text-[#202224] font-semibold text-xl">
                    {transfer.name}
                  </span>
                </div>
                <div className="grid mr-4">
                  <span className="text-[#858C95] font-normal text-sm">
                    QUANTITY
                  </span>
                  <span className="text-[#202224] font-semibold">
                    {transfer.quantity}
                  </span>
                </div>
                <div className="grid mr-4">
                  <span className="text-[#858C95] font-normal text-sm">
                    UNIT PRICE
                  </span>
                  <span className="text-[#202224] font-semibold">
                    ${transfer.price.toFixed(2)}
                  </span>
                </div>
                <button 
                  onClick={() => handleRemoveItem(index)}
                  className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))
          )}
        </div>

        <div className="mb-6">
          <h2 className="text-[#858C95] text-sm font-bold mb-2">
            ADDITIONAL INFO (OPTIONAL)
          </h2>
          <form>
            <textarea
              placeholder="Enter any additional info"
              className="border text-[#858C95] text-sm font-normal rounded-[6px] py-2 px-4 w-full min-h-[100px] resize-y"
            />
          </form>
        </div>

        <div className="flex items-center justify-end space-x-6">
          <button 
            className="text-[#323539] border border-[#323539] hover:bg-gray-50 py-2 px-6 rounded-[6px] transition-colors"
            disabled={transferItems.length === 0}
          >
            Reject All
          </button>
          <button 
            className="border-[#2648EA] border rounded-[6px] text-[#2648EA] hover:bg-blue-50 py-2 px-6 transition-colors"
            disabled={transferItems.length === 0}
          >
            Accept All
          </button>
          <button 
            className="bg-[#2648EA] text-white rounded-[6px] py-2 px-6 hover:bg-blue-700 transition-colors"
            disabled={transferItems.length === 0}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default StockRequestViewModal;