import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import BackButton from "@/components/BackButtton/BackButton";
import { CloudUpload } from "lucide-react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

interface ImportProductsModalProps {
  title?: string;
  className?: string;
  setModal: () => void;
}

const ImportProductsModal = ({
  title,
  className,
  setModal,
}: ImportProductsModalProps) => {
  const [isFileSelected, setIsFileSelected] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setIsFileSelected(true);
    } else {
      setIsFileSelected(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-[60%] p-6 relative">
        <div className="flex justify-between items-center border-b mb-2">
          <h2 className="text-lg font-bold mb-4">Import Products</h2>
          <button
            className="text-gray-500 hover:text-gray-800"
            onClick={setModal}
          >
            <CloseOutlinedIcon />
          </button>
        </div>
        
        <div className="border-dashed border-2 mt-6 border-[#D0D5DD] bg-[#F8F8FF] p-10 rounded-[4px] text-center gap-y-4 grid place-items-center">
          <CloudUpload color="#2648EA" size={60} />
          <p className="text-center text-[#0F0F0F] font-bold text-base font-inter">
            Drag & Drop files or{" "}
            <span>
              {" "}
              <input
                type="file"
                id="file-input"
                className="hidden"
                onChange={handleFileChange}
              />
              <label
                htmlFor="file-input"
                className="cursor-pointer text-[#2648EA] underline font-bold text-base"
              >
                Browse
              </label>
            </span>{" "}
          </p>
          <span className="text-[#676767] font-normal text-lg">
            Supported Formats: CSV
          </span>
        </div>
        <Button
          disabled={!isFileSelected} // Disable button if no file is selected
          className={`font-bold text-base rounded-[4px] w-full text-center mt-4 ${
            isFileSelected
              ? "bg-[#2648EA] text-white"
              : "bg-gray-300 text-[#5C5D65]"
          }`}
        >
          Upload Products
        </Button>
      </div>
    </div>
  );
};

export default ImportProductsModal;
