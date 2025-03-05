import React, { useState, ChangeEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import customAxios from "@/api/CustomAxios";
import { endpoints } from "@/api/Endpoints";
import DataTable from "@/components/Tables/data-table";
import { requestsColumns } from "./Columns";
import SearchFieldInput from "@/components/SearchFieldInput/SearchFieldInput";
import { ArrowLeft } from "lucide-react";

interface Props {
  onClose: () => void; 
}

const StockTransferRequest = ({ onClose } : Props) => {
  const [page, setPage] = useState(1);
  const [searchValues, setSearchValues] = useState<string>("");
  const { data: inventoryBranchSyncData, isLoading } = useQuery({
    queryKey: ["inventoryBranchSync", page],
    queryFn: async () =>
      await customAxios
        .get(`${endpoints.inventoryBranchSync}?page=${page}`)
        .then((res) => res),
    select: (findData) => findData?.data,
  });

  console.log(inventoryBranchSyncData);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchValues(event.target.value);
  };

  return (
    <div className="bg-white mt shadow-[6px_6px_54px_0_rgba(0,0,0,0.05)] p-6 rounded-[8px]">
      <div className="flex items-center  justify-between mb-6">
        <div className="flex items-center gap-4">
          <ArrowLeft onClick={onClose}  className="cursor-pointer" />
          <h2 className="text-[#202224] font-semibold text-2xl">Requests</h2>
        </div>

        <SearchFieldInput
          value={searchValues}
          onChange={handleSearchChange}
          placeholder="Search by transfer id"
        />
      </div>

      <DataTable
        columns={requestsColumns}
        onPageChange={handlePageChange}
        searchValue={searchValues}
        data={
          inventoryBranchSyncData || {
            results: [],
            count: 0,
            links: { next: null, previous: null },
            total_pages: 0,
          }
        }
      />
    </div>
  );
};

export default StockTransferRequest;
