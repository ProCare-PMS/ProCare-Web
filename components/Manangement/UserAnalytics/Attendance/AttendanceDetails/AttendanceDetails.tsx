import React from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { AttendanceItems } from "@/lib/Types";

interface TransactionModalProps {
  title: string;
  item: AttendanceItems;
  setModal: () => void;
}

const AttendanceDetails = ({
  title,
  item,
  setModal,
}: TransactionModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-[60%] p-6 relative">
        <div className="flex justify-between items-center border-b mb-6">
          <h2 className="text-lg font-bold mb-4">{title}</h2>
          <button
            className="text-gray-500 hover:text-gray-800"
            onClick={setModal}
          >
            <CloseOutlinedIcon />
          </button>
        </div>

        {/*  Details */}
        <div className="border-b pb-4 mb-4 grid grid-cols-4 gap-4">
          <div className="text-gray-500 flex flex-col">
            <span>Date:</span>
            <span className="font-bold">{item.date}</span>
          </div>
          <div className="text-gray-500 flex flex-col">
            <span>Employee:</span>
            <span className="font-bold">{item.employee_name}</span>
          </div>
          <div className="text-gray-500 flex flex-col">
            <span>Clock-In:</span>
            <span className="font-bold">{item.clock_in}</span>
          </div>
          <div className="text-gray-500 flex flex-col">
            <span>Clock-Out:</span>
            <span className="font-bold">{item.clock_out}</span>
          </div>
          <div className="text-gray-500 flex flex-col">
            <span>Total Hours:</span>
            <span className="font-bold">₵{item.total_hours}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceDetails;
