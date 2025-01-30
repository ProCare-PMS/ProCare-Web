import { ImportPageProps } from "@/Types";
import { ReactSpreadsheetImport } from "react-spreadsheet-import";
import React from "react";
import { fields } from "./Field";
import { useMutation } from "@tanstack/react-query";
import customAxios from "@/api/CustomAxios";
import { endpoints } from "@/api/Endpoints";
import { toast } from "sonner";

function ProductUpload({ showImport, handleClose }: ImportPageProps) {
  const uploadData = useMutation({
    mutationKey: ["product"],
    mutationFn: (data: any) =>
      customAxios
        .post(endpoints.inventories + "import-products/", data)
        .then((res) => res.data),
    onSuccess: () => {
      toast.success("Bulk Upload Successful");
      handleClose();
    },
    onError: (error) => {
      toast.error("Bulk Upload Failed");
      handleClose();
    },
  });
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
        uploadData.mutate(postUpload);
      }}
      fields={fields}
    />
  );
}

export default ProductUpload;
