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

interface FormData {
  full_name: string;
  email: string;
  phone_number: string;
  address: string;
  gender: string;
  birth_date: string;
  height: string;
  weight: string;
  blood_type: string;
  blood_pressure: string;
  allergies: string;
  chronic_conditions: string;
  med_info_product: string;
  dosage: string;
  frequency: string;
  start_date: string;
  end_date: string;
  additional_info: string;
}

interface Errors {
  [key: string]: string;
}

const initialFormData: FormData = {
  full_name: "",
  email: "",
  phone_number: "",
  address: "",
  gender: "",
  birth_date: "",
  height: "",
  weight: "",
  blood_type: "",
  blood_pressure: "",
  allergies: "",
  chronic_conditions: "",
  med_info_product: "",
  dosage: "",
  frequency: "",
  start_date: "",
  end_date: "",
  additional_info: "",
};

const AddCustomerModal = ({ closeModal }: AddCustomerModalProps) => {
  const [errors, setErrors] = useState<Errors>({});
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const validateForm = (): Errors => {
    const newErrors: Errors = {};

    //Required Field Validaton
    if (!formData.full_name) newErrors.full_name = "Full Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phone_number)
      newErrors.phone_number = "Phone Number is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.birth_date) newErrors.birth_date = "Birth Date is required";
    if (!formData.height) newErrors.height = "Height is required";
    if (!formData.weight) newErrors.weight = "Weight is required";
    if (!formData.blood_type) newErrors.blood_type = "Blood Type is required";
    if (!formData.blood_pressure)
      newErrors.blood_pressure = "Blood Pressure is required";
    if (!formData.allergies) newErrors.allergies = "Allergies is required";
    if (!formData.chronic_conditions)
      newErrors.chronic_conditions = "Chronic Conditions is required";
    if (!formData.med_info_product)
      newErrors.med_info_product = "Medication Info Product is required";
    if (!formData.dosage) newErrors.dosage = "Dosage is required";
    if (!formData.frequency) newErrors.frequency = "Frequency is required";
    if (!formData.start_date) newErrors.start_date = "Start Date is required";
    if (!formData.end_date) newErrors.end_date = "End Date is required";
    if (!formData.additional_info)
      newErrors.additional_info = "Additional Information is required";

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

  const addCustomerMutation = useMutation({
    mutationFn: async (data: Record<string, any>) => {
      const res = await customAxios.post(endpoints.posCustomers, data);
      return res;
    },
  });

  const { data: inventoryProductsData } = useQuery({
    queryKey: ["inventoryProducts"],
    queryFn: async () =>
      await customAxios.get(endpoints.inventoryProduct).then((res) => res),
    select: (findData) => findData?.data?.results,
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    // Validate form
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fill in all required fields correctly.");
      return;
    }

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

    addCustomerMutation.mutate(data, {
      onSuccess: () => {
        closeModal();
        SwalToaster("Customer added successfully.", "success");
      },
      onError: (error) => {
        console.error(error);
        SwalToaster("Customer could not be added!", "error");
      },
    });
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
                <div className="grid gap-y-2 py-4">
                  <label
                    htmlFor="full_name"
                    className="text-[#323539] font-inter font-medium text-sm"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    onChange={handleInputChange}
                    name="full_name"
                    placeholder="Enter full name"
                    className={`w-full h-12 px-3 py-2 border text-[#858C95] rounded-[4px]  font-normal focus:outline-none ${
                      errors.full_name ? "border-red-500" : "border-[#E5E5E7]"
                    }`}
                  />
                  {errors.full_name && (
                    <p className="text-red-500 font-bold text-xs mt-1">
                      {errors.full_name}
                    </p>
                  )}
                </div>
                <div className="grid gap-y-2 py-4">
                  <label
                    htmlFor="email"
                    className="text-[#323539] font-inter font-medium text-sm"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    onChange={handleInputChange}
                    name="email"
                    placeholder="Enter email"
                    className={`w-full h-12 px-3 py-2 border text-[#858C95] rounded-[4px]  font-normal focus:outline-none ${
                      errors.email ? "border-red-500" : "border-[#E5E5E7]"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 font-bold text-xs mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div className="grid gap-y-2 py-4">
                  <label
                    htmlFor="phone_number"
                    className="text-[#323539] font-inter font-medium text-sm"
                  >
                    Phone Number
                  </label>
                  <input
                    type="text"
                    onChange={handleInputChange}
                    name="phone_number"
                    placeholder="Enter phone number"
                    className={`w-full h-12 px-3 py-2 border text-[#858C95] rounded-[4px]  font-normal focus:outline-none ${
                      errors.phone_number
                        ? "border-red-500"
                        : "border-[#E5E5E7]"
                    }`}
                  />
                  {errors.phone_number && (
                    <p className="text-red-500 font-bold text-xs mt-1">
                      {errors.phone_number}
                    </p>
                  )}
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
                    onChange={handleInputChange}
                    className={`w-full h-12 px-3 py-2 border text-[#858C95] rounded-[4px]  font-normal focus:outline-none ${
                      errors.gender ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select Gender</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                  </select>
                  {errors.gender && (
                    <p className="text-red-500 font-bold text-xs mt-1">
                      {errors.gender}
                    </p>
                  )}
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
                    onChange={handleInputChange}
                    name="birth_date"
                    className={`w-full h-12 px-3 py-2 border text-[#858C95] rounded-[4px]  font-normal focus:outline-none ${
                      errors.birth_date ? "border-red-500" : "border-[#E5E5E7]"
                    }`}
                  />
                  {errors.birth_date && (
                    <p className="text-red-500 font-bold text-xs mt-1">
                      {errors.birth_date}
                    </p>
                  )}
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
                    onChange={handleInputChange}
                    name="address"
                    placeholder="Enter address"
                    className={`w-full h-12 px-3 py-2 border text-[#858C95] rounded-[4px]  font-normal focus:outline-none ${
                      errors.address ? "border-red-500" : "border-[#E5E5E7]"
                    }`}
                  />
                  {errors.address && (
                    <p className="text-red-500 font-bold text-xs mt-1">
                      {errors.address}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Health Information */}
            <div>
              <h2 className="text-[#202224] font-bold text-base font-inter mb-4">
                Health Information
              </h2>
              <div className="grid grid-cols-3 gap-5">
                <div className="grid gap-y-2">
                  <label
                    htmlFor="height"
                    className="text-[#323539] font-inter font-medium text-sm"
                  >
                    Height (m)
                  </label>
                  <input
                    type="number"
                    onChange={handleInputChange}
                    name="height"
                    placeholder="Enter height"
                    className={`w-full h-12 px-3 py-2 border text-[#858C95] rounded-[4px]  font-normal focus:outline-none ${
                      errors.height ? "border-red-500" : "border-[#E5E5E7]"
                    }`}
                  />
                  {errors.height && (
                    <p className="text-red-500 font-bold text-xs mt-1">
                      {errors.height}
                    </p>
                  )}
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
                    onChange={handleInputChange}
                    name="weight"
                    placeholder="Enter weight"
                    className={`w-full h-12 px-3 py-2 border text-[#858C95] rounded-[4px]  font-normal focus:outline-none ${
                      errors.weight ? "border-red-500" : "border-[#E5E5E7]"
                    }`}
                  />
                  {errors.weight && (
                    <p className="text-red-500 font-bold text-xs mt-1">
                      {errors.weight}
                    </p>
                  )}
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
                    onChange={handleInputChange}
                    className={`w-full h-12 px-3 py-2 border text-[#858C95] rounded-[4px]  font-normal focus:outline-none ${
                      errors.blood_type ? "border-red-500" : "border-gray-300"
                    }`}
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
                  {errors.blood_type && (
                    <p className="text-red-500 font-bold text-xs mt-1">
                      {errors.blood_type}
                    </p>
                  )}
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
                    onChange={handleInputChange}
                    name="blood_pressure"
                    placeholder="Enter blood pressure"
                    className={`w-full h-12 px-3 py-2 border rounded bg-gray-50 focus:outline-none ${
                      errors.blood_pressure
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {errors.blood_pressure && (
                    <p className="text-red-500 font-bold text-xs mt-1">
                      {errors.blood_pressure}
                    </p>
                  )}
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
                    onChange={handleInputChange}
                    name="allergies"
                    placeholder="Enter allergies"
                    className={`w-full h-12 px-3 py-2 border text-[#858C95] rounded-[4px]  font-normal focus:outline-none ${
                      errors.allergies ? "border-red-500" : "border-[#E5E5E7]"
                    }`}
                  />
                  {errors.allergies && (
                    <p className="text-red-500 font-bold text-xs mt-1">
                      {errors.allergies}
                    </p>
                  )}
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
                    onChange={handleInputChange}
                    name="chronic_conditions"
                    placeholder="Enter chronic conditions"
                    className={`w-full h-12 px-3 py-2 border text-[#858C95] rounded-[4px]  font-normal focus:outline-none ${
                      errors.chronic_conditions
                        ? "border-red-500"
                        : "border-[#E5E5E7]"
                    }`}
                  />
                  {errors.chronic_conditions && (
                    <p className="text-red-500 font-bold text-xs mt-1">
                      {errors.chronic_conditions}
                    </p>
                  )}
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
                <div className="grid gap-y-2">
                  <label
                    htmlFor="med_info_product"
                    className="text-[#323539] font-inter font-medium text-sm"
                  >
                    Product
                  </label>
                  <select
                    name="med_info_product"
                    onChange={handleInputChange}
                    className={`w-full h-12 px-3 py-2 border text-[#858C95] rounded-[4px]  font-normal focus:outline-none ${
                      errors.med_info_product
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    <option value="">Select Product</option>
                    {inventoryProductsData?.map((product: any) => (
                      <option key={product?.id} value={product?.id}>
                        {product?.name}
                      </option>
                    ))}
                  </select>
                  {errors.med_info_product && (
                    <p className="text-red-500 font-bold text-xs mt-1">
                      {errors.med_info_product}
                    </p>
                  )}
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
                    onChange={handleInputChange}
                    name="dosage"
                    placeholder="Enter dosage"
                    className={`w-full h-12 px-3 py-2 border text-[#858C95] rounded-[4px]  font-normal focus:outline-none ${
                      errors.dosage ? "border-red-500" : "border-[#E5E5E7]"
                    }`}
                  />
                  {errors.dosage && (
                    <p className="text-red-500 font-bold text-xs mt-1">
                      {errors.dosage}
                    </p>
                  )}
                </div>
                <div className="grid gap-y-2">
                  <label
                    htmlFor="frequency"
                    className="text-[#323539] font-inter font-medium text-sm"
                  >
                    Frequency
                  </label>
                  <input
                    type="number"
                    onChange={handleInputChange}
                    name="frequency"
                    placeholder="Enter frequency"
                    className={`w-full h-12 px-3 py-2 border text-[#858C95] rounded-[4px]  font-normal focus:outline-none ${
                      errors.frequency ? "border-red-500" : "border-[#E5E5E7]"
                    }`}
                  />
                  {errors.frequency && (
                    <p className="text-red-500 font-bold text-xs mt-1">
                      {errors.frequency}
                    </p>
                  )}
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
                    onChange={handleInputChange}
                    name="start_date"
                    className={`w-full h-12 px-3 py-2 border text-[#858C95] rounded-[4px]  font-normal focus:outline-none ${
                      errors.start_date ? "border-red-500" : "border-[#E5E5E7]"
                    }`}
                  />
                  {errors.start_date && (
                    <p className="text-red-500 font-bold text-xs mt-1">
                      {errors.start_date}
                    </p>
                  )}
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
                    onChange={handleInputChange}
                    name="end_date"
                    className={`w-full h-12 px-3 py-2 border text-[#858C95] rounded-[4px]  font-normal focus:outline-none ${
                      errors.end_date ? "border-red-500" : "border-[#E5E5E7]"
                    }`}
                  />
                  {errors.end_date && (
                    <p className="text-red-500 font-bold text-xs mt-1">
                      {errors.end_date}
                    </p>
                  )}
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
                    onChange={handleInputChange}
                    name="additional_info"
                    placeholder="Enter additional information"
                    id="additional_info"
                    className={`w-full h-12 px-3 py-2 border text-[#858C95] rounded-[4px]  font-normal focus:outline-none ${
                      errors.additional_info
                        ? "border-red-500"
                        : "border-[#E5E5E7]"
                    }`}
                  />
                  {errors.additional_info && (
                    <p className="text-red-500 font-bold text-xs mt-1">
                      {errors.additional_info}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* End Medical Information Form */}

          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="bg-[#2648EA] hover:bg-[#1E3AD8] cursor-pointer rounded-[4px] 
              text-white font-semibold py-3 px-6 transition-colors focus:outline-none 
              focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mr-8"
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
