import React, { useEffect } from "react";
import { X } from "lucide-react";
import { DashboardTransactions, dashboardTransactions } from "@/type";
import clsx from "clsx";
import { DashbaordModalType, DashboardRecentTransactions } from "../Tables/columns";

type ModalProps = {
  setModal: (value: boolean) => void;
  item?: DashboardRecentTransactions;
  title?: string;
};

const DashboardModal = ({ setModal, item, title }: ModalProps) => {
  useEffect(() => {
    // Disable scrolling when the modal is open
    document.body.style.overflow = "hidden";

    // Re-enable scrolling when the modal is closed
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const totalAmount = item?.saleitem_set.reduce(
    (sum, item) => sum + item.total_item_price,
    0
  )

  const formattedDate = item?.created_at 
  ? new Date(item.created_at).toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    })
  : "";

const formattedTime = item?.created_at
  ? new Date(item.created_at).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  : "";
  const truncatedId = item?.id ? `${item.id.slice(0, 5)}...` : "";

  return (
    <div className="w-screen h-screen z-20 bg-opacity-30 bg-slate-500 top-0 right-0 fixed flex items-center justify-center">
      <div className="bg-white w-[730px] p-8 rounded-[14px] text-black shadow-lg">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-[#202224] font-bold text-2xl">{title}</h2>

          <X className="cursor-pointer" onClick={() => setModal(false)} />
        </div>

        <hr className="mb-6" />

        {/* Modal Stats */}
        <div className="grid grid-cols-4 gap-10" key={item?.id}>
          <div className="grid w-full gap-1">
            <span className="text-[#858C95] text-sm font-normal">
              Transaction ID
            </span>
            <span className="text-[#202224] text-base font-semibold">
              Receipt #{truncatedId}
            </span>
          </div>
          <div className="grid w-full gap-1">
            <span className="text-[#858C95] text-sm font-normal">Date</span>
            <span className="text-[#202224] text-base font-normal">
              {formattedDate}
            </span>
          </div>
          <div className="grid w-full gap-1">
            <span className="text-[#858C95] text-sm font-normal">Time</span>
            <span className="text-[#202224] text-base font-normal">
              {formattedTime}
            </span>
          </div>
          {item?.employee && (
            <div className="grid gap-2">
              <span className="text-[#858C95] text-sm font-normal">
                Items Sold
              </span>
              <span className="text-[#202224] text-base font-normal">
                {item?.employee}
              </span>
            </div>
          )}
          {item?.employee && (
            <div className="grid gap-2">
              <span className="text-[#858C95] text-sm font-normal">
                Items Returned
              </span>
              <span className="text-[#202224] text-base font-normal">
                {item?.employee}
              </span>
            </div>
          )}

          <div className="grid gap-1">
            <span className="text-[#858C95] text-sm font-normal">Sold By</span>
            <span className="text-[#202224] text-base font-normal">
              {item?.employee}
            </span>
          </div>
          <div className="grid gap-1">
            <span>AMOUNT</span>
            <span className="text-[#202224] text-base font-normal">
            GH₵{totalAmount}
            </span>
          </div>
          <div className="grid gap-1">
            <span>TYPE</span>
            <span
              className={clsx(
                " rounded-3xl w-[80%]  py-1 px-3 font-inter text-sm font-normal",
                {
                  "text-[#219653] bg-[#21965314]": item?.status === "completed",
                  "text-[#D34053] bg-[#D3405314]": item?.status === "completed",
                  "text-[#FFA70B] bg-[#FFA70B14]": item?.status === "completed",
                }
              )}
            >
              {item?.status}
            </span>
          </div>
          {item?.status && (
            <div className="grid gap-1">
              <span>STATUS</span>
              <span className="text-[#202224] text-base font-normal">
                {item?.status}
              </span>
            </div>
          )}
        </div>

        <hr className="my-6" />

        {/* Products */}
        <div className=" ">
          {" "}
          {/* overflow-y-auto h-[200px] p-3 */}
          {item?.saleitem_set.map((product, index) => (
            <div key={product?.id}>
              <div
                className="flex items-center justify-between"
                key={product?.pharmacy}
              >
                <div className="grid">
                  <span className="text-[#858C95] font-normal text-sm">
                    PRODUCT {index + 1} - NAME
                  </span>
                  <span className="tex-[#202224] font-semibold text-xl">
                    {product?.product?.name}
                  </span>
                </div>
                <div className="grid">
                  <span className="text-[#858C95] font-normal text-sm">
                    QUANTITY
                  </span>
                  <span>{product?.quantity}</span>
                </div>
                <div className="grid">
                  <span className="text-[#858C95] font-normal text-sm">
                    PRICE
                  </span>
                  <span>{product?.total_item_price}</span>
                </div>
              </div>
              <hr className="my-6" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardModal;
