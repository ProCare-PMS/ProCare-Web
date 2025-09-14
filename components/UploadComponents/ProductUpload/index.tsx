import { ImportPageProps } from "@/Types";
import { ReactSpreadsheetImport } from "react-spreadsheet-import";
import React, { useState } from "react";
import { fields } from "./Field";
import { useMutation } from "@tanstack/react-query";
import customAxios from "@/api/CustomAxios";
import { endpoints } from "@/api/Endpoints";
import { toast } from "sonner";

function ProductUpload({ showImport, handleClose }: ImportPageProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({ current: 0, total: 0 });
  const [failedProducts, setFailedProducts] = useState<any[]>([]);

  const uploadSingleProduct = useMutation({
    mutationKey: ["product"],
    mutationFn: (data: any) =>
      customAxios
        .post(endpoints.inventoryProduct, data)
        .then((res) => res.data),
  });

  const handleBulkUpload = async (products: any[]) => {
    setIsUploading(true);
    setUploadProgress({ current: 0, total: products.length });
    setFailedProducts([]);
    
    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      setUploadProgress({ current: i + 1, total: products.length });
      
      try {
        await uploadSingleProduct.mutateAsync(product);
        successCount++;
        toast.success(`Product ${i + 1}/${products.length}: ${product.name} uploaded successfully`);
      } catch (error: any) {
        failCount++;
        const errorMessage = error.response?.data?.detail || 
                           error.response?.data?.message || 
                           "Upload failed";
        
        setFailedProducts(prev => [...prev, { 
          product, 
          error: errorMessage,
          index: i + 1 
        }]);
        
        toast.error(`Product ${i + 1}/${products.length}: ${product.name} failed - ${errorMessage}`);
      }
    }

    setIsUploading(false);
    
    // Show final summary
    if (failCount === 0) {
      toast.success(`All ${successCount} products uploaded successfully!`);
    } else if (successCount === 0) {
      toast.error(`All ${failCount} products failed to upload`);
    } else {
      toast.warning(`${successCount} products uploaded successfully, ${failCount} failed`);
    }
    
    handleClose();
  };

  return (
    <ReactSpreadsheetImport
      isOpen={showImport}
      onClose={handleClose}
      onSubmit={(data) => {
        const postUpload = data.validData.map((item: any) => {
          return {
            name: item.name,
            strength: item.strength,
            selling_price: item.selling_price,
            unit: item.unit,
            quantity: item.quantity,
          };
        });
        handleBulkUpload(postUpload);
      }}
      fields={fields}
    />
  );
}

export default ProductUpload;
