import React from "react";
import CustomerDetails from "./CustomerDetails";
import ViewCustomerTabs from "./ViewCustomerTabs";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { CustomerType } from "../CustomersTable/Columns";

type ViewCustomerProps = {
  setModal: () => void;
  item: CustomerType  | null
};



const ViewCustomer = ({ setModal, item }: ViewCustomerProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-100 rounded-2xl shadow-lg w-[90%] p-6 relative h-full">
        <div className="flex justify-end">
          {/* Closing the modal */}
          <button
            className="text-gray-500 hover:text-gray-800"
            onClick={setModal}
          >
            <CloseOutlinedIcon />
          </button>
        </div>
        <div className="flex items-center justify-between gap-4 h-[88vh]">
          {/* Customer Details*/}
          <div className="w-[30%]  h-full">
            {/* Used -mt-3 because of the "minHeight: 75vh" in the View CustomerTabs to align the horizontally */}
            <CustomerDetails details={item} />
          </div>

          {/* Details */}
          <div className="bg-white p-6 w-[70%] h-full overflow-auto">
            {/* Contains the tabs: Transaction History, HealthInfo and Medical History */}
            <ViewCustomerTabs />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCustomer;
