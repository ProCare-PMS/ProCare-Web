import React from "react";
import ProductsTabStats from "./ProductsTabStats";
import ProductsTabHeader from "./ProductsTabHeader";
import customAxios from "@/api/CustomAxios";
import { endpoints } from "@/api/Endpoints";
import { useQuery } from "@tanstack/react-query";
import ProductsContent from "./ProductsContent";

const ProductsTab = () => {
  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ["dashboardData"],
    queryFn: async () =>
      await customAxios.get(endpoints.dashboard).then((res) => res),
    select: (findData) => findData?.data,
  });

  return (
    <div className="">
      {" "}
      {/* Make change here: container mx-auto */}
      <ProductsTabStats dashboardData={dashboardData} isLoading={isLoading} />
      <div className="p-6 bg-white rounded-[12px] mt-7 shadow-[6px_6px_54px_0_rgba(0,0,0,0.05)]">
        <ProductsContent />
      </div>
    </div>
  );
};

export default ProductsTab;
