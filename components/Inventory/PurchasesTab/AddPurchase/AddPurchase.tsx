import React, { useState } from "react";
import { MoveLeft } from "lucide-react";

interface AddPurchaseProps {
  onClose: () => void;
}

const AddPurchase = ({ onClose }: AddPurchaseProps) => {
  
  // State to keep track of product forms
  const [products, setProducts] = useState([{ id: 1 }]);

  // Function to add a new product form
  const handleAddProduct = () => {
    setProducts((prevProducts) => [
      ...prevProducts,
      { id: prevProducts.length + 1 },
    ]);
  };

  return (
    <div className="bg-white shadow-custom py-4 px-8 mb-12 rounded-[8px] mt-8 grid gap-y-5 ">
      <div className="flex items-center gap-4 mb-4">
        <MoveLeft onClick={onClose} className="cursor-pointer" />
        <h3 className="font-bold text-2xl font-inter">Add Purchase</h3>
      </div>
      <hr />
      <div className="grid">
        {/* Purchase Details */}
        <div>
          <h2 className="text-[#202224] font-bold text-base font-inter">
            Purchase Details
          </h2>
          <form>
            <div className="grid gap-y-2 mt-3">
              <label
                htmlFor=""
                className="text-[#323539] font-inter font-medium text-sm"
              >
                Select Supplier
              </label>
              <select
                className="rounded-[4px] py-3 px-2 border border-[#E5E5E7] w-[400px] text-[#858C95] text-sm font-normal"
              >
                <option value="volvo">Select supplier</option>
                <option value="saab">Rick Grimes</option>
                <option value="mercedes">Kelvin</option>
                <option value="audi">Aneal</option>
              </select>
            </div>

            <hr className="my-7" />

            {/* Products Details */}
            <div>
              <h2 className="text-[#202224] font-bold text-base font-inter">
                Products Details
              </h2>
              {products.map((product, index) => (
                <div
                  key={product.id}
                  className="grid grid-cols-3 gap-5 mt-3 pb-3 mb-3"
                >
                  {/* Select Product */}
                  <div className="grid gap-y-2">
                    <label
                      htmlFor=""
                      className="text-[#323539] font-inter font-medium text-sm"
                    >
                      Select Product
                    </label>
                    <select
                      className="rounded-[4px] py-3 px-2 border border-[#E5E5E7] text-[#858C95] text-sm font-normal"
                    >
                      <option value="volvo">Select product</option>
                      <option value="saab">Saab</option>
                      <option value="opel">Opel</option>
                      <option value="audi">Audi</option>
                    </select>
                  </div>
                  {/* Quantity */}
                  <div className="grid gap-y-2">
                    <label
                      htmlFor=""
                      className="text-[#323539] font-inter font-medium text-sm"
                    >
                      Quantity
                    </label>
                    <input
                      type="number"
                      placeholder="Enter Quantity"
                      className="rounded-[4px] py-3 px-2 border border-[#E5E5E7] text-[#858C95] text-sm font-normal"
                    />
                  </div>
                  {/* Unit Price */}
                  <div className="grid gap-y-2">
                    <label
                      htmlFor=""
                      className="text-[#323539] font-inter font-medium text-sm"
                    >
                      Unit Price(GHS)
                    </label>
                    <input
                      type="number"
                      placeholder="Enter Unit Price"
                      className="rounded-[4px] py-3 px-2 border border-[#E5E5E7] text-[#858C95] text-sm font-normal"
                    />
                  </div>
                </div>
              ))}

              <div className="flex items-center justify-between mt-6">
                <div className="grid">
                  <h3 className="font-inter text-[#858C95] font-normal text-sm">
                    TOTAL AMOUNT(GHS)
                  </h3>
                  <span className="font-bold text-xl mt-2 font-inter text-[#202224]">
                    GHS 17,399
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={handleAddProduct}
                    className="border border-[#323539] flex-1 rounded-[4px] py-2 px-8 text-[#323539] font-inter font-semibold text-sm"
                  >
                    Add Product
                  </button>
                  <button type="submit" className="bg-[#2648EA] rounded-[4px] flex-1 py-2 px-8 text-white font-inter font-semibold text-sm">
                    Save
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPurchase;
