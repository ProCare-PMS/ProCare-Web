import React from "react";
import {
  FaApplePay,
  FaGooglePay,
  FaCreditCard,
  FaMobile,
} from "react-icons/fa6";

const PaymentOption = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="w-full">
        <input
          type="radio"
          name="option"
          id="card"
          value="Card"
          className="hidden peer"
        />
        <label
          htmlFor="card"
          className="border border-[#E6E6E6] shadow-sm rounded-[6px] font-semibold flex-col text-xs p-2 w-full cursor-pointer peer-checked:border-[#2648EA] peer-checked:text-[#2648EA] flex gap-2"
        >
          <FaCreditCard size={25} />
          Card
        </label>
      </div>

      <div className="w-full">
        <input
          type="radio"
          name="option"
          id="googlePay"
          value="GooglePay"
          className="hidden peer"
        />
        <label
          htmlFor="googlePay"
          className="border border-[#E6E6E6] shadow-sm rounded-[6px] font-semibold flex-col text-xs p-2 w-full cursor-pointer peer-checked:border-[#2648EA] peer-checked:text-[#2648EA] flex gap-2"
        >
          <FaGooglePay size={25} />
          Google Pay
        </label>
      </div>

      <div className="w-full">
        <input
          type="radio"
          name="option"
          id="applePay"
          value="ApplePay"
          className="hidden peer"
        />
        <label
          htmlFor="applePay"
          className="border border-[#E6E6E6] shadow-sm rounded-[6px] font-semibold flex-col text-xs p-2 w-full cursor-pointer peer-checked:border-[#2648EA] peer-checked:text-[#2648EA] flex gap-2"
        >
          <FaApplePay size={25} />
          Apple Pay
        </label>
      </div>

      <div className="w-full">
        <input
          type="radio"
          name="option"
          id="mobileMoney"
          value="MobileMoney"
          className="hidden peer"
        />
        <label
          htmlFor="mobileMoney"
          className="border border-[#E6E6E6] text-left shadow-sm font-semibold rounded-[6px] flex-col text-xs p-2 w-full cursor-pointer peer-checked:border-[#2648EA] peer-checked:text-[#2648EA] flex gap-2"
        >
          <FaMobile size={25} />
          Mobile Money
        </label>
      </div>
    </div>
  );
};

export default PaymentOption;
