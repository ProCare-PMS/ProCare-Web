"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import customAxios from "@/api/CustomAxios";
import { analyticsUrls } from "@/api/Endpoints";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartConfig, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis } from "recharts";
import CustomSelect from "@/components/CustomSelect/CustomSelect";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";

interface PaymentMethodData {
    payment_method: string;
    transaction_count: number;
    total_amount: number;
    percentage: number;
}

interface PaymentMethodsAnalyticsData {
    payment_methods: PaymentMethodData[];
    total_transactions: number;
    total_amount: number;
    period: string;
}

const paymentMethodOptions = [
    { date: "mobile_money", dateName: "Mobile Money" },
    { date: "cash", dateName: "Cash" },
    { date: "card", dateName: "Card" },
    { date: "bank_transfer", dateName: "Bank Transfer" },
    { date: "credit", dateName: "Credit" },
    { date: "all", dateName: "All Payment Methods" },
];

const COLORS = [
    "#2648EA", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#06B6D4"
];

const chartConfig = {
    amount: {
        label: "Amount",
        color: "#2648EA",
    },
    transactions: {
        label: "Transactions",
        color: "#10B981",
    },
} satisfies ChartConfig;

export function PaymentMethodsAnalyticsComponent() {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("mobile_money");

    const { data: paymentData, isLoading, refetch } = useQuery({
        queryKey: ["paymentMethodsAnalytics", selectedPaymentMethod],
        queryFn: async () => {
            const url = analyticsUrls.paymentMethods({
                payment_methods: selectedPaymentMethod,
            });
            const response = await customAxios.get(url);
            return response.data;
        },
        select: (data): PaymentMethodsAnalyticsData => {
            return {
                payment_methods: data?.payment_methods || [],
                total_transactions: data?.total_transactions || 0,
                total_amount: data?.total_amount || 0,
                period: data?.period || "Current Period",
            };
        },
    });



    const handleExport = () => {
        console.log("Exporting payment methods analytics data...");
    };

    // Prepare data for pie chart
    const pieChartData = paymentData?.payment_methods?.map((method, index) => ({
        name: method.payment_method,
        value: method.total_amount,
        count: method.transaction_count,
        percentage: method.percentage,
        color: COLORS[index % COLORS.length],
    })) || [];

    // Prepare data for bar chart
    const barChartData = paymentData?.payment_methods?.map(method => ({
        method: method.payment_method,
        amount: method.total_amount,
        transactions: method.transaction_count,
    })) || [];

    return (
        <div className="bg-white shadow-custom p-6 mb-12 rounded-[8px] mt-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold font-nunito_sans text-[#202224]">
                    Payment Methods Analytics
                </h2>

                <div className="flex gap-4 items-center">
                    <div className="w-48">
                        <CustomSelect
                            idField="date"
                            nameField="dateName"
                            optionData={paymentMethodOptions}
                            value={paymentMethodOptions.find(option => option.date === selectedPaymentMethod)}
                            onChange={(selected) => setSelectedPaymentMethod(selected?.date || "mobile_money")}
                        />
                    </div>

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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">
                            Total Amount
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-[#2648EA]">
                            ₵{paymentData?.total_amount?.toLocaleString() || 0}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">
                            Total Transactions
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">
                            {paymentData?.total_transactions?.toLocaleString() || 0}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">
                            Payment Methods
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-purple-600">
                            {paymentData?.payment_methods?.length || 0}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Pie Chart - Distribution by Amount */}
                <Card>
                    <CardHeader>
                        <CardTitle>Payment Distribution by Amount</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig}>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={pieChartData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percentage }) => `${name}: ${percentage.toFixed(1)}%`}
                                        outerRadius={100}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {pieChartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <ChartTooltip
                                        content={({ active, payload }) => {
                                            if (active && payload && payload.length) {
                                                const data = payload[0].payload;
                                                return (
                                                    <div className="bg-white p-3 border rounded shadow">
                                                        <p className="font-medium">{data.name}</p>
                                                        <p className="text-sm">Amount: ₵{data.value.toLocaleString()}</p>
                                                        <p className="text-sm">Transactions: {data.count}</p>
                                                        <p className="text-sm">Percentage: {data.percentage.toFixed(1)}%</p>
                                                    </div>
                                                );
                                            }
                                            return null;
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>

                {/* Bar Chart - Comparison */}
                <Card>
                    <CardHeader>
                        <CardTitle>Payment Methods Comparison</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig}>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={barChartData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis
                                        dataKey="method"
                                        tick={{ fontSize: 12 }}
                                        angle={-45}
                                        textAnchor="end"
                                    />
                                    <YAxis />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <Bar
                                        dataKey="amount"
                                        fill={chartConfig.amount.color}
                                        radius={4}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>

            {/* Detailed Breakdown Table */}
            <Card className="mt-6">
                <CardHeader>
                    <CardTitle>Detailed Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left p-3 font-medium">Payment Method</th>
                                    <th className="text-right p-3 font-medium">Transactions</th>
                                    <th className="text-right p-3 font-medium">Total Amount</th>
                                    <th className="text-right p-3 font-medium">Percentage</th>
                                    <th className="text-right p-3 font-medium">Avg per Transaction</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paymentData?.payment_methods?.map((method, index) => (
                                    <tr key={index} className="border-b hover:bg-gray-50">
                                        <td className="p-3 font-medium">{method.payment_method}</td>
                                        <td className="text-right p-3">{method.transaction_count.toLocaleString()}</td>
                                        <td className="text-right p-3">₵{method.total_amount.toLocaleString()}</td>
                                        <td className="text-right p-3">{method.percentage.toFixed(1)}%</td>
                                        <td className="text-right p-3">
                                            ₵{method.transaction_count > 0
                                                ? Math.round(method.total_amount / method.transaction_count).toLocaleString()
                                                : 0}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            {isLoading && (
                <div className="flex justify-center items-center py-8">
                    <div className="text-gray-500">Loading payment methods analytics...</div>
                </div>
            )}
        </div>
    );
}

export default PaymentMethodsAnalyticsComponent;