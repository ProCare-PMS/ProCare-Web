import Image from "next/image";
import { CategoryProduct } from "./CategoriesTabProducts";

interface Props {
  categoryLength: number;
  category: CategoryProduct[];
  isLoading: boolean;
}

const StatCard = ({ 
  icon, 
  label, 
  value 
}: { 
  icon: string; 
  label: string; 
  value: string | number;
}) => (
  <div className="border w-[250px] flex gap-5 items-center border-[#D0D5DD] py-3 px-5 rounded-[8px]">
    <Image
      src={icon}
      alt={`${label} icon`}
      width={35}
      height={35}
    />
    <div className="grid">
      <span className="font-inter text-[#848199] font-medium text-xs text-left">
        {label}
      </span>
      <span className="font-bold font-inter text-lg">
        {value}
      </span>
    </div>
  </div>
);

const SkeletonCard = () => (
  <div className="border w-[250px] flex gap-5 items-center border-[#D0D5DD] py-3 px-5 rounded-[8px]">
    <div className="bg-gray-200 w-[35px] h-[35px] rounded-md animate-pulse"></div>
    <div className="grid flex-1 gap-2">
      <div className="h-3 bg-gray-200 rounded w-24 animate-pulse"></div>
      <div className="h-5 bg-gray-200 rounded w-16 animate-pulse"></div>
    </div>
  </div>
);

const CategoriesTabStats = ({ categoryLength, category, isLoading }: Props) => {
  const topCategory = category?.length > 0
    ? category.reduce((max, item) =>
        item.product_count > max.product_count ? item : max,
        category[0]
      )
    : null;

  if (isLoading) {
    return (
      <div className="flex items-center gap-9">
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-9">
      <StatCard 
        icon="/assets/images/stock.png"
        label="No Of Categories"
        value={categoryLength || 0}
      />
      <StatCard 
        icon="/assets/images/top.png"
        label="Top Category"
        value={topCategory ? topCategory.name : "-"}
      />
    </div>
  );
};

export default CategoriesTabStats;