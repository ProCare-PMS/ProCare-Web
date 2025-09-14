import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { CloudUpload } from "lucide-react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { toast } from "sonner";
import ShowElementComponent from "@/components/UploadComponents/ShowElementComponent";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import customAxios from "@/api/CustomAxios";
import { endpoints } from "@/api/Endpoints";
import * as XLSX from 'xlsx';

interface ImportProductsModalProps {
  title?: string;
  className?: string;
  setModal: () => void;
}

interface ProductData {
  name: string;
  [key: string]: any; // Allow any additional fields
}

const ImportProductsModal = ({
  title,
  className,
  setModal,
}: ImportProductsModalProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showImport, setShowImport] = useState<boolean>(false);
  const [parsedData, setParsedData] = useState<ProductData[]>([]);
  const queryClient = useQueryClient();

  // Function to parse Excel file
  const parseExcelFile = (file: File): Promise<ProductData[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          
          // Skip header row and process data
          const headers = jsonData[0] as string[];
          const rows = jsonData.slice(1) as any[][];
          
          const products: ProductData[] = rows
            .filter(row => row.some(cell => cell !== undefined && cell !== '')) // Filter out empty rows
            .map((row, index) => {
              const product: any = {};
              
              // Map Excel columns to product properties
              headers.forEach((header, colIndex) => {
                const normalizedHeader = header?.toString().toLowerCase().trim();
                const cellValue = row[colIndex];
                
                switch (normalizedHeader) {
                  case 'name':
                  case 'product name':
                  case 'product_name':
                    product.name = cellValue?.toString() || '';
                    break;
                  case 'strength':
                    product.strength = cellValue?.toString() || '';
                    break;
                  case 'unit':
                    product.unit = cellValue?.toString() || '';
                    break;
                  case 'quantity':
                  case 'qty':
                    product.quantity = parseInt(cellValue) || 0;
                    break;
                  case 'expiry date':
                  case 'expiry_date':
                  case 'expiry':
                    if (cellValue) {
                      // Handle Excel date formats
                      let date;
                      if (typeof cellValue === 'number') {
                        // Excel date serial number
                        date = XLSX.SSF.parse_date_code(cellValue);
                        product.expiry_date = new Date(date.y, date.m - 1, date.d).toISOString();
                      } else {
                        // String date
                        date = new Date(cellValue);
                        if (!isNaN(date.getTime())) {
                          product.expiry_date = date.toISOString();
                        }
                      }
                    }
                    break;
                  case 'reorder level':
                  case 'reorder_level':
                  case 'reorder':
                    product.reorder_level = parseInt(cellValue) || 0;
                    break;
                  case 'cost price':
                  case 'cost_price':
                  case 'cost':
                    product.cost_price = parseFloat(cellValue)?.toFixed(2) || '0.00';
                    break;
                  case 'markup percentage':
                  case 'markup_percentage':
                  case 'markup':
                    product.markup_percentage = parseFloat(cellValue)?.toFixed(2) || '0.00';
                    break;
                  case 'selling price':
                  case 'selling_price':
                  case 'price':
                    product.selling_price = parseFloat(cellValue)?.toFixed(2) || '0.00';
                    break;
                  case 'category':
                    product.category = cellValue?.toString() || '';
                    break;
                  case 'supplier':
                    product.supplier = cellValue?.toString() || '';
                    break;
                  case 'brand':
                    product.brand = cellValue?.toString() || '';
                    break;
                }
              });
              
              // Validate required fields
              if (!product.name || product.name.trim().length === 0) {
                throw new Error(`Row ${index + 2}: Product name is required`);
              }
              if (product.name.length > 100) {
                throw new Error(`Row ${index + 2}: Product name too long (max 100 characters)`);
              }
              
              // Match the exact format from API docs - include required fields
              const transformedProduct: any = {
                name: product.name, // Required
                // Add required fields with default values since Excel doesn't have them
                category: null, // Will be set to default category if needed
                supplier: null, // Will be set to default supplier if needed
                product_status: "Available", // Default status
              };

              // Add fields only if they have values (like the working AddProductsModal)
              if (product.strength) transformedProduct.strength = product.strength;
              if (product.unit) transformedProduct.unit = product.unit;
              if (product.quantity) transformedProduct.quantity = Number(product.quantity);
              if (product.expiry_date) transformedProduct.expiry_date = product.expiry_date;
              if (product.reorder_level) transformedProduct.reorder_level = Number(product.reorder_level);
              if (product.cost_price) transformedProduct.cost_price = product.cost_price;
              if (product.markup_percentage) transformedProduct.markup_percentage = product.markup_percentage;
              if (product.selling_price) transformedProduct.selling_price = product.selling_price;
              if (product.brand) transformedProduct.brand = product.brand;
              if (product.manufacture_date) transformedProduct.manufacture_date = product.manufacture_date;
              if (product.unit_price) transformedProduct.unit_price = product.unit_price;
              
              return transformedProduct as ProductData;
            });
          
          resolve(products);
        } catch (error) {
          reject(error);
        }
      };
      
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsArrayBuffer(file);
    });
  };

  const uploadData = useMutation({
    mutationKey: ["product"],
    mutationFn: async (products: ProductData[]) => {
      // Use the exact same structure as AddProductsModal
      const results = [];
      for (const product of products) {
        console.log(`Creating product: ${product.name}`, product);
        
        // Copy the exact mutation pattern from AddProductsModal
        const res = await customAxios.post(
          endpoints.inventories + "products/",
          product
        );
        results.push(res.data);
      }
      return results;
    },
    onSuccess: (results) => {
      queryClient.invalidateQueries({ queryKey: ["inventoryProducts"] });
      queryClient.invalidateQueries({ queryKey: ["inventoryProductsStock"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardData"] });
      toast.success("Bulk Upload Successful");
      setSelectedFile(null);
      setParsedData([]);
      setShowImport(false);
      setModal();
    },
    onError: (error: any) => {
      console.error("Upload error:", error);
      toast.error("Failed to import products");
    },
  });

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedFile(file);
      
      try {
        toast.info("Parsing Excel file...");
        const products = await parseExcelFile(file);
        setParsedData(products);
        toast.success("File parsed successfully");
      } catch (error: any) {
        toast.error(`Error parsing Excel file: ${error.message}`);
        setSelectedFile(null);
        setParsedData([]);
      }
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

    if (parsedData.length === 0) {
      toast.error("No valid product data found in the file.");
      return;
    }

    uploadData.mutate(parsedData);
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
                disabled={uploadData.isPending}
                className="bg-blue-500 w-44 px-2 py-3 text-white rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploadData.isPending ? "Submitting..." : "Submit"}
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
