import React, { useState, useEffect } from 'react';
import { Printer } from 'lucide-react';
 //B2C
interface Product {
  id: number;
  name: string;
  selling_price: string;
  quantity: number;
}

interface Customer {
  full_name: string;
}

interface User {
  id: number;
  first_name: string;
  last_name: string;
  pharmacy?: {
    address?: string;
    license_number?: string;
    facility_name: string
  };
}

const ThermalReceipt: React.FC = () => {
  const [orderItems, setOrderItems] = useState<Product[]>([]);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [discount, setDiscount] = useState<number>(0);

  useEffect(() => {
    const savedOrderList = localStorage.getItem("orderList");
    const savedCustomer = localStorage.getItem("selectedCustomer");
    const savedEmployee = localStorage.getItem("user");
    const savedDiscount = localStorage.getItem("discount");

    if (savedOrderList) setOrderItems(JSON.parse(savedOrderList));
    if (savedCustomer) setCustomer(JSON.parse(savedCustomer));
    if (savedEmployee) setUser(JSON.parse(savedEmployee));
    if (savedDiscount) setDiscount(JSON.parse(savedDiscount));
  }, []);

  const totalPrice = orderItems.reduce((total, product) => {
    return total + parseFloat(product.selling_price) * product.quantity;
  }, 0);

  const finalPrice = totalPrice - discount;

  return (
    <div className="bg-white p-4 font-mono text-xs w-72 mx-auto border border-gray-300 shadow-lg">
      <div className="text-center mb-2">
        <h1 className="font-bold text-sm">{ user && user?.pharmacy?.facility_name}</h1>
        <p className="text-[10px]">Payment Receipt</p>
      </div>

      <div className="border-b border-dashed border-gray-400 pb-2 mb-2">
        <p>Date: {new Date().toLocaleString()}</p>
        <p>Cashier: {user ? `${user.first_name} ${user.last_name}` : 'N/A'}</p>
        {customer && <p>Customer: {customer.full_name}</p>}
      </div>

      <div className="mb-2">
        {orderItems.map((product, index) => (
          <div key={index} className="flex justify-between">
            <span>{product.name} x{product.quantity}</span>
            <span>GH₵{(parseFloat(product.selling_price) * product.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>

      <div className="border-t border-dashed border-gray-400 pt-2">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>GH₵{totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Discount</span>
          <span>GH₵{discount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>GH₵{finalPrice.toFixed(2)}</span>
        </div>
      </div>

      <div className="text-center mt-2 text-[10px]">
        <p>Thank you for your purchase!</p>
      </div>

      <div className="mt-2 text-center">
        <button className="inline-flex items-center text-[10px] bg-blue-100 text-blue-700 px-2 py-1 rounded">
          <Printer className="w-3 h-3 mr-1"/> Reprint
        </button>
      </div>
    </div>
  );
};

export default ThermalReceipt;