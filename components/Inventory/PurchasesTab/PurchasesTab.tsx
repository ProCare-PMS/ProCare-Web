import DataTable from "@/components/Tables/data-table";
import { purchasesTabColumns } from "@/components/Tables/purchases-tab-columns";
import { purchaseTabTable } from "@/type";
import React, { useState } from "react";
import PurchasesTabHeader from "./PurchasesTabHeader";
import PurchasesTabEmptyState from "./PurchasesTabEmptyState";
import { CiSearch } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import { Plus, SlidersVertical } from "lucide-react";
import SearchFieldInput from "@/components/SearchFieldInput/SearchFieldInput";
import AddPurchase from "./AddPurchase/AddPurchase";

const PurchasesTab = () => {
  const [searchValues, setSetSearchValues] = useState<string>("");
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);

  const handleSearchValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSetSearchValues(event.target.value);
  };

  const closeAddPurhcase = () => {
    setShowPurchaseModal(false);
  };

  return (
    <>
      <div className="p-6 bg-white mt-7 shadow-[6px_6px_54px_0_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[#202224] font-semibold text-2xl">Purchases</h2>

          <div className="flex items-center gap-3">
            <SearchFieldInput
              value={searchValues}
              onChange={handleSearchValueChange}
              placeholder="Search for purchase"
            />

            <Button
              type="button"
              className="text-white relative flex items-center gap-2 rounded-[12px] font-inter w-[149px]"
              variant="secondary"
              onClick={() => setShowPurchaseModal(true)}
            >
              <Plus />
              Add Purchase
            </Button>

            <div className="border p-2  cursor-pointer border-main rounded-[12px]">
              <SlidersVertical className="text-main" />
            </div>
          </div>
        </div>
        <DataTable
          columns={purchasesTabColumns}
          data={purchaseTabTable}
          searchValue={searchValues}
        />
      </div>

      {showPurchaseModal && <AddPurchase onClose={closeAddPurhcase} />}
    </>
  );
};

export default PurchasesTab;
