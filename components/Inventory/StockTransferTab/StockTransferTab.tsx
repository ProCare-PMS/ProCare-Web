"use client"
import React, { useState, ChangeEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import customAxios from "@/api/CustomAxios";
import { endpoints } from "@/api/Endpoints";
import StockTransferStats from "./StockTransferStats/StockTransferStats";
import SearchFieldInput from "@/components/SearchFieldInput/SearchFieldInput";
import { CircleCheckBig, ListChecks, Plus } from "lucide-react";
import DataTable from "@/components/Tables/data-table";
import { otherPharmaciesColumns } from "./Columns";
import StockTransferRequest from "./StockTransferRequest/StockTransferRequest";
import StockTransferHistory from "./StockTransferHistory/StockTransferHistory";
import { Button } from "@/components/ui/button";
import AddPharmacyModal from "@/components/Modals/AddPharmacyModal";

const BranchSyncTab = () => {
  const [searchValues, setSearchValues] = useState<string>("");
  const [page, setPage] = useState(1);
  const [showRequests, setShowRequets] = useState<boolean>(false); //showing the requests table
  const [showHistory, setShowHistory] = useState<boolean>(false); //showing the history table
  const [showPharmacyModal, setShowPharmacyModal] = useState<boolean>(false);

  // const { data: inventoryBranchSyncData, isLoading } = useQuery({
  //   queryKey: ["inventoryBranchSync", page],
  //   queryFn: async () =>
  //     await customAxios
  //       .get(`${endpoints.inventoryBranchSync}`)
  //       .then((res) => res),
  //   select: (findData) => findData?.data,
  // });

  //Pharmacies Available
  const { data: pharmaciesData, isLoading } = useQuery({
    queryKey: ["otherPharmacies", page],
    queryFn: async () =>
      await customAxios
        .get(`${endpoints.otherPharmacies}?page=${page}`)
        .then((res) => res),
    select: (findData) => findData?.data,
    
  });

  console.log(pharmaciesData)

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchValues(event.target.value);
  };

  const closePharmacyModal = () => {
    setShowPharmacyModal(false);
  };

  return (
    <div className="">
      {showHistory ? (
        <StockTransferHistory onClose={() => setShowHistory(false)} />
      ) : showRequests ? (
        <StockTransferRequest onClose={() => setShowRequets(false)} />
      ) : (
        <>
          <div>
           

            <div className="bg-white mt-7 shadow-[6px_6px_54px_0_rgba(0,0,0,0.05)] p-6 rounded-[8px]">
              <div className="flex items-center  justify-between mb-6">
                <h2 className="text-[#202224] font-semibold text-2xl">
                  Other Pharmacies
                </h2>

                <div className="flex items-center justify-between space-x-4">
                  <SearchFieldInput
                    value={searchValues}
                    onChange={handleSearchChange}
                    placeholder="Search using pharmacy ID or Name"
                  />

                  <button
                    onClick={() => setShowRequets(true)}
                    className="flex items-center gap-2 border py-2 px-6 border-[#D0D5DD] rounded-[6px]"
                  >
                    <CircleCheckBig className="inline-block align-middle text-sm text-[#6B6C74]" />
                    <span className="inline-block align-middle text-[#6B6C74] font-semibold text-sm">
                      View Requests
                    </span>
                  </button>
                  <button
                    onClick={() => setShowHistory(true)}
                    className="flex items-center gap-2 border py-2 px-6 border-[#D0D5DD] rounded-[6px]"
                  >
                    <ListChecks className="inline-block align-middle text-sm text-[#6B6C74]" />
                    <span className="inline-block align-middle text-[#6B6C74] font-semibold text-sm">
                      View History
                    </span>
                  </button>
                  <Button
                    type="button"
                    className="text-white flex items-center gap-2 tracking-normal rounded-[12px] font-semibold font-inter w-full md:w-[149px]"
                    variant="secondary"
                    onClick={() => setShowPharmacyModal(true)}
                  >
                    <Plus /> Add Pharmacy
                  </Button>
                </div>
              </div>

              {/* DataTable*/}
              {/* <DataTable
                columns={otherPharmaciesColumns}
                data={
                  pharmaciesData || {
                    results: [],
                    count: 0,
                    links: { next: null, previous: null },
                    total_pages: 0,
                  }
                }
                searchValue={searchValues}
                isLoading={isLoading}
                onPageChange={handlePageChange}
              /> */}
            </div>
          </div>

          {showPharmacyModal && (<AddPharmacyModal onClose={closePharmacyModal} />)}
        </>
      )}
    </div>
  );
};

export default BranchSyncTab;
