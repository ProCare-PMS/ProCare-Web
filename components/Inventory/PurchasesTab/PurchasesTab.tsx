import DataTable from "@/components/Tables/data-table";
import { purchasesTabColumns } from "@/components/Tables/purchases-tab-columns";
import { purchaseTabTable } from "@/type";
import React from "react";
import PurchasesTabHeader from "./PurchasesTabHeader";
import PurchasesTabEmptyState from "./PurchasesTabEmptyState";

const PurchasesTab = () => {
  return (
    <div className="container mx-auto px-12">
      {purchaseTabTable.length === 0 ? (
        <PurchasesTabEmptyState />
      ) : (
        <>
          <div className="p-6 bg-white mt-7 shadow-[6px_6px_54px_0_rgba(0,0,0,0.05)]">
            <PurchasesTabHeader />
            <DataTable columns={purchasesTabColumns} data={purchaseTabTable} />
          </div>
        </>
      )}
    </div>
  );
};

export default PurchasesTab;
