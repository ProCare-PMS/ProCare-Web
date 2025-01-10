import React from "react";
import DataTable from "@/components/Tables/data-table";
import { Columns } from "./Column";
import { Data } from "./Data";
import { MiniSubTable } from "@/components/MiniSubTable/MiniSubTable";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

function PaymentMethodListTable() {
  return (
    <div className="bg-white p-6 rounded-xl flex-1">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold font-nunito_sans text-[#202224]">
          Payment Method List
        </h2>
        <div className="flex gap-3">
          <Link
            href="/page_under_construction"
            className="text-[#2648EA] font-inter flex items-center gap-1 font-semibold text-sm"
          >
            Full view
            <ExternalLink className="text-[#2648EA]" />
          </Link>
        </div>
      </div>
      <MiniSubTable columns={Columns} data={Data} height="96" />
    </div>
  );
}

export default PaymentMethodListTable;
