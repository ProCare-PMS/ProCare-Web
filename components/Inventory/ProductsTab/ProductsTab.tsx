import React from "react";
import ProductsTabStats from "./ProductsTabStats";
import ProductsTabHeader from "./ProductsTabHeader";
import { ExpandableDataTable } from "@/components/Tables/expandable-data-table";
import { productsTabColumns } from "@/components/Tables/products-tab-columns";
import { productsTabTable } from "@/type";
import customAxios from "@/api/CustomAxios";
import { endpoints } from "@/api/Endpoints";
import { useQuery } from "@tanstack/react-query";

const ProductsTab = () => {
  const { data: dashboardData } = useQuery({
    queryKey: ["dashboardData"],
    queryFn: async () =>
      await customAxios.get(endpoints.dashboard).then((res) => res),
    select: (findData) => findData?.data,
  });

  console.log(dashboardData);

  return (
    <div className="">
      {" "}
      {/* Make change here: container mx-auto */}
      <ProductsTabStats dashboardData={dashboardData} />
      <div className="p-6 bg-white rounded-[12px] mt-7 shadow-[6px_6px_54px_0_rgba(0,0,0,0.05)]">
        <ProductsTabHeader />
      </div>
    </div>
  );
};

export default ProductsTab;
