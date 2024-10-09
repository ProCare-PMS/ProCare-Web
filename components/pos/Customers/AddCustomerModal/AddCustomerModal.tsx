import React from "react";
import { MoveLeft } from "lucide-react";
import BasicInfoForm from "./BasicInfoForm";
import HealthInfoForm from "./HealthInfoForm";
import MedicalInfo from "./MedicalInfo";

const AddCustomerModal = () => {
  return (
    <div className="bg-white shadow-custom py-4 px-8 mb-12 rounded-[8px] mt-8 grid gap-y-5 ">
      <div className="flex items-center gap-4 mb-8">
        <MoveLeft />
        <h3 className="font-bold text-xl">Add Customer</h3>
      </div>
      <hr />
      <div className="grid ">
        <BasicInfoForm />
         <hr className="my-7" />
        <HealthInfoForm />
        <hr className="my-7" />
        <MedicalInfo />
      </div>
    </div>
  );
};

export default AddCustomerModal;
