"use client"
import React from "react";
import {
  FaApplePay,
  FaGooglePay,
  FaCreditCard,
  FaMobile,
} from "react-icons/fa6";
import Image from "next/image";

const CardSection = () => {
  return (
    <div className="bg-white py-12 px-8">
      {/* Payment Cards */}
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

      <form action="" className="mt-2 flex flex-col gap-y-2">
        <div>
          <label htmlFor="" className="text-[#737373] text-sm font-normal">
            Card Number
          </label>
          <div className="border border-[#E6E6E6] shadow-sm flex items-center  rounded-[6px] p-2">
            <input type="number" name="card number" className="w-[80%] outline-none" id="" />
            <div className="flex items-center gap-2">
              <Image
                src="/icons/mastercard.png"
                width={20}
                height={20}
                alt=""
              />
              <Image src="/icons/Visa.svg" width={20} height={20} alt="" />
              <Image src="/icons/amex.svg" width={20} height={20} alt="" />
              <Image src="/icons/discover.svg" width={20} height={20} alt="" />
            </div>
          </div>
        </div>

        {/* Expiration and CVC */}
        <div className="flex items-center gap-4 justify-between">
          <div className="grid">
            <label htmlFor="" className="text-[#737373] text-sm font-normal">
              Expiration
            </label>
            <input
              className="border border-[#E6E6E6] outline-none shadow-sm rounded-[6px] p-2"
              type="number"
              name="expiration"
              id=""
              placeholder="11/27"
            />
          </div>
          <div className="grid">
            <label htmlFor="" className="text-[#737373] text-sm font-normal">
              CVC
            </label>
            <input
              className="border border-[#E6E6E6] outline-none shadow-sm rounded-[6px] p-2"
              type="number"
              name="cvc"
              id=""
              placeholder="123"
            />
          </div>
        </div>

        {/* Name on card */}
        <div className="grid">
          <label htmlFor="" className="text-[#737373] text-sm font-normal">
            Name on card
          </label>
          <input
            className="border border-[#E6E6E6] outline-none shadow-sm rounded-[6px] p-2"
            type="text" 
            name=""
            placeholder="Nikola Tesla"
            id=""
          />
        </div>

        {/* Country */}
        <div className="grid">
          <label htmlFor="" className="text-[#737373] text-sm font-normal">
            Country
          </label>
          <input
            className="border border-[#E6E6E6] outline-none shadow-sm rounded-[6px] p-2"
            type="number"
            name=""
            placeholder="Ghana"
            id=""
          />
        </div>
      </form>
    </div>
  );
};

export default CardSection;
