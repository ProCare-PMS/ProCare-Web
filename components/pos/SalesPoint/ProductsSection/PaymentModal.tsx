import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, X, Printer, Minus } from "lucide-react";
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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import SwalToaster from "@/components/SwalToaster/SwalToaster";
import { Plus } from "lucide-react";
import ThermalReceipt from "./ThermalReceipt";

interface PaymentModalProps {
  onClose: () => void;
  title: string;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ onClose, title }) => {
  const [orderItems, setOrderItems] = useState<Product[]>([]);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const receiptRef = useRef<HTMLDivElement>(null);
  const [discount, setDiscount] = useState<any | null>(null);
  const [amountTendered, setAmountTendered] = useState<number>(0);
  const [balance, setBalance] = useState<number>(0);
  const [showMobileMoneyInput, setShowMobileMoneyInput] =
    useState<boolean>(false);
  const [cashAmount, setCashAmount] = useState<number>(0);
  const [mobileMoneyAmount, setMobileMoneyAmount] = useState<number>(0);
  const queryClient = useQueryClient();

  useEffect(() => {
    // Load order items and customer from localStorage
    const savedOrderList = localStorage.getItem("orderList");
    const savedCustomer = localStorage.getItem("selectedCustomer");
    const employee = localStorage.getItem("user");
    const discount = localStorage.getItem("discount");

    if (savedOrderList) {
      setOrderItems(JSON.parse(savedOrderList));
    }
    if (savedCustomer) {
      setCustomer(JSON.parse(savedCustomer));
    }

    if (employee) {
      setUser(JSON.parse(employee));
    }

    if (discount) {
      setDiscount(JSON.parse(discount));
    }

    // Disable scrolling when modal is open
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handlePrint = useReactToPrint({
    contentRef: receiptRef,
    documentTitle: "Payment Receipt",
    onAfterPrint: () => {
      // Add any cleanup logic here if needed
    },
    pageStyle: `
      @media print {
        body * {
          visibility: hidden;
        }
        #receipt-content,
        #receipt-content * {
          visibility: visible;
        }
        #receipt-content {
          position: absolute;
          left: 0;
          top: 0;
        }
      }
    `,
  });

  const totalPrice = orderItems.reduce((total, product) => {
    return total + parseFloat(product.selling_price) * product.quantity;
  }, 0);

  const finalPrice = totalPrice - discount;

  const itemPrice = finalPrice > 0 ? finalPrice : 0;

  const updateMultipayBalance = (cash: number, mobileMoney: number) => {
    const totalTendered = cash + mobileMoney;
    const calculatedBalance = totalTendered - itemPrice;
    setAmountTendered(totalTendered);
    setBalance(calculatedBalance > 0 ? calculatedBalance : 0);
  };
  // Handle cash amount change for multipay
  const handleCashAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = e.target.value ? parseFloat(e.target.value) : 0;
    setCashAmount(amount);
    updateMultipayBalance(amount, mobileMoneyAmount);
  };

  // Handle mobile money amount change for multipay
  const handleMobileMoneyAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const amount = e.target.value ? parseFloat(e.target.value) : 0;
    setMobileMoneyAmount(amount);
    updateMultipayBalance(cashAmount, amount);
  };

  // Handle amount tendered change
  const handleAmountTenderedChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const tenderedAmount = parseFloat(e.target.value);
    setAmountTendered(tenderedAmount);

    // Calculate balance (0 if no balance to be given)
    const calculatedBalance = tenderedAmount - itemPrice;
    setBalance(calculatedBalance > 0 ? calculatedBalance : 0);
  };

  const toggleMobileMoneyInput = () => {
    setShowMobileMoneyInput(!showMobileMoneyInput);
    if (!showMobileMoneyInput) {
      setMobileMoneyAmount(0);
    }
  };

  const finalizePaymentMutation = useMutation({
    mutationFn: async (data: Record<string, any>) => {
      const res = await customAxios.post(endpoints.sales, data);
      return res;
    },
  });

  const getPaymentMethods = (title: string) => {
    const paymentMethods: { [key: string]: string[] } = {
      "Mobile Money": ["mobile_money"],
      "Credit Card": ["credit_card"],
      Cash: ["cash"],
      Multipay: ["cash", "mobile_money", "credit_card"],
    };

    return paymentMethods[title] || ["cash"]; // Default to Cash
  };

  const clearAllData = () => {
    // Clear all related localStorage items
    localStorage.removeItem("orderList");
    localStorage.removeItem("selectedCustomer");
    localStorage.removeItem("discount");

    // Clear state
    setOrderItems([]);
    setCustomer(null);
    setDiscount(null);
  };

  const fullName = `${user?.first_name} ${user?.last_name}`;
  console.log(fullName);

  const handleFinalize = () => {
    if (title === "Multipay") {
      const totalPaid =
        cashAmount + (showMobileMoneyInput ? mobileMoneyAmount : 0);
      if (totalPaid < itemPrice) {
        SwalToaster(
          "Insufficient Amount",
          "error",
          `Total payment (${totalPaid.toFixed(
            2
          )}) is less than the required amount (${itemPrice.toFixed(2)})`
        );
        return;
      }
    } else if (title === "Cash" && amountTendered < itemPrice) {
      SwalToaster(
        "Insufficient Amount",
        "error",
        `Amount tendered (${amountTendered.toFixed(
          2
        )}) is less than the required amount (${itemPrice.toFixed(2)})`
      );
      return;
    }

    const paymentAmounts: Record<string, number> = {};

    if (title === "Multipay") {
      paymentAmounts.cash = cashAmount;
      if (showMobileMoneyInput) {
        paymentAmounts.mobile_money = mobileMoneyAmount;
      }
    } else if (title === "Cash") {
      paymentAmounts.cash = amountTendered;
    } else if (title === "Mobile Money") {
      paymentAmounts.mobile_money = itemPrice;
    } else if (title === "Credit Card") {
      paymentAmounts.credit_card = itemPrice;
    }

    const salesItemsData = {
      discount_type: "percentage",
      discount_value: discount,
      payment_methods: getPaymentMethods(title),
      saleitem_set: orderItems.map((item) => ({
        product_id: item.id,
        product: item.name,
        quantity: item.quantity,
        total_item_price: parseFloat(item.selling_price),
      })),
      //total_base_price: totalPrice,
      //total_price_with_discount: finalPrice,
      employee: {
        full_name: `${user.full_name}` || `${fullName}`,
        email: user.email,
        contact: user.phone_number,
        address: user.address || user.pharmacy.address,
        license_number: user.license_number || user.pharmacy.license_number,
        is_manager: user?.is_manager,
        is_pharmacist: user?.is_pharmacist,
        is_mca: user?.is_mca,
      },
      status: "completed",
    };

    finalizePaymentMutation.mutate(salesItemsData, {
      onSuccess: () => {
        clearAllData();
        queryClient.invalidateQueries({ queryKey: ["recentTransactionsData"] });

        onClose();

        window.location.reload();

        // Show success message
        SwalToaster(
          "Sale completed successfully!",
          "success",
          `Total amount: ${finalPrice.toFixed(2)}`
        );
      },
      onError: (error) => {
        console.error("Payment finalization error:", error);

        // More specific error message based on the error type
        const errorMessage = "Unable to process the sale. Please try again.";

        SwalToaster("Sale Failed", "error", errorMessage);
      },
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div className="relative bg-white rounded-xl shadow-xl w-[800px] h-[600px] flex flex-col">
        <div className="p-6 flex-1 overflow-y-auto">
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={onClose}
              className="hover:bg-gray-100 p-2 rounded-full transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <h2 className="text-2xl font-bold font-inter text-gray-900">
              Payment Method
            </h2>
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
                    <TableHead className="font-semibold">
                      Product Name
                    </TableHead>
                    <TableHead className="font-semibold">Quantity</TableHead>
                    <TableHead className="font-semibold">Price</TableHead>
                    {/* 
                    <TableHead className="font-semibold w-20">Action</TableHead>
                    */}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderItems.map((product) => (
                    <TableRow key={product.name}>
                      <TableCell className="font-medium">
                        {product.name}
                      </TableCell>
                      <TableCell>{product.quantity}</TableCell>
                      <TableCell>
                        GH₵
                        {(
                          parseFloat(product.selling_price) * product.quantity
                        ).toFixed(2)}
                      </TableCell>
                      {/* 
                      <TableCell>
                        <button
                          onClick={() => removeProduct(product.name)}
                          className="p-1 hover:bg-red-50 rounded-full text-red-600 transition-colors"
                          aria-label={`Remove ${product.name}`}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </TableCell>
                      */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {title === "Multipay" && (
            <>
              <div className="mt-4 flex flex-col gap-4">
                <div>
                  <span className="text-[#323539] font-medium text-sm">Cash</span>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    value={cashAmount || ""}
                    onChange={handleCashAmountChange}
                    className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md"
                  />
                </div>
                
                {showMobileMoneyInput && (
                  <div>
                    <span className="text-[#323539] font-medium text-sm">Mobile Money</span>
                    <input
                      type="number"
                      placeholder="Enter amount"
                      value={mobileMoneyAmount || ""}
                      onChange={handleMobileMoneyAmountChange}
                      className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md"
                    />
                  </div>
                )}

                <div 
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={toggleMobileMoneyInput}
                >
                  {showMobileMoneyInput ? (
                    <>
                      <Minus className="text-red-500" />
                      <span className="text-red-500 text-sm font-semibold">
                        Remove Mobile Money
                      </span>
                    </>
                  ) : (
                    <>
                      <Plus className="text-[#2648EA]" />
                      <span className="text-[#2648EA] text-sm font-semibold">
                        Another Pay
                      </span>
                    </>
                  )}
                </div>
                
                {(cashAmount > 0 || (showMobileMoneyInput && mobileMoneyAmount > 0)) && (
                  <div className="grid grid-cols-2 gap-x-3 mt-2">
                    <div>
                      <label
                        htmlFor="totalTendered"
                        className="text-[#323539] font-medium text-sm"
                      >
                        Total Tendered
                      </label>
                      <input
                        id="totalTendered"
                        type="number"
                        value={(cashAmount + (showMobileMoneyInput ? mobileMoneyAmount : 0)).toFixed(2)}
                        disabled={true}
                        className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="multipayBalance"
                        className="text-[#323539] font-medium text-sm"
                      >
                        Balance
                      </label>
                      <input
                        id="multipayBalance"
                        type="number"
                        value={balance.toFixed(2)}
                        disabled={true}
                        className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {title === "Cash" && (
            <div className="grid grid-cols-2 gap-x-3 mt-4">
              <div>
                <label
                  htmlFor="amountTendered"
                  className="text-[#323539] font-medium text-sm"
                >
                  Amount Tendered
                </label>
                <input
                  id="amountTendered"
                  type="number"
                  placeholder="Enter amount"
                  value={amountTendered}
                  onChange={handleAmountTenderedChange}
                  className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label
                  htmlFor="balance"
                  className="text-[#323539] font-medium text-sm"
                >
                  Balance
                </label>
                <input
                  id="balance"
                  type="number"
                  value={balance.toFixed(2)}
                  disabled={true}
                  className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          )}
          <div className="mt-6 text-right">
            <div className="inline-block">
              <p className="text-sm text-gray-500">TOTAL PRICE</p>
              <span className="text-2xl font-bold text-gray-900">
                GH₵ {itemPrice.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
        <div
          ref={receiptRef}
          id="receipt-content"
          className="fixed left-[-9999px] top-[-9999px]"
          style={{ width: "80mm" }}
        >
          <ThermalReceipt />
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
          <button
            onClick={() => handleFinalize()}
            className="px-6 py-2.5 bg-[#2648EA] text-white font-semibold rounded-lg hover:bg-[#2648EA] transition-colors"
          >
            Finalize Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
