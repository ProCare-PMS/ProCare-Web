import React, { useState } from "react";
import { z } from "zod";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Person3OutlinedIcon from "@mui/icons-material/Person3Outlined";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import CustomSelect from "../CustomSelect/CustomSelect";
import {
  AddUserSchema,
  stepOneSchema,
  stepTwoSchema,
  stepThreeSchema,
} from "@/lib/schema/schema";
import { useMutation } from "@tanstack/react-query";
import { endpoints } from "@/api/Endpoints";
import customAxios from "@/api/CustomAxios";
import { daysOfWeek, defaultWorkingHours } from "@/lib/utils";
import { AddUserTypes, DayAbbreviation, WorkingHourField } from "@/lib/Types";
import { toast } from "sonner";

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

interface StepIndicatorProps {
  Icon: React.ElementType;
  stepNumber: number;
  label: string;
  activeStep: number;
}

const rolesValLabels = [
  { label: "Manager", value: "manager" },
  { label: "Pharmacist", value: "pharmacist" },
  { label: "Technician", value: "technician" },
];

const AddUserModal: React.FC<AddUserModalProps> = ({
  isOpen,
  onClose,
  title,
}) => {
  const [step, setStep] = useState<number>(1);
  const [formValues, setFormValues] = useState<AddUserTypes>({
    full_name: "",
    email: "",
    contact: "",
    address: "",
    role: "",
    working_hours: defaultWorkingHours,
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const postManagementEmployees = useMutation({
    mutationFn: async (formData: any) => {
      const res = await customAxios
        .post(endpoints.managements + "employees/create/", formData)
        .then((res) => res);
      return res;
    },
  });

  const validateStep = () => {
    let currentSchema;
    switch (step) {
      case 1:
        currentSchema = stepOneSchema;
        break;
      case 2:
        currentSchema = stepTwoSchema;
        break;
      case 3:
        currentSchema = stepThreeSchema;
        break;
      default:
        currentSchema = stepOneSchema;
    }

    try {
      currentSchema.parse(formValues);
      setErrors({});
      setStep((prev) => Math.min(prev + 1, 3));
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.reduce((acc, curr) => {
          acc[curr.path[0]] = curr.message;
          return acc;
        }, {} as {[key: string]: string});
        setErrors(errorMessages);
        return false;
      }
      return false;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (selected: { value: string } | null) => {
    setFormValues((prev) => ({ ...prev, role: selected?.value || "" }));
  };

  const handleWorkingHourChange = (
    day: DayAbbreviation,
    field: WorkingHourField,
    value: string
  ) => {
    setFormValues((prev) => ({
      ...prev,
      working_hours: prev.working_hours.map((item) =>
        item.day === day ? { ...item, [field]: value } : item
      ),
    }));
  };

  const handleCheckboxChange = (day: DayAbbreviation, isChecked: boolean) => {
    setFormValues((prev) => ({
      ...prev,
      working_hours: prev.working_hours.map((item) =>
        item.day === day ? { ...item, isWorking: isChecked } : item
      ),
    }));
  };

  const getUserLicense = JSON.parse(localStorage.getItem("user") || "{}")
    ?.pharmacy?.license_number;

  const handleSubmit = () => {
    try {
      AddUserSchema.parse(formValues);

      const filteredWorkingHours = formValues.working_hours
        .filter((item) => item.isWorking)
        .map(({ day, start_time, end_time }) => ({ day, start_time, end_time }));

      const payload = {
        full_name: formValues.full_name,
        email: formValues.email,
        contact: formValues.contact,
        address: formValues.address,
        license_number: getUserLicense,
        working_hours: filteredWorkingHours,
        is_manager: formValues.role === "manager",
        is_pharmacist: formValues.role === "pharmacist",
        is_mca: formValues.role === "technician",
        password: "emptypassword",
      };

      postManagementEmployees.mutate(payload);
      toast.success("User added successfully");
      onClose();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.reduce((acc, curr) => {
          acc[curr.path[0]] = curr.message;
          return acc;
        }, {} as {[key: string]: string});
        setErrors(errorMessages);
      }
    }
  };

  const handlePrevious = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-5">
      <div className="relative bg-white w-[90rem] h-[30rem] max-w-6xl p-6 shadow-lg rounded-[1rem]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{title} User</h2>
          <button type="button" className="text-dark" onClick={onClose}>
            <CloseOutlinedIcon />
          </button>
        </div>

        {/* Wizard Steps */}
        <div className="mx-auto w-[60%]">
          <div className="wizard-steps flex justify-between items-center mb-6">
            <div className="flex flex-col items-center w-full">
              <StepIndicator
                stepNumber={1}
                Icon={Person3OutlinedIcon}
                label="User Details"
                activeStep={step}
              />
            </div>
            <div className={`h-1 w-full ${step === 2 ? 'bg-blue-500' : step === 3 ? 'bg-green-500' : 'bg-slate-500'}  transition-colors duration-300`}></div>
            <div className="flex flex-col items-center w-full">
              <StepIndicator
                stepNumber={2}
                Icon={ManageAccountsOutlinedIcon}
                label="User Role"
                activeStep={step}
              />
            </div>
            <div className={`h-1 w-full ${step === 3 ? 'bg-blue-500' : 'bg-slate-500'}   transition-colors duration-300`}></div>
            <div className="flex flex-col items-center w-full">
              <StepIndicator
                stepNumber={3}
                Icon={ManageHistoryIcon}
                label="Working Hours"
                activeStep={step}
              />
            </div>
          </div>
        </div>

        {/* Step 1: User Details */}
        {step === 1 && (
          <div className="stepOne grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-2">
                Full Name
              </label>
              <input
                name="full_name"
                value={formValues.full_name}
                onChange={handleInputChange}
                className={`input bg-white p-2 border-2 rounded focus:outline-none ${
                  errors.full_name ? "border-red-500" : ""
                }`}
                type="text"
                placeholder="Enter user name"
              />
              {errors.full_name && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.full_name}
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-2">
                Email Address
              </label>
              <input
                name="email"
                value={formValues.email}
                onChange={handleInputChange}
                className={`input bg-white p-2 border-2 rounded focus:outline-none ${
                  errors.email ? "border-red-500" : ""
                }`}
                type="email"
                placeholder="Enter email address"
              />
              {errors.email && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.email}
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-2">
                Contact
              </label>
              <input
                name="contact"
                value={formValues.contact}
                onChange={handleInputChange}
                className={`input bg-white p-2 border-2 rounded focus:outline-none ${
                  errors.contact ? "border-red-500" : ""
                }`}
                type="text"
                placeholder="Enter contact"
              />
              {errors.contact && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.contact}
                </span>
              )}
            </div>

            <div className="flex flex-col col-span-3">
              <label className="text-gray-700 font-medium mb-2">
                Address
              </label>
              <input
                name="address"
                value={formValues.address}
                onChange={handleInputChange}
                className={`input bg-white p-2 border-2 rounded focus:outline-none ${
                  errors.address ? "border-red-500" : ""
                }`}
                type="text"
                placeholder="Enter address"
              />
              {errors.address && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.address}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Step 2: User Role */}
        {step === 2 && (
          <div className="stepTwo flex gap-4">
            <div className="flex flex-col w-2/5">
              <label className="text-gray-700 font-medium mb-2">Role</label>
              <CustomSelect
                idField="role"
                nameField="role"
                optionData={rolesValLabels}
                onChange={handleRoleChange}
                isClearable
                value={rolesValLabels.find(role => role.value === formValues.role)}
              />
              {errors.role && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.role}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Step 3: Working Hours */}
        {step === 3 && (
          <div className="stepThree mx-auto flex justify-around justify-items-start flex-wrap gap-3">
            {daysOfWeek?.map((day: string, index: number) => {
              const currentDay = formValues.working_hours[index];
              return (
                <div
                  className={`flex items-center my-2 ${
                    day === "" ? "invisible" : "visible"
                  }`}
                  key={day}
                >
                  <input
                    type="checkbox"
                    checked={currentDay?.isWorking}
                    onChange={(e) =>
                      handleCheckboxChange(
                        currentDay?.day,
                        e.target.checked
                      )
                    }
                  />
                  <label className="mx-2 w-20">{day}</label>
                  <input
                    type="time"
                    required
                    className="border border-gray-300 rounded p-1"
                    value={currentDay?.start_time}
                    onChange={(e) =>
                      handleWorkingHourChange(
                        currentDay?.day,
                        "start_time",
                        e.target.value
                      )
                    }
                    disabled={!currentDay?.isWorking}
                  />
                  <span className="mx-2">to</span>
                  <input
                    required
                    type="time"
                    className="border cursor-pointer border-gray-300 rounded p-1"
                    value={currentDay?.end_time}
                    onChange={(e) =>
                      handleWorkingHourChange(
                        currentDay?.day,
                        "end_time",
                        e.target.value
                      )
                    }
                    disabled={!currentDay?.isWorking}
                  />
                </div>
              );
            })}
            {errors.working_hours && (
              <span className="text-red-500 text-sm mt-1 w-full text-center">
                {errors.working_hours}
              </span>
            )}
          </div>
        )}

        {/* Form Actions */}
        <div className="flex justify-end mt-6 absolute bottom-0 left-0 w-full bg-white p-4 shadow-lg rounded-[1rem]">
          <div className="flex gap-3">
            <button
              type="button"
              className={`bg-gray-300 text-black px-4 py-2 rounded-[0.5rem] w-[10rem] ${
                step === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handlePrevious}
              disabled={step === 1}
            >
              Previous
            </button>
            <button
              type="button"
              className="bg-indigo-600 text-white px-6 py-2 rounded-[0.5rem] w-[10rem]"
              onClick={step === 3 ? handleSubmit : validateStep}
            >
              {step === 3 ? "Submit" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const StepIndicator: React.FC<StepIndicatorProps> = ({
  stepNumber,
  label,
  activeStep,
  Icon,
}) => {
  const isActive = activeStep === stepNumber;
  const isDone = activeStep > stepNumber;

  return (
    <div className="flex flex-col justify-center items-center">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
          isActive ? "bg-blue-600 text-white" : isDone ? 'bg-green-600 text-white': "bg-gray-300 text-black"
        }`}
      >
        <Icon />
      </div>
      <p className="text-sm mt-2 p-0">{label}</p>
    </div>
  );
};

export default AddUserModal;