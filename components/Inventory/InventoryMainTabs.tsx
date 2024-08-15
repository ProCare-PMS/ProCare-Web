"use client";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import ProductsTab from "./ProductsTab/ProductsTab";
import CategoriesTab from "./CategoriesTab/CategoriesTab";
import SuppliersTab from "./SuppliersTab/SuppliersTab";
import PurchasesTab from "./PurchasesTab/PurchasesTab";
import ExpiryReportTab from "./ExpiryReportTab/ExpiryReportTab";
import StockTransferTab from "./StockTransferTab/StockTransferTab";
import Link from "next/link";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function InventoryMainTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", marginInline: "auto", marginTop: "-20px" }}>
      <Box
        sx={{ backgroundColor: "#F5F5F5", paddingBlock: "20px",  width: "100%" }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          centered
          aria-label="basic tabs example"
        >
          <Tab
            className="font-inter text-sm font-semibold text-[#858C95] capitalize"
            label="Products"
            {...a11yProps(0)}
          />
          <Tab
            className="font-inter text-sm font-semibold text-[#858C95] capitalize"
            label="Categories"
            {...a11yProps(1)}
          />
          <Tab
            className="font-inter text-sm font-semibold text-[#858C95] capitalize"
            label="Suppliers"
            {...a11yProps(2)}
          />
          <Tab
            className="font-inter text-sm font-semibold text-[#858C95] capitalize"
            label="Purchases"
            {...a11yProps(3)}
          />
          <Tab
            className="font-inter text-sm font-semibold text-[#858C95] capitalize"
            label="Expiry Report"
            {...a11yProps(4)}
          />
          <Tab
            className="font-inter text-sm font-semibold text-[#858C95] capitalize"
            label="Stock Transfer"
            {...a11yProps(5)}
          />
        </Tabs>
      </Box>
      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
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
