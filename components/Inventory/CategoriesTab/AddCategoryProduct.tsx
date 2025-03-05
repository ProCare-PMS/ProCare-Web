import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import customAxios from "@/api/CustomAxios";
import { endpoints } from "@/api/Endpoints";
import { toast } from "react-toastify";
import SwalToaster from "@/components/SwalToaster/SwalToaster";

interface FormData {
  name: string;
  strength: string;
  unit: string;
  quantity: string;
  expiry_date: string;
  cost_price: string;
  markup_percentage: string;
  selling_price: string;
  category: string;
}

interface Errors {
  [key: string]: string;
}

const initialFormData: FormData = {
  name: "",
  strength: "",
  unit: "",
  quantity: "",
  expiry_date: "",
  cost_price: "",
  markup_percentage: "",
  selling_price: "",
  category: "",
};

interface Props {
  onProductClose: () => void;
  categoryName: string;
  slug: string;
  categoryId: string
}

const AddCategoryProduct = ({ onProductClose, categoryName, slug, categoryId }: Props) => {
  const [errors, setErrors] = useState<Errors>({});
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const queryClient = useQueryClient();

  const isValidDecimal = (value: string): boolean => {
    const decimalRegex = /^-?\d+(\.\d+)?$/;
    return decimalRegex.test(value);
  };

  useEffect(() => {
    if (formData.cost_price && formData.markup_percentage) {
      const costPrice = parseFloat(formData.cost_price);
      const markupPercentage = parseFloat(formData.markup_percentage) / 100;

      const sellingPrice = costPrice + costPrice * markupPercentage;

      setFormData((prev) => ({
        ...prev,
        selling_price: sellingPrice.toFixed(2),
      }));
    }
  }, [formData.cost_price, formData.markup_percentage]);

  const validateForm = (): Errors => {
    const newErrors: Errors = {};

    if (!formData.name.trim()) newErrors.name = "Product name is required";
    if (!formData.strength.trim()) newErrors.strength = "Strength is required";
    if (!formData.unit.trim()) newErrors.unit = "Unit is required";
    if (!formData.quantity) newErrors.quantity = "Quantity is required";
    if (!formData.expiry_date) newErrors.expiry_date = "Expiry date is required";
    if (!formData.cost_price) newErrors.cost_price = "Cost price is required";
    if (!formData.selling_price) newErrors.selling_price = "Selling price is required";

    if (formData.quantity && isNaN(Number(formData.quantity))) {
      newErrors.quantity = "Quantity must be a number";
    }
    if (formData.cost_price && !isValidDecimal(formData.cost_price)) {
      newErrors.cost_price = "Cost price must be a number";
    }
    if (formData.markup_percentage && !isValidDecimal(formData.markup_percentage)) {
      newErrors.markup_percentage = "Markup percentage must be a number";
    }
    if (formData.selling_price && !isValidDecimal(formData.selling_price)) {
      newErrors.selling_price = "Selling price must be a number";
    }

    return newErrors;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const postProductMutation = useMutation({
    mutationFn: async (data: Record<string, any>) => {
      const res = await customAxios.post(
        endpoints.inventories + "products/",
        data
      );
      return res;
    },
  });

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fill in all required fields correctly.");
      return;
    }

    const submitData = {
      ...formData,
      expiry_date: formData.expiry_date
        ? new Date(formData.expiry_date).toISOString()
        : null,
      quantity: Number(formData.quantity),
      cost_price: String(parseFloat(formData.cost_price).toFixed(2)),
      markup_percentage: String(
        parseFloat(formData.markup_percentage).toFixed(2)
      ),
      selling_price: String(parseFloat(formData.selling_price).toFixed(2)),
      category: categoryId,
    };

    postProductMutation.mutate(submitData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["inventoryProducts"] });
        queryClient.invalidateQueries({ queryKey: ["dashboardData"] });
        SwalToaster("Product added successfully!", "success");
        onProductClose();
      },
      onError: (error) => {
        console.error(error);
        SwalToaster("Product could not be added!", "error");
      },
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 p-4">
      <div className="bg-white p-6 rounded-xl shadow-2xl w-full w-8xl overflow-y-auto max-h-[90vh]">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">
            Add Product To {categoryName} Category
          </h2>
          <button 
            onClick={onProductClose} 
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:outline-none 
                  ${errors.name 
                    ? "border-red-500 focus:ring-red-200" 
                    : "border-gray-300 focus:ring-blue-200"}`}
                placeholder="Enter Product Name"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Strength
              </label>
              <input
                name="strength"
                value={formData.strength}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:outline-none 
                  ${errors.strength 
                    ? "border-red-500 focus:ring-red-200" 
                    : "border-gray-300 focus:ring-blue-200"}`}
                placeholder="Enter Product Strength"
              />
              {errors.strength && (
                <p className="text-red-500 text-xs mt-1">{errors.strength}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Unit
              </label>
              <input
                name="unit"
                value={formData.unit}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:outline-none 
                  ${errors.unit 
                    ? "border-red-500 focus:ring-red-200" 
                    : "border-gray-300 focus:ring-blue-200"}`}
                placeholder="Enter Unit"
              />
              {errors.unit && (
                <p className="text-red-500 text-xs mt-1">{errors.unit}</p>
              )}
            </div>
          </div>

          {/* Quantity and Expiry */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <input
                name="quantity"
                type="number"
                min={0}
                value={formData.quantity}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:outline-none 
                  ${errors.quantity 
                    ? "border-red-500 focus:ring-red-200" 
                    : "border-gray-300 focus:ring-blue-200"}`}
                placeholder="Enter Quantity"
              />
              {errors.quantity && (
                <p className="text-red-500 text-xs mt-1">{errors.quantity}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expiry Date
              </label>
              <input
                name="expiry_date"
                type="date"
                value={formData.expiry_date}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:outline-none 
                  ${errors.expiry_date 
                    ? "border-red-500 focus:ring-red-200" 
                    : "border-gray-300 focus:ring-blue-200"}`}
              />
              {errors.expiry_date && (
                <p className="text-red-500 text-xs mt-1">{errors.expiry_date}</p>
              )}
            </div>
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cost Price
              </label>
              <input
                name="cost_price"
                type="number"
                step="0.01"
                min={0}
                value={formData.cost_price}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:outline-none 
                  ${errors.cost_price 
                    ? "border-red-500 focus:ring-red-200" 
                    : "border-gray-300 focus:ring-blue-200"}`}
                placeholder="Enter Cost Price"
              />
              {errors.cost_price && (
                <p className="text-red-500 text-xs mt-1">{errors.cost_price}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mark Up Percentage
              </label>
              <input
                name="markup_percentage"
                type="number"
                step="0.01"
                min={0}
                value={formData.markup_percentage}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:outline-none 
                  ${errors.markup_percentage 
                    ? "border-red-500 focus:ring-red-200" 
                    : "border-gray-300 focus:ring-blue-200"}`}
                placeholder="Enter Mark Up Percentage"
              />
              {errors.markup_percentage && (
                <p className="text-red-500 text-xs mt-1">{errors.markup_percentage}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Selling Price
              </label>
              <input
                name="selling_price"
                type="number"
                step="0.01"
                min={0}
                value={formData.selling_price}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:outline-none 
                  ${errors.selling_price 
                    ? "border-red-500 focus:ring-red-200" 
                    : "border-gray-300 focus:ring-blue-200"}`}
                placeholder="Enter Selling Price"
              />
              {errors.selling_price && (
                <p className="text-red-500 text-xs mt-1">{errors.selling_price}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              disabled={postProductMutation.isPending}
              className={`
                px-6 py-2 rounded-md text-white font-semibold transition-all duration-300
                ${postProductMutation.isPending 
                  ? "bg-blue-400 cursor-not-allowed" 
                  : "bg-[#2648EA] hover:bg-blue-700 focus:ring-2 focus:ring-blue-300"}
              `}
            >
              {postProductMutation.isPending ? "Saving...." : "Save Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryProduct;