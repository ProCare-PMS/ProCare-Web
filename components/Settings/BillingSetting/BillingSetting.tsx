"use client";

import { useState } from "react";
import { FiAlertTriangle } from "react-icons/fi";

const BillingSetting = () => {
  const [selectedPackage, setSelectedPackage] = useState("");

  const handlePackageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPackage(e.target.value);
  };

  return (
    <div className="max-w-4xl p-6">
      {/* Grid Container for Select and Package Info */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Select Package Dropdown */}
        <div className="mb-6">
          <label htmlFor="billingPackage" className="block font-semibold mb-2">
            Package Type
          </label>
          <select
            id="billingPackage"
            value={selectedPackage}
            onChange={handlePackageChange}
            className="w-full border border-gray-300 rounded px-4 py-2"
          >
            <option value="5000">GHC 5,000</option>
            <option value="57000">GHC 57,000</option>
            <option value="50000">GHC 50,000</option>
            <option value="500000">GHC 500,000</option>
          </select>
        </div>

        {/* Package Information Container */}
        <div className="border border-[#D78100] rounded p-4 flex items-start gap-4">
          {/* Warning Icon */}
          <div className="text-[#D78100]">
            <FiAlertTriangle size={40} />
          </div>

          {/* Package Details */}
          <div>
            <h2 className="font-bold text-lg mb-2">Package Name</h2>
            <ol className="list-decimal list-inside text-sm">
              <li>Package description 1</li>
              <li>Package description 2</li>
              <li>Package description 3</li>
              <li>Package description 4</li>
              <li>Package description 5</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Upgrade Button */}
      <div className="flex justify-end">
        <button className="px-16 py-2 bg-[#2648EA] text-white rounded-[0.3rem] shadow-md hover:bg-blue-600">
          Upgrade
        </button>
      </div>
    </div>
  );
};

export default BillingSetting;
