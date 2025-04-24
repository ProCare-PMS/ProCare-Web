"use client";
import { useState } from "react";
import { PurchaseTabTable } from "@/type";
import { ColumnDef } from "@tanstack/react-table";
import DashboardModal from "../Modals/DashboardModal";
import PurchasesTableModal from "../Modals/PurchasesTableModal";
import { ProductsType } from "./products-tab-columns";
import customAxios from "@/api/CustomAxios";
import { endpoints } from "@/api/Endpoints";
import { useQuery } from "@tanstack/react-query";

export interface PurchaseType {
  created_at: string;
  delivery_status: string;
  id: string;
  modified_at: string;
  pharmacy: string;
  product: ProductsType;
  purchase_date: string;
  quantity: number;
  total_cost: string;
}

interface ActionsCellProps {
  row: {
    original: PurchaseType;
  };
}

const ActionsCell = ({ row }: ActionsCellProps) => {
  const payment = row.original;
  const [modal, setModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<PurchaseType | null>(null);

  return (
    <div>
      <span
        className="text-[#2648EA] cursor-pointer font-semibold text-sm underline"
        onClick={() => {
          setModal(true);
          setSelectedItem(payment);
        }}
      >
        View
      </span>
      {selectedItem && (
        <PurchasesTableModal
          item={selectedItem}
          setModal={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
};

export const purchasesTabColumns: ColumnDef<PurchaseType>[] = [
  {
    accessorKey: "id",
    header: "Purchase ID",
    cell: ({ row }) => {
      const transactionId = row.original.id.substring(0, 5);
      return <span>{`Receipt #${transactionId}...`}</span>;
    },
  },
  {
    accessorKey: "pharmacy",
    header: "Supplier",
    cell: ({ row }) => {
      const supplierId = row.original.pharmacy;

      const { data: supplierData, isLoading } = useQuery({
        queryKey: ["supplier", supplierId],
        queryFn: async () =>
          await customAxios
            .get(`/inventories/suppliers/${supplierId}/`)
            .then((res) => res.data),
      });

      if (!supplierData) {
        return <span>No Supplier</span>;
      }

      // Display supplier name if available, otherwise show ID
      return <span>{supplierData?.name || supplierId}</span>;
    },
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "total_cost",
    header: "Total Price",
    cell: ({ row }) => {
      const value = row.getValue("total_cost");
      // Convert string to number and handle invalid/empty values
      const amount = typeof value === "string" ? parseFloat(value) : 0;

      if (isNaN(amount)) {
        return <div className="!text-left">GHS 0.00</div>;
      }

      const formatted = new Intl.NumberFormat("en-GH", {
        style: "currency",
        currency: "GHS",
      }).format(amount);

      return <div className="!text-left">{formatted}</div>;
    },
  },
  {
    accessorKey: "purchase_date",
    header: "Date",
    cell: ({ row }) => {
      const createdAt = new Date(row.original.purchase_date);
      const formattedDate = createdAt.toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      });

      return <span>{formattedDate}</span>;
    },
  },
  {
    id: "actions",
    cell: ActionsCell,
  },
];

{
  /* 
  cell: ({ row }) => {
    const supplierId = row.original.pharmacy;
    
    // Use React Query hook directly in the cell renderer
    const { data: supplierData, isLoading } = useQuery({
      queryKey: ["supplier", supplierId],
      queryFn: async () => 
        await customAxios.get(`/inventories/suppliers/${supplierId}/`).then((res) => res.data),
      enabled: !!supplierId,
    });
    
    if (isLoading) {
      return <span className="text-gray-400">Loading...</span>;
    }
    
    // Display supplier name if available, otherwise show ID
    return <span>{supplierData?.name || supplierId}</span>;
  },
  */
}
