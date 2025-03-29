"use client";
import DataTable from "@/components/Tables/data-table";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Columns } from "./Columns";
import SearchFieldInput from "@/components/SearchFieldInput/SearchFieldInput";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import AddUserModal from "../../Modals/AddUserModal";
import { useQuery } from "@tanstack/react-query";
import customAxios from "@/api/CustomAxios";
import { endpoints } from "@/api/Endpoints";

function UserManagementTable() {
  const [searchValues, setSetSearchValues] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [formData, setFormData] = useState<any>({});

  //get management data
  const { data: getAllmanagementData } = useQuery({
    queryKey: ["management"],
    queryFn: () =>
      customAxios.get(endpoints.managements + "employees/").then((res) => res),
    select: (findManagedData) => findManagedData?.data || [],
  });

  const handleSearchValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSetSearchValues(event.target.value);
  };

  const handleAddUserClick = () => {
    setShowModal(true); // Open modal
  };

  const handleCloseModal = () => {
    setShowEdit(false);
    setShowModal(false); // Close modal
  };

  const handleActivate = (originalRow: any) => {
    console.log("...");
  };

  const handleEdit = (originalRow: any) => {
    setFormData(originalRow);
    setShowEdit(true);
  };

  return (
    <div className="bg-white shadow-custom p-4 mb-12 rounded-[8px]">
      <div className="flex justify-between items-center my-3">
        <h2 className="text-2xl font-bold font-nunito_sans text-[#202224]">
          User Management
        </h2>

        <div className="flex gap-4">
          <SearchFieldInput
            value={searchValues}
            onChange={handleSearchValueChange}
          />

          <span className="iconHolder w-10 h-10">
            <Image
              src="/assets/images/filterFrame.svg"
              alt="filter icon"
              width={100}
              height={100}
            />
          </span>

          <button
            className="bg-indigo-600 text-white px-6 py-1 rounded-[1rem]"
            onClick={handleAddUserClick}
          >
            <span className="mx-1">
              <GroupAddOutlinedIcon />
            </span>
            Add User
          </button>
        </div>
      </div>

      <DataTable
        columns={Columns({
          handleEdit: handleEdit,
          handleActivate: handleActivate,
        })}
        data={
          getAllmanagementData || {
            results: [],
            count: 0,
            links: { next: null, previous: null },
            total_pages: 0,
          }
        }
        searchValue={searchValues}
      />

      {!!showEdit && (
        <AddUserModal
          isOpen={showEdit}
          onClose={handleCloseModal}
          title="Edit"
          formData={formData}
        />
      )}

      {!!showModal && (
        <AddUserModal
          isOpen={showModal}
          onClose={handleCloseModal}
          title="Add"
        />
      )}
    </div>
  );
}

export default UserManagementTable;
