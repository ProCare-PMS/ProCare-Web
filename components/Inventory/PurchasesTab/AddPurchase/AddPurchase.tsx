"use client"
import React, { useState, useEffect, useRef } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useMutation, useQuery } from "@tanstack/react-query";
import customAxios from "@/api/CustomAxios";
import { endpoints } from "@/api/Endpoints";
import { toast } from "react-toastify";

interface AddPurchaseProps {
  onClose: () => void;
}

interface ProductForm {
  id: number;
  productId?: string;
  quantity?: string;
  unitPrice?: string;
  searchTerm?: string;
}

const AddPurchase = ({ onClose }: AddPurchaseProps) => {
  const [products, setProducts] = useState<ProductForm[]>([{ id: 1 }]);
  const [dropdownStates, setDropdownStates] = useState<{ [key: number]: boolean }>({});
  const [supplierDropdownOpen, setSupplierDropdownOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<{id?: string, name?: string}>({});
  const [supplierSearchTerm, setSupplierSearchTerm] = useState("");
  
  const dropdownRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const supplierDropdownRef = useRef<HTMLDivElement | null>(null);

  const { data: suppliers } = useQuery({
    queryKey: ["suppliers"],
    queryFn: () =>
      customAxios
        .get(endpoints.inventorySupplier)
        .then((res) => res?.data?.results),
  });

  const { data: inventoryProducts } = useQuery({
    queryKey: ["inventoryProducts"],
    queryFn: async () =>
      await customAxios.get(endpoints.inventoryProduct).then((res) => res),
    select: (findData) => findData?.data?.results,
  });

  console.log(inventoryProducts)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      Object.entries(dropdownRefs.current).forEach(([id, ref]) => {
        if (ref && !ref.contains(event.target as Node)) {
          setDropdownStates(prev => ({ ...prev, [parseInt(id)]: false }));
        }
      });
      
      if (supplierDropdownRef.current && !supplierDropdownRef.current.contains(event.target as Node)) {
        setSupplierDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAddProduct = () => {
    setProducts((prevProducts) => [
      ...prevProducts,
      { id: prevProducts.length + 1 },
    ]);
  };

  const handleProductSearch = (searchTerm: string, index: number) => {
    setProducts(prevProducts => {
      const updatedProducts = [...prevProducts];
      updatedProducts[index] = {
        ...updatedProducts[index],
        searchTerm,
      };
      return updatedProducts;
    });
  };

  const handleProductInputClick = (index: number) => {
    setDropdownStates(prev => ({ ...prev, [index]: true }));
  };

  const handleProductSelect = (product: any, index: number) => {
    setProducts(prevProducts => {
      const updatedProducts = [...prevProducts];
      updatedProducts[index] = {
        ...updatedProducts[index],
        productId: product.id,
        searchTerm: product.name,
        quantity: product.quantity.toString(),
        unitPrice: product.selling_price
      };
      return updatedProducts;
    });
    setDropdownStates(prev => ({ ...prev, [index]: false }));
  };

  const handleSupplierSearch = (searchTerm: string) => {
    setSupplierSearchTerm(searchTerm);
  };

  const handleSupplierInputClick = () => {
    setSupplierDropdownOpen(true);
  };

  const handleSupplierSelect = (supplier: any) => {
    setSelectedSupplier({
      id: supplier.id,
      name: supplier.name
    });
    setSupplierSearchTerm(supplier.name);
    setSupplierDropdownOpen(false);
  };

  const getFilteredProducts = (searchTerm: string) => {
    if (!searchTerm) return inventoryProducts || [];
    return inventoryProducts?.filter((product: any) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];
  };

  const getFilteredSuppliers = () => {
    if (!supplierSearchTerm) return suppliers || [];
    return suppliers?.filter((supplier: any) =>
      supplier.name.toLowerCase().includes(supplierSearchTerm.toLowerCase())
    ) || [];
  };

  const handleQuantityChange = (index: number, value: string) => {
    setProducts(prevProducts => {
      const updatedProducts = [...prevProducts];
      updatedProducts[index] = {
        ...updatedProducts[index],
        quantity: value
      };
      return updatedProducts;
    });
  };

  const calculateTotal = () => {
    return products.reduce((total, product) => {
      const quantity = Number(product.quantity) || 0;
      const price = Number(product.unitPrice) || 0;
      return total + (quantity * price);
    }, 0);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white shadow-custom w-[60%] py-4 px-8 mb-12 rounded-[8px] mt-8 grid gap-y-5">
        <div className="flex items-center justify-between gap-4 mb-4">
          <h3 className="font-bold text-2xl font-inter">Add Purchase</h3>
          <CloseOutlinedIcon onClick={onClose} className="cursor-pointer" />
        </div>
        <hr />
        <div className="grid">
          <div>
            <h2 className="text-[#202224] font-bold text-base font-inter">
              Purchase Details
            </h2>
            <form>
              <div className="grid gap-y-2 mt-3">
                <label className="text-[#323539] font-inter font-medium text-sm">
                  Select Supplier
                </label>
                <div className="relative" ref={supplierDropdownRef}>
                  <input
                    type="text"
                    name="supplier"
                    id="supplier"
                    className="rounded-[4px] py-3 px-2 border border-[#E5E5E7] w-[400px] text-[#858C95] text-sm font-normal"
                    placeholder="Search supplier..."
                    value={supplierSearchTerm}
                    onChange={(e) => handleSupplierSearch(e.target.value)}
                    onClick={handleSupplierInputClick}
                  />
                  {supplierDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md mt-1 max-h-48 overflow-y-auto z-10 w-[400px]">
                      {getFilteredSuppliers().map((supplier: any) => (
                        <div
                          key={supplier.id}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleSupplierSelect(supplier)}
                        >
                          {supplier.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <hr className="my-7" />

              <div>
                <h2 className="text-[#202224] font-bold text-base font-inter">
                  Products Details
                </h2>
                <div className="overflow-y-auto h-[200px] p-3">
                  {products.map((product, index) => (
                    <div
                      key={product.id}
                      className="grid grid-cols-3 gap-5 mt-3 pb-3 mb-3"
                    >
                      <div className="grid gap-y-2 relative" ref={el => dropdownRefs.current[index] = el}>
                        <label className="text-[#323539] font-inter font-medium text-sm">
                          Select Product
                        </label>
                        <input
                          type="text"
                          name="product"
                          className="rounded-[4px] py-3 px-2 border border-[#E5E5E7] text-[#858C95] text-sm font-normal"
                          placeholder="Search product..."
                          value={product.searchTerm || ""}
                          onChange={(e) => handleProductSearch(e.target.value, index)}
                          onClick={() => handleProductInputClick(index)}
                        />
                        {dropdownStates[index] && (
                          <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md mt-1 max-h-48 overflow-y-auto z-10">
                            {getFilteredProducts(product.searchTerm || "").map((item: any) => (
                              <div
                                key={item.id}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => handleProductSelect(item, index)}
                              >
                                {item.name}
                              </div>
                            ))}
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
                          onChange={(e) => handleQuantityChange(index, e.target.value)}
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
                    <input />
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