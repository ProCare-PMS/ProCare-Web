import React from "react";
import ProductsTabStats from "./ProductsTabStats";
import ProductsTabHeader from "./ProductsTabHeader";
import { ExpandableDataTable } from "@/components/Tables/expandable-data-table";
import { productsTabColumns } from "@/components/Tables/products-tab-columns";
import { productsTabTable } from "@/type";

const ProductsTab = () => {
  return ( 
    <div className="container mx-auto px-12"> {/* Make change here */}
      <ProductsTabStats />
      
      <div className="p-6 bg-white rounded-[12px] mt-7 shadow-[6px_6px_54px_0_rgba(0,0,0,0.05)]">
        <ProductsTabHeader   />
      </div>
    </div>
  );
};

export default ProductsTab;
