import React, { useState } from "react";
import { transactionHistoryColumns } from "./Columns";
import DataTable from "@/components/Tables/data-table";
import { transactionHistory } from "./Data";
import EditCustomerModal from "../EditCustomerModal/EditCustomerModal";
import { Pencil } from "lucide-react";

const TransactionHistory = () => {
  const [editProfile, setEditProfile] = useState<boolean>(false);

  return (
    <div className="">
      <div>
        <div className="flex justify-end mb-2">
          <button
            onClick={() => setEditProfile(true)}
            className="text-[#2648EA] font-semibold text-[14px] flex items-center gap-1"
          >
            <Pencil className="w-4" />
            Edit Profile
          </button>
        </div>
        {/* Check the columns for the dropdown actions on the table */}
        <DataTable
          columns={transactionHistoryColumns}
          data={transactionHistory}
        />
      </div>

      {editProfile && (
        <EditCustomerModal closeModal={() => setEditProfile(false)} />
      )}
    </div>
  );
};

export default TransactionHistory;
