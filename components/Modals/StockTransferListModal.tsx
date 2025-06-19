"use client";

import { X } from "lucide-react";
import React, { useState, useEffect, useRef } from "react"; // Import useState
import { OtherPharmaciesType } from "../Inventory/StockTransferTab/Columns";
import { Button } from "../ui/button";

// Define a type for a single product entry in the form
interface ProductEntry {
  id: string; // A unique ID for React's key prop
  productName: string;
  quantity: number | ""; // Use "" for initial empty state, then number
  unitPrice: number | ""; // Use "" for initial empty state, then number
}
 
type Props = {
  setModal: () => void;
  item: OtherPharmaciesType;
};

const StockTransferListModal = ({ setModal, item }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);
  // State to manage multiple product entries
  const [productEntries, setProductEntries] = useState<ProductEntry[]>([
    { id: Date.now().toString(), productName: "", quantity: "", unitPrice: "" }, // Initial empty product row
  ]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setModal]);

  // Function to add a new product entry
  const handleAddProduct = () => {
    setProductEntries((prevEntries) => [
      ...prevEntries,
      { id: Date.now().toString(), productName: "", quantity: "", unitPrice: "" },
    ]);
  };

  // Function to handle changes in a specific product entry's input
  const handleProductChange = (
    id: string,
    field: keyof ProductEntry,
    value: string | number
  ) => {
    setProductEntries((prevEntries) =>
      prevEntries.map((entry) =>
        entry.id === id ? { ...entry, [field]: value } : entry
      )
    );
  };

  // Function to remove a product entry
  const handleRemoveProduct = (id: string) => {
    setProductEntries((prevEntries) =>
      prevEntries.filter((entry) => entry.id !== id)
    );
  };

  // Handle form submission (you'll integrate your actual API call here)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitting product entries:", productEntries);
    // Here you would typically send productEntries to your backend
    // using a mutation from react-query or a fetch call.
    // Example: addStockTransferMutation.mutate(productEntries);
    setModal(); // Close modal after submission (or on success of API call)
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
      <div
        ref={modalRef}
        className="bg-white shadow-custom w-[70%] py-4 px-8 mb-12 rounded-[8px] mt-8 grid gap-y-5 transform transition-all duration-300 ease-out animate-slideInFromBottom"
      >
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-4">
            <h3 className="font-bold text-2xl font-inter">
              Stock Transfer List
            </h3>
            <p className="text-[#4C4D4E] text-base leading-[100%] font-normal">
              {item.pharmacy_name}
            </p>
          </div>
          <X onClick={setModal} className="cursor-pointer" />
        </div>

        <hr />

        <form onSubmit={handleSubmit}>
          {productEntries.map((entry, index) => (
            <div key={entry.id} className="grid grid-cols-3 gap-4 mb-4 items-end">
              {/* Select Product */}
              <div className="grid gap-y-2">
                <label
                  htmlFor={`productName-${entry.id}`}
                  className="text-[#323539] font-medium text-sm tracking-[-0.1px]"
                >
                  Select Product
                </label>
                <input
                  type="text"
                  name="productName"
                  id={`productName-${entry.id}`}
                  value={entry.productName}
                  onChange={(e) =>
                    handleProductChange(entry.id, "productName", e.target.value)
                  }
                  className="text-[#858C95] border-[#E5E5E7] rounded-[4px] border tracking-normal text-sm font-normal leading-6 px-4 py-3"
                  placeholder="Select Product"
                />
              </div>

              {/* Quantity */}
              <div className="grid gap-y-2">
                <label
                  htmlFor={`quantity-${entry.id}`}
                  className="text-[#323539] font-medium text-sm tracking-[-0.1px]"
                >
                  Quantity
                </label>
                <input
                  type="number" // Changed to type="number" for quantity
                  name="quantity"
                  id={`quantity-${entry.id}`}
                  value={entry.quantity}
                  onChange={(e) =>
                    handleProductChange(
                      entry.id,
                      "quantity",
                      e.target.value === "" ? "" : Number(e.target.value) // Handle empty string or convert to number
                    )
                  }
                  className="text-[#858C95] border-[#E5E5E7] rounded-[4px] border tracking-normal text-sm font-normal leading-6 px-4 py-3"
                  placeholder="Enter Quantity"
                />
              </div>

              {/* Unit Price and Remove Button */}
              <div className="grid gap-y-2 relative"> {/* Added relative for positioning X */}
                <label
                  htmlFor={`unitPrice-${entry.id}`}
                  className="text-[#323539] font-medium text-sm tracking-[-0.1px]"
                >
                  Unit Price
                </label>
                <input
                  type="number" // Changed to type="number" for unit price
                  name="unitPrice"
                  id={`unitPrice-${entry.id}`}
                  value={entry.unitPrice}
                  onChange={(e) =>
                    handleProductChange(
                      entry.id,
                      "unitPrice",
                      e.target.value === "" ? "" : Number(e.target.value) // Handle empty string or convert to number
                    )
                  }
                  className="text-[#858C95] border-[#E5E5E7] rounded-[4px] border tracking-normal text-sm font-normal leading-6 px-4 py-3"
                  placeholder="Enter Unit Price"
                />
                {/* Show remove button only if there's more than one product entry */}
                {productEntries.length > 1 && (
                  <X
                    onClick={() => handleRemoveProduct(entry.id)}
                    className="cursor-pointer absolute top-0 right-0 mt-2 mr-2 text-red-500" // Position X button
                    size={20}
                  />
                )}
              </div>
            </div>
          ))}

          <div className="flex items-center justify-end mt-6 gap-6">
            <Button type="button" variant="outline" onClick={handleAddProduct}>
              Add another product
            </Button>
            <Button
              type="submit"
              className="text-white relative flex items-center gap-2 !rounded-[20px] py-2 px-6 font-inter"
              variant="secondary"
            >
              Send Request
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StockTransferListModal;