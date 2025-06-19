import DataTable from "@/components/Tables/data-table";
import { purchasesTabColumns } from "@/components/Tables/purchases-tab-columns";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, SlidersVertical } from "lucide-react";
import SearchFieldInput from "@/components/SearchFieldInput/SearchFieldInput";
import AddPurchase from "./AddPurchase/AddPurchase";
import { useQuery } from "@tanstack/react-query";
import customAxios from "@/api/CustomAxios";
import { endpoints } from "@/api/Endpoints";

const PurchasesTab = () => {
  const [searchValues, setSetSearchValues] = useState<string>("");
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);

  const { data: inventoryPurchasesData, isLoading } = useQuery({
    queryKey: ["inventoryPurchases"],
    queryFn: async () =>
      await customAxios.get(endpoints.inventoryPurchase).then((res) => res),
    select: (findData) => findData?.data,
  });



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
          </div>
        </div>
        <DataTable
          columns={purchasesTabColumns}
          data={
            inventoryPurchasesData || {
              results: [],
              count: 0,
              links: { next: null, previous: null },
              total_pages: 0,
            }
          }
          searchValue={searchValues}
          isLoading={isLoading}
        />
      </div>

      {showPurchaseModal && <AddPurchase onClose={closeAddPurhcase} />}
    </>
  );
};

export default PurchasesTab;
