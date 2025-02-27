"use client";
import React, { useEffect, useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  SortingState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface BackendPaginationData {
  count: number;
  links: {
    next: string | null;
    previous: string | null;
  };
  results: any[];
  total_pages: number;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: BackendPaginationData;
  searchValue?: string;
  isLoading?: boolean;
  onPageChange?: (page: number) => void;
}

function DataTable<TData, TValue>({
  columns,
  data,
  searchValue = "",
  isLoading = false,
  onPageChange,
}: DataTableProps<TData, TValue>) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Reset current page when data changes
  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  const table = useReactTable({
    data: data?.results || [],
    columns,
    state: {
      globalFilter,
      sorting,
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
  });

  useEffect(() => {
    setGlobalFilter(searchValue);
  }, [searchValue]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      onPageChange?.(newPage);
    }
  };

  const handleNextPage = () => {
    if (currentPage < data?.total_pages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      onPageChange?.(newPage);
    }
  };

  // Loading skeleton for table rows
  const LoadingSkeleton = () => (
    <>
      {[...Array(10)].map((_, index) => (
        <TableRow key={`loading-row-${index}`} className="animate-pulse">
          {columns.map((_, colIndex) => (
            <TableCell key={`loading-cell-${index}-${colIndex}`}>
              <div className="h-6 bg-gray-200 rounded w-[80%]"></div>
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );

  return (
    <div className="!rounded-[6px]">
      <Table>
        <TableHeader>
          {table?.getHeaderGroups()?.map((headerGroup) => (
            <TableRow
              className="bg-[#F1F4F9] font-inter p-1 w-full !rounded-[60px] hover:bg-[#dbdee2]"
              key={headerGroup?.id}
            >
              {headerGroup?.headers?.map((header) => (
                <TableHead
                  className="font-bold text-sm text-[#202224] cursor-pointer"
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder ? null : (
                    <div className="flex items-center font-inter">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getIsSorted() ? (
                        header.column.getIsSorted() === "desc" ? (
                          <span className="ml-2"> 🔽</span>
                        ) : (
                          <span className="ml-2"> 🔼</span>
                        )
                      ) : null}
                    </div>
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {isLoading ? (
            <LoadingSkeleton />
          ) : table?.getRowModel().rows?.length ? (
            table?.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="font-inter text-[#202224] text-sm font-normal"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            [...Array(10)].map((_, rowIndex) => (
              <TableRow key={`empty-row-${rowIndex}`}>
                {columns.map((column, colIndex) => (
                  <TableCell key={`empty-cell-${rowIndex}-${colIndex}`}>
                    <span className="text-gray-400 font-bold text-lg">-</span>
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {!isLoading && (
        <div className="flex items-center justify-end space-x-2 py-4">
          <button
            className="border border-[#D0D5DD] font-inter py-2 px-4 rounded-[6px] text-[#344054] font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            className="border border-[#D0D5DD] font-inter py-2 px-4 rounded-[6px] text-[#344054] font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleNextPage}
            disabled={currentPage === data?.total_pages}
          >
            Next
          </button>
          <div className="flex justify-between items-center py-2">
            <p className="text-nowrap text-[#344054] font-inter font-medium text-sm">
              {data?.total_pages > 0
                ? `Page ${currentPage} of ${data?.total_pages}`
                : "No results found"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default DataTable;
