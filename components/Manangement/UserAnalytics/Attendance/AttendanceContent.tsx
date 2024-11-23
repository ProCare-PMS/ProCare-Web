import React from "react";
import AttendanceTable from "./AttendanceTable";
import { UserPerformanceTableProps } from "../UserPerfomance";

function AttendanceContent({ searchValues }: UserPerformanceTableProps) {
  return (
    <div>
      <AttendanceTable searchValues={searchValues} />
    </div>
  );
}

export default AttendanceContent;
