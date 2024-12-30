// components/AddUserModal.tsx
import React, { useState } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Person3OutlinedIcon from "@mui/icons-material/Person3Outlined";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import CustomSelect from "../CustomSelect/CustomSelect";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AddUserSchema,
  stepOneSchema,
  stepTwoSchema,
  stepThreeSchema,
} from "@/lib/schema/schema";
import { useMutation, useQuery } from "@tanstack/react-query";
import { endpoints } from "@/api/Endpoints";
import customAxios from "@/api/CustomAxios";
import {
  daysOfWeek,
  defaultWorkingHours,
  initialWorkingHours,
} from "@/lib/utils";
import { AddUserTypes, DayAbbreviation, WorkingHourField } from "@/lib/Types";

// Modal Component
interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

const optionDataLabelValue: { label: string; value: string }[] = [
  { label: "Officer 1", value: "option1" },
  { label: "Officer 2", value: "option2" },
];

const permissionsoptions: { label: string; value: string }[] = [
  { label: "View Dashboard", value: "view_dashboard" },
  { label: "Manage Users", value: "manage_users" },
];

interface StepIndicatorProps {
  Icon: React.ElementType;
  stepNumber: number; // The current step number (e.g., 1, 2, 3)
  label: string; // The label for the step (e.g., 'User Details')
  activeStep: number; // The currently active step number
}

