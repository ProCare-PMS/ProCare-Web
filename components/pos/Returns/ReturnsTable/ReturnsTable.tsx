import Image from "next/image";
import React, { useState } from "react";
import SearchFieldInput from "@/components/SearchFieldInput/SearchFieldInput";
import { Plus, SlidersVertical } from "lucide-react";
import DataTable from "@/components/Tables/data-table";
import { returnHistoryColumns } from "./Columns";
import { returnsHistory } from "./Data";
import { Button } from "@/components/ui/button";
import ReturnsFilters from "../ReturnFilters/ReturnsFilters";
import CreateReturn from "../CreateReturn/CreateReturn";

const ReturnsTable = () => {
  const [searchValues, setSetSearchValues] = useState<string>("");
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [showCreateReturn, setShowCreateReturn] = useState<Boolean>(false);

  const handleSearchValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSetSearchValues(event.target.value);
  };

  const toggleFilters = (): void => {
    setShowFilters((prev) => !prev);
    setShowCreateReturn(false);
  };

  const toggleCreateReturn = (): void => {
    setShowCreateReturn((prev) => !prev);
    setShowFilters(false);
  };

  return (
    <div>
      <div className="bg-white shadow-custom p-4 mb-12 rounded-[8px] mt-8">
        <div className="flex justify-end items-center gap-x-2 my-3">
          <SearchFieldInput
            value={searchValues}
            onChange={handleSearchValueChange}
            placeholder="Search for transaction ID"
          />

          <Button
            type="button"
            className="text-white flex items-center gap-2 rounded-[12px] font-inter w-[149px]"
            variant="secondary"
            onClick={toggleCreateReturn}
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
        <DataTable
          columns={returnHistoryColumns}
          data={returnsHistory}
          searchValue={searchValues}
        />
      </div>

      {showCreateReturn && (
        <CreateReturn setModal={() => setShowCreateReturn(false)} />
      ) }
    </div>
  );
};

export default ReturnsTable;
