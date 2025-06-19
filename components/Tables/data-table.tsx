"use client";
import React, { useState, useEffect } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  SortingState,
  ColumnFiltersState,
  PaginationState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Loader2 } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchValue?: string;
  isLoading?: boolean;
  initialPageSize?: number;
}

function DataTable<TData, TValue>({
  columns,
  data,
  searchValue = "",
  isLoading = false,
  initialPageSize = 10,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: initialPageSize,
  });
  
  // Available page sizes
  const pageSizeOptions = [5, 10, 20, 50, 100];

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      pagination,
      globalFilter: searchValue,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    // Enable manual pagination if you want server-side pagination
    // manualPagination: true,
    // pageCount: Math.ceil(totalCount / pagination.pageSize),
  });

  // Reset to first page when search changes
  useEffect(() => {
    table.setPageIndex(0);
  }, [searchValue, table]);

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    table.setPageSize(Number(e.target.value));
  };

  // Get pagination info
  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;
  const pageCount = table.getPageCount();
  const canPreviousPage = table.getCanPreviousPage();
  const canNextPage = table.getCanNextPage();

  // Generate page numbers for pagination UI
  const getPageNumbers = () => {
    if (pageCount <= 7) {
      return Array.from({ length: pageCount }, (_, i) => i);
    }

    const pages: (number | string)[] = [0]; // First page
    
    if (pageIndex > 3) {
      pages.push('...');
    }
    
    const rangeStart = Math.max(1, pageIndex - 1);
    const rangeEnd = Math.min(pageCount - 2, pageIndex + 1);
    
    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i);
    }
    
    if (pageIndex < pageCount - 4) {
      pages.push('...');
    }
    
    pages.push(pageCount - 1); // Last page
    
    return pages;
  };

  return (
    <div className="rounded-md w-full">
      <div className="overflow-x-auto border rounded-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-gray-100 hover:bg-gray-200">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="font-bold text-sm text-gray-900 cursor-pointer whitespace-nowrap p-3"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder ? null : (
                      <div className="flex items-center gap-1">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        <span className="inline-block w-4">
                          {{
                            asc: " 🔼",
                            desc: " 🔽",
                          }[header.column.getIsSorted() as string] ?? ""}
                        </span>
                      </div>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-96">
                  <div className="flex items-center justify-center h-full">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                    <span className="ml-2 text-gray-600">Loading data...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="hover:bg-gray-50">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-sm text-gray-700 p-3">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-32 text-center text-gray-500">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {!isLoading && pageCount > 0 && (
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between py-4 px-2">
          <div className="flex items-center gap-2">
            <label htmlFor="page-size-select" className="text-sm text-gray-600">
              Show:
            </label>
            <select
              id="page-size-select"
              value={pageSize}
              onChange={handlePageSizeChange}
              className="p-1 border rounded-md text-sm bg-white"
              disabled={isLoading}
            >
              {pageSizeOptions.map(size => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <span className="text-sm text-gray-600">per page</span>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-2">
            {/* First Page Button */}
            <button
              onClick={() => table.setPageIndex(0)}
              disabled={!canPreviousPage || isLoading}
              className="p-2 border rounded-md disabled:opacity-50 hover:bg-gray-100 transition-colors"
              aria-label="First page"
            >
              <ChevronsLeft className="h-4 w-4" />
            </button>

            {/* Previous Page Button */}
            <button
              onClick={() => table.previousPage()}
              disabled={!canPreviousPage || isLoading}
              className="p-2 border rounded-md disabled:opacity-50 hover:bg-gray-100 transition-colors"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {/* Page Numbers */}
            <div className="flex items-center">
              {getPageNumbers().map((pageNum, index) => {
                if (typeof pageNum === 'string') {
                  return <span key={`ellipsis-${index}`} className="px-2 text-gray-500">...</span>;
                }
                
                const isActive = pageNum === pageIndex;
                return (
                  <button
                    key={pageNum}
                    onClick={() => table.setPageIndex(pageNum)}
                    disabled={isLoading}
                    className={`px-3 py-1 mx-0.5 border rounded-md text-sm transition-colors ${
                      isActive 
                        ? 'bg-blue-500 text-white border-blue-500' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    aria-current={isActive ? "page" : undefined}
                    aria-label={`Page ${pageNum + 1}`}
                  >
                    {pageNum + 1}
                  </button>
                );
              })}
            </div>

            {/* Next Page Button */}
            <button
              onClick={() => table.nextPage()}
              disabled={!canNextPage || isLoading}
              className="p-2 border rounded-md disabled:opacity-50 hover:bg-gray-100 transition-colors"
              aria-label="Next page"
            >
              <ChevronRight className="h-4 w-4" />
            </button>

            {/* Last Page Button */}
            <button
              onClick={() => table.setPageIndex(pageCount - 1)}
              disabled={!canNextPage || isLoading}
              className="p-2 border rounded-md disabled:opacity-50 hover:bg-gray-100 transition-colors"
              aria-label="Last page"
            >
              <ChevronsRight className="h-4 w-4" />
            </button>
          </div>

          {/* Page Info */}
          <div className="text-sm text-gray-600">
            Page {pageIndex + 1} of {pageCount}
            <span className="ml-2 text-gray-500">
              ({table.getFilteredRowModel().rows.length} total items)
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default DataTable;