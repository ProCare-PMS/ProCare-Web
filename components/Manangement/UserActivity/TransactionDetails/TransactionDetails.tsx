import React from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

interface Product {
  name: string;
  quantity: number;
  price: string;
}

interface User {
  userName: string;
  email: string;
}

export interface TransactionItem {
  id: string;
  user: User[];
  date: string;
  time: string;
  amount: string;
  type: string;
  status: string;
  products: Product[];
}

interface TransactionModalProps {
  title: string;
  item: TransactionItem; // Change from `TransactionItem[]` to `TransactionItem`
  setModal: () => void;
}

const TransactionDetails = ({
  title,
  item,
  setModal,
}: TransactionModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-[60%] p-6 relative">
        <div className="flex justify-between items-center border-b mb-6">
          <h2 className="text-lg font-bold mb-4">{title}</h2>
          <button
            className="text-gray-500 hover:text-gray-800"
            onClick={setModal}
          >
            <CloseOutlinedIcon />
          </button>
        </div>

        {/* Transaction Details */}
        <div className="border-b pb-4 mb-4 grid grid-cols-4 gap-4">
          <div className="text-gray-500 flex flex-col">
            <span>Transaction Id:</span>
            <span className="font-bold">{item.id}</span>
          </div>
          <div className="text-gray-500 flex flex-col">
            <span>Date:</span>
            <span className="font-bold">{item.date}</span>
          </div>
          <div className="text-gray-500 flex flex-col">
            <span>Time:</span>
            <span className="font-bold">{item.time}</span>
          </div>
          <div className="text-gray-500 flex flex-col">
            <span>User:</span>
            <span className="font-bold">{item.user[0].userName}</span>
          </div>
          <div className="text-gray-500 flex flex-col">
            <span>Amount:</span>
            <span className="font-bold">₵{item.amount}</span>
          </div>
          <div className="text-gray-500 flex flex-col">
            <span>Status:</span>
            <span
              className={`font-bold px-1 py-1 rounded-2xl w-1/2 text-center ${
                item.status === "Successful"
                  ? "text-[#219653] bg-[#21965314]"
                  : "text-[#D34053] bg-[#D3405314]"
              }`}
            >
              {item.status}
            </span>
          </div>
        </div>

        {/* Products List */}
        <div className="">
          {item.products.map((product, index) => (
            <div
              key={index}
              className="border-b pb-4 mb-4 grid grid-cols-3 w-full"
            >
              <div className="text-gray-500 flex flex-col">
                <span>Product {index + 1}:</span>
                <span className="font-bold">{product.name}</span>
              </div>
              <div className="text-gray-500 flex flex-col">
                <span>Quantity:</span>
                <span className="font-bold">{product.quantity}</span>
              </div>
              <div className="text-gray-500 flex flex-col">
                <span>Price:</span>
                <span className="font-bold">₵{product.price}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Close Button */}
      </div>
    </div>
  );
};

export default TransactionDetails;
