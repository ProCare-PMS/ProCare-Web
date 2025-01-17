"use client";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import InventoryProducts from "./InventoryProducts";
import InventoryCategories from "./InventoryCategories";
import InventorySuppliers from "./InventorySuppliers";

import ExpiryReport from "./ExpiryReport";
import StockTransfer from "./StockTransfer";
import { TabPanelProps } from "@/lib/Types";

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

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", marginInline: "auto" }}>
      <Box sx={{}}>
        <Tabs
          value={value}
          onChange={handleChange}
          centered
          aria-label="basic tabs example"
          sx={{ textTransform: "none" }}
        >
          <Tab
            className="font-inter text-sm font-semibold text-[#858C95]"
            label="Products"
            {...a11yProps(0)}
            sx={{ textTransform: "none" }}
          />
          <Tab
            className="font-inter text-sm font-semibold text-[#858C95]"
            label="Categories"
            {...a11yProps(1)}
            sx={{ textTransform: "none" }}
          />
          <Tab
            className="font-inter text-sm font-semibold text-[#858C95]"
            label="Suppliers"
            {...a11yProps(2)}
            sx={{ textTransform: "none" }}
          />
          <Tab
            className="font-inter text-sm font-semibold text-[#858C95]"
            label="Purchases"
            {...a11yProps(3)}
            sx={{ textTransform: "none" }}
          />
          <Tab
            className="font-inter text-sm font-semibold text-[#858C95]"
            label="Expiry Report"
            {...a11yProps(4)}
            sx={{ textTransform: "none" }}
          />
          <Tab
            className="font-inter text-sm font-semibold text-[#858C95]"
            label="Stock Transfer"
            {...a11yProps(5)}
            sx={{ textTransform: "none" }}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <InventoryProducts />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <InventoryCategories />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <InventorySuppliers />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        {/* <Purchases /> */}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <ExpiryReport />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={5}>
        <StockTransfer />
      </CustomTabPanel>
    </Box>
  );
}
