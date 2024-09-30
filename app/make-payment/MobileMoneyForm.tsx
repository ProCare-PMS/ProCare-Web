import React from "react";

const MobileMoneyForm = () => {
  return (
    <div className="grid gap-y-4 mt-4">
      <div className="grid">
        <label htmlFor="" className="text-[#737373] text-sm font-normal">
          Select Network Provider
        </label>
        <select
          name="providers"
          id=""
          className="border w-full border-[#E6E6E6] outline-none shadow-sm rounded-[6px] p-2"
        >
          <option value="Select Network Provider">
            Select Network Provider
          </option>
          <option value="mtn">MTN</option>
          <option value="telecel">Telecel</option>
          <option value="airtel tigo">Airtel Tigo</option>
        </select>
      </div>

      <div className="grid">
        <label htmlFor="" className="text-[#737373] text-sm font-normal">
          Phone Number
        </label>
        <div className="flex items-center gap-2 border border-[#E6E6E6]">
          <select name="" id="" className="w-[20%]  p-2">
            <option value="+233">+233</option>
            <option value="+234">+234</option>
          </select>
          <input
            className=" w-[90%] outline-none shadow-sm rounded-[6px] p-2"
            type="text"
            name=""
            id=""
            placeholder="+233548549012"
          />
        </div>
      </div>

      <div className="grid">
        <label htmlFor="" className="text-[#737373] text-sm font-normal">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          className="border w-full border-[#E6E6E6] outline-none shadow-sm rounded-[6px] p-2"
          placeholder="nikolatesla@gmail.com"
          id=""
        />
      </div>
    </div>
  );
};

export default MobileMoneyForm;
