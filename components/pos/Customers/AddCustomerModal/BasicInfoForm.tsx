import React from "react";

const BasicInfoForm = () => {
  return (
    <div>
      <h2 className="text-[#202224] font-bold text-base font-inter">
        Basic Information
      </h2>
      <div className="grid grid-cols-3 gap-5">
        {/* Full Name */}
        <div className="grid gap-y-2 mt-3">
          <label
            htmlFor=""
            className="text-[#323539] font-inter font-medium text-sm"
          >
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            placeholder="Enter full name"
            id=""
            className="rounded-[4px] py-3 px-2 border border-[#E5E5E7] text-[#858C95] text-sm font-normal"
          />
        </div>
        {/* Email */}
        <div className="grid gap-y-2">
          <label
            htmlFor=""
            className="text-[#323539] font-inter font-medium text-sm"
          >
            Email
          </label>
          <input
            type="email"
            name="fullName"
            placeholder="Enter email"
            id=""
            className="rounded-[4px] py-3 px-2 border border-[#E5E5E7] text-[#858C95] text-sm font-normal"
          />
        </div>
        {/* Phone Number */}
        <div className="grid gap-y-2">
          <label
            htmlFor=""
            className="text-[#323539] font-inter font-medium text-sm"
          >
            Phone Number
          </label>
          <input
            type="text"
            name="fullName"
            placeholder="Enter phone number"
            id=""
            className="rounded-[4px] py-3 px-2 border border-[#E5E5E7] text-[#858C95] text-sm font-normal"
          />
        </div>
        {/* Gender */}
        <div className="grid gap-y-2">
          <label
            htmlFor=""
            className="text-[#323539] font-inter font-medium text-sm"
          >
            Gender
          </label>
          <input
            type="text"
            name="fullName"
            placeholder="Enter phone number"
            id=""
            className="rounded-[4px] py-3 px-2 border border-[#E5E5E7] text-[#858C95] text-sm font-normal"
          />
        </div>
        {/* Date of Birth */}
        <div className="grid gap-y-2">
          <label
            htmlFor=""
            className="text-[#323539] font-inter font-medium text-sm"
          >
            Date of Birth
          </label>
          <input
            type="text"
            name="fullName"
            placeholder="Enter phone number"
            id=""
            className="rounded-[4px] py-3 px-2 border border-[#E5E5E7] text-[#858C95] text-sm font-normal"
          />
        </div>
        {/* Address */}
        <div className="grid gap-y-2">
          <label
            htmlFor=""
            className="text-[#323539] font-inter font-medium text-sm"
          >
            Address
          </label>
          <input
            type="text"
            name="fullName"
            placeholder="Enter phone number"
            id=""
            className="rounded-[4px] py-3 px-2 border border-[#E5E5E7] text-[#858C95] text-sm font-normal"
          />
        </div>
      </div>
    </div>
  );
};

export default BasicInfoForm;
