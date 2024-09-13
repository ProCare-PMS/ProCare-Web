import React from "react";
import DataTable from "@/components/Tables/data-table";
import { Column } from "./Column";
import { Data } from "./Data";
import { MiniSubTable } from "@/components/MiniSubTable/MiniSubTable";

function UnderPerformingProductTable() {
  return (
    <div>
      <MiniSubTable
        columns={Column}
        data={Data}
        title="Underperforming Product"
        link="/links"
      />
    </div>
  );
}

export default UnderPerformingProductTable;
