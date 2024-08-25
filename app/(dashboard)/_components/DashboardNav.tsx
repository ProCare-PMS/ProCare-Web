"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  ClipboardList,
  Settings,
  Workflow,
  LineChart,
  Store,
  GanttChart,
} from "lucide-react";
import DropDown from "./DropDown";

const DashboardNav = () => {
  const [activeLink, setActiveLink] = React.useState<string>("Dashboard");
  const pathname = usePathname();

  React.useEffect(() => {
    switch (pathname) {
      case "/dashboard":
        setActiveLink("Dashboard");
        break;
      case "/pos":
        setActiveLink("Pos");
        break;
      case "/inventory":
        setActiveLink("Inventory");
        break;
      case "/analytics":
        setActiveLink("Analytics");
        break;
      case "/management":
        setActiveLink("Management");
        break;
      case "/settings":
        setActiveLink("Settings");
        break;
      default:
        setActiveLink("");
    }
  }, [pathname]);

  const handleLinkClick = (linkName: string) => {
    setActiveLink(linkName);
  };

  const linkClasses = (linkName: string) =>
    activeLink === linkName
      ? "flex gap-2 border-2 border-[#2648EA] rounded-[5px] px-5 justify-center mx-auto py-1 bg-white items-center text-sm font-semibold text-[#2648EA]"
      : "flex gap-2 items-center text-sm px-3 py-1 font-semibold text-[#858C95]";

  return (
    <header className="fixed top-0 w-full z-20 left-0 bg-white">
      <div className="container mx-auto px-12">
        <div className="flex items-center justify-between h-[5rem] p-2">
          <div>
            <Image
              src="/RxPMSlogo.svg"
              width={155}
              height={66}
              className="mt-[-0.8rem]"
              alt="ProHealium"
            />
          </div>

          <nav className="hidden md:block font-mono">
            <ul className="flex items-center justify-between gap-5 font-inter">
              <li>
                <Link
                  href="/dashboard"
                  className={linkClasses("Dashboard")}
                  onClick={() => handleLinkClick("Dashboard")}
                >
                  <Workflow />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/pos"
                  className={linkClasses("Pos")}
                  onClick={() => handleLinkClick("Pos")}
                >
                  <Store />
                  Pos
                </Link>
              </li>
              <li>
                <Link
                  href="/inventory"
                  className={linkClasses("Inventory")}
                  onClick={() => handleLinkClick("Inventory")}
                >
                  <ClipboardList />
                  Inventory
                </Link>
              </li>
              <li>
                <Link
                  href="/analytics"
                  className={linkClasses("Analytics")}
                  onClick={() => handleLinkClick("Analytics")}
                >
                  <LineChart />
                  Analytics
                </Link>
              </li>
              <li>
                <Link
                  href="/management"
                  className={linkClasses("Management")}
                  onClick={() => handleLinkClick("Management")}
                >
                  <GanttChart />
                  Management
                </Link>
              </li>
              <li>
                <Link
                  href="/settings"
                  className={linkClasses("Settings")}
                  onClick={() => handleLinkClick("Settings")}
                >
                  <Settings />
                  Settings
                </Link>
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-[6px]">
            <Image
              width={30}
              height={30}
              src="/icons/Avatar.png"
              alt="Avatar Icon"
            />
            <div className="font-inter">
              <h2 className="text-sm font-semibold sev">John Doe</h2>
              <span className="text-sm font-medium text-[#858C95]">
                24/05/2024
              </span>
            </div>
            <DropDown />
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardNav;
