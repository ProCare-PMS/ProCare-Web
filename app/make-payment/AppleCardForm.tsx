import React from "react";

const AppleCardForm = () => {
  return (
    <div className="grid gap-y-4 mt-4">
      <div className="grid">
        <label htmlFor="" className="text-[#737373] text-sm font-normal">
          Name of account
        </label>
        <input
          type="text"
          name="name"
          className="border w-full border-[#E6E6E6] outline-none shadow-sm rounded-[6px] p-2"
          placeholder="Nikola Tesla"
          id=""
        />
      </div>
      <div className="grid">
        <label htmlFor="" className="text-[#737373] text-sm font-normal">
          iCloud Mail
        </label>
        <input
          type="email"
          name="email"
          className="border w-full border-[#E6E6E6] outline-none shadow-sm rounded-[6px] p-2"
          placeholder="nikolatesla@icloud.com"
          id=""
        />
      </div>
    </div>
  );
};

export default AppleCardForm;
