import React, { useEffect } from "react";
import { X } from "lucide-react";
import { DashboardTransactions, dashboardTransactions, PurchaseTabTable } from "@/type";
import clsx from "clsx";

type ModalProps = {
  setModal: (value: boolean) => void;
  item: PurchaseTabTable;
};

const PurchasesTableModal = ({ setModal, item,  }: ModalProps) => {
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
      <div className="bg-white w-[730px] p-8 rounded-[14px] text-black shadow-lg">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-[#202224] font-bold text-2xl">Purchases</h2>

          <X className="cursor-pointer" onClick={() => setModal(false)} />
        </div>

        <hr className="mb-6" />

        {/* Modal Stats */}
        <div className="grid grid-cols-4 gap-10 bg-[#F8F9FB] border py-2 px-4 rounded-[8px]" key={item.purchaseId}>
          <div className="grid w-full gap-1">
            <span className="text-[#858C95] text-sm font-normal">
              PURCHASE ID
            </span>
            <span className="text-[#202224] text-base font-semibold">
              Receipt #{item.purchaseId}
            </span>
          </div>
          <div className="grid w-full gap-1">
            <span className="text-[#858C95] text-sm font-normal">Supplier</span>
            <span className="text-[#202224] text-base font-normal">
              {item.supplier}
            </span>
          </div>
          <div className="grid w-full gap-1">
            <span  className="text-[#858C95] text-sm font-normal">Quantity</span>
            <span className="text-[#202224] text-base font-normal">{item.quantity}</span>
          </div>
          <div className="grid gap-2">
            <span className="text-[#858C95] text-sm font-normal">Unit Price</span>
            <span className="text-[#202224] text-base font-normal">{item.unitPrice}</span>
          </div>
          <div className="grid gap-1">
            <span>AMOUNT</span>
            <span className="text-[#202224] text-base font-normal">{item.amount}</span>
          </div>
          <div className="grid gap-1">
            <span  className="text-[#858C95] text-sm font-normal">Date</span>
            <span className="text-[#202224] text-base font-normal">{item.date}</span>
          </div>
        </div>

        <hr className="my-6" />

        {/* Products */}
        <div className=" "> {/* overflow-y-auto h-[200px] p-3 */}
          {item.purchases.map((purchase, index) => (
            <>
              <div
                className="flex items-center justify-between"
                key={purchase.name}
              >
                <div className="grid">
                  <span className="text-[#858C95] font-normal text-sm">
                    PRODUCT {index + 1} - NAME
                  </span>
                  <span className="tex-[#202224] font-semibold text-xl">
                    {purchase.name}
                  </span>
                </div>
                <div className="grid">
                  <span className="text-[#858C95] font-normal text-sm">
                    QUANTITY
                  </span>
                  <span>{purchase.quantity}</span>
                </div>
                <div className="grid">
                  <span className="text-[#858C95] font-normal text-sm">
                    PRICE
                  </span>
                  <span>{purchase.unitPrice}</span>
                </div>
                <div className="grid">
                  <span className="text-[#858C95] font-normal text-sm">
                    AMOUNT
                  </span>
                  <span>{purchase.amount}</span>
                </div>
              </div>
              <hr className="my-6" />
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PurchasesTableModal;
