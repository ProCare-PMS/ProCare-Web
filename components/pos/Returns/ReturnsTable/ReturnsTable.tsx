import Image from "next/image";
import React, { useState } from "react";
import SearchFieldInput from "@/components/SearchFieldInput/SearchFieldInput";
import { Plus, SlidersVertical } from "lucide-react";
import DataTable from "@/components/Tables/data-table";
import { returnHistoryColumns } from "./Columns";
import { returnsHistory } from "./Data";
import { Button } from "@/components/ui/button";
import ReturnsFilters from "../ReturnFilters/ReturnsFilters";

const ReturnsTable = () => {
  const [searchValues, setSetSearchValues] = useState<string>("");
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const handleSearchValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSetSearchValues(event.target.value);
  };

  const toggleFilters = (): void => {
    setShowFilters((prev) => !prev);
  };

  return (
    <div>
      <div className="bg-white shadow-custom p-4 mb-12 rounded-[8px] mt-8">
        <div className="flex justify-end items-center gap-x-2 my-3">
          <SearchFieldInput
            value={searchValues}
            onChange={handleSearchValueChange}
          />

          <Button
            type="button"
            className="text-white flex items-center gap-2 rounded-[12px] font-inter w-[149px]"
            variant="secondary"
          >
            <Plus /> Create Return
          </Button>

          <div className="relative">
            <div
              className="border p-2 cursor-pointer border-[#494A50] rounded-[12px]"
              onClick={toggleFilters}
            >
              <SlidersVertical className="text-[#494A50]" />
            </div>

            {showFilters && <ReturnsFilters />}
          </div>
        </div>

        {/* Databele Here */}
        <DataTable columns={returnHistoryColumns} data={returnsHistory} />
      </div>
    </div>
  );
};

export default ReturnsTable;
