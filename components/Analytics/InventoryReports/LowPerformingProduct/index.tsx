import React from "react";
import DataTable from "@/components/Tables/data-table";
import { Column } from "./Column";
import { Data } from "./Data";
import { MiniSubTable } from "@/components/MiniSubTable/MiniSubTable";
import customAxios from "@/api/CustomAxios";
import { endpoints } from "@/api/Endpoints";
import { useQuery } from "@tanstack/react-query";

function UnderPerformingProductTable() {
  const { data: worstPerformingProductData } = useQuery({
    queryKey: ["worstPerformingProduct"],
    queryFn: () =>
      customAxios
        .get(endpoints.analytics + "products/worst-performing/")
        .then((res) => res),
    select: (worstProduct) => worstProduct?.data?.results,
  });

  //console.log({ worstPerformingProductData });
  return (
    <div>
      <MiniSubTable
        columns={Column}
        data={worstPerformingProductData || []}
        title="Underperforming Product"
        link="/page_under_construction"
      />
    </div>
  );
}

export default UnderPerformingProductTable;
