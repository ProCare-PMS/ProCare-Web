import React from "react";

const HealthInfoForm = () => {
  return (
    <div>
      <h2 className="text-[#202224] font-bold text-base font-inter">
        Health Information
      </h2>
      <div className="grid grid-cols-3 gap-5">
        {/* Full Name */}
        <div className="grid gap-y-2 mt-3">
          <label
            htmlFor=""
            className="text-[#323539] font-inter font-medium text-sm"
          >
            Height (m)
          </label>
          <input
            type="number"
            name="hieght"
            placeholder="Enter height"
            id=""
            className="rounded-[4px] py-3 px-2 border border-[#E5E5E7] text-[#858C95] text-sm font-normal"
          />
        </div>
        {/* Weight */}
        <div className="grid gap-y-2">
          <label
            htmlFor=""
            className="text-[#323539] font-inter font-medium text-sm"
          >
            Weight (kg)
          </label>
          <input
            type="number"
            name="weight"
            placeholder="Enter weight"
            id=""
            className="rounded-[4px] py-3 px-2 border border-[#E5E5E7] text-[#858C95] text-sm font-normal"
          />
        </div>
        {/* Blood Type */}
        <div className="grid gap-y-2">
          <label
            htmlFor=""
            className="text-[#323539] font-inter font-medium text-sm"
          >
            Blood Type
          </label>
          <input
            type="text"
            name="blood type"
            placeholder="Enter Blood type"
            id=""
            className="rounded-[4px] py-3 px-2 border border-[#E5E5E7] text-[#858C95] text-sm font-normal"
          />
        </div>
        {/* Blood Pressure */}
        <div className="grid gap-y-2">
          <label
            htmlFor=""
            className="text-[#323539] font-inter font-medium text-sm"
          >
            Blood Pressure
          </label>
          <input
            type="text"
            name="bloodPressure"
            placeholder="Enter blood pressure"
            id=""
            className="rounded-[4px] py-3 px-2 border border-[#E5E5E7] text-[#858C95] text-sm font-normal"
          />
        </div>
        {/* Allergies */}
        <div className="grid gap-y-2">
          <label
            htmlFor=""
            className="text-[#323539] font-inter font-medium text-sm"
          >
            Allergies
          </label>
          <input
            type="text"
            name="fullName"
            placeholder="Enter allergies"
            id=""
            className="rounded-[4px] py-3 px-2 border border-[#E5E5E7] text-[#858C95] text-sm font-normal"
          />
        </div>
        {/* Chronic Conditions */}
        <div className="grid gap-y-2">
          <label
            htmlFor=""
            className="text-[#323539] font-inter font-medium text-sm"
          >
            Chronic Conditions
          </label>
          <input
            type="text"
            name="chronicConditions"
            placeholder="Enter chronic conditions"
            id=""
            className="rounded-[4px] py-3 px-2 border border-[#E5E5E7] text-[#858C95] text-sm font-normal"
          />
        </div>
      </div>
    </div>
  );
};

export default HealthInfoForm;
