"use client";
import React from "react";
import {
  ClipboardList,
  Settings,
  Workflow,
  LineChart,
  Store,
  GanttChart,
} from "lucide-react";
import MainNavItem from "./MainNavItem";

const navRoutes = [
  {
    icon: Workflow,
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: Store,
    label: "POS",
    href: "/pos",
  },
  {
    icon: ClipboardList,
    label: "Inventory",
    href: "/inventory",
  },
  {
    icon: LineChart,
    label: "Analytics",
    href: "/analytics",
  },
  {
    icon: GanttChart,
    label: "Management",
    href: "/management",
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/settings",
  },
];


const MainNavRoutes = () => {
    return (
      <div className="flex items-center font-inter gap-5">
        {navRoutes.map((route) => (
          <MainNavItem
            key={route.label}
            icon={route.icon}
            label={route.label}
            href={route.href}
          />
        ))}
      </div>
    );
  };
  
  export default MainNavRoutes;