import React from "react";
import DataTable from "@/components/Tables/data-table";
// import { productsStockTabColumns } from "@/components/Tables/products-stock-tab-columns";
import { ProductsType } from "@/types/product";
import { PaginationState } from "@/types/pagination";
import { productsStockTabColumns } from "../ProductStock/ProductStockColumn";

interface StockTableProps {
  data: ProductsType[];
  searchValue: string;
  isLoading: boolean;
  pagination: PaginationState;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

const StockTable: React.FC<StockTableProps> = ({
  data,
  searchValue,
  isLoading,
  pagination,
  onPageChange,
  onPageSizeChange,
}) => {
  const startIndex = (pagination.page - 1) * pagination.pageSize;
  const paginatedData = data.slice(startIndex, startIndex + pagination.pageSize);

  return (
    <DataTable
      columns={productsStockTabColumns}
      data={paginatedData}
      searchValue={searchValue}
      isLoading={isLoading}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      pageSize={pagination.pageSize}
    />
  );
};

export default StockTable;