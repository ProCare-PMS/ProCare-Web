import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, Printer, Minus, CircleAlert, Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useReactToPrint } from "react-to-print";
import { ProductsType } from "./Columns";
import { Customer } from "./CustomerList";
import customAxios from "@/api/CustomAxios";
import { endpoints } from "@/api/Endpoints";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import SwalToaster from "@/components/SwalToaster/SwalToaster";
import ThermalReceipt from "./ThermalReceipt";
import {
  useCreateHeldTransaction,
  useCompleteHeldTransaction,
} from "@/hooks/customer/useHeldTransactionActions";
import { generateProductKey } from "@/lib/productUtils";

// Types
interface PaymentModalProps {
  onClose: () => void;
  title: string;
}

interface Employee {
  full_name: string;
  email: string;
  contact: string;
  address: string;
  license_number: string;
  is_manager: boolean;
  is_pharmacist: boolean;
  is_mca: boolean;
}

interface SaleItem {
  product_id: string;
  product: {
    id: string;
    name: string;
    selling_price: string;
  };
  quantity: number;
  total_item_price: string;
}

interface SalesData {
  discount_type: string;
  discount_value: string;
  payment_methods: string[];
  saleitem_set: SaleItem[];
  customer: { full_name: string } | null;
  employee: Employee;
  status: string;
}

// Constants
const PAYMENT_METHODS: Record<string, string[]> = {
  "Mobile Money": ["mobile_money"],
  "Credit Card": ["credit_card"],
  Cash: ["cash"],
  Multipay: ["cash", "mobile_money", "credit_card"],
};

const LOCAL_STORAGE_KEYS = {
  ORDER_LIST: "orderList",
  SELECTED_CUSTOMER: "selectedCustomer",
  USER: "user",
  DISCOUNT: "discount",
  HELD_TRANSACTION_ID: "heldTransactionId",
  IS_RESUMED_TRANSACTION: "isResumedTransaction",
} as const;

