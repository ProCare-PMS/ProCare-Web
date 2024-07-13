import React from "react";
import SuppliersTabStats from "./SuppliersTabStats";
import { ExpandableDataTable } from "@/components/Tables/expandable-data-table";
import { suppliersTabColumns } from "@/components/Tables/suppliers-tab-columns";
import { suppliersTabTable } from "@/type";
import SupplierTabHeader from "./SupplierTabHeader";

const SuppliersTab = () => {
  return (
    <div className="min-h-screen">
      <SuppliersTabStats />
      <div className="p-6 bg-white mt-7 shadow-[6px_6px_54px_0_rgba(0,0,0,0.05)]">
        <SupplierTabHeader />
        <ExpandableDataTable
          columns={suppliersTabColumns}
          data={suppliersTabTable}
        />
      </div>
    </div>
  );
};

export default SuppliersTab;
