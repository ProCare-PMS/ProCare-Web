import React from "react";
import { Columns } from "./Columns";
import { Data } from "./Data";
import DataTable from "@/components/Tables/data-table";
import { UserPerformanceTableProps } from "../UserPerfomance";

function AttendanceTable({ searchValues }: UserPerformanceTableProps) {
  return (
    <>
      <DataTable columns={Columns} data={Data} searchValue={searchValues} />
    </>
  );
}

export default AttendanceTable;