const AddUserModal: React.FC<AddUserModalProps> = ({
  isOpen,
  onClose,
  title,
}) => {
  const [step, setStep] = useState<number>(1);
  const [formValues, setFormValues] = useState<AddUserTypes>({
    username: "",
    email: "",
    contact: "",
    address: "",
    role: "",
    working_hours: defaultWorkingHours,
    permission: [],
  });

  //mutation
  const postManagementEmployees = useMutation({
    mutationFn: async (value: any) => {
      const res = await customAxios
        .post(endpoints.managements + "employees/", value.formData)
        .then((res) => res);
      return res;
    },
  });

  //get all roles
  const { data: getAllRoles } = useQuery({
    queryKey: ["getAllRoles"],
    queryFn: async () => {
      const res = await customAxios
        .get(endpoints.managements + "employee-roles/")
        .then((res) => res?.data?.results);
      return res;
    },
  });

  console.log({ getAllRoles });

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));
  if (!isOpen) return null; // Don't render if modal is not open

  const validateStep = async () => {
    try {
      if (step === 1) await stepOneSchema.parseAsync(formValues);
      if (step === 2) await stepTwoSchema.parseAsync(formValues);
      if (step === 3) await stepThreeSchema.parseAsync(formValues);
      nextStep(); // Proceed to the next step
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.log(error.errors); // Display validation errors
      }
    }
  };

  const handleChange = (field: string, value: any) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  // Handle changes to working hours
  const handleWorkingHourChange = (
    day: DayAbbreviation,
    field: WorkingHourField,
    value: string
  ) => {
    setFormValues((prev) => ({
      ...prev,
      working_hours: prev.working_hours.map((item) =>
        item?.day === day ? { ...item, [field]: value } : item
      ),
    }));
  };

  // Handle checkbox toggle for a working day
  const handleCheckboxChange = (day: DayAbbreviation, isChecked: boolean) => {
    setFormValues((prev) => ({
      ...prev,
      working_hours: prev.working_hours.map((item) =>
        item.day === day ? { ...item, isWorking: isChecked } : item
      ),
    }));
  };

  //handlesubmit
  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   const values = {
  //     username: formValues.username,
  //     email: formValues.email,
  //     role: formValues.role,
  //     permissions: formValues.permission,
  //     working_hours: formValues.working_hours,
  //     contact: formValues.contact,
  //     address: formValues.address,
  //   };

  //   const filteredworking_hours = formValues.working_hours
  //     .filter((item) => item.isWorking)
  //     .map(({ day, start_time, end_time }) => ({ day, start_time, end_time }));

  //   const payload = { ...formValues, working_hours: filteredworking_hours };

  //   console.log({ values }, { payload });

  //   const result = AddUserSchema.safeParse(values);

  //   if (!result.success) {
  //     console.error(result.error);
  //     return;
  //   }

  //   postManagementEmployees.mutate({ formData: payload });
  // };

  //get user lincense
  const getUserLicense = JSON.parse(localStorage.getItem("user") || "{}")
    ?.pharmacy?.license_number;

  console.log({ getUserLicense });

  const handleSubmit = async () => {
    const filteredworking_hours = formValues.working_hours
      .filter((item) => item.isWorking)
      .map(({ day, start_time, end_time }) => ({ day, start_time, end_time }));

    const payload = {
      ...formValues,
      license_number: getUserLicense,
      working_hours: filteredworking_hours,
      password: "emptypassword",
    };

    //console.log({ payload });

    const result = AddUserSchema.safeParse(formValues);

    if (!result.success) {
      console.error(result.error);
      return;
    }

    // Post only when the form is complete and the user confirms submission
    postManagementEmployees.mutate({ formData: payload });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-5 rounded-[1rem]">
      <div className="relative bg-white w-[90rem] h-[30rem] max-w-6xl p-6 shadow-lg  rounded-[1rem]">
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">{title} User</h2>
            <button className="text-dark" onClick={onClose}>
              <CloseOutlinedIcon />
            </button>
          </div>

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
              <div className="h-1 w-full bg-slate-500"></div>{" "}
              <div className="flex flex-col items-center w-full">
                {/* Vertical line */}
                <StepIndicator
                  stepNumber={2}
                  Icon={ManageAccountsOutlinedIcon}
                  label="User Role"
                  activeStep={step}
                />
              </div>
              <div className="h-1 w-full bg-slate-500"></div>{" "}
              <div className="flex flex-col items-center w-full">
                {/* Vertical line */}
                <StepIndicator
                  stepNumber={3}
                  Icon={ManageHistoryIcon}
                  label="Working Hours"
                  activeStep={step}
                />
              </div>
            </div>
          </div>

          {/* Wizard Content */}
          <div className="wizard-content">
            {step === 1 && (
              <div className="stepOne grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex flex-col">
                  <label className="text-gray-700 font-medium mb-2">
                    User Name
                  </label>
                  <input
                    id="username"
                    name="username"
                    className="input bg-white p-2 border-2 rounded focus:outline-none"
                    type="text"
                    placeholder="Enter user name"
                    value={formValues.username}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-gray-700 font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    className="input bg-white p-2 border-2 rounded focus:outline-none"
                    type="email"
                    placeholder="Enter email address"
                    value={formValues.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-gray-700 font-medium mb-2">
                    Contact
                  </label>
                  <input
                    id="contact"
                    name="contact"
                    className="input bg-white p-2 border-2 rounded focus:outline-none"
                    type="text"
                    placeholder="Enter contact"
                    value={formValues.contact}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="flex flex-col col-span-3">
                  <label className="text-gray-700 font-medium mb-2">
                    Address
                  </label>
                  <input
                    id="address"
                    name="address"
                    className="input bg-white p-2 border-2 rounded focus:outline-none"
                    type="text"
                    placeholder="Enter address"
                    value={formValues.address}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="stepTwo flex gap-4">
                <div className="flex flex-col w-2/5">
                  <label className="text-gray-700 font-medium mb-2">Role</label>
                  <CustomSelect
                    idField="role"
                    nameField="role"
                    optionData={optionDataLabelValue}
                    value={optionDataLabelValue.filter((option) =>
                      formValues.role.includes(option?.value)
                    )}
                    onChange={(selected) =>
                      handleChange("role", selected?.value)
                    }
                    isClearable
                  />
                </div>

                <div className="flex flex-col w-3/5">
                  <label className="text-gray-700 font-medium mb-2">
                    Permissions
                  </label>
                  <CustomSelect
                    idField="permission"
                    nameField="permission"
                    optionData={permissionsoptions}
                    value={permissionsoptions.filter((option) =>
                      formValues.permission.includes(option?.value)
                    )}
                    onChange={(selected) =>
                      handleChange(
                        "permission",
                        selected ? selected.map((item: any) => item.value) : []
                      )
                    }
                    isClearable
                    isMulti
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="stepThree mx-auto flex justify-around justify-items-start flex-wrap gap-3">
                {/* Working Hours */}

                {daysOfWeek?.map((day: string, index: number) => {
                  const currentDay = formValues?.working_hours[index];
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
                        type="time"
                        className="border border-gray-300 rounded p-1"
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
              </div>
            )}
          </div>

          {/* Wizard Actions */}
          <div className="flex justify-end mt-6 absolute bottom-0 left-0 w-full bg-white p-4 shadow-lg rounded-[1rem]">
            <div className="flex gap-3">
              <button
                className={`bg-gray-300 text-black px-4 py-2 rounded-[0.5rem] w-[10rem] ${
                  step === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={prevStep}
                disabled={step === 1}
              >
                Previous
              </button>
              <button
                type="button"
                className={`bg-indigo-600 text-white px-6 py-2 rounded-[0.5rem] w-[10rem]`}
                onClick={step === 3 ? handleSubmit : validateStep}
              >
                {step === 3 ? "Submit" : "Next"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

// Step Indicator Component
const StepIndicator: React.FC<StepIndicatorProps> = ({
  stepNumber,
  label,
  activeStep,
  Icon,
}) => {
  const isActive = activeStep === stepNumber;

  return (
    <div className="flex flex-col justify-center items-center">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center ${
          isActive ? "bg-indigo-600 text-white" : "bg-gray-300 text-black"
        }`}
      >
        <Icon />
      </div>
      <p className="text-sm mt-2 p-0">{label}</p>
    </div>
  );
};

export default AddUserModal;
