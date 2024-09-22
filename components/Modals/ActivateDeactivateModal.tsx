import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ReportProblemRoundedIcon from "@mui/icons-material/ReportProblemRounded";

interface ActivateDeactivateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  actionType: "activate" | "deactivate"; // Action type to switch between Activate and Deactivate
  onSubmit: (password: string) => void; // Function to handle the submit logic
}

const ActivateDeactivateUserModal: React.FC<
  ActivateDeactivateUserModalProps
> = ({ isOpen, onClose, actionType, onSubmit }) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(password);
    onClose(); // Close the modal after form submission
  };

  if (!isOpen) return null; // Don't render anything if the modal is not open

  return (
    <div>
      {/* Backdrop */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1000, // Ensure it stays on top of other elements
        }}
        onClick={onClose} // Clicking on the backdrop closes the modal
      />

      {/* Modal Content */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "50%",
          padding: "20px",
          backgroundColor: "#fff",
          borderRadius: "8px",
          zIndex: 1001, // Make sure modal content stays above the backdrop
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <form onSubmit={handleSubmit}>
          {/* Modal Title */}
          <div className="flex justify-between items-center border-b pb-[1rem] mb-[2rem]">
            <h2 className="font-bold text-2xl">
              {actionType === "deactivate"
                ? "Activate User"
                : "Deactivate User"}
            </h2>

            <button
              type="button"
              className="text-dark"
              onClick={onClose} // Close the modal when clicking on the close button
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              <CloseOutlinedIcon />
            </button>
          </div>

          {/* Modal Text */}
          <div className="flex items-center gap-2 my-2 bg-[#FFFAF2] border border-[#D78100] w-full p-2 rounded-xl mb-[2rem]">
            <span className="block text-[#D78100]">
              <ReportProblemRoundedIcon />
            </span>
            <div>
              <p>
                <strong>
                  {actionType === "deactivate"
                    ? "This user will be activated."
                    : "This user will be deactivated."}
                </strong>
              </p>

              <p>
                {actionType === "deactivate"
                  ? "Being activated means the user will regain access to their account."
                  : "Being deactivated means the user will not be able to access their account."}
              </p>
            </div>
          </div>

          {/* Password Input Field */}
          <div className="mb-[2rem]">
            <label htmlFor="" className="block text-sm font-bold mb-2">
              Please type your password to confirm
            </label>
            <div style={{ marginBottom: "20px", position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete="off"
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
              {/* Eye Icon to toggle visibility */}
              <div
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: password.length > 4 ? "#2648EA" : "#ccc",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            disabled={password.length < 5}
          >
            {actionType === "deactivate"
              ? "I understand the consequences, activate this user"
              : "I understand the consequences, deactivate this user"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ActivateDeactivateUserModal;
