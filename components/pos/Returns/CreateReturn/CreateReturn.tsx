"use client";

import React, { useState, useEffect } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useQuery } from "@tanstack/react-query";
import customAxios from "@/api/CustomAxios";
import { endpoints } from "@/api/Endpoints";

type CreateReturnProps = {
  setModal: () => void;
};

interface SaleItem {
  id: string;
  pharmacy: string;
  product: {
    id: string;
    name: string;
    selling_price: string;
    unit_price: string;
  };
  quantity: number;
  total_item_price: number;
}

interface SalesData {
  id: string;
  saleitem_set: SaleItem[];
  status: string;
}

const CreateReturn = ({ setModal }: CreateReturnProps) => {
  // State to keep track of product forms
  const [products, setProducts] = useState([{ id: 1 }]);
  const [receiptSelected, setReceiptSelected] = useState(false);
  const [receiptNumber, setReceiptNumber] = useState("");

  // Query to fetch all sales data and search by receipt number
  const { data: allSalesData, isLoading: isLoadingSales } = useQuery({
    queryKey: ["allSalesData"],
    queryFn: async () => {
      const response = await customAxios.get(`${endpoints.sales}`);
      return response.data;
    },
  });

  // Find the specific sale by receipt number
  const salesData = React.useMemo(() => {
    if (!receiptNumber || !allSalesData?.results) return null;
    
    // Search through all sales to find matching receipt
    return allSalesData.results.find((sale: SalesData) => 
      sale.id.toLowerCase().includes(receiptNumber.toLowerCase()) ||
      sale.id.startsWith(receiptNumber)
    ) as SalesData || null;
  }, [receiptNumber, allSalesData]);

  // Function to add a new product form
  const handleAddProduct = () => {
    setProducts((prevProducts) => [
      ...prevProducts,
      { id: prevProducts.length + 1 },
    ]);
  };

  const handleReceiptChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setReceiptNumber(value);
    setReceiptSelected(value !== "");
  };

  // Auto-populate products when sales data is loaded
  useEffect(() => {
    if (salesData?.saleitem_set && salesData.saleitem_set.length > 0) {
      const populatedProducts = salesData.saleitem_set.map((item, index) => ({
        id: index + 1,
        productId: item.product.id,
        productName: item.product.name,
        quantity: item.quantity,
        unitPrice: parseFloat(item.product.selling_price || item.product.unit_price || "0"),
      }));
      setProducts(populatedProducts);
    }
  }, [salesData]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-[80%] p-6 relative">
        <div className="flex justify-between items-center border-b mb-2">
          <h2 className="text-lg font-bold mb-4">Create Product</h2>
          <button
            className="text-gray-500 hover:text-gray-800"
            onClick={setModal}
          >
            <CloseOutlinedIcon />
          </button>
        </div>

        <h2 className="mb-4 tet-[#202224] font-inter text-base">
          RETURN DETAILS
        </h2>
        <form action="">
          <div>
            <div className="flex justify-between">
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Enter Receipt
              </label>
            </div>
            <input
              id="receipt"
              name="receipt"
              type="text"
              placeholder="Enter receipt number"
              value={receiptNumber}
              onChange={handleReceiptChange}
              className="border w-[40%] text-[#858C95] text-base font-normal h-11 border-[#E6E6E6] outline-none rounded-[6px] px-3"
            />
            {isLoadingSales && (
              <p className="text-sm text-blue-600 mt-1">Loading sales data...</p>
            )}
            {receiptNumber.length >= 3 && !isLoadingSales && salesData && (
              <p className="text-sm text-green-600 mt-1">Receipt found! Products loaded.</p>
            )}
            {receiptNumber.length >= 3 && !isLoadingSales && !salesData && (
              <p className="text-sm text-red-600 mt-1">Receipt not found. Please check the receipt number.</p>
            )}
          </div>

          <hr className="my-4" />

          {/* Products Details */}
          <div>
            <h2 className="text-[#202224] font-bold text-base font-inter">
              Products Details
            </h2>
            <div className="overflow-y-auto h-[200px]">
              {products.map((product, index) => {
                const saleItem = salesData?.saleitem_set?.[index];
                return (
                  <div
                    key={product.id}
                    className="grid grid-cols-3 gap-5 mt-3 pb-3 mb-3"
                  >
                    {/* Select Product */}
                    <div className="grid gap-y-2">
                      <label
                        htmlFor=""
                        className="text-[#323539] font-inter font-medium text-sm"
                      >
                        Select Product
                      </label>
                      <select 
                        className="rounded-[4px] py-3 px-2 border border-[#E5E5E7] text-[#858C95] text-sm font-normal"
                        value={saleItem?.product.id || ""}
                        disabled={!!saleItem}
                        onChange={() => {}} // Empty onChange to satisfy React
                      >
                        <option value="">Select product</option>
                        {saleItem && (
                          <option value={saleItem.product.id}>
                            {saleItem.product.name}
                          </option>
                        )}
                      </select>
                    </div>
                    {/* Quantity */}
                    <div className="grid gap-y-2">
                      <label
                        htmlFor=""
                        className="text-[#323539] font-inter font-medium text-sm"
                      >
                        Quantity
                      </label>
                      <input
                        type="number"
                        placeholder="Enter Quantity"
                        value={saleItem?.quantity || ""}
                        readOnly={!!saleItem}
                        onChange={() => {}} // Empty onChange to satisfy React
                        className="rounded-[4px] py-3 px-2 border border-[#E5E5E7] text-[#858C95] text-sm font-normal"
                      />
                    </div>
                    {/* Unit Price */}
                    <div className="grid gap-y-2">
                      <label
                        htmlFor=""
                        className="text-[#323539] font-inter font-medium text-sm"
                      >
                        Unit Price(GHS)
                      </label>
                      <input
                        type="number"
                        placeholder="Enter Unit Price"
                        value={saleItem ? parseFloat(saleItem.product.selling_price || saleItem.product.unit_price || "0") : ""}
                        readOnly={!!saleItem}
                        onChange={() => {}} // Empty onChange to satisfy React
                        className="rounded-[4px] py-3 px-2 border border-[#E5E5E7] text-[#858C95] text-sm font-normal"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between mt-6">
              <div className="grid">
                <h3 className="font-inter text-[#858C95] font-normal text-sm">
                  TOTAL AMOUNT(GHS)
                </h3>
                <span className="font-bold text-xl mt-2 font-inter text-[#202224]">
                  GHS {salesData?.saleitem_set?.reduce((total, item) => total + item.total_item_price, 0).toFixed(2) || "0.00"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={handleAddProduct}
                  disabled={!receiptSelected}
                  className={`border flex-1 rounded-[4px] py-2 px-8 font-inter font-semibold text-sm ${
                    receiptSelected
                      ? " text-[#2648EA] border-[#2648EA]"
                      : "text-[#858C95] border-[#858C95]"
                  }`}
                >
                  Add Product
                </button>
                <button
                  type="submit"
                  className={`rounded-[4px] flex-1 py-2 px-8 text-white font-inter font-semibold text-sm ${
                    receiptSelected ? "  bg-[#2648EA]" : " bg-[#858C95]"
                  }`}
                >
                  Confirm Return
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateReturn;
