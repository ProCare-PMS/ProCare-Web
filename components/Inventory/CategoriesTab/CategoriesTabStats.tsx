import Image from "next/image";
import React from "react";

interface Props {
  categoryLength: number
}

const CategoriesTabStats = ({ categoryLength } : Props) => {
  return (
    <div className="flex items-center gap-9">
      <div className="border w-[250px] flex gap-5 items-center border-[#D0D5DD] py-3 px-5 rounded-[8px]">
        <Image
          src="/assets/images/stock.png"
          alt="stock svg"
          width={35}
          height={35}
        />
        <div className="grid">
          <span className="font-inter text-[#848199] font-medium text-xs text-left">
            No Of Categories
          </span>
          <span className="font-bold font-inter text-lg">{categoryLength === 0 ? 0 : categoryLength}</span>
        </div>
      </div>

      <div className="border w-[250px] flex gap-5 items-center border-[#D0D5DD] py-3 px-5 rounded-[8px]">
        <Image
          src="/assets/images/top.png"
          alt="stock svg"
          width={35}
          height={35}
        />
        <div className="grid text-right">
          <span className="font-inter text-[#848199] font-medium text-xs text-left">
            Top Category
          </span>
          <span className="font-bold font-inter text-lg">Anti-malarials</span>
        </div>
      </div>
    </div>
  );
};

export default CategoriesTabStats;
