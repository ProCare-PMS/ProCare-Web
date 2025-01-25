import React, { useState } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import customAxios from "@/api/CustomAxios";
import { endpoints } from "@/api/Endpoints";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AddCustomerSchema } from "@/lib/schema/schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import SwalToaster from "@/components/SwalToaster/SwalToaster";

type CustomerSchema = z.infer<typeof AddCustomerSchema>;
interface AddCustomerModalProps {
  closeModal: () => void;
}

const AddCustomerModal = ({ closeModal }: AddCustomerModalProps) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const { data: inventoryProductsData } = useQuery({
    queryKey: ["inventoryProducts"],
    queryFn: async () =>
      await customAxios.get(endpoints.inventoryProduct).then((res) => res),
    select: (findData) => findData?.data?.results,
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      full_name: formData.get("full_name"),
      email: formData.get("email"),
      phone_number: formData.get("phone_number"),
      address: formData.get("address"),
      gender: formData.get("gender"),
      birth_date: formData.get("birth_date"),
      height: formData.get("height"),
      weight: formData.get("weight"),
      blood_type: formData.get("blood_type"),
      blood_pressure: formData.get("blood_pressure"),
      allergies: formData.get("allergies"),
      chronic_conditions: formData.get("chronic_conditions"),
      med_info_product: formData.get("med_info_product"),
      dosage: formData.get("dosage"),
      frequency: formData.get("frequency"),
      start_date: formData.get("start_date"),
      end_date: formData.get("end_date"),
      additional_info: formData.get("additional_info"),
    };

    const result = AddCustomerSchema.safeParse(data);

    if (!result.success) {
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

      setErrors(newErrors);
      toast.error("Please correct the validation errors.");
      return;
    }

    const addCustomerMutation = useMutation({
      mutationFn: async () => {
        const res = await customAxios.post(endpoints.posCustomers, data);
        return res;
      },
      onSuccess: () => {
        closeModal();
        SwalToaster("Customer added successfully!", "success");
      },
      onError: (error) => {
        console.error(error);
        SwalToaster("Customer could not be added!", "error");
      },
    });

    addCustomerMutation.mutate();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-4/5 max-w-4xl h-[90vh] overflow-hidden">
        <div className="bg-[#F4F7FA] px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-[#202224]">Add Customer</h2>
          <button
            className="text-gray-500 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors"
            onClick={closeModal}
          >
            <CloseOutlinedIcon />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="h-[calc(90vh-100px)] overflow-y-auto"
        >
          <div className="p-6 space-y-6">
            {/* Basic Information */}
            <div>
              <h2 className="text-[#202224] font-bold text-base font-inter mb-4">
                Basic Information
              </h2>
              <div className="grid grid-cols-3 gap-5">
                <div className="grid gap-y-2 mt-3">
                  <label
                    htmlFor="full_name"
                    className="text-[#323539] font-inter font-medium text-sm"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="full_name"
                    placeholder="Enter full name"
                    className="rounded-[4px] py-3 px-2 border border-[#E5E5E7] text-[#858C95] text-sm font-normal"
                  />
                </div>
                <div className="grid gap-y-2">
                  <label
                    htmlFor="email"
                    className="text-[#323539] font-inter font-medium text-sm"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    className="rounded-[4px] py-3 px-2 border border-[#E5E5E7] text-[#858C95] text-sm font-normal"
                  />
                </div>
                <div className="grid gap-y-2">
                  <label
                    htmlFor="phone_number"
                    className="text-[#323539] font-inter font-medium text-sm"
                  >
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone_number"
                    placeholder="Enter phone number"
                    className="rounded-[4px] py-3 px-2 border border-[#E5E5E7] text-[#858C95] text-sm font-normal"
                  />
                </div>
                <div className="grid gap-y-2">
                  <label
                    htmlFor="gender"
                    className="text-[#323539] font-inter font-medium text-sm"
                  >
                    Gender
                  </label>
                  <select
                    name="gender"
                    className="border w-full h-12 border-[#E6E6E6] outline-none shadow-sm rounded-[6px]"
                  >
                    <option value="">Select Gender</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                  </select>
                </div>
                <div className="grid gap-y-2">
                  <label
                    htmlFor="birth_date"
                    className="text-[#323539] font-inter font-medium text-sm"
                  >
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="birth_date"
                    className="rounded-[4px] py-3 px-2 border border-[#E5E5E7] text-[#858C95] text-sm font-normal"
                  />
                </div>
                <div className="grid gap-y-2">
                  <label
                    htmlFor="address"
                    className="text-[#323539] font-inter font-medium text-sm"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Enter address"
                    className="rounded-[4px] py-3 px-2 border border-[#E5E5E7] text-[#858C95] text-sm font-normal"
                  />
                </div>
              </div>
            </div>

            {/* Health Information */}
            <div>
              <h2 className="text-[#202224] font-bold text-base font-inter mb-4">
                Health Information
              </h2>
              <div className="grid grid-cols-3 gap-5">
                <div className="grid gap-y-2 mt-3">
                  <label
                    htmlFor="height"
                    className="text-[#323539] font-inter font-medium text-sm"
                  >
                    Height (m)
                  </label>
                  <input
                    type="number"
                    name="height"
                    placeholder="Enter height"
                    className="rounded-[4px] py-3 px-2 border border-[#E5E5E7] text-[#858C95] text-sm font-normal"
                  />
                </div>
                <div className="grid gap-y-2">
                  <label
                    htmlFor="weight"
                    className="text-[#323539] font-inter font-medium text-sm"
                  >
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    name="weight"
                    placeholder="Enter weight"
                    className="rounded-[4px] py-3 px-2 border border-[#E5E5E7] text-[#858C95] text-sm font-normal"
                  />
                </div>
                <div className="grid gap-y-2">
                  <label
                    htmlFor="blood_type"
                    className="text-[#323539] font-inter font-medium text-sm"
                  >
                    Blood Type
                  </label>
                  <select
                    name="blood_type"
                    className="border w-full h-12 border-[#E6E6E6] outline-none shadow-sm rounded-[6px]"
                  >
                    <option value="">Select Blood Type</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>
                <div className="grid gap-y-2">
                  <label
                    htmlFor="blood_pressure"
                    className="text-[#323539] font-inter font-medium text-sm"
                  >
                    Blood Pressure
                  </label>
                  <input
                    type="text"
                    name="blood_pressure"
                    placeholder="Enter blood pressure"
                    className="rounded-[4px] py-3 px-2 border border-[#E5E5E7] text-[#858C95] text-sm font-normal"
                  />
                </div>
                <div className="grid gap-y-2">
                  <label
                    htmlFor="allergies"
                    className="text-[#323539] font-inter font-medium text-sm"
                  >
                    Allergies
                  </label>
                  <input
                    type="text"
                    name="allergies"
                    placeholder="Enter allergies"
                    className="rounded-[4px] py-3 px-2 border border-[#E5E5E7] text-[#858C95] text-sm font-normal"
                  />
                </div>
                <div className="grid gap-y-2">
                  <label
                    htmlFor="chronic_conditions"
                    className="text-[#323539] font-inter font-medium text-sm"
                  >
                    Chronic Conditions
                  </label>
                  <input
                    type="text"
                    name="chronic_conditions"
                    placeholder="Enter chronic conditions"
                    className="rounded-[4px] py-3 px-2 border border-[#E5E5E7] text-[#858C95] text-sm font-normal"
                  />
                </div>
              </div>
            </div>

            {/* Medical Information */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-[#202224] font-bold text-base font-inter">
                  Medical Information
                </h2>
                <span className="text-[#2648EA] font-semibold text-sm cursor-pointer hover:underline">
                  Add Medication
                </span>
              </div>
              <div className="grid grid-cols-3 gap-5">
                <div className="grid gap-y-2 mt-3">
                  <label
                    htmlFor="med_info_product"
                    className="text-[#323539] font-inter font-medium text-sm"
                  >
                    Product
                  </label>
                  <select
                    name="med_info_product"
                    className="border w-full h-12 text-sm border-[#E6E6E6] outline-none shadow-sm rounded-[6px]"
                  >
                    <option value="">Select Category</option>
                    {inventoryProductsData?.map((product: any) => (
                      <option key={product?.id} value={product?.id}>
                        {product?.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid gap-y-2">
                  <label
                    htmlFor="dosage"
                    className="text-[#323539] font-inter font-medium text-sm"
                  >
                    Dosage
                  </label>
                  <input
                    type="text"
                    name="dosage"
                    placeholder="Enter dosage"
                    className="rounded-[4px] py-3 px-2 border border-[#E5E5E7] text-[#858C95] text-sm font-normal"
                  />
                </div>
                <div className="grid gap-y-2">
                  <label
                    htmlFor="frequency"
                    className="text-[#323539] font-inter font-medium text-sm"
                  >
                    Frequency
                  </label>
                  <input
                    type="text"
                    name="frequency"
                    placeholder="Enter frequency"
                    className="rounded-[4px] py-3 px-2 border border-[#E5E5E7] text-[#858C95] text-sm font-normal"
                  />
                </div>
                <div className="grid gap-y-2">
                  <label
                    htmlFor="start_date"
                    className="text-[#323539] font-inter font-medium text-sm"
                  >
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="start_date"
                    className="rounded-[4px] py-3 px-2 border border-[#E5E5E7] text-[#858C95] text-sm font-normal"
                  />
                </div>
                <div className="grid gap-y-2">
                  <label
                    htmlFor="end_date"
                    className="text-[#323539] font-inter font-medium text-sm"
                  >
                    End Date
                  </label>
                  <input
                    type="date"
                    name="end_date"
                    className="rounded-[4px] py-3 px-2 border border-[#E5E5E7] text-[#858C95] text-sm font-normal"
                  />
                </div>
                <div className="grid gap-y-2">
                  <label
                    htmlFor="additional_info"
                    className="text-[#323539] font-inter font-medium text-sm"
                  >
                    Additional Information
                  </label>
                  <input
                    type="text"
                    name="additional_info"
                    placeholder="Enter additional information"
                    id="additional_info"
                    className="rounded-[4px] py-3 px-2 border border-[#E5E5E7] text-[#858C95] text-sm font-normal"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* End Medical Information Form */}

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="bg-[#2648EA] hover:bg-[#1E3AD8] cursor-pointer rounded-[4px] 
              text-white font-semibold py-3 px-6 transition-colors focus:outline-none 
              focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Add Customer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCustomerModal;
