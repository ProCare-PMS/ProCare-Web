"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import customAxios from "@/api/CustomAxios";
import { analyticsUrls } from "@/api/Endpoints";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DataTable from "@/components/Tables/data-table";
import SearchFieldInput from "@/components/SearchFieldInput/SearchFieldInput";
import Image from "next/image";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { Badge } from "@/components/Badge";

interface StockAdjustmentDetail {
  product_id: string;
  product_name: string;
  previous_stock: number;
  updated_stock: number;
  items_adjusted: number;
  adjustment_type: "increase" | "decrease" | "correction";
  reason: string;
}

interface StockAdjustmentData {
  adjustment_id: string;
  date: string;
  time: string;
  personnel: string;
  total_adjustments: number;
  net_adjustment: number;
  details: StockAdjustmentDetail[];
}

interface StockAdjustmentsResponse {
  adjustments: StockAdjustmentData[];
  summary: {
    total_adjustments: number;
    total_products_affected: number;
    net_stock_change: number;
    adjustment_reasons: Array<{
      reason: string;
      count: number;
    }>;
  };
}

// Column configuration for the data table
const adjustmentColumns = [
  {
    accessorKey: "adjustment_id",
    header: "Adjustment ID",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "time",
    header: "Time",
  },
  {
    accessorKey: "personnel",
    header: "Personnel",
  },
  {
    accessorKey: "total_adjustments",
    header: "Total Adjustments",
    cell: ({ row }: any) => (
      <Badge variant={row.original.net_adjustment >= 0 ? "default" : "destructive"}>
        {row.original.total_adjustments}
      </Badge>
    ),
  },
  {
    accessorKey: "net_adjustment",
    header: "Net Change",
    cell: ({ row }: any) => {
      const netChange = row.original.net_adjustment;
      return (
        <span className={`font-bold ${netChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {netChange >= 0 ? '+' : ''}{netChange}
        </span>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }: any) => (
      <button 
        onClick={() => console.log("View details for:", row.original.adjustment_id)}
        className="text-blue-600 hover:text-blue-800 font-medium"
      >
        View Details
      </button>
    ),
  },
];

export function StockAdjustmentsComponent() {
  const [searchValues, setSearchValues] = useState<string>("");
  const [selectedAdjustment, setSelectedAdjustment] = useState<string | null>(null);

  const { data: adjustmentsData, isLoading, refetch } = useQuery({
    queryKey: ["stockAdjustments"],
    queryFn: async () => {
      const url = analyticsUrls.stockAdjustments();
      const response = await customAxios.get(url);
      return response.data;
    },
    select: (data): StockAdjustmentsResponse => {
      return {
        adjustments: data?.adjustments || [],
        summary: data?.summary || {
          total_adjustments: 0,
          total_products_affected: 0,
          net_stock_change: 0,
          adjustment_reasons: [],
        },
      };
    },
  });

  const handleSearchValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValues(e.target.value);
  };

  const handleExport = () => {
    console.log("Exporting stock adjustments data...");
  };

  const handleViewDetails = (adjustmentId: string) => {
    setSelectedAdjustment(selectedAdjustment === adjustmentId ? null : adjustmentId);
  };

  // Filter adjustments based on search
  const filteredAdjustments = adjustmentsData?.adjustments?.filter(adjustment =>
    adjustment.adjustment_id.toLowerCase().includes(searchValues.toLowerCase()) ||
    adjustment.personnel.toLowerCase().includes(searchValues.toLowerCase())
  ) || [];

  const selectedAdjustmentDetails = adjustmentsData?.adjustments?.find(
    adj => adj.adjustment_id === selectedAdjustment
  );

  return (
    <div className="bg-white shadow-custom p-6 mb-12 rounded-[8px] mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold font-nunito_sans text-[#202224]">
          Stock Adjustments Analytics
        </h2>

        <div className="flex gap-4">
          <SearchFieldInput
            value={searchValues}
            onChange={handleSearchValueChange}
            placeholder="Search adjustments..."
          />

          <span className="iconHolder w-10 h-10 cursor-pointer">
            <Image
              src="/assets/images/filterFrame.svg"
              alt="filter icon"
              width={100}
              height={100}
            />
          </span>
          
          <button
            onClick={handleExport}
            className="border border-gray-200 w-32 flex justify-center items-center rounded-[0.5rem] gap-2 py-2 px-4 hover:bg-gray-50"
          >
            <CloudUploadOutlinedIcon fontSize="small" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Adjustments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#2648EA]">
              {adjustmentsData?.summary?.total_adjustments || 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Products Affected
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {adjustmentsData?.summary?.total_products_affected || 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Net Stock Change
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${
              (adjustmentsData?.summary?.net_stock_change || 0) >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {(adjustmentsData?.summary?.net_stock_change || 0) >= 0 ? '+' : ''}
              {adjustmentsData?.summary?.net_stock_change || 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Adjustment Types
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {adjustmentsData?.summary?.adjustment_reasons?.length || 0}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Adjustment Reasons Breakdown */}
      {adjustmentsData?.summary?.adjustment_reasons && adjustmentsData.summary.adjustment_reasons.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Adjustment Reasons</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {adjustmentsData.summary.adjustment_reasons.map((reason, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="font-medium text-gray-800">{reason.reason}</div>
                  <div className="text-2xl font-bold text-blue-600 mt-2">
                    {reason.count}
                  </div>
                  <div className="text-sm text-gray-600">adjustments</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Adjustments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Stock Adjustments History</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={adjustmentColumns.map(col => ({
              ...col,
              cell: col.accessorKey === "actions" ? ({ row }: any) => (
                <button 
                  onClick={() => handleViewDetails(row.original.adjustment_id)}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  {selectedAdjustment === row.original.adjustment_id ? 'Hide Details' : 'View Details'}
                </button>
              ) : col.cell
            }))}
            data={{
              results: filteredAdjustments,
              count: filteredAdjustments.length,
              links: { next: null, previous: null },
              total_pages: 1,
            }}
            isLoading={isLoading}
            searchValue={searchValues}
          />
        </CardContent>
      </Card>

      {/* Adjustment Details Modal/Expandable Section */}
      {selectedAdjustmentDetails && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>
              Adjustment Details - {selectedAdjustmentDetails.adjustment_id}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <p><strong>Date:</strong> {selectedAdjustmentDetails.date}</p>
              <p><strong>Time:</strong> {selectedAdjustmentDetails.time}</p>
              <p><strong>Personnel:</strong> {selectedAdjustmentDetails.personnel}</p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Product</th>
                    <th className="text-right p-3 font-medium">Previous Stock</th>
                    <th className="text-right p-3 font-medium">Updated Stock</th>
                    <th className="text-right p-3 font-medium">Adjustment</th>
                    <th className="text-left p-3 font-medium">Type</th>
                    <th className="text-left p-3 font-medium">Reason</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedAdjustmentDetails.details?.map((detail, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-3 font-medium">{detail.product_name}</td>
                      <td className="text-right p-3">{detail.previous_stock}</td>
                      <td className="text-right p-3">{detail.updated_stock}</td>
                      <td className="text-right p-3">
                        <span className={`font-bold ${
                          detail.items_adjusted >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {detail.items_adjusted >= 0 ? '+' : ''}{detail.items_adjusted}
                        </span>
                      </td>
                      <td className="p-3">
                        <Badge variant={
                          detail.adjustment_type === 'increase' ? 'default' : 
                          detail.adjustment_type === 'decrease' ? 'destructive' : 'secondary'
                        }>
                          {detail.adjustment_type}
                        </Badge>
                      </td>
                      <td className="p-3 text-sm">{detail.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {isLoading && (
        <div className="flex justify-center items-center py-8">
          <div className="text-gray-500">Loading stock adjustments...</div>
        </div>
      )}
    </div>
  );
}

export default StockAdjustmentsComponent;