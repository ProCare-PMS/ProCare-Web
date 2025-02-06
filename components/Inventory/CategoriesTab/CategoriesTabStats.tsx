import Image from "next/image";
import React from "react";
import { CategoryProduct } from "./CategoriesTabProducts";

interface Props {
  categoryLength: number;
  category: CategoryProduct[];
  isLoading: boolean;
}

const CategoriesTabStats = ({ categoryLength, category, isLoading }: Props) => {
  
  const topCategory = category?.length > 0
    ? category.reduce((max, item) =>
        item.product_count > max.product_count ? item : max,
        category[0]
      )
    : null;

  const LoadingSkeleton = () => (
    <div className="flex items-center gap-9 animate-pulse">
      <div className="border w-[250px] flex gap-5 items-center border-[#D0D5DD] py-3 px-5 rounded-[8px]">
        <div className="bg-gray-200 w-[35px] h-[35px] rounded-md"></div>
        <div className="grid flex-1">
          <div className="h-3 bg-gray-200 rounded w-24 mb-2"></div>
          <div className="h-5 bg-gray-200 rounded w-16"></div>
        </div>
      </div>

      <div className="border w-[250px] flex gap-5 items-center border-[#D0D5DD] py-3 px-5 rounded-[8px]">
        <div className="bg-gray-200 w-[35px] h-[35px] rounded-md"></div>
        <div className="grid flex-1">
          <div className="h-3 bg-gray-200 rounded w-24 mb-2"></div>
          <div className="h-5 bg-gray-200 rounded w-20"></div>
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return <LoadingSkeleton />;
  }

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
          <span className="font-bold font-inter text-lg">
            {categoryLength === 0 ? 0 : categoryLength}
          </span>
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
          <span className="font-bold font-inter text-lg">
            {topCategory ? topCategory?.name : "-"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CategoriesTabStats