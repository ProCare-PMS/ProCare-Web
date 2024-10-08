"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { Tabs } from "@mui/material";
import { TabPanelProps } from "@/lib/Types";
import UserManagementTable from "../UserManagementTable";
import UserActivityTable from "../UserActivity/UserActivityTable";
import UserAnalyticsContent from "../UserAnalytics/UserAnalyticsContent";

export default function UserManagementTabContent() {
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
            label="User Management"
            {...a11yProps(0)}
            sx={{ textTransform: "none" }}
          />
          <Tab
            className="font-inter text-sm font-semibold text-[#858C95]"
            label="User Activity"
            {...a11yProps(1)}
            sx={{ textTransform: "none" }}
          />
          <Tab
            className="font-inter text-sm font-semibold text-[#858C95]"
            label="User Analytics"
            {...a11yProps(2)}
            sx={{ textTransform: "none" }}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <UserManagementTable />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <UserActivityTable />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <UserAnalyticsContent />
      </CustomTabPanel>
    </Box>
  );
}
