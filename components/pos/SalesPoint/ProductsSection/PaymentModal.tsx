import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, X, Printer } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useReactToPrint } from "react-to-print";
import { Product } from "./OrderList";
import { Customer } from "./CustomerList";
import customAxios from "@/api/CustomAxios";
import { endpoints } from "@/api/Endpoints";
import { useMutation, useQuery } from "@tanstack/react-query";

interface PaymentModalProps {
  onClose: () => void;
  title: string;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ onClose, title }) => {
  const [orderItems, setOrderItems] = useState<Product[]>([]);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [user, setUser] = useState<any | null>(null)
  const componentRef = useRef<HTMLDivElement>(null);
  const [discount, setDiscount] = useState<any | null>(null)

  useEffect(() => {
    // Load order items and customer from localStorage
    const savedOrderList = localStorage.getItem("orderList");
    const savedCustomer = localStorage.getItem("selectedCustomer");
    const employee = localStorage.getItem("user")
    const discount = localStorage.getItem("discount")
    

    if (savedOrderList) {
      setOrderItems(JSON.parse(savedOrderList));
    }
    if (savedCustomer) {
      setCustomer(JSON.parse(savedCustomer));
    }

    if(employee) {
      setUser(JSON.parse(employee))
    }

    if(discount) {
      setDiscount(JSON.parse(discount))
    }

    // Disable scrolling when modal is open
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "Payment Receipt",
  });

  const removeProduct = (productName: string) => {
    setOrderItems((items) => items.filter((item) => item.name !== productName));
    // Update localStorage
    const updatedItems = orderItems.filter((item) => item.name !== productName);
    localStorage.setItem("orderList", JSON.stringify(updatedItems));
  };
 
  const totalPrice = orderItems.reduce((total, product) => {
    return total + parseFloat(product.selling_price) * product.quantity;
  }, 0);

  const finalPrice = totalPrice - discount

  const finalizePaymentMutation = useMutation({
    mutationFn: async (data: Record<string, any>) => {
      const res = await customAxios.post(endpoints.salesItems, data);
      return res;
    },
  });



  

  const handleFinalize = () => {

    const salesItemsData = {
      discount_type: "",
      discount_value: discount,
      payment_methods: title,
      saleitem_set: orderItems.map((item) => ({
        id: item.id,
        product: item.name,
        quantity: item.quantity,
        total_item_price: parseFloat(item.selling_price),
      })),
      total_base_price: totalPrice,
      total_price_with_discount: finalPrice,
      employee: {
        id: user.id,
        full_name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        contact: user.phone_number,
        address: user.pharmacy.address,
        license_number: user.pharmacy.license_number,
        working_hours: "",
        is_manager: user.is_manager
      },
  }


    // Clear localStorage after successful payment
    //localStorage.removeItem("orderList");
    //localStorage.removeItem("selectedCustomer");
    //onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
    <div
      ref={componentRef}
      className="relative bg-white rounded-xl shadow-xl w-[800px] h-[600px] flex flex-col"
    >
      <div className="p-6 flex-1 overflow-y-auto">
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={onClose}
            className="hover:bg-gray-100 p-2 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h2 className="text-2xl font-bold font-inter text-gray-900">Payment Method</h2>
        </div>

        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-blue-100 text-[#2648EA] rounded-lg py-2 px-4 font-medium">
              {title}
            </div>
            {customer && (
              <div className="bg-blue-100 text-[#2648EA] rounded-lg py-2 px-4 font-medium">
                {customer.full_name}
              </div>
            )}
            <div className="bg-blue-100 text-[#2648EA] rounded-lg py-2 px-4 font-medium">
              Discount: GH₵{discount}
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">Product Name</TableHead>
                  <TableHead className="font-semibold">Quantity</TableHead>
                  <TableHead className="font-semibold">Price</TableHead>
                  <TableHead className="font-semibold w-20">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orderItems.map((product) => (
                  <TableRow key={product.name}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>
                      GH₵{(parseFloat(product.selling_price) * product.quantity).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <button
                        onClick={() => removeProduct(product.name)}
                        className="p-1 hover:bg-red-50 rounded-full text-red-600 transition-colors"
                        aria-label={`Remove ${product.name}`}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="mt-6 text-right">
          <div className="inline-block">
            <p className="text-sm text-gray-500">TOTAL PRICE</p>
            <span className="text-2xl font-bold text-gray-900">
              GH₵ {finalPrice.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <div className="p-6 bg-gray-50 rounded-b-xl border-t flex items-center justify-end gap-3">
        <button className="px-6 py-2.5 border border-[#2648EA] text-[#2648EA] font-semibold rounded-lg hover:bg-blue-50 transition-colors">
          Hold Transaction
        </button>
        <button
          onClick={() => handlePrint()}
          className="px-6 py-2.5 border border-[#2648EA] text-[#2648EA] font-semibold rounded-lg hover:bg-blue-50 transition-colors inline-flex items-center gap-2"
        >
          <Printer className="w-4 h-4" />
          Print
        </button>
        <button className="px-6 py-2.5 bg-[#2648EA] text-white font-semibold rounded-lg hover:bg-[#2648EA] transition-colors">
          Finalize Payment
        </button>
      </div>
    </div>
  </div>
  );
};

export default PaymentModal;
