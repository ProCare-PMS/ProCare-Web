import React from "react";
import DataTable from "@/components/Tables/data-table";
import { Column } from "./Column";
import { Data } from "./Data";
import { MiniSubTable } from "@/components/MiniSubTable/MiniSubTable";

function BestPerformingProductTable() {
  return (
    <div>
      <MiniSubTable
        columns={Column}
        data={Data}
        title="Best Performing Products"
        link="/links"
      />
    </div>
  );
}

export default BestPerformingProductTable;