const PaymentModal: React.FC<PaymentModalProps> = ({ onClose, title }) => {
  // State
  const [orderItems, setOrderItems] = useState<ProductsType[]>([]);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const [discount, setDiscount] = useState<number | null>(null);
  const [amountTendered, setAmountTendered] = useState<number>(0);
  const [balance, setBalance] = useState<number>(0);
  const [showMobileMoneyInput, setShowMobileMoneyInput] =
    useState<boolean>(false);
  const [cashAmount, setCashAmount] = useState<number>(0);
  const [mobileMoneyAmount, setMobileMoneyAmount] = useState<number>(0);
  const [heldTransactionId, setHeldTransactionId] = useState<string | null>(
    null,
  );
  const [isResumedTransaction, setIsResumedTransaction] = useState(false);

  // Refs
  const receiptRef = useRef<HTMLDivElement>(null);

  // Hooks
  const queryClient = useQueryClient();
  const createHeldTransactionMutation = useCreateHeldTransaction();
  const completeHeldTransactionMutation = useCompleteHeldTransaction();

  // Computed values
  const totalPrice = orderItems.reduce((total, product) => {
    return total + parseFloat(product.selling_price) * product.quantity;
  }, 0);

  const finalPrice = totalPrice - (discount || 0);
  const itemPrice = finalPrice > 0 ? finalPrice : 0;
  const fullName = user ? `${user.first_name} ${user.last_name}` : "";

  // Effects
  useEffect(() => {
    loadDataFromStorage();
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // Utility functions
  const loadDataFromStorage = () => {
    const savedOrderList = localStorage.getItem(LOCAL_STORAGE_KEYS.ORDER_LIST);
    const savedCustomer = localStorage.getItem(
      LOCAL_STORAGE_KEYS.SELECTED_CUSTOMER,
    );
    const employee = localStorage.getItem(LOCAL_STORAGE_KEYS.USER);
    const discountData = localStorage.getItem(LOCAL_STORAGE_KEYS.DISCOUNT);
    const heldTransactionIdFromStorage = localStorage.getItem(
      LOCAL_STORAGE_KEYS.HELD_TRANSACTION_ID,
    );
    const isResumedFromStorage = localStorage.getItem(
      LOCAL_STORAGE_KEYS.IS_RESUMED_TRANSACTION,
    );

    if (savedOrderList) setOrderItems(JSON.parse(savedOrderList));
    if (savedCustomer) setCustomer(JSON.parse(savedCustomer));
    if (employee) setUser(JSON.parse(employee));
    if (discountData) setDiscount(JSON.parse(discountData));
    if (heldTransactionIdFromStorage) {
      setHeldTransactionId(heldTransactionIdFromStorage);
      setIsResumedTransaction(isResumedFromStorage === "true");
    }
  };

  const getPaymentMethods = (paymentTitle: string): string[] => {
    return PAYMENT_METHODS[paymentTitle] || ["cash"];
  };

  const clearAllData = () => {
    Object.values(LOCAL_STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });

    setOrderItems([]);
    setCustomer(null);
    setDiscount(null);
    setHeldTransactionId(null);
    setIsResumedTransaction(false);
  };

  const getProductId = (item: ProductsType): string => {
    return (item as any).original_product_id || item.id;
  };

  const buildEmployeeData = (): Employee => {
    return {
      full_name: user?.full_name || fullName || "Unknown Employee",
      email: user?.email || "",
      contact: user?.phone_number || "",
      address: user?.address || user?.pharmacy?.address || "",
      license_number:
        user?.license_number || user?.pharmacy?.license_number || "",
      is_manager: user?.is_manager || false,
      is_pharmacist: user?.is_pharmacist || false,
      is_mca: user?.is_mca || false,
    };
  };

  const validatePaymentData = (): boolean => {
    if (orderItems.length === 0) {
      SwalToaster(
        "No Items",
        "error",
        "Please add items to the cart before finalizing payment.",
      );
      return false;
    }

    if (!user) {
      SwalToaster(
        "User Not Found",
        "error",
        "User information is required. Please log in again.",
      );
      return false;
    }

    if (title === "Multipay") {
      const totalPaid =
        cashAmount + (showMobileMoneyInput ? mobileMoneyAmount : 0);
      if (totalPaid < itemPrice) {
        SwalToaster(
          "Insufficient Amount",
          "error",
          `Total payment (${totalPaid.toFixed(2)}) is less than the required amount (${itemPrice.toFixed(2)})`,
        );
        return false;
      }
    } else if (title === "Cash" && amountTendered < itemPrice) {
      SwalToaster(
        "Insufficient Amount",
        "error",
        `Amount tendered (${amountTendered.toFixed(2)}) is less than the required amount (${itemPrice.toFixed(2)})`,
      );
      return false;
    }

    if (
      discount &&
      (typeof discount !== "number" || isNaN(discount) || discount < 0)
    ) {
      SwalToaster("Validation Error", "error", "Invalid discount value");
      return false;
    }

    return true;
  };

  const buildSalesData = (): SalesData => {
    return {
      discount_type: "percentage",
      discount_value: (discount || 0).toString(),
      payment_methods: getPaymentMethods(title),
      saleitem_set: orderItems.map((item) => ({
        product: {
          id: getProductId(item),
          name: item.name,
          selling_price: item.selling_price,
        },
        product_id: getProductId(item),
        quantity: item.quantity,
        total_item_price: item.selling_price,
      })),
      customer: customer ? { full_name: customer.full_name } : null,
      employee: buildEmployeeData(),
      status: "completed",
    };
  };

  const handleErrorResponse = (error: any, defaultMessage: string): string => {
    if (error.response?.data) {
      if (typeof error.response.data === "object") {
        const errors = [];
        for (const [field, messages] of Object.entries(error.response.data)) {
          if (Array.isArray(messages)) {
            errors.push(`${field}: ${messages.join(", ")}`);
          } else {
            errors.push(`${field}: ${messages}`);
          }
        }
        return errors.length > 0
          ? `Validation errors: ${errors.join("; ")}`
          : defaultMessage;
      }
      return (
        error.response.data?.message ||
        error.response.data?.detail ||
        error.response.data?.error ||
        defaultMessage
      );
    }
    return defaultMessage;
  };

  // Event handlers
  const updateMultipayBalance = (cash: number, mobileMoney: number) => {
    const totalTendered = cash + mobileMoney;
    const calculatedBalance = totalTendered - itemPrice;
    setAmountTendered(totalTendered);
    setBalance(calculatedBalance > 0 ? calculatedBalance : 0);
  };

  const handleCashAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = e.target.value ? parseFloat(e.target.value) : 0;
    setCashAmount(amount);
    updateMultipayBalance(amount, mobileMoneyAmount);
  };

  const handleMobileMoneyAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const amount = e.target.value ? parseFloat(e.target.value) : 0;
    setMobileMoneyAmount(amount);
    updateMultipayBalance(cashAmount, amount);
  };

  const handleAmountTenderedChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const tenderedAmount = parseFloat(e.target.value);
    setAmountTendered(tenderedAmount);
    const calculatedBalance = tenderedAmount - itemPrice;
    setBalance(calculatedBalance > 0 ? calculatedBalance : 0);
  };

  const toggleMobileMoneyInput = () => {
    setShowMobileMoneyInput(!showMobileMoneyInput);
    if (!showMobileMoneyInput) {
      setMobileMoneyAmount(0);
    }
  };

  const handlePrint = useReactToPrint({
    contentRef: receiptRef,
    documentTitle: "Payment Receipt",
    pageStyle: `
      @media print {
        body * { visibility: hidden; }
        #receipt-content, #receipt-content * { visibility: visible; }
        #receipt-content {
          position: absolute;
          left: 0;
          top: 0;
        }
      }
    `,
  });

  const handlePrintClick = () => {
    handlePrint();
  };

  // Mutations
  const finalizePaymentMutation = useMutation({
    mutationFn: async (data: SalesData) => {
      const res = await customAxios.post(endpoints.sales, data);
      return res;
    },
    onError: (error: any) => {
      const errorMessage = handleErrorResponse(
        error,
        "Unable to process the sale. Please try again.",
      );
      SwalToaster("Sale Failed", "error", errorMessage);
    },
  });

  // Business logic handlers
  const handleHoldTransaction = () => {
    const hasResumedItems = orderItems.some((item: any) => item.id);

    if (heldTransactionId && isResumedTransaction) {
      SwalToaster(
        "Transaction Already Held",
        "warning",
        "This transaction is already held and cannot be held again. You can resume it from the Held Transactions tab.",
      );
      return;
    }

    if (hasResumedItems) {
      SwalToaster(
        "Transaction Already Held",
        "warning",
        "This transaction contains resumed items and cannot be held again. You can complete the payment or return to Held Transactions.",
      );
      return;
    }

    if (orderItems.length === 0) {
      SwalToaster(
        "No Items",
        "error",
        "Please add items to the cart before holding the transaction.",
      );
      return;
    }

    const totalAmount = orderItems.reduce((total, item) => {
      return total + parseFloat(item.selling_price) * item.quantity;
    }, 0);

    const finalAmount = totalAmount - (discount || 0);

    const heldTransactionData = {
      discount_type: "percentage",
      discount_value: discount || 0,
      payment_methods: getPaymentMethods(title),
      sale_items: orderItems.map((item) => ({
        product_id: getProductId(item),
        product: item.name,
        quantity: item.quantity,
        total_item_price: parseFloat(item.selling_price),
      })),
      amount: finalAmount.toFixed(2),
      employee: buildEmployeeData(),
      status: "on_hold" as const,
    };

    createHeldTransactionMutation.mutate(heldTransactionData, {
      onSuccess: () => {
        clearAllData();
        onClose();
        SwalToaster(
          "Transaction Held Successfully!",
          "success",
          "The transaction has been saved and can be resumed later from the Held Transactions tab.",
        );
      },
      onError: (error: any) => {
        const errorMessage = handleErrorResponse(
          error,
          "Unable to hold the transaction. Please try again.",
        );
        SwalToaster("Hold Failed", "error", errorMessage);
      },
    });
  };

  const handleFinalize = () => {
    if (!validatePaymentData()) return;

    if (isResumedTransaction && heldTransactionId) {
      const updatedItems = orderItems.map((item) => ({
        product_id: getProductId(item),
        product: item.name,
        quantity: item.quantity,
        total_item_price: parseFloat(item.selling_price),
      }));

      completeHeldTransactionMutation.mutate(
        { transactionId: heldTransactionId, updatedItems },
        {
          onSuccess: () => {
            clearAllData();
            queryClient.invalidateQueries({
              queryKey: ["recentTransactionsData"],
            });
            queryClient.invalidateQueries({ queryKey: ["heldTransactions"] });
            onClose();
            window.location.reload();
            SwalToaster(
              "Held transaction completed successfully!",
              "success",
              `Total amount: ${finalPrice.toFixed(2)}`,
            );
          },
          onError: () => {
            SwalToaster(
              "Sale Failed",
              "error",
              "Unable to complete the held transaction. Please try again.",
            );
          },
        },
      );
    } else {
      const salesItemsData = buildSalesData();

      finalizePaymentMutation.mutate(salesItemsData, {
        onSuccess: () => {
          clearAllData();
          queryClient.invalidateQueries({
            queryKey: ["recentTransactionsData"],
          });
          onClose();
          window.location.reload();
          SwalToaster(
            "Sale completed successfully!",
            "success",
            `Total amount: ${finalPrice.toFixed(2)}`,
          );
        },
      });
    }
  };

  // Render helpers
  const renderMultipaySection = () => (
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
          <span className="text-[#323539] font-medium text-sm">
            Mobile Money
          </span>
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
              value={(
                cashAmount + (showMobileMoneyInput ? mobileMoneyAmount : 0)
              ).toFixed(2)}
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
  );

  const renderCashSection = () => (
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
        <label htmlFor="balance" className="text-[#323539] font-medium text-sm">
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
  );

  const renderHeldTransactionInfo = () => {
    const isHeldTransaction =
      (heldTransactionId && isResumedTransaction) ||
      orderItems.some((item: any) => item.original_product_id);

    if (!isHeldTransaction) return null;

    return (
      <div className="mb-3 p-3 bg-blue-50 border border-blue-200 rounded-xl">
        <p className="text-sm text-blue-700 flex items-center gap-2">
          <CircleAlert /> This is a resumed transaction. You can complete the
          payment or return to Held Transactions.
        </p>
      </div>
    );
  };

  const getHoldButtonText = (): string => {
    if (createHeldTransactionMutation.isPending) return "Holding...";
    if (
      (heldTransactionId && isResumedTransaction) ||
      orderItems.some((item: any) => item.original_product_id)
    ) {
      return "Already Held";
    }
    return "Hold Transaction";
  };

  const getFinalizeButtonText = (): string => {
    if (
      finalizePaymentMutation.isPending ||
      completeHeldTransactionMutation.isPending
    ) {
      return "Processing...";
    }
    return isResumedTransaction
      ? "Complete Held Transaction"
      : "Finalize Payment";
  };

  const isHoldButtonDisabled = (): boolean => {
    return (
      createHeldTransactionMutation.isPending ||
      !!(heldTransactionId && isResumedTransaction) ||
      orderItems.some((item: any) => item.original_product_id)
    );
  };

  const isFinalizeButtonDisabled = (): boolean => {
    return (
      finalizePaymentMutation.isPending ||
      completeHeldTransactionMutation.isPending
    );
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div className="relative bg-white rounded-xl shadow-xl w-[800px] h-[600px] flex flex-col">
        <div className="p-6 flex-1 overflow-y-auto">
          {/* Header */}
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

          {/* Payment Info */}
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

            {/* Products Table */}
            <div className="rounded-lg border border-gray-200 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-semibold">
                      Product Name
                    </TableHead>
                    <TableHead className="font-semibold">Quantity</TableHead>
                    <TableHead className="font-semibold">Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderItems.map((product, index) => (
                    <TableRow key={generateProductKey(product, index)}>
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
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Payment Inputs */}
          {title === "Multipay" && renderMultipaySection()}
          {title === "Cash" && renderCashSection()}

          {/* Total Price */}
          <div className="mt-6 text-right">
            <div className="inline-block">
              <p className="text-sm text-gray-500">TOTAL PRICE</p>
              <span className="text-2xl font-bold text-gray-900">
                GH₵ {itemPrice.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Receipt Print Area */}
        <div
          ref={receiptRef}
          id="receipt-content"
          className="fixed left-[-9999px] top-[-9999px]"
          style={{ width: "80mm" }}
        >
          <ThermalReceipt />
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-gray-50 rounded-b-xl border-t">
          {renderHeldTransactionInfo()}

          <div className="flex items-center justify-end gap-3">
            <button
              onClick={handleHoldTransaction}
              disabled={isHoldButtonDisabled()}
              className="px-6 py-2.5 border border-[#2648EA] text-[#2648EA] font-semibold rounded-lg hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {getHoldButtonText()}
            </button>

            <button
              onClick={handlePrintClick}
              className="px-6 py-2.5 border border-[#2648EA] text-[#2648EA] font-semibold rounded-lg hover:bg-blue-50 transition-colors inline-flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              Print
            </button>

            <button
              onClick={handleFinalize}
              disabled={isFinalizeButtonDisabled()}
              className="px-6 py-2.5 bg-[#2648EA] text-white font-semibold rounded-lg hover:bg-[#2648EA] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {getFinalizeButtonText()}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
