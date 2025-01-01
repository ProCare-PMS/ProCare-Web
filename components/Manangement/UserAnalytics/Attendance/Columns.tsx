"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import AttendanceDetails from "./AttendanceDetails/AttendanceDetails";
import { AttendanceItems } from "@/lib/Types";

interface ActionsCellProps {
  row: {
    original: AttendanceItems;
  };
}

const ActionsCell = ({ row }: ActionsCellProps) => {
  const attendanceRow = row.original;
  const [modal, setModal] = useState(false);

  const handleOpenModal = () => {
    setModal(true);
  };

  const handleCloseModal = () => {
    setModal(false);
  };

  return (
    <div>
      <span
        className="text-[#2648EA] cursor-pointer font-semibold text-sm underline"
        onClick={handleOpenModal}
      >
        View
      </span>
      {modal && (
        <AttendanceDetails
          title="Attendance Details"
          item={attendanceRow}
          setModal={handleCloseModal}
        />
      )}
    </div>
  );
};

export const Columns: ColumnDef<AttendanceItems>[] = [
  {
    accessorKey: "employee_name",
    header: "Name",
  },
  {
    accessorKey: "total_hours",
    header: "Total Hours",
  },
  {
    accessorKey: "time",
    header: "Time at work",
  },
  // {
  //   accessorKey: "percentage",
  //   header: "Time at work (%)",
  // },
  {
    accessorKey: "clock_in",
    header: "Clock-In",
  },
  {
    accessorKey: "clock_out",
    header: "Clock-Out",
  },
  {
    id: "actions",
    cell: ActionsCell,
  },
];
