import React, { useEffect, useState, useRef } from "react";
import { X, Search, CheckCircle2 } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import customAxios from "@/api/CustomAxios";
import { endpoints } from "@/api/Endpoints";
import SwalToaster from "@/components/SwalToaster/SwalToaster";

interface Props {
  onProductClose: () => void;
  categoryName: string;
  categoryId: string;
}

const AddCategoryProduct = ({
  onProductClose,
  categoryName,
  categoryId,
}: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const { data: inventoryProducts, isLoading } = useQuery({
    queryKey: ["inventoryProducts"],
    queryFn: async () =>
      await customAxios.get(endpoints.inventoryProduct).then((res) => res),
    select: (findData) => findData?.data?.results,
  });

  const updateProductMutation = useMutation({
    mutationFn: async (data: Record<string, any>) => {
      // Use the product's slug for the endpoint
      const res = await customAxios.patch(
        `${endpoints.inventoryProduct}${selectedProduct.slug}/`,
        data
      );
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventoryProducts"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardData"] });
      onProductClose();
      SwalToaster("Product added to category successfully!", "success");
    },
    onError: (error) => {
      console.error(error);
      SwalToaster("Product could not be added to category!", "error");
    },
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleProductSearch = (search: string) => {
    setSearchTerm(search);
    setSelectedProduct(null);
    setIsDropdownOpen(true);
  };

  const getFilteredProducts = () => {
    if (!searchTerm) return [];
    return (
      inventoryProducts?.filter((product: any) => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const noCategory = !product.category;
        return matchesSearch && noCategory;
      }) || []
    );
  };

  const handleProductSelect = (product: any) => {
    setSelectedProduct(product);
    setSearchTerm(product.name);
    setIsDropdownOpen(false);
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (!selectedProduct) {
      SwalToaster("Please select a product!", "error");
      return;
    }

    try {
      updateProductMutation.mutate({
        name: selectedProduct.name, 
        category: categoryId
      });
    } catch (error: any) {
      console.error("Product add error:", error);
      SwalToaster("Failed to add product. Please try again.", "error");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 !bg-black !bg-opacity-50 !backdrop-blur-sm p-4">
      <div 
        className="bg-white rounded-2xl shadow-2xl w-[800px] h-[440px] transform transition-all duration-300 ease-in-out scale-100 opacity-100"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 
              id="modal-title" 
              className="text-2xl font-semibold text-gray-800 flex items-center"
            >
              <span className="mr-2">Add Product to</span>
              <span className="text-blue-600">{categoryName}</span>
            </h2>
            <button
              onClick={onProductClose}
              className="text-gray-500 hover:text-gray-700 transition-colors rounded-full p-1 hover:bg-gray-100"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div 
                className="relative"
                ref={dropdownRef}
              >
                <label 
                  htmlFor="product-search" 
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Select Product
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    id="product-search"
                    type="text"
                    ref={searchInputRef}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="Search uncategorized products..."
                    value={searchTerm}
                    onChange={(e) => handleProductSearch(e.target.value)}
                    onClick={() => setIsDropdownOpen(true)}
                    aria-autocomplete="list"
                    aria-controls="product-dropdown"
                  />
                  {selectedProduct && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    </div>
                  )}
                </div>

                {isDropdownOpen && (
                  <div 
                    id="product-dropdown"
                    className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto"
                    role="listbox"
                  >
                    {isLoading ? (
                      <div className="p-4 text-center text-gray-500">
                        Loading products...
                      </div>
                    ) : getFilteredProducts().length === 0 ? (
                      <div className="p-4 text-center text-gray-500">
                        No products found
                      </div>
                    ) : (
                      getFilteredProducts().map((item: any) => (
                        <div
                          key={item.id}
                          role="option"
                          aria-selected={selectedProduct?.id === item.id}
                          className={`px-4 py-2 cursor-pointer transition-colors duration-100 
                            ${selectedProduct?.id === item.id 
                              ? 'bg-blue-50 text-blue-700' 
                              : 'hover:bg-gray-100'
                            }`}
                          onClick={() => handleProductSelect(item)}
                        >
                          {item.name}
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={updateProductMutation.isPending || !selectedProduct}
                className={`w-full py-3 rounded-md text-white font-semibold mt-12 transition-all duration-200 flex items-center justify-center space-x-2
                  ${updateProductMutation.isPending 
                    ? 'bg-blue-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                  }
                  ${!selectedProduct ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                {updateProductMutation.isPending ? (
                  <>
                    <span className="animate-pulse">Saving...</span>
                  </>
                ) : (
                  "Add Product to Category"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCategoryProduct;