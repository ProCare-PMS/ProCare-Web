import React from "react";
import DataTable from "@/components/Tables/data-table";
import { Columns } from "./Column";
import { Data } from "./Data";
import { MiniSubTable } from "@/components/MiniSubTable/MiniSubTable";

function PaymentMethodListTable() {
  return (
    <div>
      <MiniSubTable
        columns={Columns}
        data={Data}
        title="Payment Method List"
        link="/page_under_construction"
        height="96"
      />
    </div>
  );
}

export default PaymentMethodListTable;
