import React, { useEffect } from "react";
import { X } from "lucide-react";
import { StockTransferTable } from "@/type";
import StockTransferTopForm from "../StockTransferForm/StockTransferTopForm";

type ModalProps = {
  setModal: (value: boolean) => void;
  item: StockTransferTable;
};

const StockTransferModal = ({ item, setModal }: ModalProps) => {
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
        <div className="mb-4 flex items-center gap-4">
          <X className="cursor-pointer" onClick={() => setModal(false)} />
          <h2 className="text-[#202224] font-bold text-xl">
            Stock Transfer List
          </h2>
          <span className="text-[#4C4D4E] font-normal text-sm">
            {" "}
            {item.pharmacyId}{" "}
          </span>
        </div>
        <hr />

        {/* Items */}
        <form>
          <div className="grid gap-4 mt-5">
            {/* Select Product*/}
            <StockTransferTopForm />

            <div className="flex items-center gap-2 mt-5 justify-end">
              <button className="border-[#2648EA]  border px-3 py-2 text-[#2648EA] rounded-[4px]">
                Add another product
              </button>
              <button className="bg-[#2648EA]  text-white px-3 py-2 rounded-[4px]">
                Send Request
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StockTransferModal;
