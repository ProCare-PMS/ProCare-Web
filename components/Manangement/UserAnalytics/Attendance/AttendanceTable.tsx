import React from "react";
import { Columns } from "./Columns";
import DataTable from "@/components/Tables/data-table";
import { UserPerformanceTableProps } from "../UserPerfomance";
import { useQuery } from "@tanstack/react-query";
import customAxios from "@/api/CustomAxios";
import { endpoints } from "@/api/Endpoints";

function AttendanceTable({ searchValues }: UserPerformanceTableProps) {
  const { data: getAttendanceData } = useQuery({
    queryKey: ["getAttendanceData"],
    queryFn: async () =>
      await customAxios
        .get(endpoints.managements + "attendance/")
        .then((res) => res),
    select: (findData) => findData?.data?.results,
  });

  return (
    <div>
      <DataTable
        columns={Columns}
        data={getAttendanceData || []}
        searchValue={searchValues}
      />
    </div>
  );
}

export default AttendanceTable;
