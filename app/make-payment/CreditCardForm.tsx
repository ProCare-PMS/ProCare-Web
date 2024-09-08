"use client";
import React, { useState } from "react";
import Image from "next/image";
import { countries } from "@/lib/definition";

const CreditCardForm = () => {
  const [selectedCountry, setSelectedCountry] = useState("");

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(event.target.value);
  };

  return (
    <form action="" className="mt-2 flex flex-col gap-y-2">
      <div>
        <label htmlFor="" className="text-[#737373] text-sm font-normal">
          Card Number
        </label>
        <div className="border border-[#E6E6E6] shadow-sm flex items-center  rounded-[6px] p-2">
          <input
            type="number"
            name="card number"
            className="w-[80%] outline-none"
            id=""
          />
          <div className="flex items-center gap-2">
            <Image src="/icons/mastercard.png" width={20} height={20} alt="" />
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
        <select
          value={selectedCountry}
          className="border border-[#E6E6E6] outline-none shadow-sm rounded-[6px] p-2"
          onChange={handleCountryChange}
        >
          <option value="">Select a country</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}  
            </option>
          ))}
        </select>
      </div>
    </form>
  );
};

export default CreditCardForm;
