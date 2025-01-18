import React, { useState } from "react";
import { X } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
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
  reorder_level: string;
  cost_price: string;
  markup_percentage: string;
  selling_price: string;
  category: string;
  supplier: string;
  brand: string;
}

interface Errors {
  [key: string]: string;
}

interface AddProductsProps {
  title: string;
  setModal: () => void;
}

const initialFormData: FormData = {
  name: "",
  strength: "",
  unit: "",
  quantity: "",
  expiry_date: "",
  reorder_level: "",
  cost_price: "",
  markup_percentage: "",
  selling_price: "",
  category: "",
  supplier: "",
  brand: "",
};

const AddProducts: React.FC<AddProductsProps> = ({ title, setModal }) => {
  const [errors, setErrors] = useState<Errors>({});
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const validateForm = (): Errors => {
    const newErrors: Errors = {};

    // Required field validation
    if (!formData.name.trim()) newErrors.name = "Product name is required";
    if (!formData.strength.trim()) newErrors.strength = "Strength is required";
    if (!formData.unit.trim()) newErrors.unit = "Unit is required";
    if (!formData.quantity) newErrors.quantity = "Quantity is required";
    if (!formData.expiry_date)
      newErrors.expiry_date = "Expiry date is required";
    if (!formData.reorder_level)
      newErrors.reorder_level = "Reorder level is required";
    if (!formData.cost_price) newErrors.cost_price = "Cost price is required";
    if (!formData.markup_percentage)
      newErrors.markup_percentage = "Markup percentage is required";
    if (!formData.selling_price)
      newErrors.selling_price = "Selling price is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.supplier) newErrors.supplier = "Supplier is required";
    if (!formData.brand.trim()) newErrors.brand = "Brand is required";

    // Number validation
    if (formData.quantity && isNaN(Number(formData.quantity))) {
      newErrors.quantity = "Quantity must be a number";
    }
    if (formData.reorder_level && isNaN(Number(formData.reorder_level))) {
      newErrors.reorder_level = "Reorder level must be a number";
    }
    if (formData.cost_price && isNaN(Number(formData.cost_price))) {
      newErrors.cost_price = "Cost price must be a number";
    }
    if (
      formData.markup_percentage &&
      isNaN(Number(formData.markup_percentage))
    ) {
      newErrors.markup_percentage = "Markup percentage must be a number";
    }
    if (formData.selling_price && isNaN(Number(formData.selling_price))) {
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
    // Clear error for this field when user starts typing
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

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      customAxios
        .get(endpoints.inventoryCategories)
        .then((res) => res?.data?.results),
  });

  const { data: suppliers } = useQuery({
    queryKey: ["suppliers"],
    queryFn: () =>
      customAxios
        .get(endpoints.inventorySupplier)
        .then((res) => res?.data?.results),
  });

  console.log(suppliers);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    // Validate form
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fill in all required fields correctly.");
      return;
    }

    // Transform date to ISO string if exists
    const submitData = {
      ...formData,
      expiry_date: formData.expiry_date
        ? new Date(formData.expiry_date).toISOString()
        : null,
      quantity: formData.quantity,
      reorder_level: formData.reorder_level,
      cost_price: formData.cost_price,
      markup_percentage: formData.markup_percentage,
      selling_price: formData.selling_price,
    };

    postProductMutation.mutate(submitData, {
      onSuccess: () => {
        setModal();
        SwalToaster("Product added successfully!", "success");
      },
      onError: (error) => {
        console.error(error);
        SwalToaster("Product could not be added!", "error");
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-4/5 p-6 relative">
        <div className="flex justify-between items-center border-b mb-4">
          <h2 className="text-lg font-bold">{title}</h2>
          <button
            className="text-gray-500 hover:text-gray-800"
            onClick={setModal}
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First Row */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Product Name
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full h-12 px-3 py-2 border rounded bg-gray-50 focus:outline-none ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter Product Name"
              />
              {errors.name && (
                <p className="text-red-500 font-bold text-sm mt-1">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Product Strength
              </label>
              <input
                name="strength"
                value={formData.strength}
                onChange={handleInputChange}
                className={`w-full h-12 px-3 py-2 border rounded bg-gray-50 focus:outline-none ${
                  errors.strength ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter Product Strength"
              />
              {errors.strength && (
                <p className="text-red-500 font-bold text-sm mt-1">
                  {errors.strength}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Unit
              </label>
              <input
                name="unit"
                value={formData.unit}
                onChange={handleInputChange}
                className={`w-full h-12 px-3 py-2 border rounded bg-gray-50 focus:outline-none ${
                  errors.unit ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter Unit"
              />
              {errors.unit && (
                <p className="text-red-500 font-bold text-sm mt-1">
                  {errors.unit}
                </p>
              )}
            </div>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Quantity
              </label>
              <input
                name="quantity"
                type="number"
                min={0}
                value={formData.quantity}
                onChange={handleInputChange}
                className={`w-full h-12 px-3 py-2 border rounded bg-gray-50 focus:outline-none ${
                  errors.quantity ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter Quantity"
              />
              {errors.quantity && (
                <p className="text-red-500 font-bold text-sm mt-1">
                  {errors.quantity}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Expiry Date
              </label>
              <input
                name="expiry_date"
                type="date"
                value={formData.expiry_date}
                onChange={handleInputChange}
                className={`w-full h-12 px-3 py-2 border rounded bg-gray-50 focus:outline-none ${
                  errors.expiry_date ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.expiry_date && (
                <p className="text-red-500 font-bold text-sm mt-1">
                  {errors.expiry_date}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Re-Order Level
              </label>
              <input
                name="reorder_level"
                type="number"
                min={0}
                value={formData.reorder_level}
                onChange={handleInputChange}
                className={`w-full h-12 px-3 py-2 border rounded bg-gray-50 focus:outline-none ${
                  errors.reorder_level ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter Re-Order Level"
              />
              {errors.reorder_level && (
                <p className="text-red-500 font-bold text-sm mt-1">
                  {errors.reorder_level}
                </p>
              )}
            </div>
          </div>

          {/* Third Row */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Cost Price
              </label>
              <input
                name="cost_price"
                type="number"
                min={0}
                value={formData.cost_price}
                onChange={handleInputChange}
                className={`w-full h-12 px-3 py-2 border rounded bg-gray-50 focus:outline-none ${
                  errors.cost_price ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter Cost Price"
              />
              {errors.cost_price && (
                <p className="text-red-500 font-bold text-sm mt-1">
                  {errors.cost_price}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Mark Up Percentage
              </label>
              <input
                name="markup_percentage"
                type="number"
                min={0}
                value={formData.markup_percentage}
                onChange={handleInputChange}
                className={`w-full h-12 px-3 py-2 border rounded bg-gray-50 focus:outline-none ${
                  errors.markup_percentage
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                placeholder="Enter Mark Up Percentage"
              />
              {errors.markup_percentage && (
                <p className="text-red-500 font-bold text-sm mt-1">
                  {errors.markup_percentage}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Selling Price
              </label>
              <input
                name="selling_price"
                type="number"
                min={0}
                value={formData.selling_price}
                onChange={handleInputChange}
                className={`w-full h-12 px-3 py-2 border rounded bg-gray-50 focus:outline-none ${
                  errors.selling_price ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter Selling Price"
              />
              {errors.selling_price && (
                <p className="text-red-500 font-bold text-sm mt-1">
                  {errors.selling_price}
                </p>
              )}
            </div>
          </div>

          {/* Fourth Row */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className={`w-full h-12 px-3 py-2 border rounded bg-gray-50 focus:outline-none ${
                  errors.category ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select Category</option>
                {categories?.map((category: any) => (
                  <option key={category?.id} value={category?.id}>
                    {category?.name}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 font-bold text-sm mt-1">
                  {errors.category}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Supplier
              </label>
              <select
                name="supplier"
                value={formData.supplier}
                onChange={handleInputChange}
                className={`w-full h-12 px-3 py-2 border rounded bg-gray-50 focus:outline-none ${
                  errors.supplier ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select Supplier</option>
                {/* Add suppliers data mapping here */}
                {suppliers?.map((supplier: any) => (
                  <option key={supplier?.id} value={supplier?.id}>
                    {supplier?.name}
                  </option>
                ))}
              </select>
              {errors.supplier && (
                <p className="text-red-500 font-bold text-sm mt-1">
                  {errors.supplier}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Brand Name
              </label>
              <input
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
                className={`w-full h-12 px-3 py-2 border rounded bg-gray-50 focus:outline-none ${
                  errors.brand ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter Brand Name"
              />
              {errors.brand && (
                <p className="text-red-500 font-bold text-sm mt-1">
                  {errors.brand}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              disabled={postProductMutation.isPending}
              className={`bg-[#2648EA] hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-[140px] 
                ${
                  postProductMutation.isPending
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }
              `}
            >
              {postProductMutation.isPending ? "Saving...." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;
