import React from "react";

const HealthInfo = () => {
  return (
    <form className="grid grid-cols-2 gap-4">
      {/*Height */}
      <div>
        <label
          htmlFor="height"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Height
        </label>
        <input
          type="text"
          name="height"
          id="height"
          placeholder="Enter Height"
          className=" border rounded w-full h-12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-[#F8F9FB"
        />
      </div>
      {/*Weight */}
      <div>
        <label
          htmlFor="weight"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Weight
        </label>
        <input
          type="text"
          name="weight"
          id="weight"
          placeholder="Enter weight"
          className=" border rounded w-full h-12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-[#F8F9FB"
        />
      </div>
      {/* Blood Type */}
      <div>
        <label
          htmlFor="bloodtype"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Blood Type
        </label>
        <select
          id="category"
          name="category"
          className="border w-full h-12 border-[#E6E6E6] outline-none shadow-sm rounded-[6px]"
        >
          <option value="">Select blood type</option>
          <option key="bloodA" value="bloodA">
            Blood A
          </option>
        </select>
      </div>
      {/* Blood Pressure */}
      <div>
        <label
          htmlFor="pressure"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Blood Pressure
        </label>
        <input
          type="text"
          name="weight"
          id="weight"
          placeholder="Enter Blood Pressure"
          className=" border rounded w-full h-12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-[#F8F9FB"
        />
      </div>
      {/* Allergies */}
      <div>
        <label
          htmlFor="allergies"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Allergies
        </label>
        <input
          type="text"
          name="allergies"
          id="allergies"
          placeholder="Enter allergies"
          className=" border rounded w-full h-12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-[#F8F9FB"
        />
      </div>
      {/* Chronic Conditions */}
      <div>
        <label
          htmlFor="bloodtype"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Blood Type
        </label>
        <select
          id="category"
          name="category"
          className="border w-full h-12 border-[#E6E6E6] outline-none shadow-sm rounded-[6px]"
        >
          <option value="">Select chronic condition</option>
          <option key="bloodA" value="bloodA">
            Blood A
          </option>
        </select>
      </div>
    </form>
  );
};

export default HealthInfo;
