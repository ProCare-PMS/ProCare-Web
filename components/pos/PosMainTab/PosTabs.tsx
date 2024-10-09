"use client";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Link from "next/link";
import SalesPoint from "../SalesPoint";
import Customers from "../Customers";
import Returns from "../Returns";

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

export default function PosMainPage() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", marginInline: "auto", marginTop: "-20px" }}>
      <Box
        sx={{ backgroundColor: "#F5F5F5", paddingBlock: "20px", width: "100%" }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          centered
          aria-label="basic tabs example"
        >
          <Tab
            className="font-inter text-sm font-semibold text-[#858C95] capitalize"
            label="Sales Point"
            {...a11yProps(0)}
          />
          
          <Tab
            className="font-inter text-sm font-semibold text-[#858C95] capitalize"
            label="Customers"
            {...a11yProps(1)}
          />
          <Tab
            className="font-inter text-sm font-semibold text-[#858C95] capitalize"
            label="Returns"
            {...a11yProps(2)}
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
          <SalesPoint />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Customers />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <Returns />
        </CustomTabPanel>
      </Box>
    </Box>
  );
}
