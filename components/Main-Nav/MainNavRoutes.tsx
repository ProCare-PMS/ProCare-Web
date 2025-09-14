"use client";
import React from "react";
import {
  ClipboardList,
  Settings,
  Grid2x2,
  LineChart,
  Store,
  GanttChart,
} from "lucide-react";
import MainNavItem from "./MainNavItem";

const navRoutes = [
  {
    icon: Grid2x2,
    label: "Dashboard",
    href: "/dashboard",
    roles: ["is_manager", "is_mca", "is_pharmacist"],
  },
  {
    icon: Store,
    label: "POS",
    href: "/pos",
    roles: ["is_manager", "is_mca", "is_pharmacist"],
  },
  {
    icon: ClipboardList,
    label: "Inventory",
    href: "/inventory",
    roles: ["is_manager", "is_pharmacist", "is_mca"],
  },
  {
    icon: LineChart,
    label: "Analytics",
    href: "/analytics",
    roles: ["is_manager", "is_pharmacist"],
  },
  {
    icon: GanttChart,
    label: "Management",
    href: "/management",
    roles: ["is_manager"],
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/settings",
    roles: ["is_manager", "is_mca", "is_pharmacist"],
  },
];

interface Props {
  toggleMobileNav: () => void
}

const MainNavRoutes = ({ toggleMobileNav } : Props) => {
  const userdata = localStorage.getItem("user");
  const user = userdata && JSON.parse(userdata);

  const filteredRoutes = navRoutes.filter((route) =>
    route.roles.some((role) => user && user[role])
  );

  return (
    <div className="flex flex-col md:flex-row items-center font-inter gap-5 w-full">
      {filteredRoutes.map((route) => (
        <MainNavItem
          key={route.label}
          icon={route.icon}
          label={route.label}
          href={route.href}
          toggleMobileNav={toggleMobileNav}
        />
      ))}
    </div>
  );
};

export default MainNavRoutes;
