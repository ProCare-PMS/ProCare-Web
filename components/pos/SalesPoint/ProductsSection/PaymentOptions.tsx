import Image from "next/image";
import React, { useState } from "react";
import PaymentModal from "./PaymentModal";

// Define payment option type for better type safety
type PaymentOption = {
  id: string;
  title: string;
  icon: string;
  altText: string;
};

const PaymentOptions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<string>("");

  const paymentOptions: PaymentOption[] = [
    {
      id: "credit-card",
      title: "Credit Card",
      icon: "/icons/credit-card.png",
      altText: "Credit Card Icon",
    },
    {
      id: "mobile-money",
      title: "Mobile Money",
      icon: "/icons/money.png",
      altText: "Mobile Money Icon",
    },
    {
      id: "cash",
      title: "Cash",
      icon: "/icons/cash.png",
      altText: "Cash Icon",
    },
    {
      id: "insurance",
      title: "Insurance",
      icon: "/icons/i.png",
      altText: "Insurance Icon",
    },
    {
      id: "multipay",
      title: "Multipay",
      icon: "/icons/mp.png",
      altText: "Multipay Icon",
    },
  ];

  const handlePaymentOptions = (paymentType: string) => {
    setSelectedPayment(paymentType);
    setIsModalOpen(true);
  };

  const onClose = () => {
    setIsModalOpen(false);
    setSelectedPayment("");
  };

  // Reusable payment option card component
  const PaymentOptionCard = ({ option }: { option: PaymentOption }) => (
    <div
      className="grid place-items-center border border-[#2648EA] rounded-[8px] py-2 px-3 cursor-pointer"
      onClick={() => handlePaymentOptions(option.title)}
    >
      <div className="bg-[#EFF0FE] rounded-full p-3">
        <Image
          src={option.icon}
          alt={option.altText}
          width={16}
          height={16}
        />
      </div>
      <span className="font-semibold text-[#2648EA] text-sm font-inter">
        {option.title}
      </span>
    </div>
  );

  return (
    <div>
      <div className="transition-all bg-white shadow-custom p-4 mb-12 rounded-[8px] mt-8">
        <h2 className="text-[#202224] font-inter text-2xl font-semibold">
          Payment method
        </h2>
        
        {/* First row - 3 payment options */}
        <div className="grid grid-cols-3 gap-4 mt-5">
          {paymentOptions.slice(0, 3).map((option) => (
            <PaymentOptionCard key={option.id} option={option} />
          ))}
        </div>

        {/* Second row - 2 payment options */}
        <div className="grid grid-cols-2 gap-4 mt-2">
          {paymentOptions.slice(3, 5).map((option) => (
            <PaymentOptionCard key={option.id} option={option} />
          ))}
        </div>
      </div>

      {isModalOpen && <PaymentModal onClose={onClose} title={selectedPayment} />}
    </div>
  );
};

export default PaymentOptions;