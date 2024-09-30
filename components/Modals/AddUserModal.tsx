// components/AddUserModal.tsx
import React, { useState } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Person3OutlinedIcon from "@mui/icons-material/Person3Outlined";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";

// Modal Component
interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

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
  const [step, setStep] = useState<number>(1); // Step management

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  if (!isOpen) return null; // Don't render if modal is not open

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-5">
      <div className="relative bg-white w-[90rem] h-[30rem] max-w-6xl p-6 shadow-lg">
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
                  className="input bg-white p-2 border-2 rounded focus:outline-none"
                  type="text"
                  placeholder="Enter user name"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-gray-700 font-medium mb-2">
                  Email Address
                </label>
                <input
                  className="input bg-white p-2 border-2 rounded focus:outline-none"
                  type="email"
                  placeholder="Enter email address"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-gray-700 font-medium mb-2">
                  Contact
                </label>
                <input
                  className="input bg-white p-2 border-2 rounded focus:outline-none"
                  type="text"
                  placeholder="Enter contact"
                />
              </div>

              <div className="flex flex-col col-span-3">
                <label className="text-gray-700 font-medium mb-2">
                  Address
                </label>
                <input
                  className="input bg-white p-2 border-2 rounded focus:outline-none"
                  type="text"
                  placeholder="Enter address"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="stepTwo flex gap-4">
              <div className="flex flex-col w-2/5">
                <label className="text-gray-700 font-medium mb-2">Role</label>
                <select className="input border border-gray-300 p-2 rounded focus:outline-none">
                  <option>Admin</option>
                  <option>User</option>
                  <option>Manager</option>
                </select>
              </div>

              <div className="flex flex-col w-3/5">
                <label className="text-gray-700 font-medium mb-2">
                  Permissions
                </label>
                <select className="input border border-gray-300 p-2 rounded focus:outline-none">
                  <option>Read</option>
                  <option>Write</option>
                  <option>Edit</option>
                </select>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="stepThree mx-auto">
              <div className="flex gap-4">
                <div className="flex items-center my-2 w-1/2">
                  <input type="checkbox" />
                  <label className="mx-2 w-20">Sunday</label>
                  <input
                    type="time"
                    className="border border-gray-300 rounded p-1"
                  />
                  <span className="mx-2">to</span>
                  <input
                    type="time"
                    className="border border-gray-300 rounded p-1"
                  />
                </div>
                <div className="flex items-center my-2 w-1/2">
                  <input type="checkbox" />
                  <label className="mx-2 w-20">Monday</label>
                  <input
                    type="time"
                    className="border border-gray-300 rounded p-1"
                  />
                  <span className="mx-2">to</span>
                  <input
                    type="time"
                    className="border border-gray-300 rounded p-1"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex items-center my-2 w-1/2">
                  <input type="checkbox" />
                  <label className="mx-2 w-20">Tuesday</label>
                  <input
                    type="time"
                    className="border border-gray-300 rounded p-1"
                  />
                  <span className="mx-2">to</span>
                  <input
                    type="time"
                    className="border border-gray-300 rounded p-1"
                  />
                </div>
                <div className="flex items-center my-2 w-1/2">
                  <input type="checkbox" />
                  <label className="mx-2 w-20">Wednesday</label>
                  <input
                    type="time"
                    className="border border-gray-300 rounded p-1"
                  />
                  <span className="mx-2">to</span>
                  <input
                    type="time"
                    className="border border-gray-300 rounded p-1"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex items-center my-2 w-1/2">
                  <input type="checkbox" />
                  <label className="mx-2 w-20">Thursday</label>
                  <input
                    type="time"
                    className="border border-gray-300 rounded p-1"
                  />
                  <span className="mx-2">to</span>
                  <input
                    type="time"
                    className="border border-gray-300 rounded p-1"
                  />
                </div>
                <div className="flex items-center my-2 w-1/2">
                  <input type="checkbox" />
                  <label className="mx-2 w-20">Friday</label>
                  <input
                    type="time"
                    className="border border-gray-300 rounded p-1"
                  />
                  <span className="mx-2">to</span>
                  <input
                    type="time"
                    className="border border-gray-300 rounded p-1"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex items-center my-2 w-1/2">
                  <input type="checkbox" />
                  <label className="mx-2 w-20">Saturday</label>
                  <input
                    type="time"
                    className="border border-gray-300 rounded p-1"
                  />
                  <span className="mx-2">to</span>
                  <input
                    type="time"
                    className="border border-gray-300 rounded p-1"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Wizard Actions */}
        <div className="flex justify-end mt-6 absolute bottom-0 left-0 w-full bg-white p-4 shadow-lg">
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
              className={`bg-indigo-600 text-white px-6 py-2 rounded-[0.5rem] w-[10rem] ${
                step === 3 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={nextStep}
              disabled={step === 3}
            >
              {step === 3 ? "Save" : "Next"}
            </button>
          </div>
        </div>
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
