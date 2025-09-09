import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { CloudUpload } from "lucide-react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { toast } from "sonner";
import ShowElementComponent from "@/components/UploadComponents/ShowElementComponent";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import customAxios from "@/api/CustomAxios";
import { endpoints } from "@/api/Endpoints";

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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showImport, setShowImport] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const uploadData = useMutation({
    mutationKey: ["product"],
    mutationFn: (file: File) => {
      const formData = new FormData();
      formData.append("file", file);

      return customAxios.post(
        endpoints.inventories + "import-products/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventoryProducts"] });
      queryClient.invalidateQueries({ queryKey: ["inventoryProductsStock"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardData"] });
      toast.success("Bulk Upload Successful");
      setSelectedFile(null); // Clear the file input after successful upload
      setShowImport(false);
      setModal();
    },
    onError: (error) => {
      throw error;
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = () => {
    if (!selectedFile) {
      toast.error("Please select a file first.");
      return;
    }

    uploadData.mutate(selectedFile);
  };

  const handleDownload = async (fileName: string) => {
    if (!fileName) {
      toast.error("No file specified for download. Please try again.");
      return;
    }

    const fileUrl = `/assets/Template/${fileName}.xlsx`;

    try {
      const response = await fetch(fileUrl, { method: "HEAD" });
      if (!response.ok) {
        throw new Error("Template file not found.");
      }

      const link = document.createElement("a");
      link.href = fileUrl;
      link.setAttribute("download", `${fileName}.xlsx`);

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      toast.error("Failed to download the file.");
    }
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
            {/* Upload Button */}
            <button
              type="button"
              onClick={handleUploadClick}
              className="bg-green-900 w-44 shadow-xl flex justify-center items-center rounded-2xl px-2 py-3 text-white"
            >
              Upload Product Data
            </button>

            {/* Hidden file input */}
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileChange}
              ref={fileInputRef}
              className="hidden"
            />

            {/* Submit File Button */}
            {selectedFile && (
              <button
                onClick={handleSubmit}
                className="bg-blue-500 w-44 px-2 py-3 text-white rounded-2xl"
              >
                Submit
              </button>
            )}

            {/* Download Button */}
            <button
              type="button"
              onClick={() => title && handleDownload(title)}
              className="bg-blue-900 w-44 shadow-xl text-center flex justify-center items-center rounded-2xl px-2 py-3 text-white"
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
