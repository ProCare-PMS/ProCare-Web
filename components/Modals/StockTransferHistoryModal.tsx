import React, { useEffect } from "react";
import { X } from "lucide-react";
import { StockTransferHistoryTable } from "@/type";
import clsx from "clsx";

type ModalProps = {
  setModal: (value: boolean) => void;
  item: StockTransferHistoryTable;
};

const StockTransferHistoryModal = ({ item, setModal }: ModalProps) => {
  useEffect(() => {
    // Disable scrolling when the modal is open
    document.body.style.overflow = "hidden";

    // Re-enable scrolling when the modal is closed
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="w-screen h-screen z-20 bg-opacity-30 bg-slate-500 top-0 right-0 fixed flex items-center justify-center">
      <div className="bg-white w-[830px] p-8 rounded-[14px] text-black shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[#202224] font-bold text-xl">Transfer Details</h2>

          <X className="cursor-pointer" onClick={() => setModal(false)} />
        </div>

        <hr />

        <div
          className="grid grid-cols-4 gap-10 bg-[#F8F9FB] mt-5 border py-3 px-4 rounded-[8px]"
          key={item.transferId}
        >
          {/* Transfer Id */}
          <div className="grid w-full gap-1">
            <span className="text-[#858C95] text-sm font-normal">
              TRANSFER ID
            </span>
            <span className="text-[#202224] text-base font-semibold">
              {item.transferId}
            </span>
          </div>

          {/* Reviewed by */}
          <div className="grid w-full gap-1">
            <span className="text-[#858C95] text-sm font-normal">
              REVIEWED BY
            </span>
            <span className="text-[#202224] text-base font-semibold">
              {item.reviewedBy}
            </span>
          </div>

          {/* Contact */}
          <div className="grid w-full gap-1">
            <span className="text-[#858C95] text-sm font-normal">CONTACT</span>
            <span className="text-[#202224] text-base font-semibold">
              {item.contact}
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
        <div className="mt-8 overflow-y-auto h-[200px] p-3">
          {" "}
          {/* overflow-y-auto h-[200px] p-3 */}
          {item.transfers.map((transfer, index) => (
            <>
              <div
                className="flex items-center justify-between"
                key={transfer.name}
              >
                <div className="grid">
                  <span className="text-[#858C95] font-normal text-sm">
                    PRODUCT NAME
                  </span>
                  <span className="tex-[#202224] font-semibold text-xl">
                    {transfer.name}
                  </span>
                </div>
                <div className="grid">
                  <span className="text-[#858C95] font-normal text-sm">
                    QUANTITY
                  </span>
                  <span>{transfer.quantity}</span>
                </div>
                <div className="grid">
                  <span className="text-[#858C95] font-normal text-sm">
                    UNIT PRICE
                  </span>
                  <span>{transfer.unitPrice}</span>
                </div>
                <div className="grid">
                  <span className="text-[#858C95] font-normal text-sm">
                    STATUS
                  </span>
                  <span
                    className={clsx(
                      "font-inter font-normal text-sm rounded-3xl py-2 px-3",
                      {
                        "text-[#219653] bg-[#21965314] !w-[80px]":
                          transfer.status === "Accepted",
                        "text-[#FFA70B] bg-[#FFA70B14] !w-[80px]":
                          transfer.status === "Pending",
                        "text-[#D34053] bg-[#D3405314] !w-[80px]":
                          transfer.status === "Rejected",
                      }
                    )}
                  >
                    {transfer.status}
                  </span>
                </div>
              </div>
              <hr className="my-6" />
            </>
          ))}
        </div>

        <div>
          <h2>REASON</h2>
          <p className="text-[#494A4B] text-base font-normal font-inter">
            {item.reason}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StockTransferHistoryModal;
