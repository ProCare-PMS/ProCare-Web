"use client";
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
  const [showDetails, setShowDetails] = React.useState<number | null>(null);

  const handleShowDetails = (index: number) => {
    console.log("kkk", index, showDetails);

    setShowDetails((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <>
      <div className="flex flex-col md:flex-row items-center font-inter justify-between gap-3  py-2">
        {data.map((item, index) => (
          <>
            <div
              key={index}
              className="flex flex-col shadow-custom rounded-xl px-5 py-4 bg-white w-[18rem] relative"
            >
              <div className="flex items-center mb-4 justify-between">
                <h3 className="font-medium text-[#202224] text-xl font-inter">
                  {item.title}
                </h3>
                <div className="dotHolder">
                  <span className="text-2xl font-inter text-[#858C95]">
                    <button
                      onClick={() => handleShowDetails(index)}
                      className=""
                    >
                      <span>...</span>
                    </button>
                  </span>
                  {showDetails === index && (
                    <div className="detailsCard bg-white text-black text-sm absolute top-12 right-5 px-6 py-2 rounded-[0.4rem] shadow-2xl">
                      <Link href={item.links} key={index}>
                        View Details
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-between gap-2">
                <div>
                  <h3 className="text-2xl font-inter mb-4 font-semibold">
                    {item.amount || item.itemAmount}
                  </h3>
                  <div className="flex items-center gap-2 text-[#858C95]  text-xs">
                    <span
                      className="font-inter rounded-[7rem] text-xs font-medium px-3 py-1"
                      style={{
                        backgroundColor: item.growth.background,
                        color: item.growth.color,
                      }}
                    >
                      {item.growth.mainLabel}
                    </span>
                    {item.growth.label}
                  </div>
                </div>
                <div className="pt-4">
                  <Image
                    width={60}
                    height={60}
                    src={item.icon}
                    alt={item?.alt}
                  />
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default DashboardStats;
