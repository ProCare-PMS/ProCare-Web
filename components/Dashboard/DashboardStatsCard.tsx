import React from "react";
import Image from "next/image";
import Link from "next/link";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  buttonIndex: number;
  showDetails: number | null;
  onToggleDetails: (index: number) => void;
  imageSrc: string;
  link: string;
  badgeText: string;
  badgeColor: string;
}

const DashboardStatsCard = ({
  title,
  value,
  subtitle,
  buttonIndex,
  showDetails,
  onToggleDetails,
  imageSrc,
  link,
  badgeText,
  badgeColor,
}: StatCardProps) => {
  return (
    <div className="flex flex-col shadow-custom rounded-xl px-5 py-4 bg-white w-[18rem] relative">
      <div className="flex items-center mb-4 justify-between">
        <h3 className="font-medium text-[#202224] text-xl">{title}</h3>
        <div className="dotHolder">
          <button
            onClick={() => onToggleDetails(buttonIndex)}
            className="text-2xl text-[#858C95]"
          >
            ...
          </button>
          {showDetails === buttonIndex && (
            <div className="detailsCard bg-white text-black text-sm absolute top-12 right-5 px-6 py-2 rounded-[0.4rem] shadow-2xl">
              <Link href={link}>View Details</Link>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-between gap-2">
        <div>
          <h3 className="text-2xl mb-4 font-semibold">{value}</h3>
          <div className="flex items-center gap-2 text-[#858C95] text-xs">
            <span
              className={`font-medium px-3 py-1 rounded-[7rem] text-xs ${badgeColor}`}
            >
              {badgeText}
            </span>
            {subtitle}
          </div>
        </div>
        <div className="pt-4">
          <Image width={60} height={60} src={imageSrc} alt={title} />
        </div>
      </div>
    </div>
  );
};

export default DashboardStatsCard;
