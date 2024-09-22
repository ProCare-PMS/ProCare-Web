import DataTable from "@/components/Tables/data-table";
import { Columns } from "./Column";
import { Data } from "./Data";
import React from "react";

// Define the props interface
export interface UserPerformanceTableProps {
  searchValues: string; // Define the type for the searchValues prop
}

// Use the interface in the component
function UserPerfomanceTable({ searchValues }: UserPerformanceTableProps) {
  return (
    <div>
      <DataTable columns={Columns} data={Data} searchValue={searchValues} />
    </div>
  );
}

export default UserPerfomanceTable;
