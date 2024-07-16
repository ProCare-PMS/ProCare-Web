import React from "react";
import Image from "next/image";
import Link from "next/link";

const data = [
  {
    title: "Daily Sales",
    amount: "₵390", // Replace with actual data
    itemAmount: "",
    growth: {
      mainLabel: "Personal",
      label: "monthly growth",
      color: "#0A77FF",
      background: "#ECF4FC",
    },
    icon: "/icons/Line.png",
    alt: "Line chart for daily sales",
    links: "inventory/daily-sales",
  },
  {
    title: "Items Sold",
    itemAmount: "680 Items", // Replace with actual data
    growth: {
      mainLabel: "Decline",
      color: "#C8322B",
      background: "#FFEFEE",
    },
    icon: "/icons/ItemsSold.png",
    alt: "Line chart for daily sales",
    links: "inventory/item-sold",
  },
  {
    title: "Profit Made",
    amount: "₵390",
    growth: {
      mainLabel: "Rise",
      label: "in profit",
      color: "#2AA63C",
      background: "#F3FFF6",
    },
    icon: "/icons/Graphics.png",
    alt: "Line chart for daily sales",
    links: "inventory/profit-made",
  },
  {
    title: "Items in Stock",
    itemAmount: "200",
    growth: {
      mainLabel: "200",
      label: "monthly restock",
      color: "#0A77FF",
      background: "#ECF4FC",
    },
    icon: "/icons/Graphics.png",
    alt: "Line chart for daily sales",
    links: "inventory/items-in-stock",
  },
  // Add objects for 'Profit Made' and 'Items In Stock' with similar structure
];

const DashboardStats = () => {
  return (
    <>
      
        <div className="flex flex-col md:flex-row items-center font-inter justify-between gap-4 py-5">
          {data.map((item, index) => (
            <Link href={item.links} key={index}>
              <div
                key={item.title}
                className="flex flex-col shadow-custom rounded-xl px-5 py-4 bg-white w-full"
              >
                <div className="flex items-center mb-4 justify-between">
                  <h3 className="font-semibold font-inter text-base">
                    {item.title}
                  </h3>
                  <span className="text-2xl font-inter text-[#858C95]">...</span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <div>
                    <h3 className="text-2xl font-inter mb-4 font-semibold">
                      {item.amount || item.itemAmount}
                    </h3>
                    <div className="flex items-center gap-4 text-[#858C95] font-bold text-xs">
                      <span
                        className={`bg-[${item.growth.background}] font-inter rounded-[7rem] text-xs font-medium px-3 py-1 text-[${item.growth.color}]`}
                      >
                        {item.growth.mainLabel}
                      </span>
                      {item.growth.label}
                    </div>
                  </div>
                  <div className="">
                    <Image
                      width={40}
                      height={40}
                      src={item.icon}
                      alt={item?.alt}
                    />
                  </div>
                </div>
              </div>
            </Link>
            
          ))}
        </div>

    </>
  );
};

export default DashboardStats;
