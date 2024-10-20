import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import AddCategoryModal from "./AddCategoryModal";

const AddCategory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openCategoryTable = () => {
    setIsModalOpen(true);
  };

  const onClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex items-start justify-end">
        <Button
          type="button"
          className="text-white relative flex items-center gap-2 rounded-[12px] font-inter w-[200px]"
          variant="secondary"
          onClick={openCategoryTable}
        >
          <Plus />
          Add New Categories
        </Button>
      </div>

      {isModalOpen && <AddCategoryModal onClose={onClose} />}
    </>
  );
};

export default AddCategory;
