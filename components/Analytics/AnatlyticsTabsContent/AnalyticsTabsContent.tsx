"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { Tabs } from "@mui/material";
import { TabPanelProps } from "@/lib/Types";
import InventoryReports from "../InventoryReports/InventoryReports";
import SalesAnalyticsPage from "../SalesAnalytics";
import PurchaseAnalyticsPage from "../PurchaseAnalytics";
import FinancialReporting from "../FinancialReporting";

export default function AnalyticsTabsContent() {
  const [value, setValue] = React.useState(0);

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

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <Box
        sx={{
          //borderBottom: 1,
          borderColor: "divider",
          textDecoration: "lowercase",
        }}
      >
        <Tabs
          value={value}
          centered
          onChange={handleChange}
          aria-label="lab API tabs example"
          sx={{ textTransform: "none" }}
        >
          <Tab
            className="font-inter text-sm font-semibold text-[#858C95]"
            label="Inventory Reports"
            {...a11yProps(0)}
            sx={{ textTransform: "none" }}
          />
          <Tab
            className="font-inter text-sm font-semibold text-[#858C95]"
            label="Sales Analytics"
            {...a11yProps(1)}
            sx={{ textTransform: "none" }}
          />
          <Tab
            className="font-inter text-sm font-semibold text-[#858C95]"
            label="Purchase Analytics"
            {...a11yProps(2)}
            sx={{ textTransform: "none" }}
          />
          <Tab
            className="font-inter text-sm font-semibold text-[#858C95]"
            label="Financial Reporting"
            {...a11yProps(2)}
            sx={{ textTransform: "none" }}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <InventoryReports />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <SalesAnalyticsPage />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <PurchaseAnalyticsPage />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <FinancialReporting />
      </CustomTabPanel>
    </Box>
  );
}
