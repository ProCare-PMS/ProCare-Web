"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import StockAdjustMentDetails from "./StokeAdjustMentDetails";

// Define the interface based on your API response
interface StockAdjustment {
  id: string;
  product: string;
  quantity_before: number;
  quantity_after: number;
  adjustment_type: "increase" | "decrease";
  reason: string;
  employee: string;
  created_at: string;
  modified_at: string;
  pharmacy: string;
}

interface ActionsCellProps {
  row: {
    original: StockAdjustment;
  };
}

const ActionsCell = ({ row }: ActionsCellProps) => {
  const stockAdjustment = row.original;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <span
        className="text-[#2648EA] cursor-pointer font-semibold text-sm underline hover:text-[#1a37b8] transition-colors"
        onClick={handleOpenModal}
      >
        View
      </span>
      {isModalOpen && (
        <StockAdjustMentDetails
          title="Stock Adjustment Details"
          stockAdjustment={stockAdjustment} // Pass the API data directly
          setModal={handleCloseModal}
        />
      )}
    </div>
  );
};

// Helper function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit'
  });
};

// Helper function to format time
const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

// Helper function to generate adjustment ID
const generateAdjustmentId = (id: string) => {
  // Take first 8 characters of UUID for display
  return `ADJ-${id.slice(0, 8).toUpperCase()}`;
};

export const Columns: ColumnDef<StockAdjustment>[] = [
  {
    accessorKey: "id",
    header: "Adjustment ID",
    cell: ({ getValue }) => generateAdjustmentId(getValue() as string),
  },
  {
    accessorKey: "created_at",
    id: "date", // Add unique id for date column
    header: "Date",
    cell: ({ getValue }) => formatDate(getValue() as string),
  },
  {
    accessorKey: "created_at",
    id: "time", // Add unique id for time column
    header: "Time",
    cell: ({ getValue }) => formatTime(getValue() as string),
  },
  {
    accessorKey: "adjustment_type",
    header: "Type",
    cell: ({ getValue }) => {
      const type = getValue() as string;
      return (
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
          type === 'increase' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {type === 'increase' ? 'Increase' : 'Decrease'}
        </span>
      );
    },
  },
  {
    accessorKey: "quantity_before",
    header: "Qty Before",
    cell: ({ getValue }) => {
      const value = getValue() as number;
      return value !== null ? value.toLocaleString() : '-';
    },
  },
  {
    accessorKey: "quantity_after",
    header: "Qty After",
    cell: ({ getValue }) => {
      const value = getValue() as number;
      return value !== null ? value.toLocaleString() : '-';
    },
  },
  {
    accessorKey: "reason",
    header: "Reason",
    cell: ({ getValue }) => {
      const reason = getValue() as string;
      return reason || 'No reason provided';
    },
  },
  {
    accessorKey: "employee",
    header: "Personnel",
    cell: ({ getValue }) => {
      const employeeId = getValue() as string;
      // You might want to fetch employee details or display just the ID
      return `EMP-${employeeId.slice(0, 8).toUpperCase()}`;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ActionsCell,
  },
];