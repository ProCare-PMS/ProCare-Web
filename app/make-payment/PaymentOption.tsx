import React from "react";

interface PaymentOptionProps {
  id: string;
  label: string;
  value: string;
  icon: React.ComponentType<{ size: number }>;
}

{/* Reusable component for the payment option */}
const PaymentOption = ({
  id,
  label,
  value,
  icon: Icon,
}: PaymentOptionProps) => {
  return (
    <div className="w-full">
      <input
        type="radio"
        name="option"
        id={id}
        value={value}
        className="hidden peer"
      />
      <label
        htmlFor={id}
        className="border border-[#E6E6E6] shadow-sm rounded-[6px] font-semibold flex-col text-xs p-2 w-full cursor-pointer peer-checked:border-[#2648EA] peer-checked:text-[#2648EA] flex gap-2"
      >
        <Icon size={25} />
        {label}
      </label>
    </div>
  );
};

export default PaymentOption;
