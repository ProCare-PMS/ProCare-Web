"use client";

import { useState, useRef, useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddUserModal from "../../Modals/AddUserModal";
import ActivateDeactivateUserModal from "@/components/Modals/ActivateDeactivateModal";

export const Columns: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "User Name",
  },
  {
    accessorKey: "email",
    header: "Email Address",
  },
  {
    accessorKey: "contact",
    header: "Contact",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "workingDays",
    header: "Working Days",
    cell: ({ getValue }) => {
      const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"]; // Sunday to Saturday
      const workingDays = getValue() as number[]; // Should be an array like [1, 2, 3, ...]

      return (
        <div style={{ display: "flex", gap: "4px" }}>
          {daysOfWeek.map((day, index) => {
            const dayNumber = index + 1; // Sunday is 1, Saturday is 7
            const isWorkingDay = workingDays.includes(dayNumber);

            return (
              <div
                key={index}
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: isWorkingDay ? "blue" : "gray",
                  color: isWorkingDay ? "white" : "black",
                  border: isWorkingDay ? "2px solid blue" : "1px solid gray",
                }}
              >
                {day}
              </div>
            );
          })}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ getValue }) => <ActionMenu />, // Render ActionMenu component for each row
  },
];

const ActionMenu = () => {
  const [isOpen, setIsOpen] = useState(false); // Toggle popup visibility
  const menuRef = useRef<HTMLDivElement>(null); // Reference to the action menu div
  const [showModal, setShowModal] = useState<boolean>(false);
  const [activeModalShow, setActiveModalShow] = useState<boolean>(false);
  const [actionType, setActionType] = useState<"activate" | "deactivate">(
    "deactivate"
  ); // For managing modal type

  // Toggle popup visibility
  const togglePopup = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent click from propagating and triggering other handlers
    setIsOpen(!isOpen);
  };

  // Handle click outside the popup
  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close modal
    setActiveModalShow(false);
  };

  const handleEdit = () => {
    setShowModal(true);
    setIsOpen(false);
  };

  const handleToggleActivation = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering close on click
    setActionType((prevType) =>
      prevType === "deactivate" ? "activate" : "deactivate"
    );
    setActiveModalShow(true); // Open modal
    setIsOpen(false); // Close the action menu
  };

  const handleModalSubmit = (password: string) => {
    console.log("Password entered:", password);
    handleCloseModal(); // Close the modal after submission
  };

  // Add event listener for click outside
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div style={{ position: "relative" }}>
      {/* Icon button to toggle popup */}
      <div
        style={{
          width: "30px",
          height: "30px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={togglePopup}
      >
        <MoreVertIcon />
      </div>

      {/* Popup card */}
      {isOpen && (
        <div
          ref={menuRef}
          style={{
            position: "absolute",
            top: "35px",
            right: "0",
            width: "150px",
            padding: "10px",
            backgroundColor: "#fff",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            zIndex: 10,
          }}
        >
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li
              style={{
                padding: "8px 0",
                cursor: "pointer",
                borderBottom: "1px solid #eee",
              }}
              onClick={handleEdit}
            >
              Edit Details
            </li>
            <li
              style={{
                padding: "8px 0",
                cursor: "pointer",
              }}
              onClick={handleToggleActivation}
            >
              {actionType === "deactivate" ? "Activate" : "Deactivate"}
            </li>
          </ul>
        </div>
      )}

      <AddUserModal
        isOpen={showModal}
        onClose={handleCloseModal}
        title="Edit"
      />

      {/* Reusable Modal for Activation/Deactivation */}
      <ActivateDeactivateUserModal
        isOpen={activeModalShow}
        onClose={handleCloseModal}
        actionType={actionType}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
};
