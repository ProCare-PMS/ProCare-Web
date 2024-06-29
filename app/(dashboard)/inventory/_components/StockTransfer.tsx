import React from "react";
import EmptyState from "../_purchasesComponents/EmptyState";

const productsItems = [];

const StockTransfer = () => {
  return (
    <div>
      {productsItems.length === 0 && <EmptyState />}

      {/* Filled state */}
    </div>
  );
};

export default StockTransfer;
