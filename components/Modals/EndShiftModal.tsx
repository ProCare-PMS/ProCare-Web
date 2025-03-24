import React, { useEffect, useState } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logoutAction } from "@/redux/authActions";
import { AppDispatch } from "@/redux/store";
import { toast } from "sonner";
import { useMutation, useQuery } from "@tanstack/react-query";
import customAxios from "@/api/CustomAxios";
import { endpoints } from "@/api/Endpoints";
import { HiCash } from "react-icons/hi";

interface EndShiftModalProps {
  setModal: () => void;
}

interface logoutSummaryType {
  name: string;
  total_sales: string;
  hours_spent: string;
  cash_sales: string;
  mobile_money_sales: string;
  bank_sales: string;
}

interface paymentMethods {
  cash: string;
  momo: string;
  bank: string;
}

const EndShiftModal = ({ setModal }: EndShiftModalProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const getAccountDetails = localStorage.getItem("accounts");
  const accounts = getAccountDetails ? JSON.parse(getAccountDetails) : null;
  const [total, setTotal] = useState(0)
  const paymentMethods = {
    cash: '',
    momo: '',
    bank: '',
    insurance: ''
  }
  const [amountReceived, setAmountReceived] =  useState(paymentMethods)

  // Define logoutUser to dispatch the logout and handle redirection
  const logoutUser = async () => {
    const getRefreshToken = localStorage.getItem("refreshToken") || "";
    await customAxios
      .post(
        endpoints.logout,
        !!getRefreshToken ? { refresh: getRefreshToken } : { refresh: "" }
      )
      .then((res) => res);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmountReceived({ ...amountReceived, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const totalReceived = (amountReceived : paymentMethods) => {
      let sum = 0
      for(const[key, value] of Object.entries(amountReceived)){
        sum += Number(value)
      } 
      setTotal(sum)
    }
    totalReceived(amountReceived)
  }, [amountReceived])

  //Getting the logout info from the backend
  const { data: logoutSummary } = useQuery<logoutSummaryType>({
    queryKey: ["logoutSummaryData"],
    queryFn: () =>
      customAxios.get(endpoints.logoutSummary).then((res) => res?.data),
  });


  // Define mutation for the logout action
  const logoutMutation = useMutation({
    mutationKey: ["logout"],
    mutationFn: logoutUser,
    onSuccess: () => {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      localStorage.removeItem("accounts");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accountType");
      router.push("/login");
      toast.success("User logged out successfully");
    },
    onError: (error) => {
      toast.error("Failed to log out");
    },
  });

  // Call the mutation when you want to log the user out
  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-[80%]  md:w-[80%] max-w-[900px] p-6 relative">
        <div className="flex justify-between items-center border-b mb-2">
          <h2 className="text-lg font-bold mb-4">End Shift Confirmation</h2>
          <button
            className="text-gray-500 hover:text-gray-800"
            onClick={setModal}
          >
            <CloseOutlinedIcon />
          </button>
        </div>

        <div className="divide-y divide-solid p-3">
          {/* <div className="first">
            <div className="grid grid-cols-2 md:grid-cols-3 mb-2 py-2">
              <div className="flex flex-col gap-0.5">
                <span className="block capitalize text-gray-400 font-thin">
                  Sales:
                </span>
                <span className="block font-bold">
                  ₵ {logoutSummary?.total_sales}
                </span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="block capitalize text-gray-400 font-thin">
                  Hours spent:
                </span>
                <span className="block">{logoutSummary?.hours_spent}</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="block capitalize text-gray-400 font-thin">
                  Name
                </span>
                <span className="block">
                  {" "}
                  {logoutSummary?.name}
                </span>
              </div>
            </div>
          </div>
          <div className="second">
            <div className="grid grid-cols-2 md:grid-cols-3 mb-2 py-2">
              <div className="flex flex-col gap-0.5">
                <span className="block capitalize text-gray-400 font-thin">
                  cash sales:
                </span>
                <span className="block">₵ {logoutSummary?.cash_sales}</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="block capitalize text-gray-400 font-thin">
                  momo sales:
                </span>
                <span className="block">
                  ₵ {logoutSummary?.mobile_money_sales}
                </span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="block capitalize text-gray-400 font-thin">
                  bank sales
                </span>
                <span className="block">₵ -</span>
              </div>
            </div>
          </div>
           */}
          <div className="third">
            <div className="title text-sm md:text-base mb-4 font-semibold capitalize">
              CONFIRM AMOUNT RECEIVED IN <span className="font-bold">GH¢</span>:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2.5 lg:gap-y-4 mb-2 py-2">
              <div className="flex flex-col gap-0.5">
                <label className="flex items-center gap-1">
                  <p>Cash</p>
                  {/* <HiCash className="text-green-500"/> */}
                </label>
                <div className="inputField">
                  <input
                    type="text"
                    value={amountReceived.cash}
                    onChange={handleChange}
                    autoComplete="off"
                    name="cash"
                    id="cash"
                    placeholder="Enter cash amount"
                    className="border w-full font-semibold placeholder:font-medium placeholder:text-sm border-gray-300 rounded px-4 py-1"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-0.5">
                <label className="block">Mobile Money</label>
                <div className="inputField">
                  <input
                    type="text"
                    value={amountReceived.momo}
                    onChange={handleChange}
                    autoComplete="off"
                    name="momo"
                    id="momo"
                    placeholder="Enter mobile money amount"
                    className="border w-full font-semibold placeholder:font-medium placeholder:text-sm border-gray-300 rounded px-4 py-1"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-0.5">
                <label className="block">Bank</label>
                <div className="inputField">
                  <input
                    type="text"
                    value={amountReceived.bank}
                    onChange={handleChange}
                    autoComplete="off"
                    name="bank"
                    id="bank"
                    placeholder="Enter bank amount"
                    className="border w-full font-semibold placeholder:font-medium placeholder:text-sm border-gray-300 rounded px-4 py-1"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-0.5">
                <label className="block">Insurance</label>
                <div className="inputField">
                  <input
                    type="text"
                    value={amountReceived.insurance}
                    onChange={handleChange}
                    autoComplete="off"
                    name="insurance"
                    id="insurance"
                    placeholder="Enter insurance amount"
                    className="border w-full font-semibold placeholder:font-medium placeholder:text-sm border-gray-300 rounded px-4 py-1"
                  />
                </div>
              </div>
            </div>
            <div className="button section mt-12">
              <div className="flex gap-3 justify-between items-center w-full">

                <div className="font-medium">
                  Total Amount: <span className="font-semibold text-sm">GH¢ {total.toFixed(2)}</span>
                </div>

                <div className="space-x-3">
                  <button
                    type="button"
                    onClick={setModal}
                    className="px-6 py-2 bg-white text-dark shadow-md  w-56 rounded-[0.3rem]"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="px-6 py-2 bg-[#2648EA] text-white text-center shadow-md hover:bg-blue-600 w-56 rounded-[0.3rem]"
                  >
                    End Shift
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Close Button */}
      </div>
    </div>
  );
};

export default EndShiftModal;
