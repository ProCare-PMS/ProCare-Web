import React, { useState } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "@tanstack/react-query";
import customAxios from "@/api/CustomAxios";
import { endpoints } from "@/api/Endpoints";
import SwalToaster from "@/components/SwalToaster/SwalToaster";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  name: z.string({
    required_error: "Required",
  }),
  strength: z.string(),
  unit: z.string({
    required_error: "Required",
  }),
  quantity: z.number(),
  expiry_date: z.string({
    required_error: "Required",
  }),
  reorder_level: z.coerce.number({
    required_error: "Required",
  }),
  cost_price: z.string({
    required_error: "Required",
  }),
  markup_percentage: z.string({
    required_error: "Required",
  }),
  selling_price: z.string({
    required_error: "Required",
  }),
  category: z.string({
    required_error: "Category is required",
  }),
  supplier: z.string({
    required_error: "Supplier is required",
  }),
  brand: z.string({
    //required_error: "Brand Name is required",
  }),
});

type ProductSchema = z.infer<typeof formSchema>;

interface AddProductProps {
  title: string;
  setModal: () => void;
}

const AddProducts = ({ title, setModal }: AddProductProps) => {
  // State for error messages
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const form = useForm<ProductSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const postProductMutation = useMutation({
    mutationFn: async (value: any) => {
      const res = await customAxios
        .post(endpoints.inventories + "products/", value.formData)
        .then((res) => res);
      return res;
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      name: formData.get("name"),
      reorder_level: formData.get("reorder_level"),
      cost_price: formData.get("cost_price"),
      markup_percentage: formData.get("markup_percentage"),
      selling_price: formData.get("selling_price"),
      category: formData.get("category"),
      supplier: formData.get("supplier"),
      brand: formData.get("brand"),
      expiry_date: formData.get("expiry_date")
        ? new Date(formData.get("expiry_date") as string).toISOString()
        : null,
      strength: formData.get("strength"),
      unit: formData.get("unit"),
      quantity: Number(formData.get("quantity")),
    };

    //console.log({ data });

    // Validate input data using Zod
    const result = formSchema.safeParse(data);

    if (!result.success) {
      // Create an object to hold error messages
      const newErrors: { [key: string]: string } = {};
      const formattedErrors = result.error.format();

      for (const [key, value] of Object.entries(formattedErrors)) {
        if (typeof value === "object" && value !== null && "_errors" in value) {
          if (Array.isArray(value._errors) && value._errors.length > 0) {
            newErrors[key] = value._errors.join(", ");
          }
        } else if (Array.isArray(value) && value.length > 0) {
          newErrors[key] = value.join(", ");
        }
      }

      setErrors(newErrors); // Set the error state
      toast.error("Please correct the validation errors.");
      return;
    }

    setErrors({});

    postProductMutation.mutate(
      { formData: data },
      {
        onSuccess: () => {
          setModal();
          SwalToaster("Product added successfully!", "success");
        },
        onError: (error) => {
          console.error(error);
          SwalToaster("Product could not be added!", "error");
        },
      }
    );
  };

  //getting all products
  // const { data: getAllproduct } = useQuery({
  //   queryKey: ["getAllProduct"],
  //   queryFn: () =>
  //     customAxios
  //       .get(endpoints.inventorySupplier)
  //       .then((res) => res?.data?.data),
  // });

  // console.log({ getAllproduct });

  //get all categories
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      customAxios
        .get(endpoints.inventories + "categories/")
        .then((res) => res?.data?.results),
  });

  //get all suppliers
  // const { data: suppliersData } = useQuery({
  //   queryKey: ["get/suppliers"],
  //   queryFn: () =>
  //     customAxios
  //       .get(endpoints.inventorySupplier)
  //       .then((res) => res?.data.results),
  // });

  console.log({ categories });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-[60%] p-6 relative">
        <div className="flex justify-between items-center border-b mb-2">
          <h2 className="text-lg font-bold mb-4">{title}</h2>
          <button
            className="text-gray-500 hover:text-gray-800"
            onClick={setModal}
          >
            <CloseOutlinedIcon />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First Row */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="flex justify-between">
                <label
                  htmlFor="name"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Product Name
                </label>
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter Product Name"
                className={`appearance-none border rounded w-full h-12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-[#F8F9FB] ${
                  errors.name ? "border-red-500" : ""
                }`}
                autoComplete="off"
              />
            </div>

            <div>
              <div className="flex justify-between">
                <label
                  htmlFor="strength"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Product Strength
                </label>
                {errors.strength && (
                  <p className="text-red-500 text-xs mt-1">{errors.strength}</p>
                )}
              </div>
              <input
                id="strength"
                name="strength"
                type="text"
                placeholder="Enter Product Strength"
                className={`appearance-none border rounded w-full h-12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-[#F8F9FB] ${
                  errors.strength ? "border-red-500" : ""
                }`}
                autoComplete="off"
              />
            </div>

            <div>
              <div className="flex justify-between">
                <label
                  htmlFor="unit"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Unit
                </label>
                {errors.unit && (
                  <p className="text-red-500 text-xs mt-1">{errors.unit}</p>
                )}
              </div>
              <input
                id="unit"
                name="unit"
                placeholder="Enter Unit"
                className={`appearance-none border rounded w-full h-12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-[#F8F9FB] ${
                  errors.unit ? "border-red-500" : ""
                }`}
                autoComplete="off"
              />
            </div>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="flex justify-between">
                <label
                  htmlFor="quantity"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Quantity
                </label>
                {errors.quantity && (
                  <p className="text-red-500 text-xs mt-1">{errors.quantity}</p>
                )}
              </div>
              <input
                id="quantity"
                type="number"
                name="quantity"
                placeholder="Enter Quantity"
                className={`appearance-none border rounded w-full h-12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-[#F8F9FB] ${
                  errors.quantity ? "border-red-500" : ""
                }`}
                autoComplete="off"
              />
            </div>

            <div>
              <div className="flex justify-between">
                <label
                  htmlFor="expiry_date"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Expiry Date
                </label>
                {errors.expiry_date && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.expiry_date}
                  </p>
                )}
              </div>
              <input
                id="expiry_date"
                type="date"
                name="expiry_date"
                className={`appearance-none border rounded w-full h-12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-[#F8F9FB] ${
                  errors.expiry_date ? "border-red-500" : ""
                }`}
                autoComplete="off"
              />
            </div>

            <div>
              <div className="flex justify-between">
                <label
                  htmlFor="reorder_level"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Re-Order Level
                </label>
                {errors.reorder_level && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.reorder_level}
                  </p>
                )}
              </div>
              <input
                id="reorder_level"
                type="number"
                name="reorder_level"
                placeholder="Enter Re-Order Level"
                className={`appearance-none border rounded w-full h-12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-[#F8F9FB] ${
                  errors.reorder_level ? "border-red-500" : ""
                }`}
                autoComplete="off"
              />
            </div>
          </div>

          {/* Third Row */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="flex justify-between">
                <label
                  htmlFor="cost_price"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Cost Price
                </label>
                {errors.cost_price && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.cost_price}
                  </p>
                )}
              </div>
              <input
                id="cost_price"
                type="number"
                name="cost_price"
                placeholder="Enter Cost Price"
                className={`appearance-none border rounded w-full h-12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-[#F8F9FB] ${
                  errors.cost_price ? "border-red-500" : ""
                }`}
                autoComplete="off"
              />
            </div>

            <div>
              <div className="flex justify-between">
                <label
                  htmlFor="markup_percentage"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Mark Up Percentage
                </label>
                {errors.markup_percentage && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.markup_percentage}
                  </p>
                )}
              </div>
              <input
                id="markup_percentage"
                type="number"
                name="markup_percentage"
                placeholder="Enter Mark Up Percentage"
                className={`appearance-none border rounded w-full h-12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-[#F8F9FB] ${
                  errors.markup_percentage ? "border-red-500" : ""
                }`}
                autoComplete="off"
              />
            </div>

            <div>
              <div className="flex justify-between">
                <label
                  htmlFor="selling_price"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Selling Price
                </label>
                {errors.selling_price && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.selling_price}
                  </p>
                )}
              </div>
              <input
                id="selling_price"
                type="number"
                name="selling_price"
                placeholder="Enter Selling Price"
                className={`appearance-none border rounded w-full h-12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-[#F8F9FB] ${
                  errors.selling_price ? "border-red-500" : ""
                }`}
                autoComplete="off"
              />
            </div>
          </div>

          {/* Fourth Row */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="flex justify-between">
                <label
                  htmlFor="category"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Category
                </label>
                {errors.category && (
                  <p className="text-red-500 text-xs mt-1">{errors.category}</p>
                )}
              </div>
              <select
                id="category"
                name="category"
                className="border w-full h-12 border-[#E6E6E6] outline-none shadow-sm rounded-[6px]"
              >
                <option value="">Select Category</option>
                {categories?.map((category: any) => (
                  <option key={category?.id} value={category?.id}>
                    {category?.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div className="flex justify-between">
                <label
                  htmlFor="supplier"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Supplier
                </label>
                {errors.supplier && (
                  <p className="text-red-500 text-xs mt-1">{errors.supplier}</p>
                )}
              </div>
              <select
                id="supplier"
                name="supplier"
                className="border w-full h-12 border-[#E6E6E6] outline-none shadow-sm rounded-[6px]"
              >
                <option value="">Select Supplier</option>
                {[]?.map((supplier: any) => (
                  <option key={supplier?.id} value={supplier?.id}>
                    {supplier?.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div className="flex justify-between">
                <label
                  htmlFor="brand"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Brand Name
                </label>
                {errors.brand && (
                  <p className="text-red-500 text-xs mt-1">{errors.brand}</p>
                )}
              </div>
              <input
                id="brand"
                name="brand"
                type="brand"
                placeholder="Enter Brand Name"
                className={`appearance-none border rounded w-full h-12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-[#F8F9FB] ${
                  errors.brand ? "border-red-500" : ""
                }`}
                autoComplete="off"
              />
            </div>
          </div>

          <div className="flex justify-end items-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-6 w-[140px]"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;
