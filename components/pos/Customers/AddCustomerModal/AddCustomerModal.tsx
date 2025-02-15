import React, { useState } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import customAxios from "@/api/CustomAxios";
import { endpoints } from "@/api/Endpoints";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import SwalToaster from "@/components/SwalToaster/SwalToaster";

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
    const queryClient = useQueryClient();
  

  const validateForm = (): Errors => {
    const newErrors: Errors = {};
    
    // Required Field Validation
    if (!formData.full_name) newErrors.full_name = "Full Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phone_number) newErrors.phone_number = "Phone Number is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.birth_date) newErrors.birth_date = "Birth Date is required";
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    // Date format validation
   // Date format validation - improved version
   const isValidDateFormat = (dateStr: string) => {
    if (!dateStr) return true; // Empty is allowed unless required
    
    // Check if the date is in YYYY-MM-DD format
    return /^\d{4}-\d{2}-\d{2}$/.test(dateStr);
  };
  
  if (formData.start_date && !isValidDateFormat(formData.start_date)) {
    newErrors.start_date = "Date format should be YYYY-MM-DD";
  }
  
  if (formData.end_date && !isValidDateFormat(formData.end_date)) {
    newErrors.end_date = "Date format should be YYYY-MM-DD";
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

  // Format date to YYYY-MM-DD
  const formatDate = (dateString: string): string => {
    if (!dateString) return "";
    
    // If already in YYYY-MM-DD format, return as is
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      return dateString;
    }
    
    try {
      const date = new Date(dateString);
      // Check if date is valid
      if (isNaN(date.getTime())) {
        return "";
      }
      
      // Format as YYYY-MM-DD
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    } catch (e) {
      return "";
    }
  }

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
    
    // Validate form
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fill in all required fields correctly.");
      return;
    }

    // Format dates properly
    const formattedData = {
      ...formData,
      start_date: formData.start_date ? formatDate(formData.start_date) : null,
      end_date: formData.end_date ? formatDate(formData.end_date) : null,
    };

     

    addCustomerMutation.mutate(formattedData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["posCustomers"] });
        closeModal();
        SwalToaster("Customer added successfully.", "success");
      },
      onError: (error: any) => {
        // Handle backend validation errors
        if (error.response && error.response.data) {
          const backendErrors: Errors = {};
          Object.entries(error.response.data).forEach(([key, value]) => {
            if (Array.isArray(value)) {
              backendErrors[key] = value[0] as string;
            }
          });
          setErrors(backendErrors);
        }
        SwalToaster("Customer could not be added!", "error");
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="bg-[#F4F7FA] px-4 sm:px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg sm:text-xl font-bold text-[#202224]">Add Customer</h2>
          <button
            className="text-gray-500 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors"
            onClick={closeModal}
          >
            <CloseOutlinedIcon />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="h-[calc(90vh-80px)] overflow-y-auto px-4 sm:px-6"
        >
          <div className="py-6 space-y-6">
            {/* Basic Information */}
            <div>
              <h2 className="text-[#202224] font-bold text-base font-inter mb-4">
                Basic Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                <div className="grid gap-y-2 py-2 sm:py-4">
                  <label
                    htmlFor="full_name"
                    className="text-[#323539] font-inter font-medium text-sm"
                  >
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.full_name}
                    onChange={handleInputChange}
                    name="full_name"
                    placeholder="Enter full name"
                    className={`w-full h-10 sm:h-12 px-3 py-2 border text-[#858C95] rounded-[4px] font-normal focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.full_name ? "border-red-500" : "border-[#E5E5E7]"
                    }`}
                  />
                  {errors.full_name && (
                    <p className="text-red-500 font-medium text-xs mt-1">
                      {errors.full_name}
                    </p>
                  )}
                </div>
                <div className="grid gap-y-2 py-2 sm:py-4">
                  <label
                    htmlFor="email"
                    className="text-[#323539] font-inter font-medium text-sm"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    name="email"
                    placeholder="Enter email"
                    className={`w-full h-10 sm:h-12 px-3 py-2 border text-[#858C95] rounded-[4px] font-normal focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.email ? "border-red-500" : "border-[#E5E5E7]"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 font-medium text-xs mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div className="grid gap-y-2 py-2 sm:py-4">
                  <label
                    htmlFor="phone_number"
                    className="text-[#323539] font-inter font-medium text-sm"
                  >
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone_number}
                    onChange={handleInputChange}
                    name="phone_number"
                    placeholder="Enter phone number"
                    className={`w-full h-10 sm:h-12 px-3 py-2 border text-[#858C95] rounded-[4px] font-normal focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.phone_number
                        ? "border-red-500"
                        : "border-[#E5E5E7]"
                    }`}
                  />
                  {errors.phone_number && (
                    <p className="text-red-500 font-medium text-xs mt-1">
                      {errors.phone_number}
                    </p>
                  )}
                </div>
                <div className="grid gap-y-2 py-2 sm:py-4">
                  <label
                    htmlFor="gender"
                    className="text-[#323539] font-inter font-medium text-sm"
                  >
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className={`w-full h-10 sm:h-12 px-3 py-2 border text-[#858C95] rounded-[4px] font-normal focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.gender ? "border-red-500" : "border-[#E5E5E7]"
                    }`}
                  >
                    <option value="">Select Gender</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                  </select>
                  {errors.gender && (
                    <p className="text-red-500 font-medium text-xs mt-1">
                      {errors.gender}
                    </p>
                  )}
                </div>
                <div className="grid gap-y-2 py-2 sm:py-4">
                  <label
                    htmlFor="birth_date"
                    className="text-[#323539] font-inter font-medium text-sm"
                  >
                    Date of Birth <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.birth_date}
                    onChange={handleInputChange}
                    name="birth_date"
                    className={`w-full h-10 sm:h-12 px-3 py-2 border text-[#858C95] rounded-[4px] font-normal focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.birth_date ? "border-red-500" : "border-[#E5E5E7]"
                    }`}
                  />
                  {errors.birth_date && (
                    <p className="text-red-500 font-medium text-xs mt-1">
                      {errors.birth_date}
                    </p>
                  )}
                </div>
                <div className="grid gap-y-2 py-2 sm:py-4">
                  <label
                    htmlFor="address"
                    className="text-[#323539] font-inter font-medium text-sm"
                  >
                    Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={handleInputChange}
                    name="address"
                    placeholder="Enter address"
                    className={`w-full h-10 sm:h-12 px-3 py-2 border text-[#858C95] rounded-[4px] font-normal focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.address ? "border-red-500" : "border-[#E5E5E7]"
                    }`}
                  />
                  {errors.address && (
                    <p className="text-red-500 font-medium text-xs mt-1">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                <div className="grid gap-y-2 py-2 sm:py-4">
                  <label
                    htmlFor="height"
                    className="text-[#323539] font-inter font-medium text-sm"
                  >
                    Height (m)
                  </label>
                  <input
                    type="number"
                    value={formData.height}
                    onChange={handleInputChange}
                    step={0.1}
                    min={0}
                    name="height"
                    placeholder="Enter height"
                    className={`w-full h-10 sm:h-12 px-3 py-2 border text-[#858C95] rounded-[4px] font-normal focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.height ? "border-red-500" : "border-[#E5E5E7]"
                    }`}
                  />
                  {errors.height && (
                    <p className="text-red-500 font-medium text-xs mt-1">
                      {errors.height}
                    </p>
                  )}
                </div>
                <div className="grid gap-y-2 py-2 sm:py-4">
                  <label
                    htmlFor="weight"
                    className="text-[#323539] font-inter font-medium text-sm"
                  >
                    Weight (kg) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.weight}
                    onChange={handleInputChange}
                    min={0}
                    name="weight"
                    placeholder="Enter weight"
                    className={`w-full h-10 sm:h-12 px-3 py-2 border text-[#858C95] rounded-[4px] font-normal focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.weight ? "border-red-500" : "border-[#E5E5E7]"
                    }`}
                  />
                  {errors.weight && (
                    <p className="text-red-500 font-medium text-xs mt-1">
                      {errors.weight}
                    </p>
                  )}
                </div>
                <div className="grid gap-y-2 py-2 sm:py-4">
                  <label
                    htmlFor="blood_type"
                    className="text-[#323539] font-inter font-medium text-sm"
                  >
                    Blood Type
                  </label>
                  <select
                    name="blood_type"
                    value={formData.blood_type}
                    onChange={handleInputChange}
                    className={`w-full h-10 sm:h-12 px-3 py-2 border text-[#858C95] rounded-[4px] font-normal focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.blood_type ? "border-red-500" : "border-[#E5E5E7]"
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
                    <p className="text-red-500 font-medium text-xs mt-1">
                      {errors.blood_type}
                    </p>
                  )}
                </div>
                <div className="grid gap-y-2 py-2 sm:py-4">
                  <label
                    htmlFor="blood_pressure"
                    className="text-[#323539] font-inter font-medium text-sm"
                  >
                    Blood Pressure
                  </label>
                  <input
                    type="text"
                    value={formData.blood_pressure}
                    onChange={handleInputChange}
                    name="blood_pressure"
                    placeholder="Enter blood pressure"
                    className={`w-full h-10 sm:h-12 px-3 py-2 border text-[#858C95] rounded-[4px] font-normal focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.blood_pressure ? "border-red-500" : "border-[#E5E5E7]"
                    }`}
                  />
                  {errors.blood_pressure && (
                    <p className="text-red-500 font-medium text-xs mt-1">
                      {errors.blood_pressure}
                    </p>
                  )}
                </div>
                <div className="grid gap-y-2 py-2 sm:py-4">
                  <label
                    htmlFor="allergies"
                    className="text-[#323539] font-inter font-medium text-sm"
                  >
                    Allergies
                  </label>
                  <input
                    type="text"
                    value={formData.allergies}
                    onChange={handleInputChange}
                    name="allergies"
                    placeholder="Enter allergies"
                    className={`w-full h-10 sm:h-12 px-3 py-2 border text-[#858C95] rounded-[4px] font-normal focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.allergies ? "border-red-500" : "border-[#E5E5E7]"
                    }`}
                  />
                  {errors.allergies && (
                    <p className="text-red-500 font-medium text-xs mt-1">
                      {errors.allergies}
                    </p>
                  )}
                </div>
                <div className="grid gap-y-2 py-2 sm:py-4">
                  <label
                    htmlFor="chronic_conditions"
                    className="text-[#323539] font-inter font-medium text-sm"
                  >
                    Chronic Conditions
                  </label>
                  <input
                    type="text"
                    value={formData.chronic_conditions}
                    onChange={handleInputChange}
                    name="chronic_conditions"
                    placeholder="Enter chronic conditions"
                    className={`w-full h-10 sm:h-12 px-3 py-2 border text-[#858C95] rounded-[4px] font-normal focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.chronic_conditions ? "border-red-500" : "border-[#E5E5E7]"
                    }`}
                  />
                  {errors.chronic_conditions && (
                    <p className="text-red-500 font-medium text-xs mt-1">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                <div className="grid gap-y-2 py-2 sm:py-4">
                  <label
                    htmlFor="med_info_product"
                    className="text-[#323539] font-inter font-medium text-sm"
                  >
                    Product
                  </label>
                  <select
                    name="med_info_product"
                    value={formData.med_info_product}
                    onChange={handleInputChange}
                    className={`w-full h-10 sm:h-12 px-3 py-2 border text-[#858C95] rounded-[4px] font-normal focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.med_info_product ? "border-red-500" : "border-[#E5E5E7]"
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
                    <p className="text-red-500 font-medium text-xs mt-1">
                      {errors.med_info_product}
                    </p>
                  )}
                </div>
                <div className="grid gap-y-2 py-2 sm:py-4">
                  <label
                    htmlFor="dosage"
                    className="text-[#323539] font-inter font-medium text-sm"
                  >
                    Dosage
                  </label>
                  <input
                    type="text"
                    value={formData.dosage}
                    onChange={handleInputChange}
                    name="dosage"
                    placeholder="Enter dosage"
                    className={`w-full h-10 sm:h-12 px-3 py-2 border text-[#858C95] rounded-[4px] font-normal focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.dosage ? "border-red-500" : "border-[#E5E5E7]"
                    }`}
                  />
                  {errors.dosage && (
                    <p className="text-red-500 font-medium text-xs mt-1">
                      {errors.dosage}
                    </p>
                  )}
                </div>
                <div className="grid gap-y-2 py-2 sm:py-4">
                  <label
                    htmlFor="frequency"
                    className="text-[#323539] font-inter font-medium text-sm"
                  >
                    Frequency
                  </label>
                  <input
                    type="number"
                    value={formData.frequency}
                    onChange={handleInputChange}
                    name="frequency"
                    placeholder="Enter frequency"
                    className={`w-full h-10 sm:h-12 px-3 py-2 border text-[#858C95] rounded-[4px] font-normal focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.frequency ? "border-red-500" : "border-[#E5E5E7]"
                    }`}
                  />
                  {errors.frequency && (
                    <p className="text-red-500 font-medium text-xs mt-1">
                      {errors.frequency}
                    </p>
                  )}
                </div>
                <div className="grid gap-y-2 py-2 sm:py-4">
                  <label
                    htmlFor="start_date"
                    className="text-[#323539] font-inter font-medium text-sm"
                  >
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={formData.start_date}
                    onChange={handleInputChange}
                    name="start_date"
                    className={`w-full h-10 sm:h-12 px-3 py-2 border text-[#858C95] rounded-[4px] font-normal focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.start_date ? "border-red-500" : "border-[#E5E5E7]"
                    }`}
                  />
                  {errors.start_date && (
                    <p className="text-red-500 font-medium text-xs mt-1">
                      {errors.start_date}
                    </p>
                  )}
                </div>
                <div className="grid gap-y-2 py-2 sm:py-4">
                  <label
                    htmlFor="end_date"
                    className="text-[#323539] font-inter font-medium text-sm"
                  >
                    End Date
                  </label>
                  <input
                    type="date"
                    value={formData.end_date}
                    onChange={handleInputChange}
                    name="end_date"
                    className={`w-full h-10 sm:h-12 px-3 py-2 border text-[#858C95] rounded-[4px] font-normal focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.end_date ? "border-red-500" : "border-[#E5E5E7]"
                    }`}
                  />
                  {errors.end_date && (
                    <p className="text-red-500 font-medium text-xs mt-1">
                      {errors.end_date}
                    </p>
                  )}
                </div>
                <div className="grid gap-y-2 py-2 sm:py-4">
                  <label
                    htmlFor="additional_info"
                    className="text-[#323539] font-inter font-medium text-sm"
                  >
                    Additional Information
                  </label>
                  <input
                    type="text"
                    value={formData.additional_info}
                    onChange={handleInputChange}
                    name="additional_info"
                    placeholder="Enter additional information"
                    className={`w-full h-10 sm:h-12 px-3 py-2 border text-[#858C95] rounded-[4px] font-normal focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.additional_info ? "border-red-500" : "border-[#E5E5E7]"
                    }`}
                  />
                  {errors.additional_info && (
                    <p className="text-red-500 font-medium text-xs mt-1">
                      {errors.additional_info}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* End Medical Information Form */}

          <div className="flex justify-end mt-4 mb-6 px-4">
            <button
              type="button"
              onClick={closeModal}
              className="mr-4 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 rounded-[4px] 
              font-semibold py-2 px-4 sm:py-3 sm:px-6 transition-colors focus:outline-none 
              focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#2648EA] hover:bg-[#1E3AD8] cursor-pointer rounded-[4px] 
              text-white font-semibold py-2 px-4 sm:py-3 sm:px-6 transition-colors focus:outline-none 
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