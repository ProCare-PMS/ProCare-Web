"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface PosContextType {
  activeTab: number;
  setActiveTab: (tab: number) => void;
  switchToSalesPoint: () => void;
  switchToHeldTransactions: () => void;
}

const PosContext = createContext<PosContextType | undefined>(undefined);

export const usePosContext = () => {
  const context = useContext(PosContext);
  if (!context) {
    throw new Error("usePosContext must be used within a PosProvider");
  }
  return context;
};

interface PosProviderProps {
  children: ReactNode;
}

export const PosProvider: React.FC<PosProviderProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);

  const switchToSalesPoint = () => {
    setActiveTab(0);
  };

  const switchToHeldTransactions = () => {
    setActiveTab(3);
  };

  const value = {
    activeTab,
    setActiveTab,
    switchToSalesPoint,
    switchToHeldTransactions,
  };

  return (
    <PosContext.Provider value={value}>
      {children}
    </PosContext.Provider>
  );
};
