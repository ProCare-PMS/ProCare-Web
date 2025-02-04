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
import { useQuery } from "@tanstack/react-query";
import customAxios from "@/api/CustomAxios";
import { endpoints } from "@/api/Endpoints";

const ReturnsTable = () => {
  const { data: returnsData, isLoading } = useQuery({
    queryKey: ["posReturns"],
    queryFn: async () =>
      await customAxios.get(endpoints.posReturns).then((res) => res),
    select: (findData) => findData?.data,
  });

  console.log(returnsData)



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
        <div className="flex justify-between items-center gap-x-2 my-3">
          <h2 className="text-2xl font-bold  text-[#202224]">
            Returns History
          </h2>

          <div className="flex items-center gap-x-2">
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
        </div>

        {/* Databele Here */}
        <DataTable
          columns={returnHistoryColumns}
          data={returnsData  || { results: [], count: 0, links: { next: null, previous: null }, total_pages: 0 }}
          searchValue={searchValues}
          isLoading={isLoading}
        />
      </div>

      {showCreateReturn && (
        <CreateReturn setModal={() => setShowCreateReturn(false)} />
      )}
    </div>
  );
};

export default ReturnsTable;
