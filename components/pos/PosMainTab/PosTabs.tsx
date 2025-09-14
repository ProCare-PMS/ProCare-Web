"use client";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useMediaQuery, useTheme } from "@mui/material";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import SalesPoint from "../SalesPoint";
import Customers from "../Customers";
import Returns from "../Returns";
import HeldTransactions from "../HeldTransactions/HeldTransactions";
import { PosProvider, usePosContext } from "../context/PosContext";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  className?: string;
}

function PosMainPageContent() {
  const { activeTab, setActiveTab } = usePosContext();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, className = "", ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        className={className}
        {...other}
      >
        {value === index && <Box sx={{ p: isMobile ? 1 : 3 }}>{children}</Box>}
      </div>
    );
  }

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    if (isMobile) {
      setMobileMenuOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const tabLabels = [
    "Sales Point", 
    "Customers", 
    "Returns", 
    "Held Transactions"
  ];

  return (
    <Box
      sx={{
        width: "100%",
        marginInline: "auto",
        marginTop: isMobile ? "0" : "-20px",
        typography: "body1",
      }}
    >
      {isMobile ? (
        <div className="relative">
          <button 
            onClick={toggleMobileMenu} 
            className="w-full p-3 bg-[#F5F5F5] flex items-center justify-between"
          >
            <span className="font-inter text-sm font-semibold text-[#858C95]">
              {tabLabels[activeTab]}
            </span>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          {mobileMenuOpen && (
            <div className="absolute z-10 w-full bg-white shadow-md">
              {tabLabels.map((label, index) => (
                <div 
                  key={index}
                  onClick={() => {
                    setActiveTab(index);
                    setMobileMenuOpen(false);
                  }}
                  className={`
                    p-3 
                    text-sm 
                    font-inter 
                    font-semibold 
                    ${activeTab === index 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-[#858C95] hover:bg-gray-100'}
                  `}
                >
                  {label}
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <Box
          sx={{
            backgroundColor: "#F5F5F5",
            paddingBlock: "20px",
            width: "100%",
            textDecoration: "lowercase",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Tabs
            value={activeTab}
            onChange={handleChange}
            aria-label="pos tabs"
            variant="standard"
            sx={{
              '& .MuiTabs-flexContainer': {
                justifyContent: 'center',
              }
            }}
          >
            {tabLabels.map((label, index) => (
              <Tab
                key={index}
                className="font-inter text-sm font-semibold text-[#858C95]"
                label={label}
                {...a11yProps(index)}
                sx={{ 
                  textTransform: "none",
                  minWidth: 'auto',
                  padding: '0 16px',
                }}
              />
            ))}
          </Tabs>
        </Box>
      )}

      <Box
        sx={{
          width: "100%",
          minHeight: isMobile ? "auto" : "100vh",
          marginInline: "auto",
        }}
      >
        <CustomTabPanel value={activeTab} index={0}>
          <SalesPoint />
        </CustomTabPanel>
        <CustomTabPanel value={activeTab} index={1}>
          <Customers />
        </CustomTabPanel>
        <CustomTabPanel value={activeTab} index={2}>
          <Returns />
        </CustomTabPanel>
        <CustomTabPanel value={activeTab} index={3}>
          <HeldTransactions />
        </CustomTabPanel>
      </Box>
    </Box>
  );
}

export default function PosMainPage() {
  return (
    <PosProvider>
      <PosMainPageContent />
    </PosProvider>
  );
}