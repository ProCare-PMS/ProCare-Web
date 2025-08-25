"use client";

import { ColumnDef, CellContext } from "@tanstack/react-table";
import { useState } from "react";
import clsx from "clsx";
import { HeldTransaction } from "@/type";
import { Button } from "@/components/ui/button";
import SwalToaster from "@/components/SwalToaster/SwalToaster";
import { usePosContext } from "../context/PosContext";
import { useGetHeldTransactionDetails } from "@/hooks/customer/useHeldTransactionActions";
import { storeTransactionCache, getTransactionCache, clearTransactionCache } from "@/lib/transactionStorage";

const TransactionIdCell = ({ value }: { value: string }) => {
  const [showFull, setShowFull] = useState(false);
  const truncatedId = value.length > 12 ? `${value.substring(0, 12)}...` : value;
  
  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-xs">
        {showFull ? value : truncatedId}
      </span>
      {value.length > 12 && (
        <button
          onClick={() => setShowFull(!showFull)}
          className="text-blue-600 hover:text-blue-800 text-xs font-medium"
        >
          {showFull ? "Less" : "More"}
        </button>
      )}
    </div>
  );
};

const ActionsCell = ({ row }: CellContext<HeldTransaction, unknown>) => {
  const transaction = row.original;
  const [isLoading, setIsLoading] = useState(false);
  const { switchToSalesPoint } = usePosContext();
  const getHeldTransactionDetails = useGetHeldTransactionDetails();

  const handleResumeTransaction = async () => {
    setIsLoading(true);
    
    try {
      // 🎯 DUAL STORAGE STRATEGY: Database First, localStorage as Cache
      
      // Step 1: Fetch fresh data from database (ensures data integrity)
      const freshTransactionData = await getHeldTransactionDetails.mutateAsync(transaction.id);
      
      if (!freshTransactionData) {
        throw new Error("Failed to fetch transaction data from database");
      }

      // Step 2: Transform data for POS consumption
      const orderList = freshTransactionData.sale_items.map((item: any, index: number) => {
        // Handle different possible data structures
        let productName = '';
        let productQuantity = 0;
        let productPrice = '0';
        
        // Extract product name - could be in different fields
        if (typeof item.name === 'string') {
          productName = item.name;
        } else if (typeof item.product === 'string') {
          productName = item.product;
        } else if (item.product && typeof item.product === 'object' && item.product.name) {
          productName = item.product.name;
        } else {
          productName = 'Unknown Product';
        }
        
        // Extract quantity
        if (typeof item.quantity === 'number') {
          productQuantity = item.quantity;
        } else if (typeof item.quantity === 'string') {
          productQuantity = parseInt(item.quantity) || 0;
        } else {
          productQuantity = 0;
        }
        
        // Extract price - could be in different fields
        if (typeof item.price === 'string' || typeof item.price === 'number') {
          productPrice = item.price.toString();
        } else if (typeof item.selling_price === 'string' || typeof item.selling_price === 'number') {
          productPrice = item.selling_price.toString();
        } else if (typeof item.total_item_price === 'string' || typeof item.total_item_price === 'number') {
          productPrice = item.total_item_price.toString();
        } else if (item.product && typeof item.product === 'object' && item.product.selling_price) {
          productPrice = item.product.selling_price.toString();
        } else {
          productPrice = '0';
        }
        
        const transformedItem = {
          id: `held_${transaction.id}_${index}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          original_product_id: item.id, // Store the original product ID for API calls
          name: productName,
          quantity: productQuantity,
          selling_price: productPrice,
        };
        
        return transformedItem;
      });

      // Validate transformed data
      const invalidItems = orderList.filter((item: any) => 
        !item.name || 
        item.name === 'Unknown Product' || 
        item.quantity <= 0 || 
        !item.selling_price || 
        item.selling_price === '0'
      );

      if (invalidItems.length > 0) {
        throw new Error(`Found ${invalidItems.length} invalid items in the transaction data`);
      }

      // Step 3: Store in localStorage as cache (for performance)
      const cacheResult = storeTransactionCache({
        orderList,
        heldTransactionId: transaction.id,
        isResumedTransaction: true,
        source: 'database'
      });

      if (!cacheResult.success) {
        // Continue anyway since database data is available
      }

      // Step 4: Switch to Sales Point tab
      switchToSalesPoint();
      
      SwalToaster(
        "Transaction Resumed!",
        "success",
        "The transaction has been loaded to the POS from the database. You can now continue with the sale."
      );
      
    } catch (error) {
      // 🚨 FALLBACK: Try to use localStorage if database fails
      try {
        const cacheResult = getTransactionCache();
        if (cacheResult.success && cacheResult.data) {
          const cachedData = cacheResult.data;
          
                  if (cachedData.heldTransactionId === transaction.id) {
          // Use cached data as fallback
          localStorage.setItem("orderList", JSON.stringify(cachedData.orderList));
          localStorage.setItem("heldTransactionId", cachedData.heldTransactionId);
          localStorage.setItem("isResumedTransaction", "true");
          
          switchToSalesPoint();
          
          SwalToaster(
            "Transaction Resumed (Cached)!",
            "warning",
            `Using cached data from ${cachedData.source}. Some information may be outdated. Please verify the transaction details.`
          );
          return;
        }

              } else {
          // Cache fallback failed, continue to error handling
        }
      } catch (fallbackError) {
        // Fallback failed, continue to error handling
      }
      
      // If both database and fallback fail
      SwalToaster(
        "Resume Failed", 
        "error", 
        "Unable to resume the transaction. Please try again or contact support if the issue persists."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex gap-2">
      {transaction.status === "on_hold" && (
        <span
          onClick={handleResumeTransaction}
          className={`cursor-pointer text-[#2648EA] font-bold hover:underline ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLoading ? "Loading..." : "View"}
        </span>
      )}
    </div>
  );
};

export const heldTransactionsColumns: ColumnDef<HeldTransaction>[] = [
  {
    accessorKey: "id",
    header: "Transaction ID",
    size: 180,
    maxSize: 250,
    minSize: 150,
    cell: ({ getValue }) => {
      const value = getValue() as string;
      return <TransactionIdCell value={value} />;
    },
  },
  {
    accessorKey: "created_at",
    header: "Date",
    size: 100,
    maxSize: 100,
    minSize: 90,
    cell: ({ getValue }) => {
      const value = getValue() as string;
      return new Date(value).toLocaleDateString();
    },
  },
  {
    id: "time",
    header: "Time",
    size: 120,
    maxSize: 120,
    accessorFn: (row) => row.created_at,
    cell: ({ getValue }) => {
      const value = getValue() as string;
      return new Date(value).toLocaleTimeString();
    },
  },
  {
    accessorKey: "sale_items_count",
    header: "Items Sold",
    size: 100,
    maxSize: 100,
  },
  {
    accessorKey: "amount",
    header: "Amount",
    size: 120,
    maxSize: 120,
    cell: ({ getValue }) => {
      const value = getValue() as string;
      return `GH₵${parseFloat(value).toFixed(2)}`;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    size: 120,
    maxSize: 120,
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
    header: "", // "Actions" - commented out
    size: 120,
    maxSize: 120,
    cell: ActionsCell,
  },
];
