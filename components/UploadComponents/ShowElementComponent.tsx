import { ImportPageProps } from "@/Types";
import React from "react";
import ProductUpload from "./ProductUpload";

function ShowImportComponent(
  fileName: string,
  { showImport, handleClose }: ImportPageProps
) {
  if (fileName === "Product") {
    return <ProductUpload showImport={showImport} handleClose={handleClose} />;
  }
  return <div></div>;
}

export default ShowImportComponent;
