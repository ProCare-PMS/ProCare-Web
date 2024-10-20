import React, { useState } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Link from "next/link";

interface EndShiftModalProps {
  setModal: () => void;
}

const EndShiftModal = ({ setModal }: EndShiftModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-[60%] p-6 relative">
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
          <div className="first">
            <div className="flex gap-[10rem] items-center mb-2 py-2">
              <div className="flex flex-col gap-2">
                <span className="block capitalize text-gray-400 font-thin">
                  Sales:
                </span>
                <span className="block font-bold">₵ 34,295</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="block capitalize text-gray-400 font-thin">
                  hours spent
                </span>
                <span className="block">7hrs 15mins</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="block capitalize text-gray-400 font-thin">
                  Name
                </span>
                <span className="block">Richard John Doe</span>
              </div>
            </div>
          </div>
          <div className="second">
            <div className="flex gap-[10rem] items-center mb-2 py-2">
              <div className="flex flex-col gap-2">
                <span className="block capitalize text-gray-400 font-thin">
                  cash sales:
                </span>
                <span className="block">₵ 1,392</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="block capitalize text-gray-400 font-thin">
                  momo sales
                </span>
                <span className="block">₵ 1,392</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="block capitalize text-gray-400 font-thin">
                  bank sales
                </span>
                <span className="block">₵ 1,392</span>
              </div>
            </div>
          </div>
          <div className="third">
            <div className="title font-bold capitalize">
              CONFIRM AMOUNT RECEIVED IN:
            </div>
            <div className="flex justify-between items-center mb-2 py-2">
              <div className="flex flex-col gap-2">
                <label className="block">Cash (GHS)</label>
                <div className="inputField">
                  <input
                    type="text"
                    placeholder="Enter cash amount"
                    className="border border-gray-300 rounded px-4 py-1"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="block">Mobile Money (GHS)</label>
                <div className="inputField">
                  <input
                    type="text"
                    placeholder="Enter mobile money amount"
                    className="border border-gray-300 rounded px-4 py-1"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="block">Bank (GHS)</label>
                <div className="inputField">
                  <input
                    type="text"
                    placeholder="Enter bank amount"
                    className="border border-gray-300 rounded px-4 py-1"
                  />
                </div>
              </div>
            </div>
            <div className="button section mt-4">
              <div className="flex gap-3 justify-end w-full">
                <button
                  type="button"
                  onClick={setModal}
                  className="px-6 py-2 bg-white text-dark shadow-md  w-56 rounded-[0.3rem]"
                >
                  Cancel
                </button>

                <Link
                  href={"/login"}
                  className="px-6 py-2 bg-[#2648EA] text-white text-center shadow-md hover:bg-blue-600 w-56 rounded-[0.3rem]"
                >
                  End Shift
                </Link>
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
