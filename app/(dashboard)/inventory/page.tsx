import React from "react";
import InventoryTabs from "./_components/InventoryTabs";
import InventoryMainTabs from "@/components/Inventory/InventoryMainTabs";
import ProductsTabHeader from "@/components/Inventory/ProductsTab/ProductsTabHeader";

const InventoryPage = () => {
  return (
    <div className="bg-[#FAFBFC]">
      <InventoryMainTabs />
    </div>
  );
};

export default InventoryPage;
