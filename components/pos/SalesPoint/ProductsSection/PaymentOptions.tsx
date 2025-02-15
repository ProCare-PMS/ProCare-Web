import Image from "next/image";
import React, { useState } from "react";
import PaymentModal from "./PaymentModal";

const PaymentOptions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<string>("");

  const handlePaymentOptions = (paymentType: string) => {
    setSelectedPayment(paymentType);
    setIsModalOpen(true);
  };

  const onClose = () => {
    setIsModalOpen(false);
    setSelectedPayment("");
  };

  return (
    <div>
      <div className=" transition-all bg-white shadow-custom p-4 mb-12 rounded-[8px] mt-8">
        <h2 className="text-[#202224] font-inter text-2xl font-semibold">
          Payment method
        </h2>
        <div className="grid grid-cols-3 gap-4 mt-5">
          <div
            className="grid place-items-center border border-[#2648EA] rounded-[8px] py-2 px-3 cursor-pointer"
            onClick={() => handlePaymentOptions('Credit Card')}
          >
            <div className="bg-[#EFF0FE] rounded-full p-3">
              <Image
                src="/icons/credit-card.png"
                alt="Credit Card Icon"
                width={16}
                height={16}
              />
            </div>
            <span className="font-semibold text-[#2648EA] text-sm font-inter">
              Credit Card
            </span>
          </div>

          <div
            className="grid place-items-center border border-[#2648EA] rounded-[8px] py-2 px-3 cursor-pointer"
            onClick={() => handlePaymentOptions('Mobile Money')}
          >
            <div className="bg-[#EFF0FE] rounded-full p-3">
              <Image
                src="/icons/money.png"
                alt="Mobile Money Icon"
                width={16}
                height={16}
              />
            </div>
            <span className="font-semibold text-[#2648EA] text-sm font-inter">
              Mobile Money
            </span>
          </div>
          <div className="grid place-items-center border border-[#2648EA] rounded-[8px] py-2 px-3 cursor-pointer">
            <div className="bg-[#EFF0FE] rounded-full p-3" onClick={() => handlePaymentOptions('Cash')}>
              <Image
                src="/icons/cash.png"
                alt="Cash Icon"
                width={16}
                height={16}
              />
            </div>
            <span className="font-semibold text-[#2648EA] text-sm font-inter">
              Cash
            </span>
          </div>
        </div>

        {/* These divs will now span the full width of the row */}
        <div className="flex items-center justify-between space-x-2 mt-2">
          <div className="grid place-items-center  w-full border border-[#2648EA] rounded-[8px] py-2 px-3">
            <div className="bg-[#EFF0FE] rounded-full p-3">
              <Image
                src="/icons/insurance.png"
                alt="Credit Card Icon"
                width={16}
                height={16}
              />
            </div>
            <span className="font-semibold text-[#2648EA] text-sm font-inter">
              Insurance
            </span>
          </div>
          {/*
          <div className="grid place-items-center w-full border border-[#2648EA] rounded-[8px] py-2 px-3 cursor-pointer">
            <div className="bg-[#EFF0FE] rounded-full p-3"  onClick={() => handlePaymentOptions('Multipay')}>
              <Image
                src="/icons/multipay.png"
                alt="Credit Card Icon"
                width={16}
                height={16}
              />
            </div>
            <span className="font-semibold text-[#2648EA] text-sm font-inter">
              Multipay
            </span>
          </div>
          */}
        </div>
      </div>

      {isModalOpen && <PaymentModal onClose={onClose} title={selectedPayment} />}
    </div>
  );
};

export default PaymentOptions;
