"use client";
import React from "react";
import { GridLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[9999]">
      <GridLoader loading={true} speedMultiplier={1} />
    </div>
  );
};

export default Loading;
