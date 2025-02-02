import React, { useState } from "react";
import { ChevronDown, ChevronUp } from 'lucide-react';

interface Activity {
  type: string;
  category?: string;
  children: {
    name: string;
    status: string;
    time: string;
  }[];
}

const activities: Activity[] = [
  {
    type: "Today",
    category: "All Users",
    children: [
      { name: "John Doe", status: "Successful", time: "10 mins ago" },
      { name: "Jane Smith", status: "Failed", time: "5 hours ago" },
    ],
  },
  {
    type: "Yesterday",
    category: "All Users",
    children: [
      { name: "Alice Cooper", status: "Successful", time: "2 days ago" },
    ],
  },
];

function ActivityLog() {
  const [expanded, setExpanded] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <div className="p-4 w-[65%] mx-auto min-h-[30rem]">
      {activities.map((activity, index) => (
        <div key={index} className="mb-4">
          <div
            className="flex justify-between items-center cursor-pointer p-2 rounded-lg"
            onClick={() => toggleExpand(index)}
          >
            <div className="flex items-center justify-between w-[30%]">
              <span className="block bg-slate-200 p-2 rounded-full me-2 w-8">
                {expanded === index ? <ChevronUp /> : <ChevronDown />}
              </span>
              <span className="block font-bold">{activity.type}</span>
              <span className="block bg-[#21965314] text-[#219653] px-2 py-1 rounded-xl">
                {activity.category}
              </span>
            </div>
            <span className="text-sm text-gray-500 bg-slate-200 w-6 h-6 rounded-full flex justify-center items-center">
              {activity.children.length}
            </span>
          </div>

          {expanded === index && (
            <div className="mt-2">
              {activity.children.map((child, childIndex) => (
                <div key={childIndex} className="flex flex-col ps-6">
                  <div className="flex justify-between items-center bg-white p-2 rounded-lg mb-2 border-s w-full ps-10">
                    <div>
                      <div>
                        <span className="font-bold">
                          Transaction made by{" "}
                          <span className="text-[#2648EA]">{child.name}</span>
                        </span>
                      </div>
                      <div className="text-sm text-gray-500">{child.time}</div>
                      <div>
                        <span className="text-[#2648EA] underline cursor-pointer">
                          View
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span
                        className={`font-bold px-4 py-1 rounded-2xl ${
                          child.status === "Successful"
                            ? "text-[#219653] bg-[#21965314]"
                            : "text-[#D34053] bg-[#D3405314]"
                        }`}
                      >
                        {child.status}
                      </span>
                    </div>
                  </div>

                  {/* Blue dot separator */}
                  {childIndex < activity.children.length - 1 && (
                    <div className="my-3 mx-0">
                      <span className="block w-2 h-2 bg-blue-500 rounded-full"></span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default ActivityLog;
