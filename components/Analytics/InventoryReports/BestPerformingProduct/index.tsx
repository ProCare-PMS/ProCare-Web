import React from "react";
import DataTable from "@/components/Tables/data-table";
import { Column } from "./Column";
import { Data } from "./Data";
import { MiniSubTable } from "@/components/MiniSubTable/MiniSubTable";
import { useQuery } from "@tanstack/react-query";
import customAxios from "@/api/CustomAxios";
import { endpoints } from "@/api/Endpoints";

function BestPerformingProductTable() {
  const { data: bestPerformingProductData } = useQuery({
    queryKey: ["bestPerformingProduct"],
    queryFn: () =>
      customAxios
        .get(endpoints.analytics + "products/best-performing/")
        .then((res) => res),
    select: (bestProduct) => bestProduct?.data?.results || [],
  });

  //console.log({ bestPerformingProductData });
  return (
    <div>
      <MiniSubTable
        columns={Column}
        data={bestPerformingProductData}
        title="Best Performing Products"
        link="/page_under_construction"
      />
    </div>
  );
}

export default BestPerformingProductTable;
