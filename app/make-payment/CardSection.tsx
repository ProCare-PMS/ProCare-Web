"use client";
import React, { useState, ChangeEvent } from "react";
import {
  FaApplePay,
  FaGooglePay,
  FaCreditCard,
  FaMobile,
} from "react-icons/fa6";

import CreditCardForm from "./CreditCardForm";
import GooglePayForm from "./GooglePayForm";
import AppleCardForm from "./AppleCardForm";
import MobileMoneyForm from "./MobileMoneyForm";

const CardSection = () => {
  const [selectedForm, setSelectedForm] = useState<string>("Card");

  const handleFormPayment = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedForm(e.target.value);
  };

  return (
    <div className="bg-white py-12 px-8 w-[500px]">
      {/* Payment Cards */}
      <div className="flex items-center gap-2">
        <div className="w-full">
          <input
            type="radio"
            name="option"
            id="card"
            value="Card"
            className="hidden peer"
            checked={selectedForm === "Card"}
            onChange={handleFormPayment}
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
            checked={selectedForm === "GooglePay"}
            onChange={handleFormPayment}
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
            checked={selectedForm === "ApplePay"}
            onChange={handleFormPayment}
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
            checked={selectedForm === "MobileMoney"}
            onChange={handleFormPayment}
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

      <div>
        {selectedForm === "Card" && <CreditCardForm />}
        {selectedForm === "GooglePay" && <GooglePayForm />}
        {selectedForm === "ApplePay" && <AppleCardForm />}
        {selectedForm === "MobileMoney" && <MobileMoneyForm />}
      </div>
    </div>
  );
};

export default CardSection;
