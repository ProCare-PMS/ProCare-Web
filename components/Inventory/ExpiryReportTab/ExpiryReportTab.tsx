import React from "react";
import ExpiryReportStats from "./ExpiryReportStats";
import ExpiryTableHeader from "./ExpiryTableHeader";
import DataTable from "@/components/Tables/data-table";
import { expiryTabColumns } from "@/components/Tables/expiry-tab-columns";
import { expiryReportTable } from "@/type";

const ExpiryReportTab = () => {
  return (
    <div className="container mx-auto px-12">
      <ExpiryReportStats />
      <div className="p-6 bg-white mt-7 shadow-[6px_6px_54px_0_rgba(0,0,0,0.05)]">
        <ExpiryTableHeader />
        <DataTable columns={expiryTabColumns} data={expiryReportTable} />
      </div>
    </div>
  );
};

export default ExpiryReportTab;
