"use client";

import { ColumnDef, CellContext } from "@tanstack/react-table";
import { useState } from "react";
import clsx from "clsx";
import { HeldTransaction } from "@/type";
import { Button } from "@/components/ui/button";
import SwalToaster from "@/components/SwalToaster/SwalToaster";
import { usePosContext } from "../context/PosContext";

const ActionsCell = ({ row }: CellContext<HeldTransaction, unknown>) => {
  const transaction = row.original;
  const [isLoading, setIsLoading] = useState(false);
  const { switchToSalesPoint } = usePosContext();

  const handleResumeTransaction = () => {
    setIsLoading(true);
    
    try {
      // Store transaction data in localStorage to resume in POS
      const transactionData = {
        orderList: transaction.sale_items.map(item => ({
          id: `product_${Math.random()}`, // Generate temp ID since we don't have product_id from API
          name: item.name,
          quantity: item.quantity,
          selling_price: item.price,
        })),
        heldTransactionId: transaction.id,
        isResumedTransaction: true,
      };

      localStorage.setItem("orderList", JSON.stringify(transactionData.orderList));
      localStorage.setItem("heldTransactionId", transaction.id);
      localStorage.setItem("isResumedTransaction", "true");

      // Switch to Sales Point tab
      switchToSalesPoint();
      
      SwalToaster(
        "Transaction Resumed!",
        "success",
        "The transaction has been loaded to the POS. You can now continue with the sale."
      );
      
    } catch (error) {
      console.error("Error resuming transaction:", error);
      SwalToaster("Resume Failed", "error", "Unable to resume the transaction. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex gap-2">
      {transaction.status === "on_hold" && (
        <Button
          onClick={handleResumeTransaction}
          disabled={isLoading}
          size="sm"
          className="bg-[#2648EA] hover:bg-[#1d3ba8] text-white rounded-[12px]"
        >
          {isLoading ? "Resuming..." : "Resume"}
        </Button>
      )}
    </div>
  );
};

export const heldTransactionsColumns: ColumnDef<HeldTransaction>[] = [
  {
    accessorKey: "id",
    header: "Transaction ID",
  },
  {
    accessorKey: "created_at",
    header: "Date",
    cell: ({ getValue }) => {
      const value = getValue() as string;
      return new Date(value).toLocaleDateString();
    },
  },
  {
    accessorKey: "created_at",
    header: "Time",
    cell: ({ getValue }) => {
      const value = getValue() as string;
      return new Date(value).toLocaleTimeString();
    },
  },
  {
    accessorKey: "sale_items_count",
    header: "Items Sold",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ getValue }) => {
      const value = getValue() as string;
      return `GH₵${parseFloat(value).toFixed(2)}`;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const value = getValue() as string;
      return (
        <p className="rounded-3xl font-inter text-sm font-normal">
          <span
            className={clsx("rounded-3xl font-inter text-sm font-normal", {
              "text-[#219653] bg-[#21965314] !w-[40px] py-2 rounded-3xl px-3":
                value === "completed",
              "text-[#D34053] bg-[#D3405314] px-3 !w-[40px] py-2":
                value === "on_hold",
            })}
          >
            {value === "on_hold" ? "On Hold" : value === "completed" ? "Completed" : value}
          </span>
        </p>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ActionsCell,
  },
];
