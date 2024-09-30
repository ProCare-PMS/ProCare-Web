import React from "react";

const PackageInput = () => {
  return (
    <div className="bg-[#EFF0FE] px-10 py-12">
      <h2 className="mb-6">Select package below and confirm payment</h2>
      <form action="">
        <div className="flex flex-col gap-y-3">
          <div className="border peer-checked:border-main bg-white flex items-center gap-3 border-[#9CA3AF] py-2 px-3 rounded-[6px]">
            <input
              type="radio"
              name="package"
              id="5000"
              value="5000"
              className="peer"
            />
            <label
              htmlFor="5000"
              className="text-[#323539] font-semibold text-xl peer-checked:text-main peer-checked:border-main  cursor-pointer"
            >
              GHc5,000{" "}
              <span className="text-[#858C95] font-normal text-xs">/ year</span>
            </label>
          </div>
          <div className="border peer-checked:border-main bg-white flex items-center gap-3 border-[#9CA3AF] py-2 px-3 rounded-[6px]">
            <input
              type="radio"
              name="package"
              id="12000"
              value="12000"
              className="peer"
            />
            <label
              htmlFor="12000"
              className="text-[#323539] font-semibold text-xl peer-checked:text-main peer-checked:border-main  cursor-pointer"
            >
              GHc12,000{" "}
              <span className="text-[#858C95] font-normal text-xs">
                / 3 years
              </span>
            </label>
          </div>
          <div className="border peer-checked:border-main bg-white flex items-center gap-3 border-[#9CA3AF] py-2 px-3 rounded-[6px]">
            <input
              type="radio"
              name="package"
              id="20000"
              value="20000"
              className="peer"
            />
            <label
              htmlFor="20000"
              className="text-[#323539] font-semibold text-xl peer-checked:text-main peer-checked:border-main  cursor-pointer "
            >
              GHc20,000{" "}
              <span className="text-[#858C95] font-normal text-xs peer-checked:border-main">
                / 5 years
              </span>
            </label>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PackageInput;
