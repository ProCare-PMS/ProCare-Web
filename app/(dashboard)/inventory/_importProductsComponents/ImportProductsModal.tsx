import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { CloudUpload } from "lucide-react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { toast } from "sonner";
import ShowElementComponent from "@/components/UploadComponents/ShowElementComponent";

interface ImportProductsModalProps {
  title?: string;
  className?: string;
  setModal: () => void;
}

const baseUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:6325"
    : process.env.NEXT_PUBLIC_API_URL;

const ImportProductsModal = ({
  title,
  className,
  setModal,
}: ImportProductsModalProps) => {
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [showImport, setShowImport] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setIsFileSelected(true);
    } else {
      setIsFileSelected(false);
    }
  };

  const handleDownload = async (fileName: string) => {
    if (!fileName) {
      toast.error("No file specified for download. Please try again.");
      console.log("Nothing to download");
      return;
    }

    const link = document.createElement("a");
    link.href = `${baseUrl}/assets/Template/${fileName}.xlsx`;
    try {
      const response = await fetch(link.href, { method: "HEAD" });
      if (!response.ok) {
        toast.error("Template File not found or failed to download.");
        return;
      }
    } catch (error) {
      toast.error("Failed to connect to the server. Please try again.");
      return;
    }
    link.download = fileName;
    link.click();
  };

  return (
    <div>
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

          <div className="flex justify-around my-5">
            <button
              type="button"
              onClick={() => setShowImport(true)}
              className="bg-green-900 w-44 h-20 shadow-xl flex justify-center items-center rounded-2xl px-2 text-white"
            >
              Upload Product Data
            </button>
            <button
              type="button"
              onClick={() => title && handleDownload(title)}
              className="bg-blue-900 w-44 h-20 shadow-xl text-center flex justify-center items-center rounded-2xl px-2 text-white"
            >
              Download Product Excel file
            </button>
          </div>
        </div>
      </div>
      {showImport &&
        title &&
        ShowElementComponent(title, {
          showImport,
          handleClose: () => setShowImport(false),
        })}
    </div>
  );
};

export default ImportProductsModal;
