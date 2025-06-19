"use client";
import React, { useState, useEffect, useRef } from "react";
import { X } from 'lucide-react';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import customAxios from "@/api/CustomAxios";
import { endpoints } from "@/api/Endpoints";
import SwalToaster from "@/components/SwalToaster/SwalToaster";

interface AddPurchaseProps {
  onClose: () => void;
}

interface ProductForm {
  id: number;
  productId?: string;
  quantity?: string;
  unitPrice?: string;
  searchTerm?: string;
  product?: any; // Store the full product object
}

const AddPurchase = ({ onClose }: AddPurchaseProps) => {
  const [products, setProducts] = useState<ProductForm[]>([{ id: 1 }]);
  const [dropdownStates, setDropdownStates] = useState<{
    [key: number]: boolean;
  }>({});
  const [purchaseDate, setPurchaseDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const queryClient = useQueryClient();
  const dropdownRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const formatDateTime = (date: string) => {
    return `${date}T14:15:22Z`; // Format to match backend's expected format
  };

  const { data: inventoryProducts } = useQuery({
    queryKey: ["inventoryProducts"],
    queryFn: async () =>
      await customAxios.get(endpoints.inventoryProduct).then((res) => res),
    select: (findData) => findData?.data?.results,
  });


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      Object.entries(dropdownRefs.current).forEach(([id, ref]) => {
        if (ref && !ref.contains(event.target as Node)) {
          setDropdownStates((prev) => ({ ...prev, [parseInt(id)]: false }));
        }
      });
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAddProduct = () => {
    setProducts((prevProducts) => [
      ...prevProducts,
      { id: prevProducts.length + 1 },
    ]);
  };

  const handleProductSearch = (searchTerm: string, index: number) => {
    setProducts((prevProducts) => {
      const updatedProducts = [...prevProducts];
      updatedProducts[index] = {
        ...updatedProducts[index],
        searchTerm,
      };
      return updatedProducts;
    });
  };

  const handleProductInputClick = (index: number) => {
    setDropdownStates((prev) => ({ ...prev, [index]: true }));
  };

  const getFilteredProducts = (searchTerm: string) => {
    if (!searchTerm) return inventoryProducts || [];
    return (
      inventoryProducts?.filter((product: any) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      ) || []
    );
  };

  const handleQuantityChange = (index: number, value: string) => {
    setProducts((prevProducts) => {
      const updatedProducts = [...prevProducts];
      updatedProducts[index] = {
        ...updatedProducts[index],
        quantity: value,
      };
      return updatedProducts;
    });
  };

  const calculateTotal = () => {
    return products.reduce((total, product) => {
      const quantity = Number(product.quantity) || 0;
      const price = Number(product.unitPrice) || 0;
      return total + quantity * price;
    }, 0);
  };

  const handleProductSelect = (product: any, index: number) => {
    setProducts((prevProducts) => {
      const updatedProducts = [...prevProducts];
      updatedProducts[index] = {
        ...updatedProducts[index],
        productId: product.id,
        searchTerm: product.name,
        quantity: "",
        unitPrice: product.selling_price,
        product: {
          product_id: product.id,
          quantity: 0, // Reset quantity for the new product
          product_status: "Available",
        },
      };

      return updatedProducts;
    });
    setDropdownStates((prev) => ({ ...prev, [index]: false }));
  };

  const formatPurchaseData = () => {
    return products
      .filter(
        (product) => product.productId && product.quantity && product.product
      )
      .map((product) => {
        // Format the base product data
        const formattedProduct = {
          name: product.product.name,
          strength: product.product.strength || "",
          unit: product.product.unit || "",
          quantity: Number(product.quantity),
          expiry_date: formatDateTime(
            product.product.expiry_date || purchaseDate
          ),
          id: product.productId,
          reorder_level: Number(product.product.reorder_level || 0),
          cost_price: product.product.cost_price || "0",
          markup_percentage: product.product.markup_percentage || "0",
          selling_price: product.product.selling_price || "0",
          category: product.product.category,
          supplier: product.product.supplier,
          brand: product.product.brand || "",
          product_status: "Available",
          manufacture_date: formatDateTime(purchaseDate),
          unit_price: product.product.unit_price || "0",
        };


        // Create the purchase request object
        const purchaseRequest = {
          product: formattedProduct,
          product_id: formattedProduct.id,
          quantity: parseInt(product.quantity || "0"),
          purchase_date: purchaseDate,
        };

        return purchaseRequest;
      });
  };

  

  const addPurchaseMutation = useMutation({
    mutationFn: async (data: Record<string, any>) => {
      try {
        // Clean up the data by removing undefined values
        const cleanData = JSON.parse(JSON.stringify(data));
        console.log("Clean purchase data being sent:", cleanData);

        const response = await customAxios.post(
          endpoints.inventories + "purchases/",
          cleanData
        );
        return response;
      } catch (error: any) {
        console.error("Mutation error details:", {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
        });
        throw error;
      }
    },
  });

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    const purchaseData = formatPurchaseData();

    if (purchaseData.length === 0) {
      SwalToaster("Please add at least one product with quantity!", "error");
      return;
    } 

    try {
      for (const purchase of purchaseData) {
        console.log(purchase)
        await addPurchaseMutation.mutateAsync(purchase);
      }

      queryClient.invalidateQueries({ queryKey: ["inventoryPurchases"] });
      onClose();
      SwalToaster("Purchases added successfully!", "success");
    } catch (error: any) {
      console.error("Purchase error:", error);
      const errorMessage =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        "Failed to add purchases. Please try again.";
      SwalToaster(errorMessage, "error");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white shadow-custom w-[80%] py-4 px-8 mb-12 rounded-[8px] mt-8 grid gap-y-5">
        <div className="flex items-center justify-between gap-4 mb-4">
          <h3 className="font-bold text-2xl font-inter">Add Purchase</h3>
          <X onClick={onClose} className="cursor-pointer" />
        </div>
        <div className="grid">
          <div>
            <h2 className="text-[#202224] font-bold text-base font-inter">
              Purchase Details
            </h2>
            <hr />
            <form onSubmit={handleSubmit} className="mt-4">
              <div className="mb-4 hidden">
                <label className="text-[#323539] font-inter font-medium text-sm">
                  Purchase Date
                </label>
                <input
                  type="date"
                  value={purchaseDate}
                  onChange={(e) => setPurchaseDate(e.target.value)}
                  className="rounded-[4px] py-3 px-2 border border-[#E5E5E7] text-[#858C95] text-sm font-normal w-full"
                />
              </div>
              <div>
                
                <div className="overflow-y-auto h-[200px] p-3">
                  {products.map((product, index) => (
                    <div
                      key={product.id}
                      className="grid grid-cols-3 gap-5 mt-3 pb-3 mb-3"
                    >
                      <div
                        className="grid gap-y-2 relative"
                        ref={(el) => (dropdownRefs.current[index] = el)}
                      >
                        <label className="text-[#323539] font-inter font-medium text-sm">
                          Select Product
                        </label>
                        <input
                          type="text"
                          name="product"
                          className="rounded-[4px] py-3 px-2 border border-[#E5E5E7] text-[#858C95] text-sm font-normal"
                          placeholder="Search product..."
                          value={product.searchTerm || ""}
                          onChange={(e) =>
                            handleProductSearch(e.target.value, index)
                          }
                          onClick={() => handleProductInputClick(index)}
                        />
                        {dropdownStates[index] && (
                          <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md mt-1 max-h-48 overflow-y-auto z-10">
                            {getFilteredProducts(product.searchTerm || "").map(
                              (item: any) => (
                                <div
                                  key={item.id}
                                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                  onClick={() =>
                                    handleProductSelect(item, index)
                                  }
                                >
                                  {item.name}
                                </div>
                              )
                            )}
                          </div>
                        )}
                      </div>
                      <div className="grid gap-y-2">
                        <label className="text-[#323539] font-inter font-medium text-sm">
                          Quantity
                        </label>
                        <input
                          type="number"
                          name="quantity"
                          id="quantity"
                          placeholder="Enter Quantity"
                          value={product.quantity || ""}
                          onChange={(e) =>
                            handleQuantityChange(index, e.target.value)
                          }
                          className="rounded-[4px] py-3 px-2 border border-[#E5E5E7] text-[#858C95] text-sm font-normal"
                        />
                      </div>
                      <div className="grid gap-y-2">
                        <label className="text-[#323539] font-inter font-medium text-sm">
                          Unit Price(GHS)
                        </label>
                        <input
                          type="number"
                          placeholder="Enter Unit Price"
                          value={product.unitPrice || ""}
                          readOnly
                          className="rounded-[4px] py-3 px-2 border border-[#E5E5E7] text-[#858C95] text-sm font-normal"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-6">
                  <div className="grid">
                    <h3 className="font-inter text-[#858C95] font-normal text-sm">
                      TOTAL AMOUNT(GHS)
                    </h3>
                    <span className="font-bold text-xl mt-2 font-inter text-[#202224]">
                      GHS {calculateTotal().toFixed(2)}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={handleAddProduct}
                      className="border border-[#323539] flex-1 rounded-[4px] py-2 px-8 text-[#323539] font-inter font-semibold text-sm"
                    >
                      Add Product
                    </button>
                    <button
                      type="submit"
                      className="bg-[#2648EA] rounded-[4px] flex-1 py-2 px-8 text-white font-inter font-semibold text-sm"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPurchase;
