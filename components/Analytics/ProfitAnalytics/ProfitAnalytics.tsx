"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import customAxios from "@/api/CustomAxios";
import { analyticsUrls } from "@/api/Endpoints";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartConfig, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Line, LineChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Bar, BarChart } from "recharts";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { TrendingUp, TrendingDown } from "lucide-react";

interface ProfitData {
    total_profit: number;
    gross_profit: number;
    net_profit: number;
    profit_margin: number;
    period: string;
    daily_breakdown?: Array<{
        date: string;
        profit: number;
        revenue: number;
        expenses: number;
    }>;
    top_profitable_products?: Array<{
        product_id: string;
        product_name: string;
        profit: number;
        profit_margin: number;
    }>;
}

const chartConfig = {
    profit: {
        label: "Profit",
        color: "#10B981",
    },
    revenue: {
        label: "Revenue",
        color: "#2648EA",
    },
    expenses: {
        label: "Expenses",
        color: "#EF4444",
    },
} satisfies ChartConfig;

export function ProfitAnalyticsComponent() {
    // Use the specific date from your example: April 2025
    const [selectedMonth] = useState<number>(4);
    const [selectedYear] = useState<number>(2025);

    const { data: profitData, isLoading, refetch } = useQuery({
        queryKey: ["profitAnalytics", selectedMonth, selectedYear],
        queryFn: async () => {
            const url = analyticsUrls.profit({
                month: selectedMonth,
                year: selectedYear,
            });
            const response = await customAxios.get(url);
            return response.data;
        },
        select: (data): ProfitData => {
            return {
                total_profit: data?.total_profit || 0,
                gross_profit: data?.gross_profit || 0,
                net_profit: data?.net_profit || 0,
                profit_margin: data?.profit_margin || 0,
                period: data?.period || `${selectedMonth}/${selectedYear}`,
                daily_breakdown: data?.daily_breakdown || [],
                top_profitable_products: data?.top_profitable_products || [],
            };
        },
    });

    const handleExport = () => {
        console.log("Exporting profit analytics data...");
    };

    // Prepare chart data for daily breakdown
    const chartData = profitData?.daily_breakdown?.map(item => ({
        date: new Date(item.date).toLocaleDateString(),
        profit: item.profit,
        revenue: item.revenue,
        expenses: item.expenses,
    })) || [];

    // Calculate profit trend
    const profitTrend = chartData.length >= 2
        ? chartData[chartData.length - 1].profit - chartData[0].profit
        : 0;

    return (
        <div className="bg-white shadow-custom p-6 mb-12 rounded-[8px] mt-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold font-nunito_sans text-[#202224]">
                    Profit Analytics - April 2025
                </h2>

                <div className="flex gap-4 items-center">
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
                            Total Profit
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">
                            ₵{profitData?.total_profit?.toLocaleString() || 0}
                        </div>
                        <div className="flex items-center gap-1 text-sm mt-1">
                            {profitTrend >= 0 ? (
                                <TrendingUp className="h-4 w-4 text-green-500" />
                            ) : (
                                <TrendingDown className="h-4 w-4 text-red-500" />
                            )}
                            <span className={profitTrend >= 0 ? "text-green-500" : "text-red-500"}>
                                {Math.abs(profitTrend).toFixed(0)} vs start of period
                            </span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">
                            Gross Profit
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-blue-600">
                            ₵{profitData?.gross_profit?.toLocaleString() || 0}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">
                            Net Profit
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-purple-600">
                            ₵{profitData?.net_profit?.toLocaleString() || 0}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">
                            Profit Margin
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-orange-600">
                            {profitData?.profit_margin?.toFixed(1) || 0}%
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Profit Trend Chart */}
            {chartData.length > 0 && (
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>Daily Profit Trend</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig}>
                            <ResponsiveContainer width="100%" height={350}>
                                <LineChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis
                                        dataKey="date"
                                        tick={{ fontSize: 12 }}
                                        angle={-45}
                                        textAnchor="end"
                                    />
                                    <YAxis />
                                    <ChartTooltip
                                        content={({ active, payload, label }) => {
                                            if (active && payload && payload.length) {
                                                return (
                                                    <div className="bg-white p-3 border rounded shadow">
                                                        <p className="font-medium">{label}</p>
                                                        <p className="text-sm text-green-600">
                                                            Profit: ₵{payload.find(p => p.dataKey === 'profit')?.value?.toLocaleString()}
                                                        </p>
                                                        <p className="text-sm text-blue-600">
                                                            Revenue: ₵{payload.find(p => p.dataKey === 'revenue')?.value?.toLocaleString()}
                                                        </p>
                                                        <p className="text-sm text-red-600">
                                                            Expenses: ₵{payload.find(p => p.dataKey === 'expenses')?.value?.toLocaleString()}
                                                        </p>
                                                    </div>
                                                );
                                            }
                                            return null;
                                        }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="profit"
                                        stroke={chartConfig.profit.color}
                                        strokeWidth={3}
                                        dot={{ fill: chartConfig.profit.color }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="revenue"
                                        stroke={chartConfig.revenue.color}
                                        strokeWidth={2}
                                        strokeDasharray="5 5"
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="expenses"
                                        stroke={chartConfig.expenses.color}
                                        strokeWidth={2}
                                        strokeDasharray="5 5"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>
            )}

            {/* Top Profitable Products */}
            {profitData?.top_profitable_products && profitData.top_profitable_products.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Top Profitable Products</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left p-3 font-medium">Product Name</th>
                                        <th className="text-right p-3 font-medium">Profit</th>
                                        <th className="text-right p-3 font-medium">Profit Margin</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {profitData.top_profitable_products.map((product, index) => (
                                        <tr key={index} className="border-b hover:bg-gray-50">
                                            <td className="p-3 font-medium">{product.product_name}</td>
                                            <td className="text-right p-3 text-green-600 font-bold">
                                                ₵{product.profit.toLocaleString()}
                                            </td>
                                            <td className="text-right p-3">
                                                <span className={`font-medium ${product.profit_margin > 20 ? 'text-green-600' :
                                                        product.profit_margin > 10 ? 'text-orange-600' : 'text-red-600'
                                                    }`}>
                                                    {product.profit_margin.toFixed(1)}%
                                                </span>
                                            </td>
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
                    <div className="text-gray-500">Loading profit analytics...</div>
                </div>
            )}
        </div>
    );
}

export default ProfitAnalyticsComponent;