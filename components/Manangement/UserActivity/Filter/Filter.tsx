import React, { useEffect, useRef } from "react";
import { MenuItem, Select, Button } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

interface FilterDropdownProps {
  onClose: () => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ onClose }) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Close the dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={dropdownRef}
      className="absolute z-10 w-[400px] mt-[3rem] right-10 p-4 bg-white shadow-lg rounded-lg"
    >
      <h2 className="text-lg font-semibold mb-4">Filter</h2>

      {/* Status Dropdown */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Status</label>
        <Select fullWidth defaultValue="" className="h-10">
          <MenuItem value="success">Success</MenuItem>
          <MenuItem value="failed">Failed</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
        </Select>
      </div>

      {/* Action Type Dropdown */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Action Type</label>
        <Select fullWidth defaultValue="" className="h-10">
          <MenuItem value="purchase">Purchase</MenuItem>
          <MenuItem value="refund">Refund</MenuItem>
        </Select>
      </div>

      {/* Date Picker */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Date</label>
        {/* <DatePicker className="w-full" /> */}
        <div className="border h-10 w-full flex justify-between items-center px-1 rounded-[4px]">
          <input
            type="text"
            className="outline-none border-none w-[90] h-full"
          />
          <span className="flex justify-end w-[10%]">
            <CalendarMonthIcon />
          </span>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="w-full flex justify-between items-center">
        <Button
          variant="contained"
          onClick={onClose}
          className="shadow-sm bg-white text-black w-32"
        >
          Reset All
        </Button>
        <Button
          variant="contained"
          className="shadow-sm bg-[#2648EA] text-white px-2 w-32"
        >
          Apply
        </Button>
      </div>
    </div>
  );
};

export default FilterDropdown;
