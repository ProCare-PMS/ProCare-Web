"use client";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TransactionHistory from "../TransactionHistory/TransactionHistory";
import HealthInfo from "../HealthInfo/HealthInfo";
import MedicalHistory from "../MedicalHistory/MedicalHistory";

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

export default function ViewCustomerTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", marginInline: "auto" }}>
      <Box
        sx={{
          width: "100%",
          textDecoration: "lowercase",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          centered
          aria-label="basic tabs example"
        >
          <Tab
            className="font-inter text-sm font-semibold text-[#858C95] "
            label="Transaction History"
            {...a11yProps(0)}
            sx={{ textTransform: "none" }}
          />

          <Tab
            className="font-inter text-sm font-semibold text-[#858C95] "
            label="Health Info"
            {...a11yProps(1)}
            sx={{ textTransform: "none" }}
          />
          <Tab
            className="font-inter text-sm font-semibold text-[#858C95] "
            label="Medical History"
            {...a11yProps(2)}
            sx={{ textTransform: "none" }}
          />
        </Tabs>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "calc(88vh - 120px)",
          overflow: "auto",
        }}
      >
        <CustomTabPanel value={value} index={0}>
          <TransactionHistory />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <HealthInfo />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <MedicalHistory />
        </CustomTabPanel>
      </Box>
    </Box>
  );
}
