import React, { useState } from "react";
import Image from "next/image";
import SearchFieldInput from "@/components/SearchFieldInput/SearchFieldInput";
import { useQuery } from "@tanstack/react-query";
import customAxios from "@/api/CustomAxios";
import { endpoints } from "@/api/Endpoints";
import ProductStats from "@/components/Tables/ProductStats";

function BestSellingProductTable() {
  const [searchValues, setSetSearchValues] = useState<string>("");

  //fetch all best selling data
  const { data: bestSellingData, isLoading } = useQuery({
    queryKey: ["bestSellingData"],
    queryFn: async () =>
      customAxios
        .get(endpoints.analytics + "products/best-performing/")
        .then((res) => res),
    select: (foundData) => foundData?.data?.products || [],
  });

  const handleSearchValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSetSearchValues(event.target.value);
  };

  return (
    <div className="bg-white shadow-custom p-4 mb-12 rounded-[8px] mt-8">
      <div className="flex justify-between items-center my-3">
        <h2 className="text-2xl font-bold font-nunito_sans text-[#202224]">
          Best-Selling Products
        </h2>

        <div className="flex gap-4">
          <SearchFieldInput
            value={searchValues}
            onChange={handleSearchValueChange}
          />

          <span className="iconHolder w-10 h-10">
            <Image
              src="/assets/images/filterFrame.svg"
              alt="filter icon"
              width={100}
              height={100}
            />
          </span>
        </div>
      </div>

      <ProductStats
        products={bestSellingData || []}
        searchValue={searchValues}
        isLoading={isLoading}
      />
    </div>
  );
}

export default BestSellingProductTable;