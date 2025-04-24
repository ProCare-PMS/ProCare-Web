"use client";

import { DashboardTransactions, dashboardTransactions } from "@/type";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useState } from "react";
import DashboardModal from "../Modals/DashboardModal";
import clsx from "clsx";
import { ProductsType } from "./products-tab-columns";

export type Product = {
  name: string;
  quantity: number;
  price: string;
};

export type DashbaordModalType = {
  id: string;
  date: string;
  time: string;
  itemsSold?: number;
  itemsReturned?: number;
  amount: string;
  soldBy: string;
  type: string;
  status?: string;
  products: Product[];
};

type SaleItem = {
  id: string;
  pharmacy: string;
  product: ProductsType;
  quantity: number;
  total_item_price: number;
};

export interface DashboardRecentTransactions {
  created_at: string;
  discount_type: "percentage" | "fixed";
  discount_value: string;
  employee: string | null;
  id: string;
  modified_at: string;
  payment_methods: string[];
  pharmacy: string;
  saleitem_set: SaleItem[];
  status: "completed" | "pending" | "cancelled";
}

interface ActionsCellProps {
  row: {
    original: DashboardRecentTransactions;
  };
}

const ActionsCell = ({ row }: ActionsCellProps) => {
  const payment = row.original;
  const [modal, setModal] = useState(false);
  const [selectedItem, setSelectedItem] =
    useState<DashboardRecentTransactions | null>(null);

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
        <DashboardModal
          title="Transaction Details"
          item={selectedItem}
          setModal={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
};

export const dashboardTransactionColumns: ColumnDef<DashboardRecentTransactions>[] =
  [
    {
      accessorKey: "id",
      header: "Transaction",
      cell: ({ row }) => {
        const transactionId = row.original.id.substring(0, 5); // Get the first 5 characters
        return <span>{`Receipt #${transactionId}...`}</span>;
      },
    },
    {
      accessorKey: "created_at",
      header: "Date",
      cell: ({ row }) => {
        const createdAt = new Date(row.original.created_at);
        const formattedDate = createdAt.toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        });

        return <span>{formattedDate}</span>;
      },
    },
    {
      accessorKey: "time",
      header: "Time",
      cell: ({ row }) => {
        const createdAt = new Date(row.original.created_at);
        const formattedTime = createdAt.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });

        return <span>{formattedTime}</span>;
      },
    },
    {
      accessorKey: "itemsSold",
      header: "Items Sold",
      cell: ({ row }) => {
        return <span>{row.original.saleitem_set.length}</span>;
      },
    },
    {
      accessorKey: "amount",
      header: () => <div className="text-left">Amount</div>,
      cell: ({ row }) => {
        const totalAmount = row.original.saleitem_set.reduce(
          (sum, item) => sum + item.total_item_price,
          0
        );

        const formatted = new Intl.NumberFormat("en-GH", {
          style: "currency",
          currency: "GHS",
        }).format(totalAmount);

        return <div className="!text-left">{formatted}</div>;
      },
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => {
        // Map payment methods to user-friendly names
        const paymentMethods = row.original.payment_methods.map((method) => {
          switch (method) {
            case "mobile_money":
              return "Momo";
            case "credit_card":
              return "Bank";
            case "cash":
              return "Cash";
            default:
              return method; // Fallback for unknown methods
          }
        });
    
        return (
          <p className="rounded-3xl font-inter text-sm font-normal">
            <span
              className={clsx(
                "rounded-3xl font-inter text-sm font-normal px-3 py-2",
                {
                  "text-[#219653] bg-[#21965314]":
                    row.original.payment_methods.includes("credit_card"),
                  "text-[#FFA70B] bg-[#FFA70B14]":
                    row.original.payment_methods.includes("mobile_money"),
                  "text-[#D34053] bg-[#D3405314]":
                    row.original.payment_methods.includes("Cash"),
                }
              )}
            >
              {paymentMethods.join(", ")}
            </span>
          </p>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => <ActionsCell key={row.original.id} row={row} />,
    },
  ];
