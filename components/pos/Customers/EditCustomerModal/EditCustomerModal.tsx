import React from "react";
import { MoveLeft } from "lucide-react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

interface EditCustomerModalProps {
  closeModal: () => void;
}

const EditCustomerModal = ({ closeModal }: EditCustomerModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-[60%] p-6 relative">
        <div className="flex justify-between items-center border-b mb-2">
          <h2 className="text-lg font-bold mb-4">Edit Customer</h2>
          <button
            className="text-gray-500 hover:text-gray-800"
            onClick={closeModal}
          >
            <CloseOutlinedIcon />
          </button>
        </div>
        <form>
          <div className="overflow-y-auto h-[450px] p-3 grid gap-y-6">
            {/* Basic Information */}
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
            {/* End Basic Information */}

            {/* Health Information Form */}
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
            {/* End Health Information Form */}

            {/* Medical Information Form */}
            <div>
              <div className="flex items-center justify-between">
                <h2 className="text-[#202224] font-bold text-base font-inter">
                  Medical Information
                </h2>

                <span className="text-[#2648EA] font-semibold text-sm">
                  Add Medication
                </span>
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
          </div>
          {/* End Medical Information Form */}
        </form>
        
      </div>
    </div>
  );
};

export default EditCustomerModal;
