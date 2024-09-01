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

interface ImportProductsModalProps {
  title: string;
  className?: string;
}

const ImportProductsModal = ({
  title,
  className,
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
    <Dialog>
      <DialogTrigger asChild>
        <Button className={className}>{title}</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[900px] bg-white">
        <div className="flex items-center gap-72">
          <span className="">
            <BackButton />
          </span>
          <DialogTitle className="text-2xl font-inter  font-bold text-[#202224]">
            Import Product
          </DialogTitle>
        </div>
        <div className="border-dashed border-2 border-[#D0D5DD] bg-[#F8F8FF] p-10 rounded-[4px] text-center gap-y-4 grid place-items-center">
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
          className={`font-bold text-base rounded-[4px] ${
            isFileSelected
              ? "bg-[#2648EA] text-white"
              : "bg-[#F0F1F1] text-[#5C5D65]"
          }`}
        >
          Upload Products
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ImportProductsModal;
