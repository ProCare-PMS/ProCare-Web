import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Modal from "@mui/material/Modal"; // Modal from Material UI, or you can create your own

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

  const handleSubmit = () => {
    onSubmit(password);
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div
        style={{
          width: "400px",
          margin: "100px auto",
          padding: "20px",
          backgroundColor: "#fff",
          borderRadius: "8px",
          border: "1px solid #ccc",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Modal Title */}
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          {actionType === "deactivate" ? "Deactivate User" : "Activate User"}
        </h2>

        {/* Modal Text */}
        <p>
          <strong>
            {actionType === "deactivate"
              ? "This user will be deactivated."
              : "This user will be activated."}
          </strong>
        </p>
        <p>
          {actionType === "deactivate"
            ? "Being deactivated means the user will not be able to access their account."
            : "Being activated means the user will regain access to their account."}
        </p>

        {/* Password Input Field */}
        <div style={{ marginBottom: "20px", position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
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

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#ff5f5f",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {actionType === "deactivate"
            ? "I understand the consequences, deactivate this user"
            : "I understand the consequences, activate this user"}
        </button>
      </div>
    </Modal>
  );
};

export default ActivateDeactivateUserModal;
