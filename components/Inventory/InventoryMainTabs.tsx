"use client";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useMediaQuery, useTheme } from "@mui/material";
import ProductsTab from "./ProductsTab/ProductsTab";
import CategoriesTab from "./CategoriesTab/CategoriesTab";
import SuppliersTab from "./SuppliersTab/SuppliersTab";
import PurchasesTab from "./PurchasesTab/PurchasesTab";
import ExpiryReportTab from "./ExpiryReportTab/ExpiryReportTab";
import StockTransferTab from "./StockTransferTab/StockTransferTab";
import { Menu, X } from "lucide-react";

interface TabPanelProps {
  children: React.ReactNode;
  value: number;
  index: number;
  className?: string;
}

export default function InventoryMainTabs() {
  const [value, setValue] = React.useState(0);
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
    setValue(newValue);
    if (isMobile) {
      setMobileMenuOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const tabLabels = [
    "Products", 
    "Categories", 
    "Suppliers", 
    "Purchases", 
    "Expiry Report", 
    "BranchSync"
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
              {tabLabels[value]}
            </span>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          {mobileMenuOpen && (
            <div className="absolute z-10 w-full bg-white shadow-md">
              {tabLabels.map((label, index) => (
                <div 
                  key={index}
                  onClick={() => {
                    setValue(index);
                    setMobileMenuOpen(false);
                  }}
                  className={`
                    p-3 
                    text-sm 
                    font-inter 
                    font-semibold 
                    ${value === index 
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
            justifyContent: "center", // This ensures centering
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="inventory tabs"
            variant="standard" // Changed from scrollable
            sx={{
              '& .MuiTabs-flexContainer': {
                justifyContent: 'center', // Ensure tabs are centered
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
                  minWidth: 'auto', // Allow tabs to size based on content
                  padding: '0 16px', // Consistent padding
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
        <CustomTabPanel value={value} index={0}>
          <ProductsTab />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <CategoriesTab />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <SuppliersTab />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <PurchasesTab />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={4}>
          <ExpiryReportTab />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={5}>
          <StockTransferTab />
        </CustomTabPanel>
      </Box>
    </Box>
  );
}