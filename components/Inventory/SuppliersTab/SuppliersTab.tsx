import React, { useState } from "react";
import SuppliersTabStats from "./SuppliersTabStats";
import { ExpandableDataTable } from "@/components/Tables/expandable-data-table";
import { suppliersTabColumns } from "@/components/Tables/suppliers-tab-columns";
import { suppliersTabTable } from "@/type";
import SupplierTabHeader from "./SupplierTabHeader";
import { CiSearch } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import { Plus, SlidersVertical } from "lucide-react";
import SearchFieldInput from "@/components/SearchFieldInput/SearchFieldInput";
import AddSupplier from "./AddSupplier/AddSupplier";

const SuppliersTab = () => {
  const [searchValues, setSetSearchValues] = useState<string>("");
  const [showSupplierModal, setShowSupplierModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); //add supplier modeal

  const handleSearchValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSetSearchValues(event.target.value);
  };

  const closeAddSupplier = () => {
    setShowSupplierModal(false);
  };

  return (
    <>
      <div className="">
        <SuppliersTabStats />
        <div className="p-6 bg-white mt-7 shadow-[6px_6px_54px_0_rgba(0,0,0,0.05)]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[#202224] font-semibold text-2xl">Suppliers</h2>

            <div className="flex items-center gap-3">
              <SearchFieldInput
                value={searchValues}
                onChange={handleSearchValueChange}
                placeholder="Search for supplier"
              />

              <Button
                type="button"
                className="text-white relative flex items-center gap-2 rounded-[12px] font-inter w-[149px]"
                variant="secondary"
                onClick={() => setShowSupplierModal(true)}
              >
                <Plus />
                Add Supplier
              </Button>

              <div className="border p-2  cursor-pointer border-[#494A50] rounded-[12px]">
                <SlidersVertical className="text-[#494A50]" />
              </div>
            </div>
          </div>
          <ExpandableDataTable
            columns={suppliersTabColumns}
            data={suppliersTabTable}
            searchValue={searchValues}
          />
        </div>
      </div>

      {/* Add Supplier Modal */}
      {showSupplierModal && <AddSupplier onClose={closeAddSupplier} />}
    </>
  );
};

export default SuppliersTab;
