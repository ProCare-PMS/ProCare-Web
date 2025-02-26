import React from "react";
import Link from "next/link";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
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
  subtitle = "",
  buttonIndex,
  showDetails,
  onToggleDetails,
  imageSrc,
  link,
  badgeText,
  badgeColor,
}: StatCardProps) => {
  return (
    <div className="flex flex-col shadow-custom rounded-xl p-5 bg-white md:w-[18rem]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-[#202224] text-xl">{title}</h3>
        <button
          onClick={() => onToggleDetails(buttonIndex)}
          className="text-2xl text-[#858C95]"
        >
          ...
        </button>
        {showDetails === buttonIndex && (
          <div className="absolute top-12 right-5 bg-white text-black text-sm px-6 py-2 rounded shadow-2xl">
            <Link href={link}>View Details</Link>
          </div>
        )}
      </div>
      <div className="flex justify-between gap-2">
        <div>
          <h3 className="text-2xl mb-4 font-semibold">{value}</h3>
          <div className="flex items-center gap-2 text-[#858C95] text-xs">
            <span className={`font-medium px-3 py-1 rounded-full ${badgeColor}`}>
              {badgeText}
            </span>
            {subtitle && <span>{subtitle}</span>}
          </div>
        </div>
        <picture>
            <source srcSet={imageSrc} type="image/webp" />
            <img src={imageSrc} alt={title} />
          </picture>
      </div>
    </div>
  );
};

export default DashboardStatsCard;
