import React, { useState, useEffect } from 'react';
import { Printer } from 'lucide-react';

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
    <div className="bg-white p-6 font-mono text-xs w-80 mx-auto border border-gray-300 shadow-lg">
      {/* Header Section */}
      <div className="text-center mb-4">
        <h1 className="font-bold text-base mb-1">
          {user?.pharmacy?.facility_name || 'Pharmacy Name'}
        </h1>
        <p className="text-xs mb-1">{user?.pharmacy?.address || 'Address'}</p>
        <div className="border-b-2 border-black w-full mb-2" />
        <p className="font-bold">SALES RECEIPT</p>
      </div>

      {/* Transaction Info */}
      <div className="mb-4 text-xs">
        <div className="flex justify-between mb-1">
          <span>Date:</span>
          <span>{new Date().toLocaleString()}</span>
        </div>
        <div className="flex justify-between mb-1">
          <span>Cashier:</span>
          <span>{user ? `${user.first_name} ${user.last_name}` : 'N/A'}</span>
        </div>
        {customer && (
          <div className="flex justify-between mb-1">
            <span>Customer:</span>
            <span>{customer.full_name}</span>
          </div>
        )}
      </div>

      {/* Items Table */}
      <div className="mb-4">
        <div className="border-y border-black py-1">
          <div className="grid grid-cols-12 font-bold">
            <div className="col-span-5">Item</div>
            <div className="col-span-2 text-center">Qty</div>
            <div className="col-span-5 text-right">Amount</div>
          </div>
        </div>
        
        <div className="py-2">
          {orderItems.map((product, index) => (
            <div key={index} className="grid grid-cols-12 mb-1">
              <div className="col-span-5 truncate">{product.name}</div>
              <div className="col-span-2 text-center">{product.quantity}</div>
              <div className="col-span-5 text-right">
                GH₵{(parseFloat(product.selling_price) * product.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Totals Section */}
      <div className="border-t border-black pt-2">
        <div className="flex justify-between mb-1">
          <span>Subtotal:</span>
          <span>GH₵{totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-1">
          <span>Discount:</span>
          <span>GH₵{discount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-sm border-t border-black pt-2">
          <span>TOTAL:</span>
          <span>GH₵{finalPrice.toFixed(2)}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-6 space-y-1">
        <p className="font-bold">Thank you for your purchase!</p>
        <p className="text-[10px]">For returns and exchanges, please present this receipt</p>
        <p className="text-[10px]">within 7 days of purchase.</p>
        <div className="border-t border-dashed border-gray-400 mt-2 pt-2">
          <p className="text-[10px]">Receipt Generated: {new Date().toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default ThermalReceipt;