import React from "react";

const MedicalInfo = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-[#202224] font-bold text-base font-inter">
          Medical Information
        </h2>

        <span className="text-[#2648EA] font-semibold text-sm">Add Medication</span>
      </div>
      <div className="grid grid-cols-3 gap-5">
        {/* Full Name */}
        <div className="grid gap-y-2 mt-3">
          <label
            htmlFor=""
            className="text-[#323539] font-inter font-medium text-sm"
          >
            Product
          </label>
          <input
            type="number"
            name="hieght"
            placeholder="Enter height"
            id=""
            className="rounded-[4px] py-3 px-2 border border-[#E5E5E7] text-[#858C95] text-sm font-normal"
          />
        </div>
        {/* Dosage */}
        <div className="grid gap-y-2">
          <label
            htmlFor=""
            className="text-[#323539] font-inter font-medium text-sm"
          >
            Dosage
          </label>
          <input
            type="number"
            name="weight"
            placeholder="Enter dosage"
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
            Frequency
          </label>
          <input
            type="text"
            name="blood type"
            placeholder="Enter frequency"
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
            Start Date
          </label>
          <input
            type="date"
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
            End Date
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
            Additional Information
          </label>
          <input
            type="text"
            name="additionalInformation"
            placeholder="Enter additional information"
            id=""
            className="rounded-[4px] py-3 px-2 border border-[#E5E5E7] text-[#858C95] text-sm font-normal"
          />
        </div>
      </div>
    </div>
  );
};

export default MedicalInfo;
